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

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number


    @Column({unique: true})
    matricule: string
    @Column()
    name: string
    @Column()
    img: string
    @Column()
    email: string
    @Column({ select: false })
    password: string
    @Column()
    phone?: string



    @Column()
    role_key: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    equipe_id?: number

    @ManyToOne(() => Equipe, (equipe) => equipe.users)
    equipe?: Equipe


    @ManyToOne(() => Role, (role) => role.users)
    role: Role




    @OneToMany(() => UserEngin,
        (user_engin) => user_engin.user)
    userEngins: UserEngin[]





}

/*
CREATE TABLE IF NOT EXISTS `gov_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `matricule` VARCHAR(45) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `img` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL,
  `equipe_id` INT NOT NULL,
  `role_key` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_equipe1_idx` (`equipe_id` ASC) VISIBLE,
  INDEX `fk_user_role1_idx` (`role_key` ASC) VISIBLE,
  CONSTRAINT `fk_user_equipe1`
    FOREIGN KEY (`equipe_id`)
    REFERENCES `gov_db`.`equipe` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_key`)
    REFERENCES `gov_db`.`role` (`key`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

*/