const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
    try {
        let { authorization } = req.headers
        if (!authorization) throw {name: "invalidToken"}

        const [type, token] = authorization.split(" ")
        if (type !== "Bearer") throw {name: "invalidToken"}

        const { id } = verifyToken(token)

        const user = await User.findByPk(id)

        if (!user) throw {name: "invalidToken"}
        req.user = user
        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { authentication }