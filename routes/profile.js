const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { isAuth } = require('../middlewares/auth');

router.get('/:id', isAuth, profileController.getProfile);
router.put('/:id', isAuth, profileController.updateProfile);
router.post('/2fa/enable', isAuth, profileController.enableTwoFactorAuth);
router.post('/2fa/disable', isAuth, profileController.disableTwoFactorAuth);

module.exports = router;
