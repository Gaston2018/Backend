import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from './TaskCard';

const epiDataMockTask = {
  id: 'epi-data-123',
  title: 'Tarea de prueba epi-data',
  description: 'Descripción de prueba',
  status: 'pendiente',
  author: 'Juan epi-data',
  createdAt: '2024-01-15T10:00:00.000Z',
};

describe('TaskCard - epi-data', () => {
  it('renderiza el título, descripción y autor', () => {
    render(<TaskCard task={epiDataMockTask} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Tarea de prueba epi-data')).toBeInTheDocument();
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
    expect(screen.getByText(/Juan epi-data/)).toBeInTheDocument();
  });

  it('muestra el badge de estado correcto', () => {
    render(<TaskCard task={epiDataMockTask} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('llama onEdit al hacer click en Editar', () => {
    const epiDataOnEdit = jest.fn();
    render(<TaskCard task={epiDataMockTask} onEdit={epiDataOnEdit} onDelete={jest.fn()} />);
    fireEvent.click(screen.getByText('Editar'));
    expect(epiDataOnEdit).toHaveBeenCalledWith(epiDataMockTask);
  });

  it('llama onDelete al hacer click en Eliminar', () => {
    const epiDataOnDelete = jest.fn();
    render(<TaskCard task={epiDataMockTask} onEdit={jest.fn()} onDelete={epiDataOnDelete} />);
    fireEvent.click(screen.getByText('Eliminar'));
    expect(epiDataOnDelete).toHaveBeenCalledWith('epi-data-123');
  });
});
