const request = require("supertest");
const express = require("express");
const messageRouter = require("../../routes/messages");  // Đảm bảo đường dẫn đúng
const Messages = require("../../models/messageModel");  // Đảm bảo import đúng model
jest.mock("../../models/messageModel");  // Mock model

const app = express();
app.use(express.json());
app.use("/api/messages", messageRouter);  // Đảm bảo đúng route

describe("Message Controller - addMessage", () => {

  // Test trường hợp thêm tin nhắn thành công
  it("should add a message successfully", async () => {
    const mockMessage = {
      message: { text: "Hello", media: null },
      from: "user1Id",
      to: "user2Id"
    };

    // Mock dữ liệu trả về từ Messages.create
    Messages.create.mockResolvedValue(mockMessage);

    const res = await request(app)
      .post("/api/messages/addmsg")
      .send({ from: "user1Id", to: "user2Id", text: "Hello", media: null });

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Message added successfully.");
  });

  // Test trường hợp thiếu trường bắt buộc
  it("should fail if message data is missing required fields", async () => {
    const res = await request(app)
      .post("/api/messages/addmsg")  // Đảm bảo đúng URL
      .send({ from: "user1Id", to: "user2Id" });  // Thiếu trường text và media

    expect(res.status).toBe(400);  // Kiểm tra mã trạng thái trả về là 400 (Bad Request)
    expect(res.body.msg).toBe("Missing required fields");  // Kiểm tra thông báo lỗi
  });

  // Test trường hợp có lỗi server
  it("should handle server errors gracefully", async () => {
    // Giả lập lỗi khi tạo tin nhắn (mock lỗi)
    Messages.create.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/api/messages/addmsg")  // Đảm bảo đúng URL
      .send({ from: "user1Id", to: "user2Id", text: "Hello", media: null });

    expect(res.status).toBe(500);  // Kiểm tra mã trạng thái trả về là 500 (Internal Server Error)
    expect(res.body.msg).toBe("Failed to add message to the database");
    expect(res.body.error).toBe("Database error");  // Kiểm tra thông báo lỗi từ server
  });
});
