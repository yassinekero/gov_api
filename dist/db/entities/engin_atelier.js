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
exports.EnginAtelier = void 0;
const typeorm_1 = require("typeorm");
const atelier_1 = require("./atelier");
let EnginAtelier = class EnginAtelier {
};
exports.EnginAtelier = EnginAtelier;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], EnginAtelier.prototype, "voie_engin_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], EnginAtelier.prototype, "atelier_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], EnginAtelier.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EnginAtelier.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EnginAtelier.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EnginAtelier.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => atelier_1.Atelier, (atelier) => atelier.enginAteliers),
    __metadata("design:type", atelier_1.Atelier)
], EnginAtelier.prototype, "atelier", void 0);
exports.EnginAtelier = EnginAtelier = __decorate([
    (0, typeorm_1.Entity)("engin_atelier")
], EnginAtelier);
//# sourceMappingURL=engin_atelier.js.map