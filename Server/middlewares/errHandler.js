const errHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            res.status(400).json({message: err.errors[0].message})
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: "Email sudah digunakan"})
            break;
        case "invalidLogin":
            res.status(401).json({message: "Email / Password salah"})
            break;
        case "invalidInput":
            res.status(400).json({message: "Tolong masukkan text untuk ditranslate"})
            break;
        case "invalidToken":
            res.status(401).json({message: "Token tidak sesuai"})
            break;
        case "notFound":
            res.status(404).json({message: "Data tidak ditemukan"})
            break;
        default:
            res.status(500).json({message: "Internal server error"})
            break;
    }
}

module.exports = { errHandler }