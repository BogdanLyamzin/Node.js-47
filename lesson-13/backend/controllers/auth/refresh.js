const jwt = require("jsonwebtoken");

const {User} = require("../../models/user")

const {RequestError, createTokens} = require("../../helpers")

const {REFRESH_TOKEN_SECRET_KEY} = process.env;

const refresh = async(req, res) => {
    const {refreshToken: token} = req.body;
    try {
        const {id} = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
        const user = await User.findById(id);
        if(!user || user.refreshToken !== token) {
            throw new Error("token expired")
        }

       const {accessToken, refreshToken} = await createTokens(user._id);

        await User.findByIdAndUpdate(user._id, {accessToken, refreshToken})

        res.json({
            accessToken,
            refreshToken,
        })
    }
    catch(error) {
        throw(RequestError(401, error.message))
    }
}

module.exports = refresh;