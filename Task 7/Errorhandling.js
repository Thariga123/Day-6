const express = require('express');
const app = express();
app.use(express.json());


app.post('/tasks', (req, res, next) => {
    try {
        const { id, name, description, status } = req.body;

        if (typeof id !== 'number' || typeof name !== 'string' || typeof description !== 'string' || typeof status !== 'string') {
            throw new Error('Invalid input data. Ensure id is a number, and name, description, and status are strings.');
        }

        if (!id || !name || !description || !status) {
            throw new Error('Missing required fields. Please provide id, name, description, and status.');
        }

        const newTask = { id, name, description, status };
        res.status(201).json({ message: 'Task created successfully', task: newTask });

    } catch (error) {
        next(error);  
    }
});

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);  

    
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined  // Hide stack in production
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
