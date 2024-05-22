import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ status: "error", message: "Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: "error", message: "Token is missing" });
    }

    try {
        const decoded = jwt.verify(token, AUTH_SECRET_KEY) as { user_id: number };
        res.locals.userId = decoded.user_id;
        next();
    } catch (error) {
        return res.status(401).json({ status: "error", message: "Invalid or expired token" });
    }
};

export default verifyToken;
