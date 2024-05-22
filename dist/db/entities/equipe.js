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
exports.Equipe = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const atelier_1 = require("./atelier");
let Equipe = class Equipe {
};
exports.Equipe = Equipe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Equipe.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Equipe.prototype, "dpx_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Equipe.prototype, "atelier_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.User),
    (0, typeorm_1.JoinColumn)({ name: "dpx_id" }),
    __metadata("design:type", user_1.User)
], Equipe.prototype, "dpxUser", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => atelier_1.Atelier),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", atelier_1.Atelier)
], Equipe.prototype, "atelier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_1.User, (user) => user.equipe),
    __metadata("design:type", Array)
], Equipe.prototype, "users", void 0);
exports.Equipe = Equipe = __decorate([
    (0, typeorm_1.Entity)("equipe")
], Equipe);
//# sourceMappingURL=equipe.js.map