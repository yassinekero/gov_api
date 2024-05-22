import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Engin} from "../db/entities/engin";
import {IsNull} from "typeorm";
import {EnginSerie} from "../db/entities/engin_serie";
import {Roles} from "../db/Roles";
import verifyToken from "./verifyToken";

const enginRouter = express.Router();


enginRouter.get('/engins', async (req: Request, res: Response) => {

    try {
        const enginRepository = AppDataSource.getRepository(Engin)
        const allEngin = await enginRepository
            .find({
                relations: {
                    serie: true,
                    currentVoieEngin: true
                }
            });
    
        for (let i = 0; i < allEngin.length; i++) {
            const engin = allEngin[i];
            engin.updateCompositon();
        }
    
        res.json(allEngin);
    } catch (error) {
        console.log(error)
    }
});
enginRouter.post('/engins',
    async (req: Request, res: Response) => {

        try {
            if (res.locals.user.role_key != Roles.RCI) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const data = req.body;
    
    
            const engin = new Engin();
    
    
            Object.assign(engin, data);
    
            //Assign engins Composants ids
            const compositionEngin:object[] = data.composition;
            for (let i = 0; i < compositionEngin.length; i++) {
                // @ts-ignore
                compositionEngin[i].id=i;
            }
            engin.composition = JSON.stringify(compositionEngin)
    
    
            //createNotUpdate
            delete engin.id;
            delete engin.serie_id;
    
    
            const voieEnginRepository = AppDataSource.getRepository(Engin)
    
            await voieEnginRepository.save(engin)
                .then((result) => {
                    result.updateCompositon()
                    res.status(200).json({status: "ok", engin: result});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }
    });

enginRouter.delete('/engins',
    async (req: Request, res: Response) => {

        try {
            console.log('----------------------------------');
            console.log('anas', res.locals.user);
            console.log('----------------------------------');
    
    
            if (res.locals.user.role_key != Roles.RCI) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const enginId = Number(req.query.id);
    
    
            const enginRepository = AppDataSource.getRepository(Engin)
    
            await enginRepository.createQueryBuilder().softDelete()
                .where("id = :id", {id: enginId})
                .execute()
                .then((result) => {
                    res.status(200).json({status: "ok", engin: {id: enginId}});
                }).catch((err) => {
                    console.log(err);
                    res.status(400).json({status: "error", message: err.sqlMessage});
                });
        } catch (error) {
            console.log(error)
        }
    });


enginRouter.get('/engins/active', async (req: Request, res: Response) => {

    try {
        const enginRepository = AppDataSource.getRepository(Engin)
        const allEngin = await enginRepository
            .find({
                relations: {
                    serie: true,
                    currentVoieEngin: true
                }
            });
    
        const activeEngins = allEngin.filter(
            (engin) =>
                (engin.currentVoieEngin && engin.currentVoieEngin.length > 0));
    
        activeEngins.forEach(engin => {
            engin.updateCompositon();
        });
    
        res.json(activeEngins);
    } catch (error) {
        console.log(error)
    }
});

enginRouter.patch('/engins/compo/:id/:l',
    async (req: Request, res: Response) => {
        try {
            console.log("0000");
    
            /*
                    if (res.locals.user.role_key != Roles.RCI) {
                        res.status(403)
                            .json({status: "error", message: 'No access'});
                        return;
                    }*/
    
    
            const enginId = Number(req.params.id);
            const enginL = Number(req.params.l);
            const compo = req.body;
            const enginRepository = AppDataSource.getRepository(Engin)
            const engin = await enginRepository
                .findOne({
                    where: {id: enginId}
                });
                console.log(req.body);
                console.log(JSON.stringify(compo));
                console.log(String(JSON.parse(JSON.stringify(compo))));
            var enginNew = new Engin();
            
            if (engin != null) {
                enginNew = engin;
                console.log(engin.composition);
                console.log(enginNew.composition);
                enginNew.longueur = enginL;
                enginNew.composition = JSON.stringify(compo);
                await enginRepository.save(enginNew);
                res.status(200).json(enginNew);
            }else
                res.status(400).json({"status":"error"});
        } catch (error) {
            console.log(error)
        }





    });


enginRouter.get('/engins/free', async (req: Request, res: Response) => {

    try {
        let serieId = Number(req.query.serie_id);
    
        console.log(serieId)
    
        const enginRepository = AppDataSource.getRepository(Engin)
        const allEngin = await enginRepository
            .find(Object.assign({
                    relations: {
                        currentVoieEngin: true
                    }
                }, (serieId) ? {
                    where: {
                        serie_id: serieId
                    }
                } : {
                    where: {
                        serie_id: IsNull()
                    }
                })
            );
    
        const freeEngins = allEngin.filter(
            (engin) =>
                (!engin.currentVoieEngin || engin.currentVoieEngin.length == 0));
    
        freeEngins.forEach(engin => {
            delete engin.currentVoieEngin;
            engin.updateCompositon();
        });
    
        res.json(freeEngins);
    } catch (error) {
        console.log(error)
    }
});


enginRouter.get('/engin_series', verifyToken, async (req: Request, res: Response) => {

    try {
        const enginSerieRepository = AppDataSource.getRepository(EnginSerie)
        const allEnginSeries = await enginSerieRepository
            .find();
    
    
        res.json(allEnginSeries);
    } catch (error) {
        console.log(error)
    }
});

module.exports = enginRouter