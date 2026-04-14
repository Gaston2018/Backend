const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {
  it('GET /tasks should return 200', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
  });

  it('POST /tasks should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
  });
});