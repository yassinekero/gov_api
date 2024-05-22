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
import {Engin} from "./engin";
import {VoieEngin} from "./voie_engin";

@Entity("voie")
export class Voie {
    @PrimaryColumn()
    id: number

    @Column()
    electrifiee: boolean

    @Column()
    hors_service: boolean

    @Column()
    sous_tension: boolean


    @Column()
    longueur: number

    @Column()
    comment: string

    @Column()
    type: string

    @Column()
    valide_coupure?: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date



    @ManyToMany(() => Engin, (engin) => engin.voies)
    @JoinTable({name:"voie_engin"})
    engins: Engin[]


    @OneToMany(() => VoieEngin,
        (voie_engin) => voie_engin.voie) // note: we will create author property in the Photo class below
    VoieEngins: VoieEngin[]
}