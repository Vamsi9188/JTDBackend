const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 3002;
const filePath = path.join(__dirname, "data.json");

const app = express();
app.use(express.json());

function readData() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

// Hello Route
app.get("/hello", (req, res) => {
    res.status(200).json({ "message": "Hello World" });
});

// Get all items
app.get("/items", (req, res) => {
    res.status(200).json(readData());
});

// Add a new item
app.post("/items", (req, res) => {
    const items = readData();
    const newItem = { ...req.body, id: items.length ? items[items.length - 1].id + 1 : 1 };
    items.push(newItem);
    writeData(items);
    res.status(201).json(newItem);
});

// Update an item
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const items = readData();
    const index = items.findIndex(i => i.id === id);

    if (index === -1) return res.status(404).json({ error: "Item not found" });

    items[index] = { ...items[index], ...req.body, id };
    writeData(items);
    res.status(200).json(items[index]);
});

// Delete an item
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const items = readData();
    const index = items.findIndex(i => i.id === id);

    if (index === -1) return res.status(404).json({ error: "Item not found" });

    const [deletedItem] = items.splice(index, 1);
    writeData(items);
    res.status(200).json(deletedItem);
});

app.listen(PORT, () => {
    console.log("property of JTD BACKEND");
});
