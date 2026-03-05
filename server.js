const express = require("express")
const sqlite3 =
require("sqlite3").verbose()
const bodyParser =
require("body-parser");

const app = express();
const db = new
sqlite3.Database("datase.db");

// Middleware
app.use(bodyParser.urlencoded({ extend 
    : false }));
app. use(express.static("public"));

// create table
db.run(` 
    CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)
    `);

    
    app.post("/add", (req, res)=> {
         const task = req.body.task;
        db.run("INSERT INTO todos (task) VALUES(?)",
            [task], () => {
                res.redirect("/");
            }
        );
    });


    app.get("/tasks", (req, res)=>{
        db.all("SELECT *FROM todos", [],
            (err, rows) => {
                res.json(rows);
            }
        );
    });

    app.get("/delete/:id", (req, res) => {
        db.run("DELETE FROM todos WHERE id =?", [req,params,id], () => {
            res.redirect("/")
        } );
    });


    app.listen(3000, () => {
        console.log("server running at http://localhost:3000");
    } );




