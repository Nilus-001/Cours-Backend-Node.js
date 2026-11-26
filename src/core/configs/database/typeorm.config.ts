import 'reflect-metadata'
import {DataSource} from "typeorm";
import mysql from "mysql2";
import {entities} from "../../../entities";
import getEnv from "../../utils/getEnv.utils";

const DB_HOST = getEnv('DB_HOST');
const DB_PORT = Number(getEnv('DB_PORT'));
const DB_USERNAME = getEnv('DB_USERNAME');
const DB_PASSWORD = process.env.DB_PASSWORD ?? ''
const DB_DATABASE = getEnv('DB_DATABASE');

export const db = new DataSource({
    type: 'mysql',
    driver: mysql,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,

    entities,

    synchronize: false,
})
