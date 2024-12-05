const request = require("supertest");
const express = require("express");
const app = express();
const groupRouter = require("../../routes/group");
const Group = require("../../models/groupModel");
const User = require("../../models/userModel");

app.use(express.json());
app.use("/api/groups", groupRouter);

jest.mock("../../models/groupModel");
jest.mock("../../models/userModel");

describe("Group Controller - createGroup", () => {
  it("should create a group successfully", async () => {
    // Dữ liệu giả lập cho nhóm
    const mockGroup = {
      name: "Test Group",
      members: ["user1", "user2"],
      avatarImage: "image.png",
    };

    // Mock phương thức save của Group và findByIdAndUpdate của User
    Group.prototype.save = jest.fn().mockResolvedValue({
      ...mockGroup,
      _id: "groupId123", // Thêm _id để giả lập dữ liệu lưu trữ vào DB
      createdDate: new Date(),
    });
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

    // Gửi yêu cầu POST đến API tạo nhóm
    const res = await request(app).post("/api/groups/create").send(mockGroup);

    // Kiểm tra phản hồi
    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Nhóm đã được tạo thành công");

    // Kiểm tra nếu group tồn tại trước khi truy cập thuộc tính 'name'
    expect(res.body.group).toBeDefined();
    if (res.body.group) {
      expect(res.body.group.name).toBe("Test Group");
      expect(res.body.group._id).toBeDefined();
    }
  });

  it("should return error if 'name' is missing", async () => {
    const res = await request(app)
      .post("/api/groups/create")
      .send({ members: ["user1"] }); // Thiếu trường 'name'

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("Tên nhóm là bắt buộc.");
  });

  it("should return error if 'members' is not an array", async () => {
    const res = await request(app)
      .post("/api/groups/create")
      .send({ name: "Test Group", members: "user1" }); // 'members' không phải là mảng

    expect(res.status).toBe(400);
    expect(res.body.msg).toBe("Cần có ít nhất một thành viên trong nhóm.");
  });
});
