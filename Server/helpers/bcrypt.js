const bcrypt = require("bcryptjs")

const hashPassword = (defPass) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(defPass, salt)

    return hash
}

const comparePassword = (defPass, userPass) => {
    return bcrypt.compareSync(defPass, userPass)
}

module.exports = { hashPassword, comparePassword }