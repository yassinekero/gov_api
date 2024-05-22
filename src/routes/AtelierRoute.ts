import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Roles} from "../db/Roles";
import {Atelier} from "../db/entities/atelier";
import {User} from "../db/entities/user";

const voieEnginsRouter = express.Router();


voieEnginsRouter.get('/ateliers/users',
    async (req: Request, res: Response) => {

        try {
            if (res.locals.user.role_key != Roles.DUO) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const atelierRepository = AppDataSource.getRepository(Atelier);
    
            const atelier =
                await atelierRepository.findOne({
                    where: {duo_id: res.locals.user.id},
                    relations: {
                        equipes: {users: {equipe: {atelier:true}}}
                    }
                });
    
            const listAllAtelierUsers: User[] = [];
            atelier?.equipes.forEach(equipe =>
                listAllAtelierUsers.push(...equipe.users))
    
    
            res.send(listAllAtelierUsers);
        } catch (error) {
            console.log(error)
        }
    });


    voieEnginsRouter.get('/ateliers',
    async (req: Request, res: Response) => {

        try {
            const atelierRepository = AppDataSource.getRepository(Atelier);
    
            const ateliers =
                await atelierRepository.find();
    
                res.status(200).json({
                    status: "ok",
                    ateliers: ateliers
                });
        } catch (error) {
            console.log(error)
        }
    });

    voieEnginsRouter.post('/add_atelier',
    async (req: Request, res: Response) => {

        try {
            const atlier =  AppDataSource.getRepository(Atelier)
        
            const at = req.body;
    
            console.log(at)
            atlier.save(at)
    
            res.status(200).json({
                status: "ok"
            });
        } catch (error) {
            console.log(error)
        }
    });


module.exports = voieEnginsRouter