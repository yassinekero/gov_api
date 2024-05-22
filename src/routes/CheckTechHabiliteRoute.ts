import express, {Request, Response} from "express";
import {AppDataSource} from "../db/db";
import {Roles} from "../db/Roles";
import {CheckTechHabilite} from "../db/entities/check_tech_habilite";
import {VoieCheckList} from "../db/entities/voie_check_list";
import verifyToken from "./verifyToken";

const checkTechRouter = express.Router();

checkTechRouter.get('/check_list_habilite', verifyToken,
    async (req: Request, res: Response) => {

        /*  let roleKey = res.locals.user.role_key;
          console.log(roleKey)

          if (roleKey != Roles.TECH_HABILITE && roleKey !== Roles.RCI) {
              res.status(403)
                  .json({status: "error", message: 'No access'});
              return;
          }
          console.log("anas darai");
          */
        try {
            const voie_id = Number(req.query.voie_id);
    
    
            const pourCoupure = Number(req.query.pour_coupure) == 1;
            const checkTechRepository = AppDataSource.getRepository(CheckTechHabilite)
            const techHabilites =
                await checkTechRepository.find(
                    {
                        where: {
                            pour_coupure: pourCoupure,
                            voieCheckLists: true
                            /*,
                            voieCheckLists: {
                                voie_id: voie_id
                            }*/
                        }, relations: {voieCheckLists: true}
                    });
    
    
            techHabilites.forEach(value =>
                {
    
    
                    value.voieCheckLists = value.voieCheckLists.filter(voieCheckList =>
                        (voieCheckList.voie_id === voie_id &&
                        voieCheckList.check_tech_habilite_id === value.id));
    
                    if (value.voieCheckLists.length > 0) {
                        value.voieCheckList = value.voieCheckLists[0];
                    }
    
                }
    
            )
    
    
    
            res.send(techHabilites)
        } catch (error) {
            console.log(error)
        }


    });


checkTechRouter.patch('/voie_check_list', verifyToken,
    async (req: Request, res: Response) => {

        try {
            let roleKey = res.locals.user.role_key;
            console.log(roleKey)
    
            if (roleKey != Roles.TECH_HABILITE) {
                res.status(403)
                    .json({status: "error", message: 'No access'});
                return;
            }
    
    
            const check_tech_habilite_id = Number(req.query.check_tech_habilite_id);
            const voie_id = Number(req.query.voie_id);
            const status = Number(req.query.status) == 1;
    
            const voieCheckList = new VoieCheckList();
    
    
            //limit of changes
            voieCheckList.check_tech_habilite_id = check_tech_habilite_id;
            voieCheckList.voie_id = voie_id;
            voieCheckList.status = status;
    
            const voieCheckListRepository =
                AppDataSource.getRepository(VoieCheckList);
    
            await voieCheckListRepository.save(voieCheckList)
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


module.exports = checkTechRouter