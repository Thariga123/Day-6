const express = require("express");
const app = express();


const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Bob" }
];


app.get('/users',(req,res)=>{
    res.json(users);
})

app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id); 
    const user = users.find(user => user.id === userId); 
    res.json(user)
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});