import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="epi-data-empty">
        <p>No hay tareas aún. ¡Crea tu primera tarea!</p>
      </div>
    );
  }

  return (
    <div className="epi-data-task-list">
      <h2>Tareas ({tasks.length})</h2>
      <div className="epi-data-task-grid">
        {tasks.map((epiDataTask) => (
          <TaskCard
            key={epiDataTask.id}
            task={epiDataTask}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
