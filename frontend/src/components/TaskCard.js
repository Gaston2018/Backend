import React from 'react';
import './TaskCard.css';

const epiDataStatusLabels = {
  'pendiente': { label: 'Pendiente', className: 'epi-data-status-pending' },
  'en-progreso': { label: 'En Progreso', className: 'epi-data-status-progress' },
  'completada': { label: 'Completada', className: 'epi-data-status-done' },
};

function TaskCard({ task, onEdit, onDelete }) {
  const epiDataStatus = epiDataStatusLabels[task.status] || { label: task.status, className: '' };

  return (
    <div className="epi-data-card">
      <div className="epi-data-card-header">
        <h3>{task.title}</h3>
        <span className={`epi-data-badge ${epiDataStatus.className}`}>{epiDataStatus.label}</span>
      </div>
      {task.description && <p className="epi-data-card-desc">{task.description}</p>}
      <div className="epi-data-card-footer">
        <small>{new Date(task.createdAt).toLocaleDateString('es-ES')}</small>
        <div className="epi-data-card-actions">
          <button className="epi-data-btn-edit" onClick={() => onEdit(task)}>Editar</button>
          <button className="epi-data-btn-delete" onClick={() => onDelete(task.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
