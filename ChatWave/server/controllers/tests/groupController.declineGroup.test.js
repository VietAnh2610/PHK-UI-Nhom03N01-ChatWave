const request = require("supertest");
const express = require("express");
const groupRouter = require("../../routes/group");
const User = require("../../models/userModel");

const app = express();
app.use(express.json());
app.use("/api/groups", groupRouter);

jest.mock("../../models/userModel"); // Mock model User

describe("Group Controller - declineGroupInvitation", () => {
  it("should decline the group invitation successfully", async () => {
    const userId = "user1";
    const groupId = "group1";

    // Mock dữ liệu người dùng
    const mockSave = jest.fn().mockResolvedValue(true); // Mock phương thức save

    // Mock findById để trả về đối tượng người dùng có phương thức save
    User.findById = jest.fn().mockResolvedValue({
      _id: userId,
      groupInvitations: [groupId],
      save: mockSave, // Thêm phương thức save mock
    });

    const res = await request(app)
      .post("/api/groups/decline")
      .send({ userId, groupId });

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Group invitation declined");

    // Kiểm tra xem phương thức `save` đã được gọi hay chưa
    expect(User.findById).toHaveBeenCalledWith(userId);
    expect(mockSave).toHaveBeenCalled();
  });

  it("should return 404 if user is not found", async () => {
    const userId = "user1";
    const groupId = "group1";

    // Mock dữ liệu người dùng không tồn tại
    User.findById = jest.fn().mockResolvedValue(null);

    const res = await request(app)
      .post("/api/groups/decline")
      .send({ userId, groupId });

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("User not found");

    // Kiểm tra phương thức `findById` chỉ được gọi 1 lần
    expect(User.findById).toHaveBeenCalledWith(userId);
  });

  it("should return 400 if group invitation not found", async () => {
    const userId = "user1";
    const groupId = "group1";

    // Giả lập người dùng có lời mời khác nhưng không phải nhóm này
    User.findById = jest.fn().mockResolvedValue({
      _id: userId,
      groupInvitations: ["otherGroupId"], // Không có groupId này trong lời mời
      save: jest.fn().mockResolvedValue({}),  // Mock save
    });

    const res = await request(app)
      .post("/api/groups/decline")
      .send({ userId, groupId });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("Group invitation not found");

    // Kiểm tra phương thức `findById` đã được gọi
    expect(User.findById).toHaveBeenCalledWith(userId);
  });
});
