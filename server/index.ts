import * as express from "express";
import * as exphbs from "express-handlebars";


let app = express();
app.set("view engine", "hbs");
app.set("views", "server/views");
app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs",
}));
app.use(express.static("dist/"));

app.get("/", (req, res) => {
    res.render("index", { title: "Emily's Travel Blog" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About Me - Emily's Travel Blog" });
});

app.get("/gallery", (req, res) => {
    res.render("gallery", { title: "Photo Gallery - Emily's Travel Blog" });
});

app.get("/todo", (req, res) => {
    res.render("todo", { title: "Bucket List - Emily's Travel Blog" });
});



app.listen(1234, () => console.log("Listening on 1234"))
   .on("error", (e) => console.error(e));

