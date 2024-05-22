import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne, OneToMany, PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {Equipe} from "./equipe";
import {Role} from "./role";
import {Engin} from "./engin";
import {VoieEngin} from "./voie_engin";
import {UserEngin} from "./user_engin";
import {EnginSerie} from "./engin_serie";
import {CheckTechHabilite} from "./check_tech_habilite";



//check_habilite_id, voie_id, status, updated_at
@Entity("voie_check_list")
export class VoieCheckList {
    @PrimaryColumn()
    check_tech_habilite_id: number
    @PrimaryColumn()
    voie_id: number
    @Column()
    status: boolean

    @UpdateDateColumn()
    updated_at: Date


    @ManyToOne(() => CheckTechHabilite,
        (checkTechHabilite) => checkTechHabilite.voieCheckLists)
    checkTechHabilite?: CheckTechHabilite

}