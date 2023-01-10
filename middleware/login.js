const jwt = require("jsonwebtoken")

function getToken(req) {
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token, process.env.JWT_KEY)
    req.usuario = decode
}

exports.required = (req, res, next) => {
    try {
        getToken(req)
        next()
    } catch (error) {
        return res.status(401).send({ message: "Falha de autenticação" })
    }
}

exports.optional = (req, res, next) => {
    try {
        getToken(req)
        next()
    } catch (error) {
        next()
    }
}