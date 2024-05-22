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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const voie_1 = require("./entities/voie");
const engin_1 = require("./entities/engin");
const voie_engin_1 = require("./entities/voie_engin");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const engin_serie_1 = require("./entities/engin_serie");
const user_1 = require("./entities/user");
const equipe_1 = require("./entities/equipe");
const atelier_1 = require("./entities/atelier");
const role_1 = require("./entities/role");
const user_engin_1 = require("./entities/user_engin");
const engin_atelier_1 = require("./entities/engin_atelier");
const check_tech_habilite_1 = require("./entities/check_tech_habilite");
const voie_check_list_1 = require("./entities/voie_check_list");
const envVar = process.env;
console.log(envVar.DB_USER + " dfdfd");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: envVar.DB_HOST,
    port: Number(envVar.DB_PORT),
    username: envVar.DB_USER,
    password: envVar.DB_PASS,
    database: envVar.DB_NAME,
    entities: [voie_1.Voie, engin_1.Engin, voie_engin_1.VoieEngin, engin_serie_1.EnginSerie, user_1.User, equipe_1.Equipe, atelier_1.Atelier, role_1.Role, user_engin_1.UserEngin, engin_atelier_1.EnginAtelier, check_tech_habilite_1.CheckTechHabilite, voie_check_list_1.VoieCheckList],
    synchronize: false,
    logging: false,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
});
/*
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "bk5sociijji4kavsdhin-mysql.services.clever-cloud.com",
    port: 3306,
    username: "uqun8uznagdpddls",
    password: "jUOny90pSvWfqQiiCSJY",
    database: "bk5sociijji4kavsdhin",
    entities: [Voie, Engin, VoieEngin,EnginSerie],
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
})*/
exports.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    /*
            const photoRepository = AppDataSource.getRepository(Voie)
            const firstPhoto = await photoRepository.findOne({
                relations: {
                    engins: true,
                    VoieEngins: true
                }, where: {
                    id: 15,
                }
            },)
    
            console.log(firstPhoto?.VoieEngins.length)*/
    console.log("db Connected");
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=db.js.map