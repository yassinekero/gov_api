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
exports.Voie = void 0;
const typeorm_1 = require("typeorm");
const engin_1 = require("./engin");
const voie_engin_1 = require("./voie_engin");
let Voie = class Voie {
};
exports.Voie = Voie;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Voie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Voie.prototype, "electrifiee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Voie.prototype, "hors_service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Voie.prototype, "sous_tension", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Voie.prototype, "longueur", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voie.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voie.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Voie.prototype, "valide_coupure", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Voie.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Voie.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => engin_1.Engin, (engin) => engin.voies),
    (0, typeorm_1.JoinTable)({ name: "voie_engin" }),
    __metadata("design:type", Array)
], Voie.prototype, "engins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => voie_engin_1.VoieEngin, (voie_engin) => voie_engin.voie) // note: we will create author property in the Photo class below
    ,
    __metadata("design:type", Array)
], Voie.prototype, "VoieEngins", void 0);
exports.Voie = Voie = __decorate([
    (0, typeorm_1.Entity)("voie")
], Voie);
//# sourceMappingURL=voie.js.map