import 'reflect-metadata'
import {DataSource} from "typeorm";
import {entities} from "../../../entities";

export const db = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'animehere_database',

    entities,

    synchronize: false,
})