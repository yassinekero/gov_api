import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Roles} from "../db/Roles";
import {VoieEngin} from "../db/entities/voie_engin";
import {Composant} from "../db/entities/Composant";
import {Atelier} from "../db/entities/atelier";
import {EnginAtelier} from "../db/entities/engin_atelier";
import { log } from "console";
import { Engin } from "../db/entities/engin";
import verifyToken from "./verifyToken";

const voieEnginsRouter = express.Router();


voieEnginsRouter.post('/voie_engins', verifyToken,
    async (req: Request, res: Response) => {

        try {
            console.log('----------------------------------');
            console.log('user', res.locals.user);
            console.log('----------------------------------');
    
    
            if (res.locals.user.role_key != Roles.RCI) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const data = req.body;
    
            const voieEngin = new VoieEngin();
    
    
            Object.assign(voieEngin, data);
    
            const voieEnginRepository = AppDataSource.getRepository(VoieEngin)
    
    
            const updateMode = voieEngin.id != null;
    
            await voieEnginRepository.save(voieEngin)
                .then((result) => {
                    res.status(200).json({status: "ok", voieEngin: updateMode ? null : result});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }
    });


voieEnginsRouter.get('/voie_engins/:id/users',
    async (req: Request, res: Response) => {

        /*
                if (res.locals.user.role_key != Roles.RCI) {
                    res.status(403)
                        .json({status: "error", message: 'No access'});
                    return;
                }*/


        try {
            const voieEnginId = Number(req.params.id);
    
            const voieEnginRepository = AppDataSource.getRepository(VoieEngin)
            const voieEngin = await voieEnginRepository
                .findOne({
                    where: {id: voieEnginId}, relations: {
                        currentUsersEngin: {user: {equipe:{atelier:true}}},
                        engin: true
                    }
                });
    
            if (voieEngin != null) {
                voieEngin.engin.updateCompositon();
                // @ts-ignore
                (voieEngin.engin.composition as Composant[])
                    .forEach(composant => {
    
                        Composant.updateUsersStats(composant, voieEngin.currentUsersEngin);
    
                        Composant.updateUserEnginsList(composant, voieEngin.currentUsersEngin);
    
                        return;
                    })
    
            }
    
    
            res.status(200).json(voieEngin?.engin!.composition);
        } catch (error) {
            console.log(error)
        }


    });


voieEnginsRouter.get('/voie_engins/:id/engin_ateliers',
    async (req: Request, res: Response) => {

        /*
                if (res.locals.user.role_key != Roles.RCI) {
                    res.status(403)
                        .json({status: "error", message: 'No access'});
                    return;
                }*/


        try {
            const voieEnginId = Number(req.params.id);
    
            const voieEnginRepository = AppDataSource.getRepository(VoieEngin)
            const voieEngin = await voieEnginRepository
                .findOne({
                    where: {id: voieEnginId}, relations: {
                        currentUsersEngin: {
                            user: {equipe: {atelier: true}}
                        }
                    }
                });
    
            if (voieEngin != null) {
                await voieEngin.loadEnginAtelier()
                res.status(200).json(voieEngin.enginAteliers);
            }else
                res.status(400).json({"status":"error"});
        } catch (error) {
            console.log(error)
        }





    });

voieEnginsRouter.patch('/voie_engins/confirm/:id',
    async (req: Request, res: Response) => {
        try {
            console.log("0000");
    
            /*
                    if (res.locals.user.role_key != Roles.RCI) {
                        res.status(403)
                            .json({status: "error", message: 'No access'});
                        return;
                    }*/
    
    
            const voieEnginId = Number(req.params.id);
            const voieEnginRepository = AppDataSource.getRepository(VoieEngin)
            const voieEngin = await voieEnginRepository
                .findOne({
                    where: {id: voieEnginId}
                });
            var voieEnginNew = new VoieEngin();
            if (voieEngin != null) {
                voieEnginNew = voieEngin;
                voieEnginNew.confirme = true;
                await voieEnginRepository.save(voieEnginNew);
                res.status(200).json(voieEngin.enginAteliers);
            }else
                res.status(400).json({"status":"error"});
        } catch (error) {
            console.log(error)
        }





    });


voieEnginsRouter.delete('/voie_engins', 
    async (req: Request, res: Response) => {


        try {
                    if (res.locals.user.role_key != Roles.RCI) {
                        res.status(403)
                            .json({status: "error", message: 'No access'});
                        return;
                    }
    
    
            const voieEnginId = Number(req.query.id);
            
            const voieEnginRepository = AppDataSource.getRepository(VoieEngin)
    
            const enginRepository = AppDataSource.getRepository(Engin);
    
            var reset = false;
    
            const voieEngin = await voieEnginRepository
                .findOne({
                    where: {id: voieEnginId}
                });
    
            const newEngin = await enginRepository
                .findOne({
                    where: {id: voieEngin?.engin_id}
                });
    
    
            let result = await voieEnginRepository.createQueryBuilder()
                .softDelete()
                .where("id = :id", {id: voieEnginId})
                .execute();
    
                if(newEngin != null){
                    if(newEngin!.serie_id == 5){
                        newEngin!.composition = "[]";
                        newEngin!.longueur = 0;
        
                        await enginRepository.save(newEngin);
                        reset = true
                    }else{
                        reset = true
                    }
                }
    
            if (result.affected&&result.affected>0&&reset) {
                res.status(200).json({"status":"ok"});
            }else
                res.status(400).json({"status":"error"});
        } catch (error) {
            console.log(error)
        }

    });


module.exports = voieEnginsRouter