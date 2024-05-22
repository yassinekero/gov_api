"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const user_1 = require("../db/entities/user");
const role_1 = require("../db/entities/role");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = __importDefault(require("./verifyToken"));
const authRouter = express_1.default.Router();
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;
authRouter.get('/get_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const email = req.query.email as string;
    try {
        const matricule = req.query.matricule;
        const password = req.query.password;
        const userRepository = db_1.AppDataSource.getRepository(user_1.User);
        let userFound = yield userRepository.findOneBy({
            //email: email,
            matricule: matricule, password: password
        });
        if (userFound) {
            const token = jsonwebtoken_1.default.sign({ user_id: userFound.id }, AUTH_SECRET_KEY, { expiresIn: "1h" });
            res.status(200).json({
                status: "ok",
                token: token,
                user: userFound
            });
        }
        else
            res.status(400)
                .json({ status: "error", "message": "Matricule ou mot de passe erroné!" });
    }
    catch (error) {
        console.log(error);
    }
}));
authRouter.get('/get_token_matricule', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const email = req.query.email as string;
    try {
        const matricule = req.query.matricule;
        const userRepository = db_1.AppDataSource.getRepository(user_1.User);
        let userFound = yield userRepository.findOneBy({
            //email: email,
            matricule: matricule
        });
        if (userFound) {
            const token = jsonwebtoken_1.default.sign({ user_id: userFound.id }, AUTH_SECRET_KEY);
            res.status(200).json({
                status: "ok",
                token: token,
                user: userFound
            });
        }
        else
            res.status(400)
                .json({ status: "error", "message": "Matricule erroné!" });
    }
    catch (error) {
        console.log(error);
    }
}));
authRouter.get('/get_role', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = db_1.AppDataSource.getRepository(role_1.Role);
        var roles = [];
        roles = yield role.find();
        res.status(200).json({
            status: "ok",
            roless: roles
        });
    }
    catch (error) {
        console.log(error);
    }
}));
authRouter.post('/add_user', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = db_1.AppDataSource.getRepository(user_1.User);
        const u = req.body;
        console.log(u);
        user.save(u);
        res.status(200).json({
            status: "ok"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
authRouter.get('/user_info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        const userRepository = db_1.AppDataSource.getRepository(user_1.User);
        try {
            const decoded = jsonwebtoken_1.default.verify(token, AUTH_SECRET_KEY);
            // @ts-ignore
            let userId = decoded.user_id;
            const userFound = yield userRepository.findOne({
                where: { id: userId }, relations: { role: true }
            });
            res.json(userFound);
        }
        catch (err) {
            res.status(400)
                .json(null);
        }
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = authRouter;
//# sourceMappingURL=AuthRoute.js.map