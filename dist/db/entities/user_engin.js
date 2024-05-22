"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEngin = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const voie_engin_1 = require("./voie_engin");
let UserEngin = class UserEngin {
};
exports.UserEngin = UserEngin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEngin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserEngin.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserEngin.prototype, "voie_engin_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEngin.prototype, "tache", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserEngin.prototype, "composition_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEngin.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEngin.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UserEngin.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], UserEngin.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.userEngins),
    __metadata("design:type", user_1.User)
], UserEngin.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => voie_engin_1.VoieEngin, (voieEngin) => voieEngin.currentUsersEngin),
    __metadata("design:type", voie_engin_1.VoieEngin)
], UserEngin.prototype, "voieEngin", void 0);
exports.UserEngin = UserEngin = __decorate([
    (0, typeorm_1.Entity)("user_engin")
], UserEngin);
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
//# sourceMappingURL=user_engin.js.map