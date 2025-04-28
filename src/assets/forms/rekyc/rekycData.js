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
  // let temp = payload.editedData;
  // delete temp.authorizedSignatoriesDetails;
  // delete temp.boDetails;
  // data = { originalData: payload.originalData, editedData: temp };
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
  return pathArray.reduce((acc, key) => {
    if (acc === undefined || acc === null) return undefined;
    if (typeof key === 'object' && key.findById !== undefined) {
      return Array.isArray(acc) ? acc.find((item) => item.ausId === key.findById) : undefined;
    }
    return acc[key];
  }, obj);
}

function setByPath(obj, pathArray, value) {
  pathArray.reduce((acc, key, index) => {
    if (index === pathArray.length - 1) {
      // Handling special case for finding by ID
      if (typeof key === 'object' && key.findById !== undefined) {
        console.log('bogot 2');
        const item = acc.find((item) => item.ausId === key.findById);
        if (item) item[pathArray[index + 1]] = value; // Set the value on the specific field
      } else {
        console.log('bogot 3');
        acc[key] = value;
      }
    } else {
      if (typeof key === 'object' && key.findById !== undefined) {
        console.log('bogot 4');
        const item = acc.find((item) => item.ausId === key.findById);
        if (item) return item;
        else return {};
      }
      if (!acc[key]) acc[key] = {};
      return acc[key];
    }
  }, obj);
}

function deleteByPath(obj, pathArray) {
  if (pathArray.length === 0) return;
  const lastKey = pathArray[pathArray.length - 1];
  const parent = pathArray.slice(0, -1).reduce((acc, key) => {
    if (acc === undefined || acc === null) return undefined;
    if (typeof key === 'object' && key.findById !== undefined) {
      return Array.isArray(acc) ? acc.find((item) => item.ausId === key.findById) : undefined;
    }
    return acc[key];
  }, obj);

  if (parent && parent[lastKey] !== undefined) {
    delete parent[lastKey];
  }
}

function decideColor(pathArray) {
  const status = getByPath(data.editedData, pathArray);

  if (status === 'modified') return '#D97706';
  if (status === 'own') return '#4b4b4d'; // filled by user
  return '#01327E'; // pre-filled untouched
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
