const request = require('supertest');
const app = require('../src/index.js');

describe('Tasks API', () => {

    it('should create a new task', async () => {

        const response = await request(app).post('/tasks').send({
            title: 'Test Task',
            category: 'Test Category'
        });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Task');
        expect(response.body.category).toBe('Test Category');
    });

    it('should return all tasks', async () => {
        
        const response = await request(app).get('/tasks');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should update an existing task', async () => {

        const createResponse = await request(app).post('/tasks').send({
            title: 'Original Task',
            category: 'Original Category'
        });

        const taskId = createResponse.body.id;

        const updateResponse = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: 'Updated Task',
                category: 'Updated Category'
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.title).toBe('Updated Task');
        expect(updateResponse.body.category).toBe('Updated Category');
    });

    it('should delete a task by ID', async () => {
        
        const createResponse = await request(app).post('/tasks').send({
            title: 'Task to Delete',
            category: 'Delete Category'
        });
        
        const taskId = createResponse.body.id;

        const deleteResponse = await request(app).delete(`/tasks/${taskId}`);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toHaveProperty('message');
    });
});