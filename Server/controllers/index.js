const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/");
const { openAI_JP, openAI_EN, openAI_KR } = require("../helpers/openai");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
  static async login(req, res, next) {
    try {
      if (!req.body.email) throw { name: "invalidLogin" };
      if (!req.body.password) throw { name: "invalidLogin" };

      const findUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!findUser) throw { name: "invalidLogin" };

      const checkPassword = comparePassword(
        req.body.password,
        findUser.password
      );

      if (!checkPassword) throw { name: "invalidLogin" };

      const payload = {
        id: findUser.id,
      };

      const token = signToken(payload);

      let access_token = token;

      res
        .status(200)
        .json({ message: `User ${findUser.email} Login Sukses`, access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
        const { google_token } = req.headers
        const ticket = await client.verifyIdToken({
          idToken: google_token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const [user, created] = await User.findOrCreate({
            where: {email: payload.email}, 
            defaults: {
                email: payload.email,
                password: String(Math.random() * 1000),
            },
        })

        const payloadGoogle = {
            id: findUser.id,
          };
    
          const token = signToken(payloadGoogle);
    
          let access_token = token;
    
          res
            .status(200)
            .json({ message: `User ${findUser.email} Login Sukses`, access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      let regis = await User.create(req.body);

      res.status(201).json({
        message: "User baru berhasil terdaftar",
        email: regis.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUsername(req, res, next) {
    try {
      let data = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (!data) throw { name: "notFound" };
      await User.update(req.body, { where: { id: req.user.id } });

      res
        .status(200)
        .json({
          message: `Hai, nama kamu sudah diubah menjadi ${req.body.username}`,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async viewUsername(req, res, next) {
    try {
      // console.log(req.user.id);
      let data = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (!data) throw { name: "notFound" };

      res.status(200).json({ username: data.username });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      let data = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (!data) throw { name: "notFound" };

      await User.destroy({
        where: {
          id: req.user.id,
        },
      });
      res
        .status(200)
        .json({ message: `User ${data.username} berhasil dihapus` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async translateAI_JP(req, res, next) {
    try {
      let { input } = req.body;
      if (!input) throw { name: "invalidInput" };

      let responseOpenAi = await openAI_JP(input);

      res.status(200).json({ message: responseOpenAi });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async translateAI_EN(req, res, next) {
    try {
      let { input } = req.body;
      if (!input) throw { name: "invalidInput" };

      let responseOpenAi = await openAI_EN(input);

      res.status(200).json({ message: responseOpenAi });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async translateAI_KR(req, res, next) {
    try {
      let { input } = req.body;
      if (!input) throw { name: "invalidInput" };

      let responseOpenAi = await openAI_KR(input);

      res.status(200).json({ message: responseOpenAi });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
