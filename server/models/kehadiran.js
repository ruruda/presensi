'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kehadiran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kehadiran.init({
    userId: DataTypes.INTEGER,
    hari_1: DataTypes.ENUM('Hadir', 'Terlambat', 'Absen')
  }, {
    sequelize,
    modelName: 'Kehadiran',
  });
  return Kehadiran;
};