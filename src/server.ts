// @ts-ignore
import express from 'express';
import 'reflect-metadata';
// @ts-ignore
import cors from 'cors';
import animeRoutes from "./routes/anime.routes";
import {db} from "./core/configs/database/typeorm.config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import {errorMiddleware, notFoundMiddleware} from "./middlewares/api.middleware";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/anime', animeRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API OK' });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);


try{
    await db.initialize();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
} catch(e){
    console.error(e);
}

