import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {Equipe} from "./equipe";
import {User} from "./user";

@Entity("role")
export class Role {
    @PrimaryColumn()
    key: number
    @Column()
    name: string


    @OneToMany(() => User, (user) => user.role)
    users: User[]

}
/*
CREATE TABLE IF NOT EXISTS `gov_db`.`role` (
  `key` VARCHAR(80) NOT NULL,
  `name` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`key`))
ENGINE = InnoDB
* */