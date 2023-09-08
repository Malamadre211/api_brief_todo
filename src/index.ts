import express from "express"
import "dotenv/config"

const port = process.env.PORT as string
const app = express();

// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('postgres://user:mariangelacurcioartist@gmail.com:simplon/api_todo')

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

  app.get('/task/:valeur', (req, res) => {
    const todo = req.params.valeur
    res.send(`${todo}`)
    console.log('todo')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})