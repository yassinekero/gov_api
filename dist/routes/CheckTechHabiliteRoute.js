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
const check_tech_habilite_1 = require("../db/entities/check_tech_habilite");
const voie_check_list_1 = require("../db/entities/voie_check_list");
const verifyToken_1 = __importDefault(require("./verifyToken"));
const checkTechRouter = express_1.default.Router();
checkTechRouter.get('/check_list_habilite', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  let roleKey = res.locals.user.role_key;
      console.log(roleKey)

      if (roleKey != Roles.TECH_HABILITE && roleKey !== Roles.RCI) {
          res.status(403)
              .json({status: "error", message: 'No access'});
          return;
      }
      console.log("anas darai");
      */
    try {
        const voie_id = Number(req.query.voie_id);
        const pourCoupure = Number(req.query.pour_coupure) == 1;
        const checkTechRepository = db_1.AppDataSource.getRepository(check_tech_habilite_1.CheckTechHabilite);
        const techHabilites = yield checkTechRepository.find({
            where: {
                pour_coupure: pourCoupure,
                voieCheckLists: true
                /*,
                voieCheckLists: {
                    voie_id: voie_id
                }*/
            }, relations: { voieCheckLists: true }
        });
        techHabilites.forEach(value => {
            value.voieCheckLists = value.voieCheckLists.filter(voieCheckList => (voieCheckList.voie_id === voie_id &&
                voieCheckList.check_tech_habilite_id === value.id));
            if (value.voieCheckLists.length > 0) {
                value.voieCheckList = value.voieCheckLists[0];
            }
        });
        res.send(techHabilites);
    }
    catch (error) {
        console.log(error);
    }
}));
checkTechRouter.patch('/voie_check_list', verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let roleKey = res.locals.user.role_key;
        console.log(roleKey);
        if (roleKey != Roles_1.Roles.TECH_HABILITE) {
            res.status(403)
                .json({ status: "error", message: 'No access' });
            return;
        }
        const check_tech_habilite_id = Number(req.query.check_tech_habilite_id);
        const voie_id = Number(req.query.voie_id);
        const status = Number(req.query.status) == 1;
        const voieCheckList = new voie_check_list_1.VoieCheckList();
        //limit of changes
        voieCheckList.check_tech_habilite_id = check_tech_habilite_id;
        voieCheckList.voie_id = voie_id;
        voieCheckList.status = status;
        const voieCheckListRepository = db_1.AppDataSource.getRepository(voie_check_list_1.VoieCheckList);
        yield voieCheckListRepository.save(voieCheckList)
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
module.exports = checkTechRouter;
//# sourceMappingURL=CheckTechHabiliteRoute.js.map