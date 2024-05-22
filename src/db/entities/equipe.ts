import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./user";
import {Atelier} from "./atelier";

@Entity("equipe")
export class Equipe {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string


    @Column()
   dpx_id: number


    @Column()
    atelier_id: number


    @OneToOne(() => User)
    @JoinColumn({name:"dpx_id"})
    dpxUser: User


    @OneToOne(() => Atelier)
    @JoinColumn()
    atelier: Atelier

    @OneToMany(() => User, (user) => user.equipe)
    users: User[]
}
