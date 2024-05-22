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
const voie_engin_1 = require("../db/entities/voie_engin");
const Composant_1 = require("../db/entities/Composant");
const engin_1 = require("../db/entities/engin");
const verifyToken_1 = __importDefault(require("./verifyToken"));
const voieEnginsRouter = express_1.default.Router();
voieEnginsRouter.post('/voie_engins', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('----------------------------------');
        console.log('user', res.locals.user);
        console.log('----------------------------------');
        if (res.locals.user.role_key != Roles_1.Roles.RCI) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const data = req.body;
        const voieEngin = new voie_engin_1.VoieEngin();
        Object.assign(voieEngin, data);
        const voieEnginRepository = db_1.AppDataSource.getRepository(voie_engin_1.VoieEngin);
        const updateMode = voieEngin.id != null;
        yield voieEnginRepository.save(voieEngin)
            .then((result) => {
            res.status(200).json({ status: "ok", voieEngin: updateMode ? null : result });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
voieEnginsRouter.get('/voie_engins/:id/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
            if (res.locals.user.role_key != Roles.RCI) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }*/
    try {
        const voieEnginId = Number(req.params.id);
        const voieEnginRepository = db_1.AppDataSource.getRepository(voie_engin_1.VoieEngin);
        const voieEngin = yield voieEnginRepository
            .findOne({
            where: { id: voieEnginId }, relations: {
                currentUsersEngin: { user: { equipe: { atelier: true } } },
                engin: true
            }
        });
        if (voieEngin != null) {
            voieEngin.engin.updateCompositon();
            // @ts-ignore
            voieEngin.engin.composition
                .forEach(composant => {
                Composant_1.Composant.updateUsersStats(composant, voieEngin.currentUsersEngin);
                Composant_1.Composant.updateUserEnginsList(composant, voieEngin.currentUsersEngin);
                return;
            });
        }
        res.status(200).json(voieEngin === null || voieEngin === void 0 ? void 0 : voieEngin.engin.composition);
    }
    catch (error) {
        console.log(error);
    }
}));
voieEnginsRouter.get('/voie_engins/:id/engin_ateliers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
            if (res.locals.user.role_key != Roles.RCI) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }*/
    try {
        const voieEnginId = Number(req.params.id);
        const voieEnginRepository = db_1.AppDataSource.getRepository(voie_engin_1.VoieEngin);
        const voieEngin = yield voieEnginRepository
            .findOne({
            where: { id: voieEnginId }, relations: {
                currentUsersEngin: {
                    user: { equipe: { atelier: true } }
                }
            }
        });
        if (voieEngin != null) {
            yield voieEngin.loadEnginAtelier();
            res.status(200).json(voieEngin.enginAteliers);
        }
        else
            res.status(400).json({ "status": "error" });
    }
    catch (error) {
        console.log(error);
    }
}));
voieEnginsRouter.patch('/voie_engins/confirm/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("0000");
        /*
                if (res.locals.user.role_key != Roles.RCI) {
                    res.status(403)
                        .json({status: "error", message: 'No access'});
                    return;
                }*/
        const voieEnginId = Number(req.params.id);
        const voieEnginRepository = db_1.AppDataSource.getRepository(voie_engin_1.VoieEngin);
        const voieEngin = yield voieEnginRepository
            .findOne({
            where: { id: voieEnginId }
        });
        var voieEnginNew = new voie_engin_1.VoieEngin();
        if (voieEngin != null) {
            voieEnginNew = voieEngin;
            voieEnginNew.confirme = true;
            yield voieEnginRepository.save(voieEnginNew);
            res.status(200).json(voieEngin.enginAteliers);
        }
        else
            res.status(400).json({ "status": "error" });
    }
    catch (error) {
        console.log(error);
    }
}));
voieEnginsRouter.delete('/voie_engins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.user.role_key != Roles_1.Roles.RCI) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const voieEnginId = Number(req.query.id);
        const voieEnginRepository = db_1.AppDataSource.getRepository(voie_engin_1.VoieEngin);
        const enginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        var reset = false;
        const voieEngin = yield voieEnginRepository
            .findOne({
            where: { id: voieEnginId }
        });
        const newEngin = yield enginRepository
            .findOne({
            where: { id: voieEngin === null || voieEngin === void 0 ? void 0 : voieEngin.engin_id }
        });
        let result = yield voieEnginRepository.createQueryBuilder()
            .softDelete()
            .where("id = :id", { id: voieEnginId })
            .execute();
        if (newEngin != null) {
            if (newEngin.serie_id == 5) {
                newEngin.composition = "[]";
                newEngin.longueur = 0;
                yield enginRepository.save(newEngin);
                reset = true;
            }
            else {
                reset = true;
            }
        }
        if (result.affected && result.affected > 0 && reset) {
            res.status(200).json({ "status": "ok" });
        }
        else
            res.status(400).json({ "status": "error" });
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = voieEnginsRouter;
//# sourceMappingURL=VoieEnginRoute.js.map