const request = require('supertest');
const app = require('../server');

beforeEach(() => app.resetTasks());

describe('GET /tasks', () => {
  it('returns empty array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
  it('returns created tasks', async () => {
    await request(app).post('/tasks').send({ title: 'Test', createdBy: 'User' });
    const res = await request(app).get('/tasks');
    expect(res.body.length).toBe(1);
  });
});

describe('POST /tasks', () => {
  it('creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'New Task', description: 'Desc', createdBy: 'User' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Task');
    expect(res.body.completed).toBe(false);
    expect(res.body.createdBy).toBe('User');
  });
  it('returns 400 if title missing', async () => {
    expect((await request(app).post('/tasks').send({ createdBy: 'User' })).status).toBe(400);
  });
  it('returns 400 if title blank', async () => {
    expect((await request(app).post('/tasks').send({ title: '  ', createdBy: 'User' })).status).toBe(400);
  });
  it('returns 400 if createdBy missing', async () => {
    expect((await request(app).post('/tasks').send({ title: 'Task' })).status).toBe(400);
  });
  it('returns 400 if createdBy blank', async () => {
    expect((await request(app).post('/tasks').send({ title: 'Task', createdBy: '  ' })).status).toBe(400);
  });
});

describe('PUT /tasks/:id', () => {
  it('updates a task', async () => {
    const { body } = await request(app).post('/tasks').send({ title: 'Original', createdBy: 'User' });
    const res = await request(app).put(`/tasks/${body.id}`).send({ title: 'Updated', completed: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
    expect(res.body.completed).toBe(true);
  });
  it('returns 404 for unknown id', async () => {
    expect((await request(app).put('/tasks/999').send({ title: 'X' })).status).toBe(404);
  });
});

describe('DELETE /tasks/:id', () => {
  it('deletes a task', async () => {
    const { body } = await request(app).post('/tasks').send({ title: 'To Delete', createdBy: 'User' });
    expect((await request(app).delete(`/tasks/${body.id}`)).status).toBe(204);
    expect((await request(app).get('/tasks')).body.length).toBe(0);
  });
  it('returns 404 for unknown id', async () => {
    expect((await request(app).delete('/tasks/999')).status).toBe(404);
  });
});
