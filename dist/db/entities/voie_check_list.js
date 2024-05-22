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
exports.VoieCheckList = void 0;
const typeorm_1 = require("typeorm");
const check_tech_habilite_1 = require("./check_tech_habilite");
//check_habilite_id, voie_id, status, updated_at
let VoieCheckList = class VoieCheckList {
};
exports.VoieCheckList = VoieCheckList;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], VoieCheckList.prototype, "check_tech_habilite_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], VoieCheckList.prototype, "voie_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieCheckList.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], VoieCheckList.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => check_tech_habilite_1.CheckTechHabilite, (checkTechHabilite) => checkTechHabilite.voieCheckLists),
    __metadata("design:type", check_tech_habilite_1.CheckTechHabilite)
], VoieCheckList.prototype, "checkTechHabilite", void 0);
exports.VoieCheckList = VoieCheckList = __decorate([
    (0, typeorm_1.Entity)("voie_check_list")
], VoieCheckList);
//# sourceMappingURL=voie_check_list.js.map