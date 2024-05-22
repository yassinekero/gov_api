"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const user_1 = require("./db/entities/user");
const atelier_1 = require("./db/entities/atelier");
const cors = require('cors');
const enginRouter = require('./routes/EnginRoute');
const voieRouter = require('./routes/VoieRoute');
const voieEnginRouter = require('./routes/VoieEnginRoute');
const authRouter = require('./routes/AuthRoute');
const atelierRouter = require('./routes/AtelierRoute');
const userEnginRouter = require('./routes/UserEnginRoute');
const atelierEnginRouter = require('./routes/AtelierEnginRoute');
const equipeRouter = require('./routes/EquipeRoute');
const checkTechHabiliteRouter = require('./routes/CheckTechHabiliteRoute');
const app = (0, express_1.default)();
const port = 8000 || process.env.PORT;
const apiVer = "/v1";
app.use(cors());
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('----------------------------------');
        console.log('Time:', Date.now());
        console.log('Request Type:', req.method);
        console.log('Request URL:', req.originalUrl);
        console.log('----------------------------------');
        const bearerHeader = req.header("authorization");
        if (bearerHeader) {
            let token = bearerHeader.split(" ")[1];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.AUTH_SECRET_KEY);
                // @ts-ignore
                let userId = decoded.user_id;
                const userRepository = db_1.AppDataSource.getRepository(user_1.User);
                const userFound = yield userRepository.findOneBy({
                    id: userId,
                });
                res.locals.user = userFound;
            }
            catch (err) {
            }
        }
        if (!res.locals.user) {
            res.locals.user = new user_1.User();
        }
        /*const user = new User();
        user.id = 10;
        user.role_key = Roles.RCI;
        res.locals.user = user;*/
        next();
    });
});
app.use(express_1.default.json());
app.use(apiVer, enginRouter);
app.use(apiVer, voieRouter);
app.use(apiVer, voieEnginRouter);
app.use(apiVer, authRouter);
app.use(apiVer, atelierRouter);
app.use(apiVer, userEnginRouter);
app.use(apiVer, atelierEnginRouter);
app.use(apiVer, equipeRouter);
app.use(apiVer, checkTechHabiliteRouter);
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const enginSerieRepository = db_1.AppDataSource.getRepository(user_1.User);
    const allEnginSeries = yield enginSerieRepository
        .find({
        relations: { userEngins: true,
            //role: true,
            //equipe: {atelier: {duoUser: true}}
        }
    });
    res.json(allEnginSeries);
}));
app.get('/users_atelier', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const atelier_id = 2;
    const atelierRepository = db_1.AppDataSource.getRepository(atelier_1.Atelier);
    const atelier = yield atelierRepository
        .findOne({
        relations: { equipes: { users: { userEngins: true } } },
        where: { id: atelier_id }
    });
    const usersOfAtelier = [];
    atelier === null || atelier === void 0 ? void 0 : atelier.equipes.forEach(equipe => usersOfAtelier.push(...equipe.users));
    res.json(usersOfAtelier);
}));
app.get('/', (req, res) => {
    res.send('GOV App');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map