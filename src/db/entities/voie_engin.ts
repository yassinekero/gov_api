import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn
} from "typeorm"
import {Engin} from "./engin";
import {Voie} from "./voie";
import {UserEngin} from "./user_engin";
import {AppDataSource} from "../db";
import {EnginAtelier} from "./engin_atelier";
import {Atelier} from "./atelier";

@Entity("voie_engin")
export class VoieEngin {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    voie_id:number

    @Column()
    engin_id:number

    @CreateDateColumn()
    created_at: Date

   /* @UpdateDateColumn()
    updatedAt: Date*/

    @DeleteDateColumn()
    deleted_at: Date


    @Column()
    motif:string
    @Column()
    prevision_sortie:string
    @Column()
    comment:string
    @Column()
    position_voie:number
    @Column()
    basset:boolean
    @Column()
    coactivite:boolean
    @Column()
    estimmobilise:boolean
    @Column()
    hautet:boolean
    @Column()
    miseaterre:boolean
    @Column()
    moyennet:boolean
    @Column()
    confirme:boolean



    @ManyToOne(() => Voie, (voie) => voie.engins)
    voie: Voie

    @ManyToOne(() => Engin, (engin) => engin.voies)
    engin: Engin

    @OneToMany(() => UserEngin,
        (user_engin) => user_engin.voieEngin)
    currentUsersEngin: UserEngin[]


    enginAteliers?: EnginAtelier[]

    async loadEnginAtelier() {

            const AteliersOfVoieEngin: Atelier[] = []
            this.currentUsersEngin.forEach(userEngin => {
                const equipe = userEngin.user.equipe;
                if (equipe) {
                    const atelier = equipe.atelier;

                    const findedAtelier =
                        AteliersOfVoieEngin.find(atelierList =>atelierList.id==atelier.id );

                    if(!findedAtelier){
                        AteliersOfVoieEngin.push(atelier);
                    }


                }
            });


        const EnginAteliersOfVoieEngin: EnginAtelier[] = []
            const enginAtelierRepository = AppDataSource.getRepository(EnginAtelier)
            for (const atelier of AteliersOfVoieEngin) {
                const enginAtelier = await enginAtelierRepository
                    .findOne({
                        where: {
                            "voie_engin_id": this.id,
                            "atelier_id": atelier.id,
                        }
                    })


                if (enginAtelier) {
                    enginAtelier.atelier=atelier;
                    EnginAteliersOfVoieEngin.push(enginAtelier);
                }else{
                    const tempEnginAtelier=new EnginAtelier()

                    tempEnginAtelier.atelier_id=atelier.id;
                    tempEnginAtelier.voie_engin_id= this.id;
                    tempEnginAtelier.comment="";
                    tempEnginAtelier.created_at=new Date();
                    tempEnginAtelier.status=false;


                    tempEnginAtelier.atelier=atelier;
                    EnginAteliersOfVoieEngin.push(tempEnginAtelier);
                }


            }





       this.enginAteliers =EnginAteliersOfVoieEngin;
    }



}