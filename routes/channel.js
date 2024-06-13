const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const { isAuth, isHostOrAdmin, isSuperAdmin } = require('../middlewares/auth');

router.post('/create', isAuth, channelController.createChannel);
router.put('/:id/update', isAuth, channelController.updateChannel);

router.post('/:id/set-admin/:userId', isHostOrAdmin, channelController.setAdmin);
router.post('/:id/unset-admin/:userId', isHostOrAdmin, channelController.unsetAdmin);
router.post('/:id/mute/:userId', isHostOrAdmin, channelController.muteUser);
router.post('/:id/unmute/:userId', isHostOrAdmin, channelController.unmuteUser);
router.post('/:id/ban/:userId', isHostOrAdmin, channelController.banUser);
router.post('/:id/unban/:userId', isHostOrAdmin, channelController.unbanUser);
router.post('/:id/suspend', isSuperAdmin, channelController.suspendChannel);
router.put('/:id/set-title', isHostOrAdmin, channelController.setTitle);
router.put('/:id/set-description', isHostOrAdmin, channelController.setDescription);

module.exports = router;
