import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Engin} from "../db/entities/engin";
import {IsNull} from "typeorm";
import {EnginSerie} from "../db/entities/engin_serie";
import {Roles} from "../db/Roles";
import {EnginAtelier} from "../db/entities/engin_atelier";
import {Atelier} from "../db/entities/atelier";
import { Console } from "console";

const atelierEnginRouter = express.Router();


atelierEnginRouter.get('/engin_ateliers', async (req: Request, res: Response) => {



    try {
        const voie_engin_id=Number(req.query.voie_engin_id);
       // let atelier_id=Number(req.query.atelier_id);
    
    
     //   const duo_id=Number(req.query.duo_id);
    
    /*
        if(!isNaN(duo_id)){
            const atelierRepository = AppDataSource.getRepository(Atelier)
            let atelier = await atelierRepository.findOneBy({duo_id: duo_id});
            atelier_id=Number(atelier?.id);
        }*/
    
        if (res.locals.user.role_key != Roles.DUO) {
            res.status(403)
                .json({status: "error", message: 'No access'});
            return;
        }
    
    
            const atelierRepository = AppDataSource.getRepository(Atelier)
            let atelier = await atelierRepository.findOneBy({duo_id: res.locals.user.id});
        const atelier_id=Number(atelier?.id);
    
    
    
    
    
        const enginAtelierRepository = AppDataSource.getRepository(EnginAtelier)
    
    
        let  enginAtelier = await enginAtelierRepository
            .findOneBy({
                voie_engin_id:voie_engin_id,
                atelier_id:atelier_id
            });
    
    
        if(!enginAtelier){
    
             enginAtelier=new EnginAtelier()
            enginAtelier.voie_engin_id=voie_engin_id;
            enginAtelier.atelier_id=atelier_id;
            enginAtelier.status=false;
            enginAtelier.comment="";
    
            await enginAtelierRepository.save(enginAtelier);
        }
        enginAtelier = await enginAtelierRepository
            .findOne({where:{
                    voie_engin_id:voie_engin_id,
                    atelier_id:atelier_id
                },
                relations:{
                    atelier:true
                }});
    
    
    
    
    
    
            res.json(enginAtelier);
    } catch (error) {
        console.log(error)
    }



});
atelierEnginRouter.patch('/engin_ateliers',
    async (req: Request, res: Response) => {


        try {
            if (res.locals.user.role_key != Roles.DUO) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const data = req.body;
    
    
            const enginAtelier = new EnginAtelier();
    
    
            Object.assign(enginAtelier, data);
    
    
    
    
            const enginAtelierRepository = AppDataSource.getRepository(EnginAtelier)
    
            await enginAtelierRepository.save(enginAtelier)
                .then((result) => {
                    res.status(200).json({status: "ok", engin: result});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }
    });

module.exports = atelierEnginRouter