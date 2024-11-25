const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();
const upload = require('../upload'); // Import middleware Multer
const messageController = require("../controllers/messageController");
router.post("/addmsg", addMessage);
router.get("/getmsg", getMessages);
router.post("/uploadMedia", upload.single('media'), messageController.uploadMedia); // Endpoint cho việc upload media

module.exports = router;
