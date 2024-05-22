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
const voieEnginsRouter = express_1.default.Router();
voieEnginsRouter.get('/ateliers/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.user.role_key != Roles_1.Roles.DUO) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const atelierRepository = db_1.AppDataSource.getRepository(atelier_1.Atelier);
        const atelier = yield atelierRepository.findOne({
            where: { duo_id: res.locals.user.id },
            relations: {
                equipes: { users: { equipe: { atelier: true } } }
            }
        });
        const listAllAtelierUsers = [];
        atelier === null || atelier === void 0 ? void 0 : atelier.equipes.forEach(equipe => listAllAtelierUsers.push(...equipe.users));
        res.send(listAllAtelierUsers);
    }
    catch (error) {
        console.log(error);
    }
}));
voieEnginsRouter.get('/ateliers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const atelierRepository = db_1.AppDataSource.getRepository(atelier_1.Atelier);
        const ateliers = yield atelierRepository.find();
        res.status(200).json({
            status: "ok",
            ateliers: ateliers
        });
    }
    catch (error) {
        console.log(error);
    }
}));
voieEnginsRouter.post('/add_atelier', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const atlier = db_1.AppDataSource.getRepository(atelier_1.Atelier);
        const at = req.body;
        console.log(at);
        atlier.save(at);
        res.status(200).json({
            status: "ok"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = voieEnginsRouter;
//# sourceMappingURL=AtelierRoute.js.map