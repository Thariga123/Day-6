const express = require('express');
const app = express();
const port = 3000;


const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  
];

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
