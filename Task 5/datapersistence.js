const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 2000;

const FILE_PATH = path.join(__dirname, 'users.json');

app.use(express.json());

const readUsers = () => {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(FILE_PATH, 'utf8');
  return data ? JSON.parse(data) : [];
};

const writeUsers = (users) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
};

app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', (req, res) => {
  const users = readUsers();
  
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({
    message: 'User added',
    user: newUser
  });
});
app.put('/users/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body };
    writeUsers(users);
    res.json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});
app.delete('/users/:id', (req, res) => {
  let users = readUsers();
  const initialLength = users.length;

  users = users.filter(u => u.id !== parseInt(req.params.id));

  if (users.length < initialLength) {
    writeUsers(users);
    res.status(200).send('User deleted');
  } else {
    res.status(404).send('User not found');
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
