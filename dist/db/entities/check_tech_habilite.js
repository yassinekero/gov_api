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
exports.CheckTechHabilite = void 0;
const typeorm_1 = require("typeorm");
const voie_check_list_1 = require("./voie_check_list");
let CheckTechHabilite = class CheckTechHabilite {
};
exports.CheckTechHabilite = CheckTechHabilite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CheckTechHabilite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CheckTechHabilite.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CheckTechHabilite.prototype, "subtitre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CheckTechHabilite.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], CheckTechHabilite.prototype, "pour_coupure", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => voie_check_list_1.VoieCheckList, (voieCheckList) => voieCheckList.checkTechHabilite),
    __metadata("design:type", Array)
], CheckTechHabilite.prototype, "voieCheckLists", void 0);
exports.CheckTechHabilite = CheckTechHabilite = __decorate([
    (0, typeorm_1.Entity)("check_tech_habilite")
], CheckTechHabilite);
//# sourceMappingURL=check_tech_habilite.js.map