const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database("database.db");

app.use(bodyParser.json());
app.use(express.static("public"));

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

// Get all tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    res.json(rows);
  });
});

// Add task
app.post("/add", (req, res) => {
  const task = req.body.task;
  db.run("INSERT INTO todos (task) VALUES (?)", [task], () => {
    res.sendStatus(200);
  });
});

// Delete task
app.delete("/delete/:id", (req, res) => {
  db.run("DELETE FROM todos WHERE id = ?", [req.params.id], () => {
    res.sendStatus(200);
  });
});

// Toggle complete
app.put("/complete/:id", (req, res) => {
  db.run(
    "UPDATE todos SET completed = NOT completed WHERE id = ?",
    [req.params.id],
    () => {
      res.sendStatus(200);
    }
  );
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});