const crypto = require('crypto');

const tasks = [
    {
        id: crypto.randomUUID(),
        title: 'Task 1',
        category: 'Category 1'
    },
    
]

const getAllTasks = async (req, res) => {
    try {
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching tasks'
        })
    }
}

const createTask = async (req, res) => {
    try {
        console.log(req.body);
        const { title, category } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                message: 'Title and category are required'
            })
        }

        const newTask = { id: crypto.randomUUID(), title, category };
        tasks.push(newTask);

        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({
            message: 'Error creating task'
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category } = req.body;

        if (!title || !category) {
            return res.status(400).json({
                message: 'Title and category are required'
            })
        }
        
        const taskIndex = tasks.findIndex(task => task.id == id);

        if (taskIndex === -1) {
            return res.status(404).json({
                message: 'Task not found'
            })
        }

        tasks[taskIndex].title = title;
        tasks[taskIndex].category = category;
        
        res.status(200).json(tasks[taskIndex])
    } catch (error) {
        res.status(500).json({
            message: `Error updating task ${id}`
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'ID is required'
            })
        }

        const taskIndex = tasks.findIndex(task => task.id == id);

        if (taskIndex === -1) {
            return res.status(404).json({
                message: 'Task not found'
            })
        }

        tasks.splice(taskIndex, 1);

        res.status(200).json({
            message: `Task ${id} deleted successfully`
        })
    } catch (error) {
        res.status(500).json({
            message: `Error deleting task ${id}`
        })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}