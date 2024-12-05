const request = require("supertest");
const express = require("express");
const userRouter = require("../../routes/auth");  // Đảm bảo đường dẫn này đúng
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

// Mock các hàm của Mongoose và bcrypt
jest.mock("../../models/userModel");
jest.mock("bcrypt");

const app = express();
app.use(express.json());  // Cần để parse JSON từ body
app.use("/api/users", userRouter);  // Mount router vào app Express

describe("User Controller - login", () => {
  
  it("should return error if user not found", async () => {
    // Mock User.findOne trả về null, tức là không tìm thấy người dùng
    User.findOne.mockResolvedValue(null);
    
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "wrongpassword" });
    
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Email hoặc mật khẩu không chính xác");
    expect(res.body.status).toBe(false);
  });

  it("should return error if password is incorrect", async () => {
    // Mock User.findOne trả về một user nhưng mật khẩu không hợp lệ
    const mockUser = { email: "test@example.com", password: "hashedpassword" };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);  // Bcrypt trả về false khi so sánh mật khẩu

    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "wrongpassword" });
    
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Email hoặc mật khẩu không chính xác");
    expect(res.body.status).toBe(false);
  });

  it("should return user data if login is successful", async () => {
    // Mock User.findOne trả về user và bcrypt so sánh mật khẩu thành công
    const mockUser = { email: "test@example.com", password: "hashedpassword", toObject: jest.fn() };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);  // Bcrypt trả về true khi mật khẩu đúng

    // Mock phương thức toObject để loại bỏ trường password trước khi trả về
    mockUser.toObject.mockReturnValue({ email: "test@example.com", username: "testuser" });

    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "correctpassword" });
    
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.user).toHaveProperty("email", "test@example.com");
    expect(res.body.user).toHaveProperty("username", "testuser");
  });

});

