const request = require("supertest");
const express = require("express");
const groupRouter = require("../../routes/group");
const Group = require("../../models/groupModel");
const User = require("../../models/userModel");

const app = express();
app.use(express.json());
app.use("/api/groups", groupRouter);

jest.mock("../../models/userModel"); // Mock model User
jest.mock("../../models/groupModel"); // Mock model Group

describe("Group Controller - sendGroupInvitation", () => {
  it("should send a group invitation successfully", async () => {
    const senderId = "user1";
    const receiverId = "user2";
    const groupId = "group1";

    // Mock dữ liệu nhóm và người dùng
    Group.findById = jest.fn().mockResolvedValue({
      _id: groupId,
      members: [senderId], // Người gửi là thành viên của nhóm
    });

    // Mock người dùng với phương thức `save` được giả lập
    const mockSave = jest.fn().mockResolvedValue(true); // Mock phương thức save

    User.findById = jest.fn().mockResolvedValue({
      _id: receiverId,
      groupInvitations: [],
      save: mockSave, // Thêm phương thức save vào đối tượng mock
    });

    const res = await request(app)
      .post("/api/groups/invite")
      .send({ senderId, receiverId, groupId });

    expect(res.status).toBe(200); // Kiểm tra mã trạng thái trả về
    expect(res.body.msg).toBe("Group invitation sent");

    // Kiểm tra xem các phương thức đã được gọi đúng
    expect(Group.findById).toHaveBeenCalledWith(groupId);
    expect(User.findById).toHaveBeenCalledWith(receiverId);
    expect(mockSave).toHaveBeenCalled(); // Kiểm tra phương thức save của user
  });

  it("should return 404 if group not found", async () => {
    const senderId = "user1";
    const receiverId = "user2";
    const groupId = "group1";

    // Mock trả về null khi tìm kiếm nhóm
    Group.findById = jest.fn().mockResolvedValue(null);

    const res = await request(app)
      .post("/api/groups/invite")
      .send({ senderId, receiverId, groupId });

    expect(res.status).toBe(404); // Kiểm tra mã lỗi
    expect(res.body.msg).toBe("Group not found");
  });

  it("should return 400 if sender is not a member of the group", async () => {
    const senderId = "user1";
    const receiverId = "user2";
    const groupId = "group1";

    // Mock dữ liệu nhóm với sender không phải là thành viên
    Group.findById = jest.fn().mockResolvedValue({
      _id: groupId,
      members: ["user3"], // Người gửi không phải là thành viên
    });

    const res = await request(app)
      .post("/api/groups/invite")
      .send({ senderId, receiverId, groupId });

    expect(res.status).toBe(400); // Kiểm tra mã lỗi
    expect(res.body.msg).toBe("Sender is not a member of this group");
  });
});
