const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());   

const users = [
    { id: 1, name: "Thariga" },
    { id: 2, name: "Teju" }
];
app.get("/users", (req, res) => {
    res.json(users);
});
app.post("/users", (req, res) => {
    const newUser = req.body;  
    if (!newUser.id || !newUser.name) {
        return res.status(400).json({ message: "ID and name are required" });
    }
    users.push(newUser);
    
    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
