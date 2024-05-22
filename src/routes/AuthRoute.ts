import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {User} from "../db/entities/user";
import {Role} from "../db/entities/role";

import jwt from "jsonwebtoken";
import verifyToken from "./verifyToken";


const authRouter = express.Router();


const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY as string;

authRouter.get('/get_token', async (req: Request, res: Response) => {
    //const email = req.query.email as string;
    try {
        const matricule = req.query.matricule as string;
        const password = req.query.password as string;
    
    
        const userRepository = AppDataSource.getRepository(User)
    
        let userFound = await userRepository.findOneBy({
            //email: email,
            matricule: matricule, password: password});
    
        if (userFound) {
            const token = jwt.sign({user_id: userFound.id},
                AUTH_SECRET_KEY, { expiresIn: "1h" }
            );
            res.status(200).json({
                status: "ok",
                token: token,
                user: userFound
            });
        } else
            res.status(400)
                .json({status: "error", "message": "Matricule ou mot de passe erroné!"});
    } catch (error) {
        console.log(error)
    }


});

authRouter.get('/get_token_matricule', async (req: Request, res: Response) => {
    //const email = req.query.email as string;
    try {
        const matricule = req.query.matricule as string;
    
    
        const userRepository = AppDataSource.getRepository(User)
    
        let userFound = await userRepository.findOneBy({
            //email: email,
            matricule: matricule});
    
        if (userFound) {
            const token = jwt.sign({user_id: userFound.id},
                AUTH_SECRET_KEY
            );
            res.status(200).json({
                status: "ok",
                token: token,
                user: userFound
            });
        } else
            res.status(400)
                .json({status: "error", "message": "Matricule erroné!"});
    } catch (error) {
        console.log(error)
    }


});

authRouter.get('/get_role', async (req: Request, res: Response) => {
    
    try {
        const role =  AppDataSource.getRepository(Role)
        var roles: Role[] = []
        roles = await role.find();
        res.status(200).json({
            status: "ok",
            roless: roles
        });
    } catch (error) {
        console.log(error)
    }
    
});

authRouter.post('/add_user',verifyToken,  async (req: Request, res: Response) => {
    
    try {
        const user =  AppDataSource.getRepository(User)
        
        const u = req.body;
    
        console.log(u)
        user.save(u)
    
        res.status(200).json({
            status: "ok"
        });
    } catch (error) {
        console.log(error)
    }
    
});

authRouter.get('/user_info', async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;
    
    
        const userRepository = AppDataSource.getRepository(User)
    
        try {
            const decoded = jwt.verify(token, AUTH_SECRET_KEY);
            // @ts-ignore
            let userId = decoded.user_id as number;
    
            const userFound = await userRepository.findOne({
                where: {id: userId}, relations: {role: true}
            });
            res.json(
                userFound
    
            );
        } catch (err) {
            res.status(400)
                .json(null);
        }
    } catch (error) {
        console.log(error)
    }

});


module.exports = authRouter