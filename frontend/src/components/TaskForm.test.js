import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from './TaskForm';

describe('TaskForm - epi-data', () => {
  it('renderiza el formulario de nueva tarea', () => {
    render(<TaskForm onSubmit={jest.fn()} editingTask={null} onCancel={jest.fn()} />);
    expect(screen.getByText('Nueva Tarea')).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
  });

  it('muestra error si se envía sin título', async () => {
    render(<TaskForm onSubmit={jest.fn()} editingTask={null} onCancel={jest.fn()} />);
    fireEvent.click(screen.getByText('Crear Tarea'));
    await waitFor(() => {
      expect(screen.getByText('El título es requerido')).toBeInTheDocument();
    });
  });

  it('llama onSubmit con los datos correctos', async () => {
    const epiDataMockSubmit = jest.fn().mockResolvedValue();
    render(<TaskForm onSubmit={epiDataMockSubmit} editingTask={null} onCancel={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Tarea epi-data test' } });
    fireEvent.click(screen.getByText('Crear Tarea'));
    await waitFor(() => {
      expect(epiDataMockSubmit).toHaveBeenCalledWith(expect.objectContaining({ title: 'Tarea epi-data test' }));
    });
  });

  it('muestra modo edición cuando se pasa editingTask', () => {
    const epiDataTask = { id: '1', title: 'Editar epi-data', description: '', status: 'pendiente' };
    render(<TaskForm onSubmit={jest.fn()} editingTask={epiDataTask} onCancel={jest.fn()} />);
    expect(screen.getByText('Editar Tarea')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Editar epi-data')).toBeInTheDocument();
  });
});
