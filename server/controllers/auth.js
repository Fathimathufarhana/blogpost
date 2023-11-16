import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" // send web token to user for authorization
import User from "../models/User.js"

export const register = async (req, res) => {
    try {
        const {  firstName,lastName,email,password } = req.body
        const salt =await bcrypt.genSalt() //  encryption
        const passwordHash =await bcrypt.hash(password, salt) //to get password hash / to encrypt password

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
        })
        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message,"register catch");
    }
}


export const login = async (req, res) => {
    try {
        const{ email, password } = req.body
        const user = await User.findOne({email:email })
        // console.log(user);
    
        if(!user){
            res.status(404).json({message:"user not found!"})
            console.log("user not found");
        }
        const isPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(isPassword,"password");
    
        if(!isPassword) return res.status(400).json({message:"invalid password"})

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            delete user.password
            res.status(200).json({ token, user })
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message,"login catch");
    }
}