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

window.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};

  switch (type) {
    case 'SET_FORM_DATA':
      data = payload;
      // data = { originalData: { entityCustId: 'cust1223', entityName: 'test' } };
      renderAll();
      console.log('data setted', data);
      break;
    case 'TRIGGER_SAVE':
      sendSaveData();
      break;

    default:
      break;
  }
});
