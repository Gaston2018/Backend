# epi-data Task Manager

Aplicación full-stack para gestión de tareas. Resuelve el issue #1.

## Stack

- **Backend:** Node.js + Express (REST API)
- **Frontend:** React

## Estructura

```
├── backend/
│   ├── src/
│   │   ├── index.js              # Entry point
│   │   ├── routes/tasks.js       # Rutas REST
│   │   ├── controllers/          # Lógica de controladores
│   │   ├── services/             # Lógica de negocio
│   │   ├── middlewares/          # Validaciones
│   │   └── __tests__/            # Tests unitarios
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js                # Componente raíz
│   │   ├── components/           # TaskForm, TaskList, TaskCard
│   │   └── services/             # Cliente HTTP
│   └── package.json
└── .gitlab-ci.yml
```

## Cómo correr la app

### Backend

```bash
cd backend
npm install
npm start        # http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm start        # http://localhost:3000
```

> El frontend usa proxy hacia `http://localhost:3001` automáticamente.

## API Endpoints

| Método | Ruta              | Descripción          |
|--------|-------------------|----------------------|
| GET    | /api/tasks        | Listar tareas        |
| GET    | /api/tasks/:id    | Obtener tarea por ID |
| POST   | /api/tasks        | Crear tarea          |
| PUT    | /api/tasks/:id    | Actualizar tarea     |
| DELETE | /api/tasks/:id    | Eliminar tarea       |

## Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```
