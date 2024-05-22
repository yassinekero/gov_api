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
const Roles_1 = require("../db/Roles");
const atelier_1 = require("../db/entities/atelier");
const user_1 = require("../db/entities/user");
const equipe_1 = require("../db/entities/equipe");
const equipeRouter = express_1.default.Router();
equipeRouter.get('/equipes/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.user.role_key != Roles_1.Roles.DPX) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        console.log(res.locals.user.role_key);
        const equipeRepository = db_1.AppDataSource.getRepository(equipe_1.Equipe);
        const equipe = yield equipeRepository.findOne({
            where: { dpx_id: res.locals.user.id },
            relations: {
                users: { equipe: { atelier: true } }
            }
        });
        res.send(equipe.users);
    }
    catch (error) {
        console.log(error);
    }
}));
equipeRouter.get('/get_equipe', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipe = db_1.AppDataSource.getRepository(equipe_1.Equipe);
        const atelier = db_1.AppDataSource.getRepository(atelier_1.Atelier);
        var equipes = [];
        var ateliers = [];
        equipes = yield equipe.find();
        ateliers = yield atelier.find();
        for (var i = 0; i < equipes.length; i++) {
            equipes[i].atelier = ateliers.find(function (element) {
                return element.id == equipes[i].atelier_id;
            });
        }
        res.status(200).json({
            status: "ok",
            roless: equipes
        });
    }
    catch (error) {
        console.log(error);
    }
}));
equipeRouter.get('/get_duo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = db_1.AppDataSource.getRepository(user_1.User);
        var chefs = [];
        chefs = yield user.find({
            where: { role_key: 'duo' }
        });
        res.status(200).json({
            status: "ok",
            chefs: chefs
        });
    }
    catch (error) {
        console.log(error);
    }
}));
equipeRouter.get('/get_dpx', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = db_1.AppDataSource.getRepository(user_1.User);
        var chefs = [];
        chefs = yield user.find({
            where: { role_key: 'dpx' }
        });
        res.status(200).json({
            status: "ok",
            chefs: chefs
        });
        equipeRouter.post('/add_equipe', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const equipe = db_1.AppDataSource.getRepository(equipe_1.Equipe);
            const eq = req.body;
            console.log(eq);
            equipe.save(eq);
            res.status(200).json({
                status: "ok"
            });
        }));
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = equipeRouter;
//# sourceMappingURL=EquipeRoute.js.map