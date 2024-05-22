import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn, OneToMany
} from "typeorm"
import {Voie} from "./voie";
import {Engin} from "./engin";

@Entity("engin_serie")
export class EnginSerie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name:string

    @OneToMany(() => Engin, (engin) => engin.serie)
    engins: Engin[]

}