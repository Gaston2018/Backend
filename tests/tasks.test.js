const request = require('supertest');
const app = require('../src/app');
const taskStore = require('../src/store/taskStore');

beforeEach(() => {
  taskStore.reset();
});

describe('GET /tasks', () => {
  it('should return an empty array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should return all tasks', async () => {
    taskStore.create({ title: 'Task 1', description: '' });
    taskStore.create({ title: 'Task 2', description: 'desc' });
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('POST /tasks', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Buy groceries', description: 'Milk and eggs' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      title: 'Buy groceries',
      description: 'Milk and eggs',
      completed: false
    });
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post('/tasks').send({ description: 'No title' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if title is empty string', async () => {
    const res = await request(app).post('/tasks').send({ title: '   ' });
    expect(res.statusCode).toBe(400);
  });
});

describe('PUT /tasks/:id', () => {
  it('should update an existing task', async () => {
    taskStore.create({ title: 'Old title', description: '' });
    const res = await request(app)
      .put('/tasks/1')
      .send({ title: 'New title', completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('New title');
    expect(res.body.completed).toBe(true);
  });

  it('should return 404 for non-existent task', async () => {
    const res = await request(app).put('/tasks/999').send({ title: 'X' });
    expect(res.statusCode).toBe(404);
  });

  it('should return 400 for invalid id', async () => {
    const res = await request(app).put('/tasks/abc').send({ title: 'X' });
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /tasks/:id', () => {
  it('should delete an existing task', async () => {
    taskStore.create({ title: 'To delete', description: '' });
    const res = await request(app).delete('/tasks/1');
    expect(res.statusCode).toBe(204);
  });

  it('should return 404 for non-existent task', async () => {
    const res = await request(app).delete('/tasks/999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 400 for invalid id', async () => {
    const res = await request(app).delete('/tasks/abc');
    expect(res.statusCode).toBe(400);
  });
});
