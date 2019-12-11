const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')

        req.user = decode
        next()

    } catch (error) {
        res.status(401).json({
            message: 'Bad request'
        })
    }
}

module.exports = authenticate