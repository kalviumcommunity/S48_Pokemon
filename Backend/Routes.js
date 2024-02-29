const express = require('express');
const router = express.Router();

// Mock data for demonstration
let data = [
    { id: 1, name: 'bob', age: 18 },
    { id: 2, name: 'tom', age: 20 },
    { id: 3, name: 'harry', age: 80 }
];

// CRUD operations

// Create (POST) a new item
router.post('/create', (req, res) => {
    const newItem = req.body; 
    newItem.id = data.length + 1;
    data.push(newItem);
    res.json(newItem);
});

// Read (GET) all items
router.get('/read', (req, res) => {
    res.json(data);
});

// Update (PUT) an existing item by ID
router.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateItem = req.body; 
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...updateItem };
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Delete (DELETE) an item by ID
router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        const deletedItem = data.splice(index, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = router;
