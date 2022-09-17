const express = require("express");

const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/",(req,res) => {
    res.send("Welcome");
})

app.get("/about",(req,res) => {
    res.send("About")
})



app.get("/todo",(req,res) => {
    res.send("todo");
    const data = fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData = JSON.parse(data);
    const todos = parsedData.todo;
    console.log(todos)
})

app.post("/todo/create",(req,res) => {
    const payload = JSON.stringify(req.body);
    const data = fs.readFileSync("./db.json", {encoding:"utf-8"})
    const parsedData = JSON.parse(data);
    const todos = parsedData.todo
    const newtodo = [...todo, JSON.parse(payload)]
    console.log(newtodo);

    parsedData.todo = newtodo;
    const latestdata = JSON.stringify(parsedData)
    fs.writeFileSync("./db.json",parsedData, "utf-8")
    res.send("todo created")
})


app.listen(8000,() => {
    console.log("Listening on port 8000");
});