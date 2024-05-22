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
exports.EnginSerie = void 0;
const typeorm_1 = require("typeorm");
const engin_1 = require("./engin");
let EnginSerie = class EnginSerie {
};
exports.EnginSerie = EnginSerie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EnginSerie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EnginSerie.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => engin_1.Engin, (engin) => engin.serie),
    __metadata("design:type", Array)
], EnginSerie.prototype, "engins", void 0);
exports.EnginSerie = EnginSerie = __decorate([
    (0, typeorm_1.Entity)("engin_serie")
], EnginSerie);
//# sourceMappingURL=engin_serie.js.map