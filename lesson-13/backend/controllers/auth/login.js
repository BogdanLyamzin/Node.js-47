const bcrypt = require("bcryptjs")

const {User} = require("../../models/user")

const {RequestError, createTokens} = require("../../helpers")

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw RequestError(401, "Email or password wrong"); 
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw RequestError(401, "Email or password wrong"); 
    }

    const {accessToken, refreshToken} = await createTokens(user._id)

    await User.findByIdAndUpdate(user._id, {accessToken, refreshToken})

    res.json({
        accessToken,
        refreshToken,
    })
}

module.exports = login;