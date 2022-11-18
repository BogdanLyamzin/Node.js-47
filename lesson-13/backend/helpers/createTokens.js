const jwt = require("jsonwebtoken")

const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} = process.env;

const createTokens = async (id)=> {
   
    const payload = {
        id,
    }
    
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {expiresIn: "15m"});
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {expiresIn: "7d"});

    return {accessToken, refreshToken}

}

module.exports = createTokens;