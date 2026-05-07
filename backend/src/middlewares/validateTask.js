const epiDataValidStatuses = ['pendiente', 'en-progreso', 'completada'];

const epiDataValidateTask = (req, res, next) => {
  const { title, status, author } = req.body;

  if (req.method === 'POST' && (!title || typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'El campo "title" es requerido y no puede estar vacío' });
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ error: 'El campo "title" debe ser un texto no vacío' });
  }

  if (req.method === 'POST' && (!author || typeof author !== 'string' || author.trim() === '')) {
    return res.status(400).json({ error: 'El campo "author" es requerido y no puede estar vacío' });
  }

  if (author !== undefined && (typeof author !== 'string' || author.trim() === '')) {
    return res.status(400).json({ error: 'El campo "author" debe ser un texto no vacío' });
  }

  if (status !== undefined && !epiDataValidStatuses.includes(status)) {
    return res.status(400).json({
      error: `El campo "status" debe ser uno de: ${epiDataValidStatuses.join(', ')}`,
    });
  }

  next();
};

module.exports = epiDataValidateTask;
