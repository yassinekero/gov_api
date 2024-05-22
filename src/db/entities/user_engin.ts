import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn
} from "typeorm"
import {Engin} from "./engin";
import {Voie} from "./voie";
import {User} from "./user";
import {VoieEngin} from "./voie_engin";

@Entity("user_engin")
export class UserEngin {

    @PrimaryGeneratedColumn()
    id:number


    @Column()
    user_id:number

    @Column()
    voie_engin_id:number


    @Column()
    tache:string

    @Column()
    composition_id:number


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @Column()
    status?:boolean



    @ManyToOne(() => User, (user) => user.userEngins)
    user: User

    @ManyToOne(() => VoieEngin, (voieEngin) => voieEngin.currentUsersEngin)
    voieEngin: VoieEngin


}

/*
CREATE TABLE IF NOT EXISTS `gov_db`.`user_engin` (

  `tache` VARCHAR(300) NOT NULL,
  `composition_id` INT NOT NULL,
  `operation` VARCHAR(255) NOT NULL,
  `status` SMALLINT NULL DEFAULT 0 COMMENT 'null =  prealable\n0    =  affected\n1    =  finished',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`user_id`, `engin_id`),
  INDEX `fk_user_has_engin_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_has_engin_user_idx` (`engin_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_engin_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `gov_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_engin_user`
    FOREIGN KEY (`engin_id`)
    REFERENCES `gov_db`.`engin` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
* */
