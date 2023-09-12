import express from "express"
import dotenv from "dotenv"
import { log } from "console";
import { Sequelize, DataTypes } from 'sequelize';
dotenv.config();

const app = express();
const port = process.env.PORT as string

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


  app.post('/add/:valeur', (req, res) => {
    const todo = req.params.valeur
    Todo.create({value: `${todo}`, status:true})
    res.send(todo)
    console.log('create')
  })

  app.get('/update/:valeur', async (req, res) => {
    let update = req.params.valeur
    const todos = await Todo.create ({value : update, status: true});
      await todos.update({value : "tache update", status: false});
      await todos.save();
      res.send(todos)
      console.log("update")
    })

  app.get('/remove/:valeur', (req, res) => {
    const todo = req.params.valeur
    Todo.destroy({where: {value : todo}})
    res.send(`${todo}`)
    console.log('remove')
  })  

  app.get('/get-all/', async (req, res) => {
    const todos = await Todo.findAll()
    console.log(todos.every(task => task instanceof Todo)); 
    console.log("All tasks:", JSON.stringify(todos, null, 2));
    res.send(todos)
    console.log(todos)
  })

  app.get('/remove-all/', async (req, res) => {
    const todos = await Todo.findAll()
    for (let index = 0; index < todos.length; index++) {
    const element = todos[index];
    await element.destroy()
    }
    res.send('ok')
    console.log('remove all')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})