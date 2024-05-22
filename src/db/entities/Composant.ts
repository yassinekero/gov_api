
import {UserEngin} from "./user_engin";

export  class Composant {

    id:number;
    name:string;
    type:string;
    userEngins:UserEngin[];

    nb_assigned_not_started:number=-1;
    nb_started_work:number=-1;
    nb_finished_work:number=-1;

    ids_assigned_users:number[]=[];
    ids_started_work:number[]=[];
    ids_finished_work:number[]=[];



     static updateUsersStats(composant:Composant,userEngins:UserEngin[]):void{
         composant.nb_assigned_not_started=0;
         composant.nb_started_work=0;
         composant.nb_finished_work=0;


         for (let i = 0; i < userEngins.length; i++) {
             const userEngin = userEngins[i];
             if(userEngin.composition_id==composant.id){
                 if (userEngin.status==null){
                     composant.nb_assigned_not_started+=1;
                     composant.ids_assigned_users.push(userEngin.user_id)
                 }else if(!userEngin.status) {
                     composant.nb_started_work+=1;
                     composant.ids_started_work.push(userEngin.user_id)
                 }else if(userEngin.status) {
                     composant.nb_finished_work+=1;
                     composant.ids_finished_work.push(userEngin.user_id)
                 }
             }
         }
    }

    static updateUserEnginsList(composant:Composant,userEngins:UserEngin[]):void{
        composant.userEngins =
            userEngins
                .filter((userEngin) =>
                    userEngin.composition_id == composant.id);
    }


/*
{
    "id": 488844,
    "name": "ZMC",
    "type": "M"
},*/

}