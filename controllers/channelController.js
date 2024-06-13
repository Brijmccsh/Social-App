const { Channel, Profile } = require('../models');

const createChannel = async (req, res) => {
  try {
    const channel = await Channel.create({
      ...req.body,
      ownerId: req.user.id,
    });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateChannel = async (req, res) => {
  try {
    const updatedChannel = await Channel.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json(updatedChannel[1][0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setAdmin = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    if (channel.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Only channel owner can set admin' });
    }
    const user = await Profile.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Logic to set admin role
    // Example logic: Add user to admins array in Channel model
    channel.admins.push(userId);
    await channel.save();
    res.json({ message: 'Admin added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unsetAdmin = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    if (channel.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Only channel owner can unset admin' });
    }
    // Logic to remove admin role
    // Example logic: Remove user from admins array in Channel model
    channel.admins = channel.admins.filter(adminId => adminId !== userId);
    await channel.save();
    res.json({ message: 'Admin removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const muteUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    // Logic to mute user
    // Example logic: Add user to mutedUsers array in Channel model
    channel.mutedUsers.push(userId);
    await channel.save();
    res.json({ message: 'User muted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unmuteUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    // Logic to unmute user
    // Example logic: Remove user from mutedUsers array in Channel model
    channel.mutedUsers = channel.mutedUsers.filter(mutedUserId => mutedUserId !== userId);
    await channel.save();
    res.json({ message: 'User unmuted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const banUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    // Logic to ban user
    // Example logic: Add user to bannedUsers array in Channel model
    channel.bannedUsers.push(userId);
    await channel.save();
    res.json({ message: 'User banned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unbanUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    channel.bannedUsers = channel.bannedUsers.filter(bannedUserId => bannedUserId !== userId);
    await channel.save();
    res.json({ message: 'User unbanned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const suspendChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    channel.status = 'suspended';
    await channel.save();
    res.json({ message: 'Channel suspended successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    const { title } = req.body;
    channel.title = title;
    await channel.save();
    res.json({ message: 'Channel title updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    const { description } = req.body;
    channel.description = description;
    await channel.save();
    res.json({ message: 'Channel description updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChannel,
  updateChannel,
  setAdmin,
  unsetAdmin,
  muteUser,
  unmuteUser,
  banUser,
  unbanUser,
  suspendChannel,
  setTitle,
  setDescription,
};
