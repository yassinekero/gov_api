import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Roles} from "../db/Roles";
import {Atelier} from "../db/entities/atelier";
import {User} from "../db/entities/user";
import {Equipe} from "../db/entities/equipe";

const equipeRouter = express.Router();


equipeRouter.get('/equipes/users',
    async (req: Request, res: Response) => {

        try {
            if (res.locals.user.role_key != Roles.DPX) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    console.log(res.locals.user.role_key )
    
            const equipeRepository = AppDataSource.getRepository(Equipe);
    
            const equipe =
                await equipeRepository.findOne({
                    where: {dpx_id: res.locals.user.id},
                    relations: {
                      users: {equipe: {atelier:true}}
                    }
                });
    
            res.send(equipe!.users);
        } catch (error) {
            console.log(error)
        }
    });


equipeRouter.get('/get_equipe', async (req: Request, res: Response) => {
    
    try {
        const equipe =  AppDataSource.getRepository(Equipe)
        const atelier =  AppDataSource.getRepository(Atelier)
        var equipes: Equipe[] = []
        var ateliers: Atelier[] = []
        equipes = await equipe.find();
        ateliers = await atelier.find();
        for(var i =0; i<equipes.length;i++){
            equipes[i].atelier =  ateliers.find(function (element) {
                return element.id == equipes[i].atelier_id
            })!
        }
        res.status(200).json({
            status: "ok",
            roless: equipes
        });
    } catch (error) {
        console.log(error)
    }
        
});



equipeRouter.get('/get_duo', async (req: Request, res: Response) => {
    
    try {
        const user =  AppDataSource.getRepository(User)
        var chefs: User[] = []
        chefs = await user.find({
            where: {role_key: 'duo'}
        });
    
        res.status(200).json({
            status: "ok",
            chefs: chefs
        });
    } catch (error) {
        console.log(error)
    }
        
});

equipeRouter.get('/get_dpx', async (req: Request, res: Response) => {
    
    try {
        const user =  AppDataSource.getRepository(User)
        var chefs: User[] = []
        chefs = await user.find({
            where: {role_key: 'dpx'}
        });
    
        res.status(200).json({
            status: "ok",
            chefs: chefs
        });
    
    equipeRouter.post('/add_equipe',
        async (req: Request, res: Response) => {
    
            const equipe =  AppDataSource.getRepository(Equipe)
        
            const eq = req.body;
    
            console.log(eq)
            equipe.save(eq)
    
            res.status(200).json({
                status: "ok"
            });
        });
    } catch (error) {
        console.log(error)
    }
        
});

module.exports = equipeRouter