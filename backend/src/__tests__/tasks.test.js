const request = require('supertest');
const epiDataApp = require('../index');
const epiDataTaskService = require('../services/taskService');

beforeEach(() => {
  epiDataTaskService.reset();
});

describe('GET /api/tasks', () => {
  it('debe retornar lista vacía inicialmente', async () => {
    const epiDataRes = await request(epiDataApp).get('/api/tasks');
    expect(epiDataRes.status).toBe(200);
    expect(epiDataRes.body.data).toEqual([]);
    expect(epiDataRes.body.total).toBe(0);
  });

  it('debe retornar todas las tareas creadas', async () => {
    epiDataTaskService.create({ title: 'Tarea epi-data 1' });
    epiDataTaskService.create({ title: 'Tarea epi-data 2' });
    const epiDataRes = await request(epiDataApp).get('/api/tasks');
    expect(epiDataRes.status).toBe(200);
    expect(epiDataRes.body.total).toBe(2);
  });
});

describe('GET /api/tasks/:id', () => {
  it('debe retornar una tarea por ID', async () => {
    const epiDataTask = epiDataTaskService.create({ title: 'Tarea epi-data test' });
    const epiDataRes = await request(epiDataApp).get(`/api/tasks/${epiDataTask.id}`);
    expect(epiDataRes.status).toBe(200);
    expect(epiDataRes.body.data.id).toBe(epiDataTask.id);
  });

  it('debe retornar 404 si la tarea no existe', async () => {
    const epiDataRes = await request(epiDataApp).get('/api/tasks/epi-data-id-inexistente');
    expect(epiDataRes.status).toBe(404);
  });
});

describe('POST /api/tasks', () => {
  it('debe crear una tarea correctamente', async () => {
    const epiDataRes = await request(epiDataApp)
      .post('/api/tasks')
      .send({ title: 'Nueva tarea epi-data', description: 'Descripción', status: 'pendiente', author: 'Juan epi-data' });
    expect(epiDataRes.status).toBe(201);
    expect(epiDataRes.body.data.title).toBe('Nueva tarea epi-data');
    expect(epiDataRes.body.data.author).toBe('Juan epi-data');
  });

  it('debe retornar 400 si falta el título', async () => {
    const epiDataRes = await request(epiDataApp).post('/api/tasks').send({ description: 'Sin título', author: 'Autor epi-data' });
    expect(epiDataRes.status).toBe(400);
  });

  it('debe retornar 400 si falta el autor', async () => {
    const epiDataRes = await request(epiDataApp).post('/api/tasks').send({ title: 'Tarea epi-data' });
    expect(epiDataRes.status).toBe(400);
  });

  it('debe retornar 400 si el status es inválido', async () => {
    const epiDataRes = await request(epiDataApp)
      .post('/api/tasks')
      .send({ title: 'Tarea epi-data', author: 'Autor epi-data', status: 'invalido' });
    expect(epiDataRes.status).toBe(400);
  });
});

describe('PUT /api/tasks/:id', () => {
  it('debe actualizar una tarea existente', async () => {
    const epiDataTask = epiDataTaskService.create({ title: 'Original epi-data', author: 'Autor epi-data' });
    const epiDataRes = await request(epiDataApp)
      .put(`/api/tasks/${epiDataTask.id}`)
      .send({ title: 'Actualizada epi-data', status: 'completada', author: 'Nuevo Autor epi-data' });
    expect(epiDataRes.status).toBe(200);
    expect(epiDataRes.body.data.title).toBe('Actualizada epi-data');
    expect(epiDataRes.body.data.status).toBe('completada');
    expect(epiDataRes.body.data.author).toBe('Nuevo Autor epi-data');
  });

  it('debe retornar 404 si la tarea no existe', async () => {
    const epiDataRes = await request(epiDataApp)
      .put('/api/tasks/epi-data-id-inexistente')
      .send({ title: 'No existe' });
    expect(epiDataRes.status).toBe(404);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('debe eliminar una tarea existente', async () => {
    const epiDataTask = epiDataTaskService.create({ title: 'Eliminar epi-data' });
    const epiDataRes = await request(epiDataApp).delete(`/api/tasks/${epiDataTask.id}`);
    expect(epiDataRes.status).toBe(200);
  });

  it('debe retornar 404 si la tarea no existe', async () => {
    const epiDataRes = await request(epiDataApp).delete('/api/tasks/epi-data-id-inexistente');
    expect(epiDataRes.status).toBe(404);
  });
});

describe('GET /health', () => {
  it('debe retornar estado ok', async () => {
    const epiDataRes = await request(epiDataApp).get('/health');
    expect(epiDataRes.status).toBe(200);
    expect(epiDataRes.body.status).toBe('ok');
  });
});
