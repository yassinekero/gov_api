import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {Equipe} from "./equipe";
import {Role} from "./role";
import {Engin} from "./engin";
import {VoieEngin} from "./voie_engin";
import {UserEngin} from "./user_engin";
import {User} from "./user";
import {VoieCheckList} from "./voie_check_list";

@Entity("check_tech_habilite")
export class CheckTechHabilite {
    @PrimaryGeneratedColumn()
    id: number


    @Column()
    titre: string
    @Column()
    subtitre: string
    @Column()
    order: number

    @Column()
    pour_coupure: boolean



    @OneToMany(() => VoieCheckList, (voieCheckList) =>
        voieCheckList.checkTechHabilite)
    voieCheckLists: VoieCheckList[]



    voieCheckList: VoieCheckList

}