import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { epiDataGetTasks, epiDataCreateTask, epiDataUpdateTask, epiDataDeleteTask } from './services/taskService';
import './App.css';

function App() {
  const [epiDataTasks, setEpiDataTasks] = useState([]);
  const [epiDataEditingTask, setEpiDataEditingTask] = useState(null);
  const [epiDataError, setEpiDataError] = useState('');
  const [epiDataLoading, setEpiDataLoading] = useState(false);

  const epiDataFetchTasks = useCallback(async () => {
    setEpiDataLoading(true);
    try {
      const epiDataData = await epiDataGetTasks();
      setEpiDataTasks(epiDataData);
    } catch {
      setEpiDataError('Error al cargar las tareas');
    } finally {
      setEpiDataLoading(false);
    }
  }, []);

  useEffect(() => { epiDataFetchTasks(); }, [epiDataFetchTasks]);

  const epiDataHandleSubmit = async (epiDataTaskData) => {
    setEpiDataError('');
    try {
      if (epiDataEditingTask) {
        await epiDataUpdateTask(epiDataEditingTask.id, epiDataTaskData);
        setEpiDataEditingTask(null);
      } else {
        await epiDataCreateTask(epiDataTaskData);
      }
      epiDataFetchTasks();
    } catch (err) {
      setEpiDataError(err.message || 'Error al guardar la tarea');
    }
  };

  const epiDataHandleDelete = async (epiDataId) => {
    if (!window.confirm('¿Eliminar esta tarea?')) return;
    try {
      await epiDataDeleteTask(epiDataId);
      epiDataFetchTasks();
    } catch {
      setEpiDataError('Error al eliminar la tarea');
    }
  };

  return (
    <div className="epi-data-app">
      <header className="epi-data-header">
        <h1>epi-data Task Manager</h1>
        <p>Gestión de tareas eficiente</p>
      </header>
      <main className="epi-data-main">
        {epiDataError && <div className="epi-data-error">{epiDataError}</div>}
        <TaskForm
          onSubmit={epiDataHandleSubmit}
          editingTask={epiDataEditingTask}
          onCancel={() => setEpiDataEditingTask(null)}
        />
        {epiDataLoading ? (
          <p className="epi-data-loading">Cargando tareas...</p>
        ) : (
          <TaskList
            tasks={epiDataTasks}
            onEdit={setEpiDataEditingTask}
            onDelete={epiDataHandleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
