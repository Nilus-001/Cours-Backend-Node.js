import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {openapiSpec} from "./core/docs/openapi";
import animeRoutes from "./context/anime/api/routes/anime.routes";
import {db} from "./core/configs/database/typeorm.config";
import userRoutes from "./context/user/api/routes/user.routes";
import authRoutes from "./context/auth/api/routes/auth.routes";
import {errorMiddleware, notFoundMiddleware} from "./core/http/errors/middleware/api.middleware";
import {registerListeners} from "./core/events/listeners";
import {verifyMailer} from "./core/mailer/nodemailer.mailer";
import getEnv from "./core/utils/getEnv.utils";
import {DomainResponse} from "./core/http/successDomain";

const PORT = getEnv('APP_PORT');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api-docs.json', (req, res) => {
    res.json(openapiSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use('/anime', animeRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.json(new DomainResponse({message: 'API OK'}));
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);


try{
    await db.initialize();
    await verifyMailer();
    registerListeners();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
} catch(e){
    console.error(e);
}

