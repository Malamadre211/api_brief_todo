"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite"
});
const Todo = sequelize.define('todo', {
    value: sequelize_1.DataTypes.STRING,
    status: sequelize_1.DataTypes.BOOLEAN,
});
function syncDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.sync({ force: true });
            console.log('Database connected');
            Todo.create({ value: "tache 1", status: true });
            Todo.create({ value: "tache 2", status: false });
        }
        catch (error) {
            console.error('error synching database', error);
        }
    });
}
syncDB();
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.post('/add/:valeur', (req, res) => {
    const todo = req.params.valeur;
    Todo.create({ value: `${todo}`, status: true });
    res.send(todo);
    console.log('create');
});
app.get('/update/:valeur', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let update = req.params.valeur;
    const todos = yield Todo.create({ value: update, status: true });
    yield todos.update({ value: "tache update", status: false });
    yield todos.save();
    res.send(todos);
    console.log("update");
}));
app.get('/remove/:valeur', (req, res) => {
    const todo = req.params.valeur;
    Todo.destroy({ where: { value: todo } });
    res.send(`${todo}`);
    console.log('remove');
});
app.get('/get-all/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo.findAll();
    console.log(todos.every(task => task instanceof Todo));
    console.log("All tasks:", JSON.stringify(todos, null, 2));
    res.send(todos);
    console.log(todos);
}));
app.get('/remove-all/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo.findAll();
    for (let index = 0; index < todos.length; index++) {
        const element = todos[index];
        yield element.destroy();
    }
    res.send('ok');
    console.log('remove all');
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map