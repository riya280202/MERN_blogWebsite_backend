const { request } = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const env = require("dotenv")

const User = require("../model/user")
const Token = require("../model/token")

env.config();

exports.signup = async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, name: req.body.name, password: hashedPassword }
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({msg: "Signup successful"})
        
    } catch(error){
        return res.status(500).json({msg: "Signup unsuccessful"})

    }
}


exports.login = async (req,res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: 'Username does not match' });
    }

    try{
        let match = await bcrypt.compare(req.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({token: refreshToken})
            await newToken.save();

            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });

        } else{
            res.status(400).json({ msg: 'Password does not match' })
        }
    }catch (error) {
        res.status(500).json({ msg: 'error while login the user' })
    }
}