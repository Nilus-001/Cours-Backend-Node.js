// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import animeRoutes from "./routes/anime.routes";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/anime', animeRoutes);



app.get('/', (req, res) => {
    res.json({ message: 'API OK' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

