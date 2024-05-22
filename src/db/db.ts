import {DataSource} from "typeorm";
import {Voie} from "./entities/voie";
import {Engin} from "./entities/engin";
import {VoieEngin} from "./entities/voie_engin";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {EnginSerie} from "./entities/engin_serie";
import {User} from "./entities/user";
import {Equipe} from "./entities/equipe";
import {Atelier} from "./entities/atelier";
import {Role} from "./entities/role";
import {UserEngin} from "./entities/user_engin";
import {EnginAtelier} from "./entities/engin_atelier";
import {CheckTechHabilite} from "./entities/check_tech_habilite";
import {VoieCheckList} from "./entities/voie_check_list";




const envVar=process.env;

console.log(envVar.DB_USER+" dfdfd")
export const AppDataSource = new DataSource({
    type: "mysql",
    host: envVar.DB_HOST,
    port: Number(envVar.DB_PORT)  ,
    username: envVar.DB_USER,
    password: envVar.DB_PASS,
    database:envVar.DB_NAME,
    entities: [Voie, Engin, VoieEngin,EnginSerie,User,Equipe,Atelier,Role,UserEngin,EnginAtelier,CheckTechHabilite,VoieCheckList],
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
})

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


AppDataSource.initialize()
    .then(async () => {
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

        console.log("db Connected")


    })
    .catch((error) => console.log(error))
