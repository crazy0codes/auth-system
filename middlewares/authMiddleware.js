const jwt = require('jsonwebtoken');
require('dotenv').config();
async function verifyUser(req, res, next){
    try{
    const {authorization} = req.headers;
    let jwtToken = authorization.split(" ")[1]
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    }
    catch(err){
        res
        .status(403)
        .json({
            error : "invalid token"
        })
    }
}

module.exports =  verifyUser;