import {config} from "dotenv";

config();
import jwt from "jsonwebtoken";
import "reflect-metadata"
import express, {Express, Request, Response} from 'express';
import {AppDataSource} from "./db/db";
import {User} from "./db/entities/user";



import {Atelier} from "./db/entities/atelier";
import verifyToken from "./routes/verifyToken";




const cors = require('cors')
const enginRouter = require('./routes/EnginRoute');
const voieRouter = require('./routes/VoieRoute');
const voieEnginRouter = require('./routes/VoieEnginRoute');
const authRouter = require('./routes/AuthRoute');
const atelierRouter = require('./routes/AtelierRoute');
const userEnginRouter = require('./routes/UserEnginRoute');
const atelierEnginRouter = require('./routes/AtelierEnginRoute');
const equipeRouter = require('./routes/EquipeRoute');
const checkTechHabiliteRouter = require('./routes/CheckTechHabiliteRoute');





const app: Express = express();
const port = 8000 || process.env.PORT;
const apiVer="/v1"

app.use(cors())


app.use(async function (req, res, next) {
    console.log('----------------------------------');
    console.log('Time:', Date.now());
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    console.log('----------------------------------');

    const bearerHeader = req.header("authorization")
    if (bearerHeader) {
        let token = bearerHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY as string);
            // @ts-ignore
            let userId = decoded.user_id as number;

            const userRepository = AppDataSource.getRepository(User)

            const userFound = await userRepository.findOneBy({
                id: userId,
            });
            res.locals.user=userFound;

        } catch (err) {

        }
    }


    if(!res.locals.user){
        res.locals.user = new User();
    }

    /*const user = new User();
    user.id = 10;
    user.role_key = Roles.RCI;
    res.locals.user = user;*/


    next();
});

app.use(express.json());


app.use(apiVer,enginRouter);
app.use(apiVer,voieRouter);
app.use(apiVer,voieEnginRouter);
app.use(apiVer,authRouter);
app.use(apiVer,atelierRouter);
app.use(apiVer,userEnginRouter);
app.use(apiVer,atelierEnginRouter);
app.use(apiVer,equipeRouter);
app.use(apiVer,checkTechHabiliteRouter);





app.get('/users', async (req: Request, res: Response) => {

    const enginSerieRepository = AppDataSource.getRepository(User)
    const allEnginSeries = await enginSerieRepository
        .find({
            relations: {userEngins:true,
                //role: true,
                //equipe: {atelier: {duoUser: true}}
            }
        });


    res.json(allEnginSeries);
});

app.get('/users_atelier', async (req: Request, res: Response) => {

    const atelier_id = 2;

    const atelierRepository = AppDataSource.getRepository(Atelier)
    const atelier = await atelierRepository
        .findOne({
            relations: {equipes: {users: {userEngins:true}}},
            where: {id: atelier_id}
        });
    const usersOfAtelier:User[] = [];
    atelier?.equipes.forEach(
        equipe =>usersOfAtelier.push(...equipe.users) )



    res.json(usersOfAtelier);
});


app.get('/', (req: Request, res: Response) => {
    res.send('GOV App');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});