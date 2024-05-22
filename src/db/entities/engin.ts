import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn, ManyToOne, OneToMany, DeleteDateColumn
} from "typeorm"
import {Voie} from "./voie";
import {EnginSerie} from "./engin_serie";
import {VoieEngin} from "./voie_engin";
import {User} from "./user";
import {UserEngin} from "./user_engin";
import {Composant} from "./Composant";

@Entity("engin")
export class Engin {

    @PrimaryGeneratedColumn()
    id?: number

     @Column()
    name:string

    @Column()
    color?:string

    @Column({name:"composition"})
     composition: string


   //  compostion:object;

  updateCompositon() {

      this.composition=JSON.parse(this.composition);

const compositionList:Composant[]=[];
      for (let i = 0; i < this.composition.length; i++) {
          let composant = new Composant();
          Object.assign(composant,this.composition[i]);
          compositionList.push(composant)
      }
      // @ts-ignore
      this.composition=compositionList;

    }




    @Column()
    longueur: number

    @UpdateDateColumn()
    updated_at?: Date


    @CreateDateColumn()
    created_at: Date

    @DeleteDateColumn()
    deleted_at?: Date

    @Column()
    serie_id?:number

    @ManyToOne(() => EnginSerie, (voie) => voie.engins)
    serie?: EnginSerie


    @ManyToMany(() => Voie, (voie) => voie.engins)
    @JoinTable({name:"voie_engin"})
    voies: Voie[]
/*

    @ManyToMany(() => User, (user) => user.engins)
    @JoinTable({name:"user_engin"})
    users: User[]*/


    @OneToMany(() => VoieEngin, (voieEngin) => voieEngin.engin)
    currentVoieEngin?: VoieEngin[]







}