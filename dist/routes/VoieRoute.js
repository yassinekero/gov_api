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
const voie_1 = require("../db/entities/voie");
const Roles_1 = require("../db/Roles");
const Composant_1 = require("../db/entities/Composant");
const voie_check_list_1 = require("../db/entities/voie_check_list");
const verifyToken_1 = __importDefault(require("./verifyToken"));
const voieRouter = express_1.default.Router();
voieRouter.get('/voies', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voieRepository = db_1.AppDataSource.getRepository(voie_1.Voie);
        const allVoie = yield voieRepository
            .find({
            relations: {
                //  engins: true,
                VoieEngins: {
                    currentUsersEngin: { user: { equipe: { atelier: true } } },
                    engin: { serie: true }
                }
            }
        });
        for (const voie of allVoie) {
            yield Promise.all(voie.VoieEngins.map((voieEngin) => __awaiter(void 0, void 0, void 0, function* () {
                yield voieEngin.loadEnginAtelier();
            })));
            yield Promise.all(voie.VoieEngins.map((voieEngin) => __awaiter(void 0, void 0, void 0, function* () {
                yield voieEngin.engin.updateCompositon();
            })));
            voie.VoieEngins.forEach(voieEngin => {
                // @ts-ignore
                voieEngin.engin.composition
                    .forEach(composant => {
                    Composant_1.Composant.updateUsersStats(composant, voieEngin.currentUsersEngin);
                    /*
                                       composant.users =
                                            voieEngin.currentUsersEngin
                                                .filter((userEngin) =>
                                                    userEngin.composition_id == composant.id);
                    */
                });
            });
            yield Promise.all(voie.VoieEngins.map((voieEngin) => __awaiter(void 0, void 0, void 0, function* () {
                // @ts-ignore
                voieEngin.currentUsersEngin = null;
            })));
        }
        res.json(allVoie);
    }
    catch (error) {
        console.log(error);
    }
}));
voieRouter.get('/get_type_voie', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voie = db_1.AppDataSource.getRepository(voie_1.Voie);
        var voies = [];
        var types = [];
        voies = yield voie.find();
        for (var i = 0; i < voies.length; i++) {
            if (!types.includes(voies[i].type)) {
                types.push(voies[i].type);
            }
        }
        res.status(200).json({
            status: "ok",
            types: types
        });
    }
    catch (error) {
        console.log(error);
    }
}));
voieRouter.post('/add_voie', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voie = db_1.AppDataSource.getRepository(voie_1.Voie);
        const vo = req.body;
        console.log(vo);
        voie.save(vo);
        res.status(200).json({
            status: "ok"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
voieRouter.patch('/voies', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('----------------------------------');
        console.log('anas', res.locals.user);
        console.log('----------------------------------');
        if (res.locals.user.role_key != Roles_1.Roles.RCI && res.locals.user.role_key != Roles_1.Roles.TECH_HABILITE) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const data = req.body;
        const voie = new voie_1.Voie();
        //limit of changes
        voie.id = data.id;
        voie.hors_service = data.hors_service;
        //   voie.sous_tension = data.sous_tension;
        voie.comment = data.comment;
        if (res.locals.user.role_key == Roles_1.Roles.TECH_HABILITE) {
            voie.valide_coupure = data.valide_coupure;
        }
        const voieRepository = db_1.AppDataSource.getRepository(voie_1.Voie);
        yield voieRepository.save(voie)
            .then((result) => {
            res.status(200).json({ status: "ok", voie: result });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
voieRouter.patch('/upadate_voie_tension', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.user.role_key != Roles_1.Roles.RCI) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const data = req.body;
        const voie = new voie_1.Voie();
        voie.id = data.id;
        voie.sous_tension = data.sous_tension;
        // @ts-ignore
        voie.valide_coupure = null;
        const voieCheckListRepository = db_1.AppDataSource.getRepository(voie_check_list_1.VoieCheckList);
        yield voieCheckListRepository.createQueryBuilder().update()
            .set({ status: false })
            .where("voie_id = :voie_id", { voie_id: voie.id })
            .execute();
        const voieRepository = db_1.AppDataSource.getRepository(voie_1.Voie);
        yield voieRepository.save(voie)
            .then((result) => {
            res.status(200).json({ status: "ok", voie: result });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({ status: "error", message: err.sqlMessage });
        });
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = voieRouter;
//# sourceMappingURL=VoieRoute.js.map