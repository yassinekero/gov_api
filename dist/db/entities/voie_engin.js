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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoieEngin = void 0;
const typeorm_1 = require("typeorm");
const engin_1 = require("./engin");
const voie_1 = require("./voie");
const user_engin_1 = require("./user_engin");
const db_1 = require("../db");
const engin_atelier_1 = require("./engin_atelier");
let VoieEngin = class VoieEngin {
    loadEnginAtelier() {
        return __awaiter(this, void 0, void 0, function* () {
            const AteliersOfVoieEngin = [];
            this.currentUsersEngin.forEach(userEngin => {
                const equipe = userEngin.user.equipe;
                if (equipe) {
                    const atelier = equipe.atelier;
                    const findedAtelier = AteliersOfVoieEngin.find(atelierList => atelierList.id == atelier.id);
                    if (!findedAtelier) {
                        AteliersOfVoieEngin.push(atelier);
                    }
                }
            });
            const EnginAteliersOfVoieEngin = [];
            const enginAtelierRepository = db_1.AppDataSource.getRepository(engin_atelier_1.EnginAtelier);
            for (const atelier of AteliersOfVoieEngin) {
                const enginAtelier = yield enginAtelierRepository
                    .findOne({
                    where: {
                        "voie_engin_id": this.id,
                        "atelier_id": atelier.id,
                    }
                });
                if (enginAtelier) {
                    enginAtelier.atelier = atelier;
                    EnginAteliersOfVoieEngin.push(enginAtelier);
                }
                else {
                    const tempEnginAtelier = new engin_atelier_1.EnginAtelier();
                    tempEnginAtelier.atelier_id = atelier.id;
                    tempEnginAtelier.voie_engin_id = this.id;
                    tempEnginAtelier.comment = "";
                    tempEnginAtelier.created_at = new Date();
                    tempEnginAtelier.status = false;
                    tempEnginAtelier.atelier = atelier;
                    EnginAteliersOfVoieEngin.push(tempEnginAtelier);
                }
            }
            this.enginAteliers = EnginAteliersOfVoieEngin;
        });
    }
};
exports.VoieEngin = VoieEngin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VoieEngin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VoieEngin.prototype, "voie_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VoieEngin.prototype, "engin_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date
    /* @UpdateDateColumn()
     updatedAt: Date*/
    )
], VoieEngin.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], VoieEngin.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VoieEngin.prototype, "motif", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VoieEngin.prototype, "prevision_sortie", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VoieEngin.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VoieEngin.prototype, "position_voie", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieEngin.prototype, "basset", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieEngin.prototype, "coactivite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieEngin.prototype, "estimmobilise", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieEngin.prototype, "hautet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieEngin.prototype, "miseaterre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieEngin.prototype, "moyennet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], VoieEngin.prototype, "confirme", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => voie_1.Voie, (voie) => voie.engins),
    __metadata("design:type", voie_1.Voie)
], VoieEngin.prototype, "voie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => engin_1.Engin, (engin) => engin.voies),
    __metadata("design:type", engin_1.Engin)
], VoieEngin.prototype, "engin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_engin_1.UserEngin, (user_engin) => user_engin.voieEngin),
    __metadata("design:type", Array)
], VoieEngin.prototype, "currentUsersEngin", void 0);
exports.VoieEngin = VoieEngin = __decorate([
    (0, typeorm_1.Entity)("voie_engin")
], VoieEngin);
//# sourceMappingURL=voie_engin.js.map