
const express = require('express');
const { createGroup, sendGroupInvitation, acceptGroupInvitation, declineGroupInvitation } = require('../controllers/groupController');

const router = express.Router();

router.post('/create', createGroup);
router.post('/invite', sendGroupInvitation);
router.post('/accept', acceptGroupInvitation);
router.post('/decline', declineGroupInvitation);

module.exports = router;
