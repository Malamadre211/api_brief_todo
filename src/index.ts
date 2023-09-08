import express from "express"
import dotenv from "dotenv"
import { log } from "console";

const app = express();
dotenv.config();
const port = process.env.PORT as string
const database = process.env.database as string
const username = process.env.username as string
const password = process.env.password as string

console.log({database, username, password})
 
import { Sequelize, DataTypes } from 'sequelize';

// const sequelize = new Sequelize(database,username,password, {
//     host: 'localhost',
//     dialect: 'postgres'
// });
// const sequelize = new Sequelize(`postgres://${username}:${password}@localhost:5432/${database}`)
// const sequelize = new Sequelize(database, 'postgres', password, {
//     host: 'localhost',
//     dialect: 'postgres',
//     port:5432,
// } );

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite"
});

const Todo = sequelize.define('todo', {
    value: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
});

async function syncDB() {
    try {
        await sequelize.sync({ force: true });
        console.log('Database connected');
        Todo.create({ value : "tache 1", status: true})
        Todo.create({ value : "tache 2", status: false})
    } catch (error) {
        console.error('error synching database', error);
    }
}
syncDB();


  app.get('/task/:valeur', (req, res) => {
    const todo = req.params.valeur
    res.send(`${todo}`)
    console.log('todo')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})