"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ status: "error", message: "Authorization header is missing" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: "error", message: "Token is missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, AUTH_SECRET_KEY);
        res.locals.userId = decoded.user_id;
        next();
    }
    catch (error) {
        return res.status(401).json({ status: "error", message: "Invalid or expired token" });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map