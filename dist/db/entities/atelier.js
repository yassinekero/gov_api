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
exports.Atelier = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const equipe_1 = require("./equipe");
const engin_atelier_1 = require("./engin_atelier");
let Atelier = class Atelier {
};
exports.Atelier = Atelier;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Atelier.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Atelier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Atelier.prototype, "duo_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.User),
    (0, typeorm_1.JoinColumn)({ name: "duo_id" }),
    __metadata("design:type", user_1.User)
], Atelier.prototype, "duoUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipe_1.Equipe, (equipe) => equipe.atelier),
    __metadata("design:type", Array)
], Atelier.prototype, "equipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => engin_atelier_1.EnginAtelier, (enginAtelier) => enginAtelier.atelier),
    (0, typeorm_1.JoinColumn)({ name: "atelier_id" }),
    __metadata("design:type", Array)
], Atelier.prototype, "enginAteliers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Atelier.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Atelier.prototype, "updated_at", void 0);
exports.Atelier = Atelier = __decorate([
    (0, typeorm_1.Entity)("atelier")
], Atelier);
//# sourceMappingURL=atelier.js.map