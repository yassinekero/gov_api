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
exports.Engin = void 0;
const typeorm_1 = require("typeorm");
const voie_1 = require("./voie");
const engin_serie_1 = require("./engin_serie");
const voie_engin_1 = require("./voie_engin");
const Composant_1 = require("./Composant");
let Engin = class Engin {
    //  compostion:object;
    updateCompositon() {
        this.composition = JSON.parse(this.composition);
        const compositionList = [];
        for (let i = 0; i < this.composition.length; i++) {
            let composant = new Composant_1.Composant();
            Object.assign(composant, this.composition[i]);
            compositionList.push(composant);
        }
        // @ts-ignore
        this.composition = compositionList;
    }
};
exports.Engin = Engin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Engin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Engin.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Engin.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "composition" }),
    __metadata("design:type", String)
], Engin.prototype, "composition", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Engin.prototype, "longueur", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Engin.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Engin.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Engin.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Engin.prototype, "serie_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engin_serie_1.EnginSerie, (voie) => voie.engins),
    __metadata("design:type", engin_serie_1.EnginSerie)
], Engin.prototype, "serie", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => voie_1.Voie, (voie) => voie.engins),
    (0, typeorm_1.JoinTable)({ name: "voie_engin" }),
    __metadata("design:type", Array)
], Engin.prototype, "voies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => voie_engin_1.VoieEngin, (voieEngin) => voieEngin.engin),
    __metadata("design:type", Array)
], Engin.prototype, "currentVoieEngin", void 0);
exports.Engin = Engin = __decorate([
    (0, typeorm_1.Entity)("engin")
], Engin);
//# sourceMappingURL=engin.js.map