const epiDataApiBase = '/api/tasks';

const epiDataHandleResponse = async (epiDataResponse) => {
  const epiDataData = await epiDataResponse.json();
  if (!epiDataResponse.ok) {
    throw new Error(epiDataData.error || 'Error en la solicitud');
  }
  return epiDataData;
};

export const epiDataGetTasks = async () => {
  const epiDataRes = await fetch(epiDataApiBase);
  const epiDataData = await epiDataHandleResponse(epiDataRes);
  return epiDataData.data;
};

export const epiDataCreateTask = async (epiDataTaskData) => {
  const epiDataRes = await fetch(epiDataApiBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(epiDataTaskData),
  });
  return epiDataHandleResponse(epiDataRes);
};

export const epiDataUpdateTask = async (epiDataId, epiDataTaskData) => {
  const epiDataRes = await fetch(`${epiDataApiBase}/${epiDataId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(epiDataTaskData),
  });
  return epiDataHandleResponse(epiDataRes);
};

export const epiDataDeleteTask = async (epiDataId) => {
  const epiDataRes = await fetch(`${epiDataApiBase}/${epiDataId}`, { method: 'DELETE' });
  return epiDataHandleResponse(epiDataRes);
};
