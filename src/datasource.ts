import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/user.entity";
require('dotenv').config();

console.log(process.env.DB_NAME);
export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "orm_users_data",
    synchronize: true,
    logging: true,
    // entities: [Users, Permission],
    entities: [Users],
    subscribers: [],
    migrations: [],
  });

