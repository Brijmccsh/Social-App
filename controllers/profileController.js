const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const { Profile } = require('../models');

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedProfile = await Profile.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json(updatedProfile[1][0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const enableTwoFactorAuth = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret();
    await Profile.update({
      twoFactorSecret: secret.base32,
    }, {
      where: { id: req.user.id },
    });
    const qrCodeUrl = await QRCode.toDataURL(`otpauth://totp/Stonks:${req.user.email}?secret=${secret.base32}&issuer=Stonks`);
    res.json({ qrCodeUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const disableTwoFactorAuth = async (req, res) => {
  try {
    await Profile.update({
      twoFactorSecret: null,
    }, {
      where: { id: req.user.id },
    });
    res.json({ message: 'Two-factor authentication disabled successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  enableTwoFactorAuth,
  disableTwoFactorAuth,
};
