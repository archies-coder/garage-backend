const jwt = require('jsonwebtoken');

module.exports = (user) => {
    const dataStoredInToken = { _id: user._id }
    const secret = process.env.JWT_SECRET
    const expiresIn = 60 * 60

    return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    }
}