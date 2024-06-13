const { Profile } = require('../models');

const isAuth = async (req, res, next) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

const isSuperAdmin = async (req, res, next) => {
  // Check if user is SUPERADMIN
  const profile = await Profile.findByPk(req.user.id);
  if (!profile || profile.role !== 'SUPERADMIN') {
    return res.status(403).json({ error: 'Forbidden, requires SUPERADMIN role' });
  }
  next();
};

const isHostOrAdmin = async (req, res, next) => {
  // Check if user is HOST or ADMIN
  const profile = await Profile.findByPk(req.user.id);
  if (!profile || (profile.role !== 'HOST' && profile.role !== 'ADMIN')) {
    return res.status(403).json({ error: 'Forbidden, requires HOST or ADMIN role' });
  }
  next();
};

module.exports = {
  isAuth,
  isSuperAdmin,
  isHostOrAdmin,
};
