import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne,
    OneToMany,
    OneToOne, PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {User} from "./user";
import {Equipe} from "./equipe";
import {Atelier} from "./atelier";

@Entity("engin_atelier")
export class EnginAtelier {
    @PrimaryColumn()
    voie_engin_id: number

    @PrimaryColumn()
    atelier_id: number

    @Column()
    status:boolean

    @Column()
    comment: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at?: Date


    @ManyToOne(() => Atelier,(atelier) => atelier.enginAteliers)
    atelier: Atelier



}



