import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {User} from "./user";
import {Equipe} from "./equipe";
import {EnginAtelier} from "./engin_atelier";

@Entity("atelier")
export class Atelier {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column()
    duo_id: number


    @OneToOne(() => User)
    @JoinColumn({name:"duo_id"})
    duoUser: User


    @OneToMany(() => Equipe, (equipe) => equipe.atelier)
    equipes: Equipe[]


    @OneToMany(() => EnginAtelier, (enginAtelier) => enginAtelier.atelier)
   @JoinColumn({name: "atelier_id"})
    enginAteliers: EnginAtelier[]


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}



