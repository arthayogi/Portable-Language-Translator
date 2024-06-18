"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        defaultValue: "Anonymous",
        allowNull: false,
        validate: {
          notNull: {
            msg: "UsernameNull",
          },
          notEmpty: {
            msg: "Tolong masukkan nama anda"
          }
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "EmailNull",
          },
          notEmpty: {
            msg: "Tolong masukkan email anda",
          },
          isEmail: {
            msg: "Format email salah",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "PasswordNull",
          },
          notEmpty: {
            msg: "Tolong masukkan password anda",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(data) {
          data.password = hashPassword(data.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
