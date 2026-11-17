// @ts-ignore
import express from 'express';
import 'reflect-metadata';
// @ts-ignore
import cors from 'cors';
import animeRoutes from "./routes/anime.routes";
import {db} from "./configs/database/typeorm.config";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/anime', animeRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'API OK' });
});


try{
    await db.initialize();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
} catch(e){
    console.error(e);
}

