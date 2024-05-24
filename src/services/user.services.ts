// const db = require('../../config/db');
import { IntegerType, Repository } from "typeorm";
//import { query } from "../../config/db";
import { db } from "../datasource";
import { Users } from "../entity/user.entity";
import { Request, Response } from 'express';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

const userRepository = db.getRepository(Users);

// async function createUsers(username: string, pw: string) {
//     const query = `INSERT INTO user_data (username, pw) VALUES (?, ?)`;
//     await db.query(query, [username, pw]);
// }

// async function getUsers() {
    
//     const sql = "SELECT * FROM user_data";
//     const queryResult = await db.query(sql);
//     const userData = queryResult._results;
//     return userData;
    
// }

// async function updateUsrs(userId: string, username: string, pw: string) {
//     const sql = "UPDATE user_data SET username=?, pw=? WHERE user_id=?";
//     await db.query(sql, [username, pw, userId]);
    
// }

// async function deleteUsers(userId: string) {
//     const sql = `DELETE FROM user_data WHERE user_id = ?`;
//     await db.query(sql, [userId]);
// }

async function createUsers({
    email,
    firstName,
    lastName,
    age,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
  }) {
    const user = userRepository.create({
      email,
      firstName,
      lastName,
      age,
    });
  
    await userRepository.save(user);
  
    return user;
}

async function getUsers(userId: number): Promise<Users> {
    const result = await userRepository.findOneOrFail({
      where: { id: userId }
    });
    return result;
  }

  async function updateUsrs(
    userId: number,
    {
      firstName,
      lastName,
      age,
    }: {
      firstName: string;
      lastName: string;
      age: number;
    }
  ) {
    const user = await userRepository.findOneBy({id: userId});
  
    userRepository.merge(user, {
      firstName,
      lastName,
      age,
    });
    await userRepository.save(user);

  return user;
}

async function deleteUsers(userId: number) {
    const user = await userRepository.find({
        where: {
            id: userId
        }
    });
    await userRepository.remove(user);
}
  
export const userServices = {
    createUsers,
    getUsers,
    updateUsrs,
    deleteUsers
};
