import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Voie} from "../db/entities/voie";
import {Roles} from "../db/Roles";
import {Composant} from "../db/entities/Composant";
import {VoieCheckList} from "../db/entities/voie_check_list";
import verifyToken from "./verifyToken";


const voieRouter = express.Router();


voieRouter.get('/voies',verifyToken, async (req: Request, res: Response) => {
    try {
        const voieRepository = AppDataSource.getRepository(Voie)
        const allVoie = await voieRepository
            .find({
                relations: {
                    //  engins: true,
                    VoieEngins: {
                        currentUsersEngin: {user: {equipe: {atelier:true}}},
                        engin: {serie: true}
                    }
                }
            });
        for (const voie of allVoie) {
    
            await Promise.all(voie.VoieEngins.map(async (voieEngin) => {
                await voieEngin.loadEnginAtelier();
    
    
            }));
    
            await Promise.all(voie.VoieEngins.map(async (voieEngin) => {
                await voieEngin.engin.updateCompositon();
            }));
    
    
            voie.VoieEngins.forEach(voieEngin => {
    
                // @ts-ignore
                (voieEngin.engin.composition as Composant[])
                    .forEach(composant => {
    
    
                        Composant.updateUsersStats(composant, voieEngin.currentUsersEngin);
    
                        /*
                                           composant.users =
                                                voieEngin.currentUsersEngin
                                                    .filter((userEngin) =>
                                                        userEngin.composition_id == composant.id);
                        */
    
                    })
    
    
            });
    
    
            await Promise.all(voie.VoieEngins.map(async (voieEngin) => {
                 // @ts-ignore
                voieEngin.currentUsersEngin=null;
            }));
    
        }
    
    
        res.json(allVoie);
    } catch (error) {
        console.log(error)
    }
});


voieRouter.get('/get_type_voie',verifyToken, async (req: Request, res: Response) => {
    try {
        const voie =  AppDataSource.getRepository(Voie)
    
        var voies: Voie[] = []
        var types: String[] = []
        voies = await voie.find()
        for(var i=0; i<voies.length; i++){
            if(!types.includes(voies[i].type)){
                types.push(voies[i].type)
            }
        }
    
        res.status(200).json({
            status: "ok",
            types: types
        });
    } catch (error) {
        console.log(error)
    }

});

voieRouter.post('/add_voie', verifyToken,
    async (req: Request, res: Response) => {

        try {
            const voie =  AppDataSource.getRepository(Voie)
        
            const vo = req.body;
    
            console.log(vo)
            voie.save(vo)
    
            res.status(200).json({
                status: "ok"
            });
        } catch (error) {
            console.log(error)
        }
    });

voieRouter.patch('/voies',  verifyToken,
    async (req: Request, res: Response) => {

        try {
            console.log('----------------------------------');
            console.log('anas', res.locals.user);
            console.log('----------------------------------');
    
    
            if (res.locals.user.role_key != Roles.RCI&&res.locals.user.role_key != Roles.TECH_HABILITE) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const data = req.body;
    
            const voie = new Voie();
    
    
            //limit of changes
            voie.id = data.id;
            voie.hors_service = data.hors_service;
         //   voie.sous_tension = data.sous_tension;
            voie.comment = data.comment;
    
            if(res.locals.user.role_key == Roles.TECH_HABILITE){
                voie.valide_coupure = data.valide_coupure;
            }
    
    
    
            const voieRepository = AppDataSource.getRepository(Voie);
    
            await voieRepository.save(voie)
                .then((result) => {
                    res.status(200).json({status: "ok", voie: result});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }
    });


voieRouter.patch('/upadate_voie_tension', verifyToken,
    async (req: Request, res: Response) => {

        try {
            if (res.locals.user.role_key != Roles.RCI) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
            const data = req.body;
            const voie = new Voie();
            voie.id = data.id;
            voie.sous_tension = data.sous_tension;
            // @ts-ignore
            voie.valide_coupure=null;
            const voieCheckListRepository = AppDataSource.getRepository(VoieCheckList);
    
            await voieCheckListRepository.createQueryBuilder().update()
                .set({status: false})
                .where("voie_id = :voie_id", {voie_id: voie.id})
                .execute();
    
    
    
            const voieRepository = AppDataSource.getRepository(Voie);
    
    
    
    
    
    
            await voieRepository.save(voie)
                .then((result) => {
                    res.status(200).json({status: "ok", voie: result});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }
    });


module.exports = voieRouter