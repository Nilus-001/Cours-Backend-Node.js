import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {openapiSpec} from "./core/docs/openapi";
import animeRoutes from "./context/anime/api/routes/anime.routes";
import {db} from "./core/configs/database/typeorm.config";
import userRoutes from "./context/user/api/routes/user.routes";
import authRoutes from "./context/auth/api/routes/auth.routes";
import {animeWatchlistRoutes, userWatchlistRoutes} from "./context/watchlist/api/routes/watchlist.routes";
import {animeFavoriteRoutes, userFavoriteRoutes} from "./context/favorite/api/routes/favorite.routes";
import {errorMiddleware, notFoundMiddleware} from "./core/http/errors/middleware/api.middleware";
import {registerListeners} from "./core/events/listeners";
import {verifyMailer} from "./core/mailer/nodemailer.mailer";
import getEnv from "./core/utils/getEnv.utils";
import {DomainResponse} from "./core/http/successDomain";

const PORT = getEnv('APP_PORT');

const app = express();

app.use(cors({
    origin: getEnv('CORS_ORIGINS').split(',').map(o => o.trim()),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get('/api-docs.json', (req, res) => {
    res.json(openapiSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use('/anime', animeWatchlistRoutes);
app.use('/anime', animeFavoriteRoutes);
app.use('/anime', animeRoutes);
app.use('/user/me', userWatchlistRoutes);
app.use('/user/me', userFavoriteRoutes);
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

