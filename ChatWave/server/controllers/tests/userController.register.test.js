const request = require("supertest");
const express = require("express");
const userRouter = require("../../routes/auth"); // Đảm bảo rằng bạn có route này
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

// Mock các hàm của Mongoose và bcrypt
jest.mock("../../models/userModel");
jest.mock("bcrypt");

const app = express();
app.use(express.json()); // Cần để parse JSON từ body
app.use("/api/users", userRouter); // Mount router vào app Express

describe("User Controller - register", () => {
  it("should return error if username already exists", async () => {
    // Mock User.findOne trả về một user có tên người dùng trùng
    User.findOne.mockResolvedValueOnce({ username: "existingUser" });

    const res = await request(app).post("/api/users/register").send({
      username: "existingUser",
      email: "newuser@example.com",
      password: "password123",
      phone: "1234567890",
    });

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Username already used");
    expect(res.body.status).toBe(false);
  });

  it("should return error if email already exists", async () => {
    // Giả lập User.findOne trả về 1 user với email đã tồn tại
    User.findOne.mockResolvedValueOnce({ email: "existing@example.com" });

    const res = await request(app).post("/api/users/register").send({
      username: "newUser",
      email: "existing@example.com",
      password: "password123",
      phone: "1234567890",
    });

    expect(res.status).toBe(200); // Kiểm tra mã lỗi là 200
    expect(res.body.msg).toBe("Username already used"); // Kiểm tra thông báo lỗi chính xác
    expect(res.body.status).toBe(false);
  });

  it("should return error if password is missing", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "newUser",
      email: "newuser@example.com",
      phone: "1234567890",
    });

    expect(res.status).toBe(400); // Kiểm tra mã lỗi là 400
    expect(res.body.msg).toBe("Password is required");
    expect(res.body.status).toBe(false);
  });

  it("should create a new user if username and email are unique", async () => {
    // Mock User.findOne trả về null (không tìm thấy user)
    User.findOne.mockResolvedValueOnce(null);

    // Mock bcrypt.hash để trả về mật khẩu đã mã hóa
    bcrypt.hash.mockResolvedValue("hashedpassword");

    // Mock User.create để tạo một user mới
    const mockUser = {
      _id: "12345",
      username: "newUser",
      email: "newuser@example.com",
      phone: "1234567890",
    };
    User.create.mockResolvedValue(mockUser);

    const res = await request(app).post("/api/users/register").send({
      username: "newUser",
      email: "newuser@example.com",
      password: "password123",
      phone: "1234567890",
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.user).toHaveProperty("username", "newUser");
    expect(res.body.user).toHaveProperty("email", "newuser@example.com");
    expect(res.body.user).not.toHaveProperty("password"); // Đảm bảo rằng mật khẩu không được trả về
  });
});
