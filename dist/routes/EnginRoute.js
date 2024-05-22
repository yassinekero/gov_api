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
const engin_1 = require("../db/entities/engin");
const typeorm_1 = require("typeorm");
const engin_serie_1 = require("../db/entities/engin_serie");
const Roles_1 = require("../db/Roles");
const verifyToken_1 = __importDefault(require("./verifyToken"));
const enginRouter = express_1.default.Router();
enginRouter.get('/engins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        const allEngin = yield enginRepository
            .find({
            relations: {
                serie: true,
                currentVoieEngin: true
            }
        });
        for (let i = 0; i < allEngin.length; i++) {
            const engin = allEngin[i];
            engin.updateCompositon();
        }
        res.json(allEngin);
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.post('/engins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.user.role_key != Roles_1.Roles.RCI) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const data = req.body;
        const engin = new engin_1.Engin();
        Object.assign(engin, data);
        //Assign engins Composants ids
        const compositionEngin = data.composition;
        for (let i = 0; i < compositionEngin.length; i++) {
            // @ts-ignore
            compositionEngin[i].id = i;
        }
        engin.composition = JSON.stringify(compositionEngin);
        //createNotUpdate
        delete engin.id;
        delete engin.serie_id;
        const voieEnginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        yield voieEnginRepository.save(engin)
            .then((result) => {
            result.updateCompositon();
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
enginRouter.delete('/engins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('----------------------------------');
        console.log('anas', res.locals.user);
        console.log('----------------------------------');
        if (res.locals.user.role_key != Roles_1.Roles.RCI) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const enginId = Number(req.query.id);
        const enginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        yield enginRepository.createQueryBuilder().softDelete()
            .where("id = :id", { id: enginId })
            .execute()
            .then((result) => {
            res.status(200).json({ status: "ok", engin: { id: enginId } });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.get('/engins/active', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        const allEngin = yield enginRepository
            .find({
            relations: {
                serie: true,
                currentVoieEngin: true
            }
        });
        const activeEngins = allEngin.filter((engin) => (engin.currentVoieEngin && engin.currentVoieEngin.length > 0));
        activeEngins.forEach(engin => {
            engin.updateCompositon();
        });
        res.json(activeEngins);
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.patch('/engins/compo/:id/:l', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("0000");
        /*
                if (res.locals.user.role_key != Roles.RCI) {
                    res.status(403)
                        .json({status: "error", message: 'No access'});
                    return;
                }*/
        const enginId = Number(req.params.id);
        const enginL = Number(req.params.l);
        const compo = req.body;
        const enginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        const engin = yield enginRepository
            .findOne({
            where: { id: enginId }
        });
        console.log(req.body);
        console.log(JSON.stringify(compo));
        console.log(String(JSON.parse(JSON.stringify(compo))));
        var enginNew = new engin_1.Engin();
        if (engin != null) {
            enginNew = engin;
            console.log(engin.composition);
            console.log(enginNew.composition);
            enginNew.longueur = enginL;
            enginNew.composition = JSON.stringify(compo);
            yield enginRepository.save(enginNew);
            res.status(200).json(enginNew);
        }
        else
            res.status(400).json({ "status": "error" });
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.get('/engins/free', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let serieId = Number(req.query.serie_id);
        console.log(serieId);
        const enginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        const allEngin = yield enginRepository
            .find(Object.assign({
            relations: {
                currentVoieEngin: true
            }
        }, (serieId) ? {
            where: {
                serie_id: serieId
            }
        } : {
            where: {
                serie_id: (0, typeorm_1.IsNull)()
            }
        }));
        const freeEngins = allEngin.filter((engin) => (!engin.currentVoieEngin || engin.currentVoieEngin.length == 0));
        freeEngins.forEach(engin => {
            delete engin.currentVoieEngin;
            engin.updateCompositon();
        });
        res.json(freeEngins);
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.get('/engin_series', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enginSerieRepository = db_1.AppDataSource.getRepository(engin_serie_1.EnginSerie);
        const allEnginSeries = yield enginSerieRepository
            .find();
        res.json(allEnginSeries);
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = enginRouter;
//# sourceMappingURL=EnginRoute.js.map