function sendSaveData() {
  console.log('Iframe received TRIGGER_SAVE', data);
  window.parent.postMessage(
    {
      type: 'SAVE_DATA',
      source: 'kyc-form',
      payload: data || { message: 'nothing loaded yet' },
    },
    '*',
  );
}

function setFormData(payload) {
  data = payload;
  // data = { originalData: payload.originalData };
  // data = { originalData: { entityCustId: 'cust1223', entityName: 'test' } };
  renderAll();
  console.log('data setted', data);
}

window.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};

  switch (type) {
    case 'SET_FORM_DATA':
      setFormData(payload);
      break;
    case 'TRIGGER_SAVE':
      sendSaveData();
      break;
    default:
      break;
  }
});

function getByPath(obj, pathArray) {
  return pathArray.reduce((acc, key) => acc && acc[key], obj);
}

function setByPath(obj, pathArray, value) {
  pathArray.reduce((acc, key, index) => {
    if (index === pathArray.length - 1) {
      acc[key] = value;
    } else {
      if (!acc[key]) acc[key] = {};
    }
    return acc[key];
  }, obj);
}

function deleteByPath(obj, pathArray) {
  if (pathArray.length === 0) return;
  const lastKey = pathArray[pathArray.length - 1];
  const parent = pathArray.slice(0, -1).reduce((acc, key) => acc && acc[key], obj);
  if (parent && parent[lastKey] !== undefined) {
    delete parent[lastKey];
  }
}

function decideColor(pathArray) {
  const status = getByPath(data.editedData, pathArray);

  if (status === 'modified') return 'orange';
  if (status === 'own') return 'black'; // filled by user
  return 'blue'; // pre-filled untouched
}

function attachInputTracking(inputElement, pathArray) {
  // Set initial color on initial render based on the path data
  const initialColor = decideColor(pathArray);
  inputElement.style.setProperty('color', initialColor, 'important');

  inputElement.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const originalValue = getByPath(data.originalData, pathArray);

    // Always update the originalData directly
    setByPath(data.originalData, pathArray, value);

    if (originalValue === undefined || originalValue === null || originalValue === '') {
      if (value) {
        setByPath(data.editedData, pathArray, 'own');
      } else {
        deleteByPath(data.editedData, pathArray);
      }
    } else {
      if (value !== originalValue) {
        setByPath(data.editedData, pathArray, 'modified');
      } else {
        deleteByPath(data.editedData, pathArray);
      }
    }

    // Dynamically update color using setProperty
    const color = decideColor(pathArray);
    inputElement.style.setProperty('color', color, 'important');
  });
}
