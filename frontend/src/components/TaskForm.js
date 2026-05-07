import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const epiDataInitialState = { title: '', description: '', status: 'pendiente' };
const epiDataStatusOptions = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en-progreso', label: 'En Progreso' },
  { value: 'completada', label: 'Completada' },
];

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [epiDataFormData, setEpiDataFormData] = useState(epiDataInitialState);
  const [epiDataFormError, setEpiDataFormError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setEpiDataFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status,
      });
    } else {
      setEpiDataFormData(epiDataInitialState);
    }
  }, [editingTask]);

  const epiDataHandleChange = (e) => {
    setEpiDataFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const epiDataHandleSubmit = async (e) => {
    e.preventDefault();
    setEpiDataFormError('');
    if (!epiDataFormData.title.trim()) {
      setEpiDataFormError('El título es requerido');
      return;
    }
    try {
      await onSubmit(epiDataFormData);
      setEpiDataFormData(epiDataInitialState);
    } catch (err) {
      setEpiDataFormError(err.message);
    }
  };

  return (
    <form className="epi-data-form" onSubmit={epiDataHandleSubmit}>
      <h2>{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
      {epiDataFormError && <p className="epi-data-form-error">{epiDataFormError}</p>}
      <div className="epi-data-form-group">
        <label htmlFor="epi-data-title">Título *</label>
        <input
          id="epi-data-title"
          name="title"
          value={epiDataFormData.title}
          onChange={epiDataHandleChange}
          placeholder="Nombre de la tarea"
          required
        />
      </div>
      <div className="epi-data-form-group">
        <label htmlFor="epi-data-description">Descripción</label>
        <textarea
          id="epi-data-description"
          name="description"
          value={epiDataFormData.description}
          onChange={epiDataHandleChange}
          placeholder="Descripción opcional"
          rows={3}
        />
      </div>
      <div className="epi-data-form-group">
        <label htmlFor="epi-data-status">Estado</label>
        <select id="epi-data-status" name="status" value={epiDataFormData.status} onChange={epiDataHandleChange}>
          {epiDataStatusOptions.map((epiDataOpt) => (
            <option key={epiDataOpt.value} value={epiDataOpt.value}>{epiDataOpt.label}</option>
          ))}
        </select>
      </div>
      <div className="epi-data-form-actions">
        <button type="submit" className="epi-data-btn-primary">
          {editingTask ? 'Actualizar' : 'Crear Tarea'}
        </button>
        {editingTask && (
          <button type="button" className="epi-data-btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
