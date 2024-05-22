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
const user_engin_1 = require("../db/entities/user_engin");
const engin_1 = require("../db/entities/engin");
// import verifyToken from "./verifyToken";
const enginRouter = express_1.default.Router();
enginRouter.post('/user_engins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let roleKey = res.locals.user.role_key;
        console.log(roleKey);
        if (roleKey != Roles_1.Roles.DUO && roleKey !== Roles_1.Roles.DPX) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const data = req.body;
        const voie_engin_id = Number(req.query.voie_engin_id);
        const composition_id = Number(req.query.composition_id);
        const usersList = [];
        Object.assign(usersList, data);
        const userEngins = [];
        for (let i = 0; i < usersList.length; i++) {
            let user = usersList[i];
            const userEngin = new user_engin_1.UserEngin();
            userEngin.voie_engin_id = voie_engin_id;
            userEngin.user_id = user.id;
            userEngin.composition_id = composition_id;
            userEngin.tache = "";
            userEngins.push(userEngin);
        }
        const voieEnginRepository = db_1.AppDataSource.getRepository(user_engin_1.UserEngin);
        yield voieEnginRepository.save(userEngins)
            .then((result) => {
            res.status(200).json({ status: "ok", engin: null });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.get('/engins/:id/compositions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enginId = Number(req.params.id);
        if (isNaN(enginId)) {
            res.status(400).json({ status: "error", message: 'Invalid engin ID' });
            return;
        }
        const enginRepository = db_1.AppDataSource.getRepository(engin_1.Engin);
        // Find the engin by ID
        const engin = yield enginRepository.findOne({ where: { id: enginId } });
        if (!engin) {
            res.status(404).json({ status: "error", message: 'Engin not found' });
            return;
        }
        // Parse the composition JSON string
        const compositions = JSON.parse(engin.composition);
        res.status(200).json({ status: "ok", compositions: compositions });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: 'Internal server error' });
    }
}));
enginRouter.post('/user_engins/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let roleKey = res.locals.user.role_key;
        console.log(roleKey);
        if (!roleKey) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const voie_engin_id = Number(req.query.voie_engin_id);
        const composition_id = Number(req.query.composition_id);
        const status = req.query.status === "true";
        const userEnginRepository = db_1.AppDataSource.getRepository(user_engin_1.UserEngin);
        const userEnginID = (_a = (yield userEnginRepository.findOneBy({
            voie_engin_id: voie_engin_id,
            user_id: res.locals.user.id,
            composition_id: composition_id
        }))) === null || _a === void 0 ? void 0 : _a.id;
        const userEngin = new user_engin_1.UserEngin();
        if (userEnginID)
            userEngin.id = userEnginID;
        userEngin.voie_engin_id = voie_engin_id;
        userEngin.user_id = res.locals.user.id;
        userEngin.composition_id = composition_id;
        userEngin.status = status;
        // @ts-ignore
        delete userEngin.tache;
        const voieEnginRepository = db_1.AppDataSource.getRepository(user_engin_1.UserEngin);
        // await voieEnginRepository.createQueryBuilder()
        //     .update()
        //     .set({"status":true})
        //     .where({"status":false,
        //         "user_id":userEngin.user_id})
        //     .execute()
        // ;
        yield voieEnginRepository.save(userEngin)
            .then((result) => {
            res.status(200).json({ status: "ok", engin: null });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.patch('/user_engins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let roleKey = res.locals.user.role_key;
        if (roleKey != Roles_1.Roles.DUO && roleKey != Roles_1.Roles.DPX) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const data = req.body;
        const userEngin = new user_engin_1.UserEngin();
        userEngin.id = data.id;
        userEngin.tache = data.tache;
        // Object.assign(userEngin, data);
        const userEnginRepository = db_1.AppDataSource.getRepository(user_engin_1.UserEngin);
        yield userEnginRepository.save(userEngin)
            .then((result) => {
            res.status(200).json({ status: "ok", engin: null });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
enginRouter.delete('/user_engins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let roleKey = res.locals.user.role_key;
        if (roleKey != Roles_1.Roles.DUO && roleKey != Roles_1.Roles.DPX) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const user_engin_id = Number(req.query.id);
        // Object.assign(userEngin, data);
        const userEnginRepository = db_1.AppDataSource.getRepository(user_engin_1.UserEngin);
        yield userEnginRepository.delete({ id: user_engin_id })
            .then((result) => {
            res.status(200).json({ status: "ok" });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = enginRouter;
//# sourceMappingURL=UserEnginRoute.js.map