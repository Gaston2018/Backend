const express = require('express');
const cors = require('cors');
const epiDataTaskRoutes = require('./routes/tasks');

const epiDataApp = express();
const epiDataPort = process.env.PORT || 3001;

epiDataApp.use(cors());
epiDataApp.use(express.json());

epiDataApp.use('/api/tasks', epiDataTaskRoutes);

epiDataApp.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'epi-data-task-manager' });
});

epiDataApp.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// eslint-disable-next-line no-unused-vars
epiDataApp.use((err, _req, res, _next) => {
  console.error('[epi-data] Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

if (require.main === module) {
  epiDataApp.listen(epiDataPort, () => {
    console.log(`[epi-data] Backend corriendo en http://localhost:${epiDataPort}`);
  });
}

module.exports = epiDataApp;
