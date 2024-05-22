import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Roles} from "../db/Roles";
import {User} from "../db/entities/user";
import {UserEngin} from "../db/entities/user_engin";
import { Engin } from "../db/entities/engin";
// import verifyToken from "./verifyToken";

const enginRouter = express.Router();

enginRouter.post('/user_engins',
    async (req: Request, res: Response) => {

        try {
            let roleKey = res.locals.user.role_key;
            console.log(roleKey)
    
            if (roleKey != Roles.DUO&&roleKey !== Roles.DPX) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }

    
            const data = req.body;
            const voie_engin_id = Number(req.query.voie_engin_id);
            const composition_id = Number(req.query.composition_id);
    
    
            const usersList:User[] = [];
    
    
            Object.assign(usersList, data);
    
    
            const userEngins:UserEngin[]=[];
    
            for (let i = 0; i < usersList.length; i++) {
                let user = usersList[i];
                const userEngin=new UserEngin();
                userEngin.voie_engin_id=voie_engin_id;
                userEngin.user_id=user.id;
                userEngin.composition_id=composition_id;
                userEngin.tache="";
    
                userEngins.push(userEngin);
    
            }
    
    
    
          const voieEnginRepository = AppDataSource.getRepository(UserEngin)
    
            await voieEnginRepository.save(userEngins)
                .then((result) => {
                    res.status(200).json({status: "ok", engin: null});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }

    });

    enginRouter.get('/engins/:id/compositions',  async (req: Request, res: Response) => {
        try {
            const enginId = Number(req.params.id);
    
            if (isNaN(enginId)) {
                res.status(400).json({ status: "error", message: 'Invalid engin ID' });
                return;
            }
    
            const enginRepository = AppDataSource.getRepository(Engin);
    
            // Find the engin by ID
            const engin = await enginRepository.findOne({ where: { id: enginId } });
            if (!engin) {
                res.status(404).json({ status: "error", message: 'Engin not found' });
                return;
            }
    
            // Parse the composition JSON string
            const compositions = JSON.parse(engin.composition);
    
            res.status(200).json({ status: "ok", compositions: compositions });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: 'Internal server error' });
        }
    });
    
enginRouter.post('/user_engins/add',  

    async (req: Request, res: Response) => {

       

        try {
            let roleKey = res.locals.user.role_key;
            console.log(roleKey)
            
            if (!roleKey) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
            const voie_engin_id = Number(req.query.voie_engin_id);
            const composition_id = Number(req.query.composition_id);
            const status = (req.query.status as string)==="true";
    
    
            const userEnginRepository = AppDataSource.getRepository(UserEngin)
           const userEnginID= (await userEnginRepository.findOneBy({
                voie_engin_id: voie_engin_id,
                user_id: res.locals.user.id,
               composition_id:composition_id
            }))?.id
    
    
            const userEngin=new UserEngin();
            if(userEnginID)
                userEngin.id=userEnginID;
    
                userEngin.voie_engin_id=voie_engin_id;
                userEngin.user_id=res.locals.user.id;
                userEngin.composition_id=composition_id;
                userEngin.status=status;
              // @ts-ignore
            delete  userEngin.tache;
    
            const voieEnginRepository = AppDataSource.getRepository(UserEngin)
    
            // await voieEnginRepository.createQueryBuilder()
            //     .update()
            //     .set({"status":true})
            //     .where({"status":false,
            //         "user_id":userEngin.user_id})
            //     .execute()
    
            // ;
    
    
    
    
            await voieEnginRepository.save(userEngin)
                .then((result) => {
                    res.status(200).json({status: "ok", engin: null});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }

    });


enginRouter.patch('/user_engins', 
    async (req: Request, res: Response) => {

        try {
            let roleKey = res.locals.user.role_key;
    
            if (roleKey != Roles.DUO &&roleKey != Roles.DPX) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const data = req.body;
    
            const userEngin=new UserEngin();
    
            userEngin.id=data.id;
            userEngin.tache=data.tache;
    
           // Object.assign(userEngin, data);
    
    
            const userEnginRepository = AppDataSource.getRepository(UserEngin)
    
            await userEnginRepository.save(userEngin)
                .then((result) => {
                    res.status(200).json({status: "ok", engin: null});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }

    });


    

enginRouter.delete('/user_engins', 
    async (req: Request, res: Response) => {



        try {
            let roleKey = res.locals.user.role_key;
    
            if (roleKey != Roles.DUO &&roleKey != Roles.DPX) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
            const user_engin_id=Number(req.query.id)
    
            // Object.assign(userEngin, data);
    
    
            const userEnginRepository = AppDataSource.getRepository(UserEngin)
    
            await userEnginRepository.delete({id:user_engin_id})
                .then((result) => {
                    res.status(200).json({status: "ok"});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }

    });


    


module.exports = enginRouter