import 'reflect-metadata'
import {DataSource} from "typeorm";

export const db = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'animeHere_database',

    entities: [],

    synchronize: true,
})