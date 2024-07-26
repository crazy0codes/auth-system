const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const User = require('../models/user.js')
require('dotenv').config();

async function register(req, res) {
    const { email, password, username } = req.query;

    if (!email || !password || !username) {
        res
        .status(401)
        .json({
             error: "Require all credentials"
        })
        return
    }

    const hashPassword = await bycrypt.hash(password, 10)

    const jwtToken = jwt.sign({ email, username }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    try {
        await User.create(email, username, hashPassword);
        res
        .status(200)
        .json({
            register_status: "success",
            token: jwtToken
        })
    }
    catch (error) {
        res
        .status(500)
        .json({
            error: "Error in registration"
        })
    }

}

async function login(req, res, next) {
    const { username, password } = req.query;
    try {
        const [result] = await User.find(username);
        const isUser = await bycrypt.compare(password, result.password);
        const {email} = result;
        if (isUser) {
            const jwtToken = jwt.sign({ email, username }, process.env.JWT_SECRET, { expiresIn: "1d" })
            res.status(200)
            .json({
                login_status : "success",
                token : jwtToken,
            })
            
            return
        }
        else{
            res
            .status(403)
            .json({
                login_status : "failed",
                error  : "invalid credentials"
            })
            return
        }
    }
    catch (error) {
        console.log("Error in Login function :" + error)
        res
        .status(500)
        .json({
            login_status : "failed",
            error : "server problem"
        })
    }

}

async function getProfile(req, res) {
    const {username} = req.query;

    try {
        const [result] = await User.profile(username);
        res
        .status(200)
        .json({
            user_profile : result,
        })
        return
    }
    catch(err){
        console.log("Error in the getProfile function :", err);
        res
        .status(500)
        .json({
            error : "server error"
        })
        return
    }
}

module.exports = {
    register,
    login,
    getProfile
}