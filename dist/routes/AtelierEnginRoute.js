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
const engin_atelier_1 = require("../db/entities/engin_atelier");
const atelier_1 = require("../db/entities/atelier");
const atelierEnginRouter = express_1.default.Router();
atelierEnginRouter.get('/engin_ateliers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voie_engin_id = Number(req.query.voie_engin_id);
        // let atelier_id=Number(req.query.atelier_id);
        //   const duo_id=Number(req.query.duo_id);
        /*
            if(!isNaN(duo_id)){
                const atelierRepository = AppDataSource.getRepository(Atelier)
                let atelier = await atelierRepository.findOneBy({duo_id: duo_id});
                atelier_id=Number(atelier?.id);
            }*/
        if (res.locals.user.role_key != Roles_1.Roles.DUO) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const atelierRepository = db_1.AppDataSource.getRepository(atelier_1.Atelier);
        let atelier = yield atelierRepository.findOneBy({ duo_id: res.locals.user.id });
        const atelier_id = Number(atelier === null || atelier === void 0 ? void 0 : atelier.id);
        const enginAtelierRepository = db_1.AppDataSource.getRepository(engin_atelier_1.EnginAtelier);
        let enginAtelier = yield enginAtelierRepository
            .findOneBy({
            voie_engin_id: voie_engin_id,
            atelier_id: atelier_id
        });
        if (!enginAtelier) {
            enginAtelier = new engin_atelier_1.EnginAtelier();
            enginAtelier.voie_engin_id = voie_engin_id;
            enginAtelier.atelier_id = atelier_id;
            enginAtelier.status = false;
            enginAtelier.comment = "";
            yield enginAtelierRepository.save(enginAtelier);
        }
        enginAtelier = yield enginAtelierRepository
            .findOne({ where: {
                voie_engin_id: voie_engin_id,
                atelier_id: atelier_id
            },
            relations: {
                atelier: true
            } });
        res.json(enginAtelier);
    }
    catch (error) {
        console.log(error);
    }
}));
atelierEnginRouter.patch('/engin_ateliers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.user.role_key != Roles_1.Roles.DUO) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const data = req.body;
        const enginAtelier = new engin_atelier_1.EnginAtelier();
        Object.assign(enginAtelier, data);
        const enginAtelierRepository = db_1.AppDataSource.getRepository(engin_atelier_1.EnginAtelier);
        yield enginAtelierRepository.save(enginAtelier)
            .then((result) => {
            res.status(200).json({ status: "ok", engin: result });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = atelierEnginRouter;
//# sourceMappingURL=AtelierEnginRoute.js.map