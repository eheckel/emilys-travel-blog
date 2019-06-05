import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import * as exphbs from 'express-handlebars';

import { DB, Rows } from './db';

// since router is default in ./admin, the router is called admin here
import admin from './admin';

let app = express();
app.set('view engine', 'hbs');
app.set('views', 'server/views');
app.engine('hbs', exphbs({
    defaultLayout: 'default',
    extname: 'hbs',
}));

app.use(express.static('dist/'));
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    let [rows] = await DB.query<Rows>('SELECT * FROM posts ORDER BY publishAt DESC');
    res.render('index', {pageTitle: "Emily's Travel Blog", posts: rows});
})

app.get('/about', (req, res) => {
    res.render('about', { pageTitle: "About Me - Emily's Travel Blog" });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', { pageTitle: "Photo Gallery - Emily's Travel Blog" });
});

app.get('/todo', (req, res) => {
    res.render('todo', { pageTitle: "Bucket List - Emily's Travel Blog" });
});

app.get('/todos.json', async (req, res) => {
    let [rows] = await DB.query<Rows>("SELECT * FROM todos");
    res.json(rows);
});

app.get('/todos', async (req, res) => {
    let [rows] = await DB.query<Rows>("SELECT * FROM todos");
    res.render('todos-demo', {todos: rows});
});

app.get('/todos/eat', async (req, res) => {
    await DB.execute("INSERT INTO `todos` (`description`, `url`) VALUES ('Eat a hot dog', 'http://dogs4lyfe.com');", {description: "EAT!!!", url: "http://food.com"})
    res.redirect("/todos")
})

app.get("/todos/:id", async (req, res) => {
    let [rows] = await DB.query<Rows>('SELECT * FROM todos WHERE id=:id', {id: req.params.id});
    res.json(rows);
})

app.get('/posts.json', async (req, res) => {
    let [rows] = await DB.query<Rows>("SELECT * FROM posts");
    res.json(rows);
})

app.use('/admin', admin);

export let main = async () => {
    app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
       .on('error', (e) => console.error(e));
};

main();


