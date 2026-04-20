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
    await request(app).post('/tasks').send({ title: 'Test' });
    const res = await request(app).get('/tasks');
    expect(res.body.length).toBe(1);
  });
});

describe('POST /tasks', () => {
  it('creates a task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'New Task', description: 'Desc' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Task');
    expect(res.body.completed).toBe(false);
  });
  it('returns 400 if title missing', async () => {
    expect((await request(app).post('/tasks').send({})).status).toBe(400);
  });
  it('returns 400 if title blank', async () => {
    expect((await request(app).post('/tasks').send({ title: '  ' })).status).toBe(400);
  });
});

describe('PUT /tasks/:id', () => {
  it('updates a task', async () => {
    const { body } = await request(app).post('/tasks').send({ title: 'Original' });
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
    const { body } = await request(app).post('/tasks').send({ title: 'To Delete' });
    expect((await request(app).delete(`/tasks/${body.id}`)).status).toBe(204);
    expect((await request(app).get('/tasks')).body.length).toBe(0);
  });
  it('returns 404 for unknown id', async () => {
    expect((await request(app).delete('/tasks/999')).status).toBe(404);
  });
});
