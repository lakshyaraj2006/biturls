import { Request, Response } from "express";
import { SignInCredentials, SignUpCredentials } from "../types/user-credentials";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, cpassword } = req.body as SignUpCredentials;
    let success = false;

    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (
        [username, email, password, cpassword].some(field => !field)
    ) {
        res.status(400).json({
            success,
            message: "All the fields are required!"
        })
    } else if (!usernameRegex.test(username)) {
        res.status(400).json({
            success,
            message: "Username must contain alphanumeric characters!"
        })
    } else if (!emailRegex.test(email)) {
        res.status(400).json({
            success,
            message: "Please enter a valid email!"
        })
    } else {
        let user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (user) {
            res.status(400).json({
                success,
                message: "Username or email already taken!"
            })
        } else if (password !== cpassword) {
            res.status(400).json({
                success,
                message: "Passwords do not match!"
            })
        } else {
            user = await User.create({
                username,
                email,
                password
            });
            success = true;

            res.status(201).json({
                success,
                message: "User account created!"
            })
        }
    }
}
export const loginUser = async (req: Request, res: Response) => {
    const { identifier, password } = req.body as SignInCredentials;
    let success = false;

    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    let user;

    if (usernameRegex.test(identifier)) {
        user = await User.findOne({ username: identifier });
    } else if (emailRegex.test(identifier)) {
        user = await User.findOne({ email: identifier });
    }

    if (!user) {
        res.status(404).json({
            success,
            message: "User not found!"
        })
    } else {
        const result = await user.isPasswordCorrect(password);

        if (result) {
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            res.cookie('refreshtoken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            })

            success = true;
            res.status(200).json({
                success,
                accessToken,
                message: "Logged in successfully!"
            })
        } else {
            res.status(400).json({
                success,
                message: "Incorrect password!"
            })
        }
    }

}
export const logoutUser = async (req: Request, res: Response) => { 
    const cookies = req.cookies;
    let succcess = false;

    if (cookies['refreshtoken']) {
        res.clearCookie('refreshtoken');
        succcess = true;

        res.status(200).json({
            succcess,
            message: 'Logged out successfully!'
        })
    } else {
        res.status(401).json({
            succcess,
            messahe: 'Unauthorized request!'
        })
    }
}
export const refreshToken = async (req: Request, res: Response) => { 
    const cookies = req.cookies;
    let succcess = false;
    interface RefreshTokenPayload {
        id: string
    }

    if (cookies['refreshtoken']) {
        const refreshToken = cookies['refreshtoken'];
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;

        const user = await User.findById(decoded.id);
        const newAccessToken = user?.generateAccessToken();

        res.status(200).json({
            accessToken: newAccessToken
        })
    } else {
        res.status(401).json({
            succcess,
            messahe: 'Unauthorized request!'
        })
    }
}
