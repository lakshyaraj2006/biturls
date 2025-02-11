import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

interface AccessTokenPayload {
    id: string;
    email: string
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];

    if (authorization) {
        const token = authorization.split('Bearer ')[1];

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload;

            req.user = decoded.id;
            next();
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                res.status(401).json({
                    message: 'Invalid or expired token!'
                })
            }

            res.status(500).json({
                message: 'Some error occurred!'
            })
        }
    } else {
        res.status(401).json({
            message: 'Unauthorized request!'
        })
    }

}
