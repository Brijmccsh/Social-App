const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Channel extends Model {}

Channel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.UUID,
      references: { model: 'Profiles', key: 'id' },
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: 'Channel' }
);

module.exports = Channel;
