const User = require("../models/userModel");
const Group = require("../models/groupModel");

module.exports.createGroup = async (req, res, next) => {
  try {
    const { name, members, avatarImage } = req.body;
    console.log("Received data:", req.body);

    if (!name) {
      return res.status(400).json({ msg: "Tên nhóm là bắt buộc." });
    }

    if (!Array.isArray(members) || members.length === 0) {
      return res
        .status(400)
        .json({ msg: "Cần có ít nhất một thành viên trong nhóm." });
    }

    const group = new Group({
      name,
      members,
      avatarImage,
      createdDate: new Date(),
    });

    console.log("Group before save:", group);

    // Lưu nhóm vào cơ sở dữ liệu
    const savedGroup = await group.save();

    console.log("Group saved:", savedGroup);

    await Promise.all(
      members.map(async (memberId) => {
        await User.findByIdAndUpdate(
          memberId,
          { $addToSet: { groups: savedGroup._id } },
          { new: true }
        );
      })
    );

    res.json({ msg: "Nhóm đã được tạo thành công", group: savedGroup });
  } catch (ex) {
    console.error("Lỗi khi tạo nhóm:", ex);
    res.status(500).json({ msg: "Đã xảy ra lỗi khi tạo nhóm." });
  }
};

module.exports.sendGroupInvitation = async (req, res, next) => {
  try {
    const { senderId, receiverId, groupId } = req.body;

    // Kiểm tra nhóm tồn tại không
    const group = await Group.findById(groupId);
    if (!group) {
      console.error("Group not found:", groupId); // In chi tiết lỗi
      return res.status(404).json({ msg: "Group not found" });
    }

    // Kiểm tra sender có phải là thành viên không
    const isValidSender = group.members.includes(senderId);
    if (!isValidSender) {
      console.error("Sender is not a member:", senderId); // In chi tiết lỗi
      return res
        .status(400)
        .json({ msg: "Sender is not a member of this group" });
    }

    // Kiểm tra người nhận có tồn tại không
    const receiverUser = await User.findById(receiverId);
    if (!receiverUser) {
      console.error("Receiver not found:", receiverId); // In chi tiết lỗi
      return res.status(404).json({ msg: "Receiver not found" });
    }

    // Kiểm tra xem đã gửi lời mời cho người này chưa
    if (receiverUser.groupInvitations.includes(groupId)) {
      console.error("Group invitation already sent to receiver:", receiverId);
      return res
        .status(400)
        .json({ msg: "Group invitation already sent to this user" });
    }

    // Thêm lời mời vào danh sách của người nhận
    receiverUser.groupInvitations.push(groupId);
    await receiverUser.save();

    // Kiểm tra sau khi lưu, đảm bảo lời mời đã được cập nhật
    if (receiverUser.groupInvitations.includes(groupId)) {
      return res.json({ msg: "Group invitation sent" });
    } else {
      console.error("Failed to save group invitation:", receiverUser); // In chi tiết lỗi
      return res.status(500).json({ msg: "Failed to send group invitation" });
    }
  } catch (ex) {
    console.error("Error in sendGroupInvitation:", ex); // In chi tiết lỗi
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: ex.message });
  }
};

module.exports.acceptGroupInvitation = async (req, res, next) => {
  try {
    const { userId, groupId } = req.body;

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Tìm nhóm
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Kiểm tra lời mời nhóm
    if (!user.groupInvitations.includes(groupId)) {
      return res
        .status(400)
        .json({ msg: "No group invitation found for this user" });
    }

    // Thêm người dùng vào danh sách thành viên của nhóm
    group.members.push(userId);
    await group.save();

    // Thêm nhóm vào trường groups của người dùng
    user.groups.push(groupId);

    // Xóa lời mời nhóm khỏi trường groupInvitations của người dùng
    user.groupInvitations = user.groupInvitations.filter(
      (invitation) => invitation.toString() !== groupId.toString()
    );

    // Lưu thay đổi người dùng
    await user.save();

    return res.json({ msg: "Group invitation accepted" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.declineGroupInvitation = async (req, res, next) => {
  try {
    const { userId, groupId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Kiểm tra xem người dùng có lời mời nhóm hay không
    if (!user.groupInvitations.includes(groupId)) {
      return res.status(400).json({ msg: "Group invitation not found" }); // Thêm kiểm tra này
    }

    user.groupInvitations = user.groupInvitations.filter(
      (invitation) => invitation !== groupId
    );
    await user.save();

    return res.json({ msg: "Group invitation declined" });
  } catch (ex) {
    next(ex);
  }
};
