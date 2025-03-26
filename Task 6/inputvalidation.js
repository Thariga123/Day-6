const express = require('express');
const app = express();
app.use(express.json());

app.post('/tasks', (req, res) => {
    const { id, name, description, status } = req.body;

    if (typeof id !== 'number' || typeof name !== 'string' || typeof description !== 'string' || typeof status !== 'string') {
        return res.status(400).json({
            error: 'Invalid input data. Ensure id is a number, and name, description, and status are strings.'
        });
    }

    if (!id || !name || !description || !status) {
        return res.status(400).json({
            error: 'Missing required fields. Please provide id, name, description, and status.'
        });
    }

    const newTask = { id, name, description, status };
    const tasks = [];
    tasks.push(newTask);

    res.status(201).json({
        message: 'Task created successfully',
        task: newTask
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
