import {readFile} from "node:fs/promises";
import mysql, {Connection} from "mysql2/promise";
import getEnv from "../utils/getEnv.utils";

const files = process.argv.slice(2);
if (files.length === 0) {
    console.error("Usage : tsx run-sql.ts <fichier.sql> [fichier.sql ...]");
    process.exit(1);
}

let connection: Connection | undefined;

try {
    const database = getEnv('DB_DATABASE');
    connection = await mysql.createConnection({
        host: getEnv('DB_HOST'),
        port: Number(getEnv('DB_PORT')),
        user: getEnv('DB_USERNAME'),
        password: process.env.DB_PASSWORD ?? '',
        charset: 'utf8mb4',
        multipleStatements: true,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database.replaceAll('`', '``')}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await connection.changeUser({database});

    for (const file of files) {
        await connection.query(await readFile(file, 'utf8'));
        console.log(`OK  ${file}`);
    }
} catch (e) {
    console.error(`Erreur : ${e.message}`);
    process.exitCode = 1;
} finally {
    await connection?.end();
}
