import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        // now
        // 1. validate if the feilds are empty or not if empty w'll send res 
        // 2. W'll check if user already exists of not 
        // 3. if not w'll create new user and save it in database
        // 4. w'll send response with created user

        if (!username || !email || !password) {
            res.status(401).json({
                message: "Please fill all the feilds",
                success: false
            })
        }

        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(401).json({
                message: "User already exists",
            })
        }

        const newUser = await User.create({
            username,
            email, 
            password
        })

        res.status(200).json({
            message: "User register successfully",
            user: newUser
        })

    } catch (error) {
        res.status(500).json({
            message: "Registration failed"
        })
    }
}


const login = async (req, res) => {
    try {
        // now here we need the email and password to login the user 
        // first w'll get the data from req.body
        // then find the user with email in the database
        // then w'll match the user provided password and database password
        // if matched then w'll send response 
        // After this w'll send the jwt token to authorize the user 

        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user) {
            res.status(401).json({
                message: "Invalid credentials!",
                success: false
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({
                message: "Invalid credentials",
                success: false
            })
        }

        // w'll set the jwt token 
        const age = 1000 * 60 * 60 * 24 * 7


        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.SECRET_KEY,
            {expiresIn: age}
        )

        // well send the jwt token in the cookiee to do this we need to install cokiee parser

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age
        }).status(200).json({
            message: "Login Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to login"
        })
    }
}


export {
    register,
    login
}