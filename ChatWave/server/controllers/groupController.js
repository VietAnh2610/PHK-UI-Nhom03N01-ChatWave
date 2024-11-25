const User = require("../models/userModel");
const Group = require("../models/groupModel");
module.exports.createGroup = async (req, res, next) => {
  try {
    const { name, members, avatarImage } = req.body;
    console.log("Received data:", req.body);
    // Kiểm tra nếu `name` không tồn tại
    if (!name) {
      return res.status(400).json({ msg: "Tên nhóm là bắt buộc." });
    }

    // Kiểm tra nếu `members` không phải là mảng hoặc mảng rỗng
    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ msg: "Cần có ít nhất một thành viên trong nhóm." });
    }

    // Tạo nhóm mới
    const group = new Group({
      name,
      members,
      avatarImage,
      createdDate: new Date(),
    });

    // Lưu nhóm vào cơ sở dữ liệu
    await group.save();

    // Cập nhật thông tin nhóm cho từng thành viên trong danh sách
    await Promise.all(members.map(async (memberId) => {
      await User.findByIdAndUpdate(
        memberId,
        { $addToSet: { groups: group._id } }, // Sử dụng $addToSet để tránh thêm trùng lặp
        { new: true } // Trả về dữ liệu mới nhất sau khi cập nhật
      );
    }));

    res.json({ msg: "Nhóm đã được tạo thành công", group });
  } catch (ex) {
    console.error('Lỗi khi tạo nhóm:', ex); // Log chi tiết lỗi
    res.status(500).json({ msg: 'Đã xảy ra lỗi khi tạo nhóm.' });
  }
};


module.exports.sendGroupInvitation = async (req, res, next) => {
  try {
    const { senderId, receiverId, groupId } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    const isValidSender = group.members.includes(senderId);
    console.log('isValidSender', isValidSender);

    if (!isValidSender) {
      return res.status(400).json({ msg: "Sender is not a member of this group" });
    }

    const receiverUser = await User.findById(receiverId);

    if (!receiverUser) {
      return res.status(404).json({ msg: "Receiver not found" });
    }

    if (receiverUser.groupInvitations.includes(groupId)) {
      return res.status(400).json({ msg: "Group invitation already sent to this user" });
    }

    receiverUser.groupInvitations.push(groupId);
    await receiverUser.save();

    return res.json({ msg: "Group invitation sent" });

  } catch (ex) {
    next(ex);
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
      return res.status(400).json({ msg: "No group invitation found for this user" });
    }

    // Thêm người dùng vào danh sách thành viên của nhóm
    group.members.push(userId);
    await group.save();

    // Thêm nhóm vào trường groups của người dùng
    user.groups.push(groupId);

    // Xóa lời mời nhóm khỏi trường groupInvitations của người dùng
    user.groupInvitations = user.groupInvitations.filter(invitation => invitation.toString() !== groupId.toString());

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

    user.groupInvitations = user.groupInvitations.filter(invitation => invitation !== groupId);
    await user.save();

    return res.json({ msg: "Group invitation declined" });

  } catch (ex) {
    next(ex);
  }
};
