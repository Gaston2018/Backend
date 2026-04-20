# Task Manager App

Aplicacion web de gestion de tareas con backend Node.js/Express y frontend HTML+JS puro.

## Requisitos

- Node.js >= 18
- npm >= 8

## Instalacion

```bash
npm install
```

## Correr la app

```bash
npm start
```

Abrir el navegador en: [http://localhost:3000](http://localhost:3000)

## Desarrollo (hot-reload)

```bash
npm run dev
```

## Tests

```bash
npm test
```

## API REST

| Metodo | Endpoint   | Descripcion             |
|--------|------------|-------------------------|
| GET    | /tasks     | Listar todas las tareas |
| POST   | /tasks     | Crear una tarea         |
| PUT    | /tasks/:id | Actualizar una tarea    |
| DELETE | /tasks/:id | Eliminar una tarea      |

### Body para POST / PUT

```json
{
  "title": "Mi tarea",
  "description": "Descripcion opcional",
  "completed": false
}
```
