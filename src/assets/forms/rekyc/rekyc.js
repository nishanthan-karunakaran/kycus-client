let data = {};

async function renderAll() {
  await entityBasicInfo();
  await entityMailingAddress();
  await entityRegisteredAddress();
  await entityType();
  await entitySubCategory();
  await selfEmployedProfessional();
  await natureOfBusiness();
  await businessDetails();
  await natureOfIndustry();
  await entityProofDeclaration();
  await extendedAnnexure();
  await boDetailsTable();
  await ausDetails();
  // await downloadPDF();
}

function entityBasicInfo() {
  if (!data) data = {};
  if (!data.originalData) data.originalData = {};
  if (!data.editedData) data.editedData = {};

  const entityCustId = document.getElementById('entityCustId');
  const entityName = document.getElementById('entityName');
  const entityPan = document.getElementById('entityPan');

  entityCustId.value = data.originalData.entityCustId || '';
  entityName.value = data.originalData.entityName || '';
  entityPan.value = data.originalData.entityDetails?.pan?.panNumber || '';

  // Attach tracking
  attachInputTracking(entityCustId, ['entityCustId']);
  attachInputTracking(entityName, ['entityName']);
  attachInputTracking(entityPan, ['entityDetails', 'pan', 'panNumber']);

  const date = document.getElementById('date-input');
  if (date) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    date.value = `${day}-${month}-${year}`;
    date.readOnly = true;
    date.style.setProperty('color', 'blue', 'important');
  }
}

function entityMailingAddress() {
  // if (data?.editedData?.entityDetails?.entityMailingAddress === undefined) {
  //   // Ensure that editedData and entityDetails are also defined before assigning an empty object to entityMailingAddress
  //   if (!data.editedData) {
  //     data.editedData = {};
  //   }

  //   if (!data.editedData.entityDetails) {
  //     data.editedData.entityDetails = {};
  //   }

  //   data.editedData.entityDetails.entityMailingAddress = {};
  // }

  const mailingAddress = data?.editedData.entityDetails.entityMailingAddress;

  // Checkbox elements
  const noChangeCheckbox = document.getElementById('noChangeInEmailAddress');
  const changeCheckbox = document.getElementById('changeInEmailAddress');

  // Set initial checkbox state
  const updateCheckboxState = () => {
    const type = mailingAddress.addressType;
    if (noChangeCheckbox) noChangeCheckbox.checked = type === 'noChange';
    if (changeCheckbox) changeCheckbox.checked = type === 'change';
  };

  updateCheckboxState();

  if (noChangeCheckbox) {
    noChangeCheckbox.onchange = () => {
      if (noChangeCheckbox.checked) {
        mailingAddress.addressType = 'noChange';
        if (changeCheckbox) changeCheckbox.checked = false;
      } else if (!changeCheckbox?.checked) {
        mailingAddress.addressType = null;
      }
    };
  }

  if (changeCheckbox) {
    changeCheckbox.onchange = () => {
      if (changeCheckbox.checked) {
        mailingAddress.addressType = 'change';
        if (noChangeCheckbox) noChangeCheckbox.checked = false;
      } else if (!noChangeCheckbox?.checked) {
        mailingAddress.addressType = null;
      }
    };
  }

  // Input field binding
  const fields = [
    'shopBidg',
    'roadName',
    'landmark',
    'city',
    'pincode',
    'state',
    'country',
    'telOff',
    'extNo',
    'faxNo',
    'telR',
    'mobNo',
    'emailID',
  ];

  fields.forEach((field) => {
    const input = document.getElementById(`entity-mailing-address-${field}`);
    if (!input) return;

    input.value = mailingAddress[field] || '';

    input.oninput = (e) => {
      mailingAddress[field] = e.target.value.trim();
    };
  });
}

function entityRegisteredAddress() {
  const entityDetails = data?.editedData.entityDetails;

  // Ensure entityRegisteredAddress exists
  if (!entityDetails.entityRegisteredAddress) {
    entityDetails.entityRegisteredAddress = {};
  }

  const registeredAddress = entityDetails.entityRegisteredAddress;
  const mailingAddress = entityDetails.entityMailingAddress || {}; // assumed field for "same as mailing"

  // Checkbox elements for "Owned", "Rented / Leased" and "Same as Mailing Address"
  const owned = document.getElementById('entity-contact-address-owned');
  const rented = document.getElementById('entity-contact-address-rentedLeased');
  const sameAsMailing = document.getElementById('entity-contact-address-sameAsMailingAddress');

  // Input field ids
  const fields = ['shopBidg', 'roadName', 'landmark', 'city', 'pincode', 'state', 'country'];

  // Initialize the input fields
  fields.forEach((field) => {
    const input = document.getElementById(`entity-contact-address-${field}`);
    if (!input) return;

    input.value = registeredAddress[field] || ''; // Set initial value from registeredAddress
    input.disabled = !!sameAsMailing?.checked; // Disable inputs if "Same as Mailing" is checked

    // Handle input changes to update registeredAddress
    input.oninput = (e) => {
      registeredAddress[field] = e.target.value.trim();
    };
  });

  // Checkbox logic: Owned vs Rented
  const updateOwnershipCheckboxState = () => {
    const type = registeredAddress.addressType;
    if (owned) owned.checked = type === 'owned';
    if (rented) rented.checked = type === 'rented';
  };

  // Handle checkbox changes for "Owned"
  if (owned) {
    owned.onchange = () => {
      if (owned.checked) {
        registeredAddress.addressType = 'owned';
        if (rented) rented.checked = false;
      } else if (!rented?.checked) {
        registeredAddress.addressType = null; // or leave it empty/null for clarity
      }
      updateOwnershipCheckboxState();
    };
  }

  // Handle checkbox changes for "Rented / Leased"
  if (rented) {
    rented.onchange = () => {
      if (rented.checked) {
        registeredAddress.addressType = 'rented';
        if (owned) owned.checked = false;
      } else if (!owned?.checked) {
        registeredAddress.addressType = null;
      }
      updateOwnershipCheckboxState();
    };
  }

  // Checkbox logic: Same as mailing address
  if (sameAsMailing) {
    sameAsMailing.onchange = () => {
      const isSame = sameAsMailing.checked;
      // Track the state of the "sameAsMailing" checkbox in registeredAddress
      registeredAddress.sameAsMailing = isSame;

      fields.forEach((field) => {
        const input = document.getElementById(`entity-contact-address-${field}`);
        if (!input) return;

        if (isSame) {
          // If "same as mailing" is checked, copy values from mailingAddress
          input.value = mailingAddress[field] || '';
          registeredAddress[field] = mailingAddress[field] || ''; // Update registeredAddress with mailing data
        }

        // Disable the inputs if "same as mailing" is checked
        input.disabled = isSame;
      });
    };
  }

  // Initialize checkbox states and inputs on page load
  updateOwnershipCheckboxState();

  // Initialize "Same as Mailing" checkbox based on the registeredAddress data
  if (sameAsMailing && registeredAddress.sameAsMailing !== undefined) {
    sameAsMailing.checked = registeredAddress.sameAsMailing;
  }
}

function entityType() {
  const entityTypes = [
    { id: 'proprietorship', label: 'Proprietorship' },
    { id: 'partnership', label: 'Partnership' },
    { id: 'limitedLiabilityPartnership', label: 'Limited Liability Partnership' },
    { id: 'publicPrivateOnePersonCompany', label: 'Public / Private / One Person Company' },
    { id: 'huf', label: 'HUF' },
    { id: 'government', label: 'Government' },
    { id: 'bank', label: 'Bank' },
    { id: 'socities', label: 'Socities' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'selfHelpedGroup', label: 'Self Helped Group' },
    { id: 'foreignBodies', label: 'Foreign Bodies' },
    { id: 'clubs', label: 'Clubs' },
    { id: 'nonGovOrg', label: 'Non-Government Organization' },
    { id: 'mutualFund', label: 'Mutual Fund' },
    { id: 'association', label: 'Association' },
    { id: 'trust', label: 'Trust' },
  ];

  const selectedLabel = data?.originalData.entityType;
  const selector = '#entity-type .checkbox_container';
  const container = document.querySelector(selector);
  container.innerHTML = '';

  entityTypes.forEach(({ id, label }) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox_wrapper';

    const labelDiv = document.createElement('div');
    const labelEl = document.createElement('p');
    labelEl.className = 'text-nowrap';
    labelEl.textContent = label;
    labelDiv.appendChild(labelEl);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = id;
    input.id = id;
    input.checked = label.includes(selectedLabel);

    wrapper.appendChild(input);
    wrapper.appendChild(labelDiv);
    container.appendChild(wrapper);

    input.addEventListener('change', () => {
      document.querySelectorAll(`${selector} input[type="checkbox"]`).forEach((cb) => {
        if (cb !== input) cb.checked = false;
      });
      data.editedData.entityType = input.checked ? label : null;
    });
  });
}

const entitySubCategories = {
  pubPvtLtdCompany: ['Financial Services Company', 'PSU', 'Other'],
  association: ['Business Association', 'Unregistered Association', 'Other Association'],
  government: [
    'Central',
    'State',
    'Local Authorities',
    'State Electricity Boards',
    'Quasi Government Bodies',
    'Other',
  ],
  foreignBodies: [
    'Foreign Govt',
    'Project Office',
    'Branch Office',
    'Liaison Office',
    'Consulates / Embassies',
    'Other',
  ],
  trust: [
    'Charitable Trust',
    'Public Trust',
    'Private Trust',
    'Religious Trust',
    'Educational Trust',
    'PF Trust',
  ],
  bank: ['Indian Commercial Bank', 'Foreign Resident Bank', 'Co-Operative Bank'],
  societies: ['Credit Co-Operative', 'Non Credit Co-Operative', 'Proprietorship'],
};

function entitySubCategory() {
  const container = document.querySelector('#entity-sub-category');
  if (!container) return;

  const allCheckboxes = container.querySelectorAll('.checkbox_wrapper input[type="checkbox"]');
  const preSelected = data?.originalData?.subCategory || '';
  const [categoryRaw, valueRaw] = preSelected.split(':').map((s) => s.trim());
  const isOther = categoryRaw.includes('-others');
  const baseCategory = isOther ? categoryRaw.replace('-others', '') : categoryRaw;

  allCheckboxes.forEach((checkbox) => {
    const wrapper = checkbox.closest('.checkbox_wrapper');
    const textNode = wrapper?.querySelector('.text-nowrap');
    const inputEl = wrapper.querySelector('input[type="text"]');
    const checkboxContainer = checkbox.closest('.checkbox_container');
    const categoryWrapper = checkboxContainer?.parentElement;

    const categoryClass = [...(categoryWrapper?.classList || [])].find(
      (cls) => cls !== 'title' && !cls.includes('container') && !cls.includes('wrapper'),
    );

    // Preselect
    if (categoryClass === baseCategory) {
      const labelText = textNode?.textContent?.trim();

      if (!isOther && labelText === valueRaw) {
        checkbox.checked = true;
      }

      if (isOther && inputEl) {
        checkbox.checked = true;
        inputEl.value = valueRaw;
      }
    }

    // Add change listener
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        allCheckboxes.forEach((cb) => {
          if (cb !== checkbox) {
            cb.checked = false;
            const otherInput = cb.closest('.checkbox_wrapper')?.querySelector('input[type="text"]');
            if (otherInput) otherInput.value = '';
          }
        });

        const isOtherBox = !!inputEl;
        if (isOtherBox) {
          inputEl.focus();
          inputEl.addEventListener('input', () => {
            data.originalData.subCategory = `${categoryClass}-others: ${inputEl.value.trim()}`;
          });
        } else {
          data.originalData.subCategory = `${categoryClass}: ${textNode.textContent.trim()}`;
        }
      } else {
        const anyChecked = [...allCheckboxes].some((cb) => cb.checked);
        if (!anyChecked) {
          data.originalData.subCategory = null;
        }
      }
    });

    // If user types directly into input
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        checkbox.checked = true;
        allCheckboxes.forEach((cb) => {
          if (cb !== checkbox) {
            cb.checked = false;
            const otherInput = cb.closest('.checkbox_wrapper')?.querySelector('input[type="text"]');
            if (otherInput) otherInput.value = '';
          }
        });

        data.originalData.subCategory = `${categoryClass}-others: ${inputEl.value.trim()}`;
      });
    }
  });
}

function selfEmployedProfessional() {
  const container = document.querySelector('#self-employeed-professional');
  if (!container) return;

  const allCheckboxes = container.querySelectorAll('.checkbox_wrapper input[type="checkbox"]');
  const allTextInputs = container.querySelectorAll('.checkbox_wrapper input[type="text"]');

  const preSelected = data?.originalData?.selfEmployeedProfessional || '';

  // Reset initially
  allCheckboxes.forEach((cb) => (cb.checked = false));
  allTextInputs.forEach((input) => (input.value = ''));

  // Pre-select based on existing data
  allCheckboxes.forEach((checkbox) => {
    const wrapper = checkbox.closest('.checkbox_wrapper');
    const label = wrapper?.querySelector('.text-nowrap')?.textContent.trim();
    const inputEl = wrapper.querySelector('input[type="text"]');

    if (preSelected.startsWith('Others:') && inputEl) {
      checkbox.checked = true;
      inputEl.value = preSelected.split(':')[1].trim();
    } else if (label && label === preSelected) {
      checkbox.checked = true;
    }

    // Handle checkbox selection
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        // Uncheck all others
        allCheckboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false;
        });
        allTextInputs.forEach((input) => {
          if (input !== inputEl) input.value = '';
        });

        if (inputEl) {
          inputEl.focus();
          data.originalData.selfEmployeedProfessional = `Others: ${inputEl.value.trim()}`;
        } else {
          data.originalData.selfEmployeedProfessional = label;
        }
      } else {
        data.originalData.selfEmployeedProfessional = null;
      }
    });

    // Handle typing in "Others"
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        checkbox.checked = true;

        allCheckboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false;
        });
        allTextInputs.forEach((input) => {
          if (input !== inputEl) input.value = '';
        });

        data.originalData.selfEmployeedProfessional = `Others: ${inputEl.value.trim()}`;
      });
    }
  });
}

function natureOfBusiness() {
  const container = document.querySelector('#nature-of-business');
  if (!container) return;

  const allCheckboxes = container.querySelectorAll('.checkbox_wrapper input[type="checkbox"]');
  const allTextInputs = container.querySelectorAll('.checkbox_wrapper input[type="text"]');

  const preSelected = data?.originalData?.natureOfBusiness || '';

  // Reset all checkboxes and inputs
  allCheckboxes.forEach((cb) => (cb.checked = false));
  allTextInputs.forEach((input) => (input.value = ''));

  allCheckboxes.forEach((checkbox) => {
    const wrapper = checkbox.closest('.checkbox_wrapper');
    const label = wrapper?.querySelector('.text-nowrap')?.textContent?.trim();
    const inputEl = wrapper.querySelector('input[type="text"]');

    // Pre-selection
    if (preSelected.startsWith('Others:') && inputEl) {
      checkbox.checked = true;
      inputEl.value = preSelected.split(':')[1].trim();
    } else if (label && label === preSelected) {
      checkbox.checked = true;
    }

    // Handle checkbox change
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        allCheckboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false;
        });
        allTextInputs.forEach((input) => {
          if (input !== inputEl) input.value = '';
        });

        if (inputEl) {
          inputEl.focus();
          data.originalData.natureOfBusiness = `Others: ${inputEl.value.trim()}`;
        } else {
          data.originalData.natureOfBusiness = label;
        }
      } else {
        data.originalData.natureOfBusiness = null;
      }
    });

    // Handle "Others" typing
    if (inputEl) {
      inputEl.addEventListener('input', () => {
        checkbox.checked = true;

        allCheckboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false;
        });
        allTextInputs.forEach((input) => {
          if (input !== inputEl) input.value = '';
        });

        data.originalData.natureOfBusiness = `Others: ${inputEl.value.trim()}`;
      });

      // Handle blur: if input is empty, unselect it
      inputEl.addEventListener('blur', () => {
        if (inputEl.value.trim() === '') {
          checkbox.checked = false;
          data.originalData.natureOfBusiness = null;
        }
      });
    }
  });
}

function businessDetails() {
  const section = document.querySelector('#business-details');
  if (!section) return;

  const detailsOfActivityInput = section.querySelector('#detailsOfActivity');
  const dateOfIncorporationInput = section.querySelector('#dateOfIncorporation');
  const annualTurnOverFiguresInput = section.querySelector('#annualTurnOverFigures');
  const annualTurnOverWordsInput = section.querySelector('#annualTurnOverWords');
  const importCheckbox = section.querySelector('#import');
  const exportCheckbox = section.querySelector('#export');

  if (!data.originalData.businessDetails) {
    data.originalData.businessDetails = {};
  }

  // Pre-fill if any data exists
  const dataSet = data?.originalData?.businessDetails || {};

  console.log('dataset', dataSet);

  detailsOfActivityInput.value = dataSet.detailsOfActivity || '';
  dateOfIncorporationInput.value = dataSet.dateOfIncorporation || '';
  annualTurnOverFiguresInput.value = dataSet.annualTurnOverFigures || '';
  annualTurnOverWordsInput.value = dataSet.annualTurnOverWords || '';

  // Set color for inputs only
  const inputs = [
    detailsOfActivityInput,
    dateOfIncorporationInput,
    annualTurnOverFiguresInput,
    annualTurnOverWordsInput,
  ];
  inputs.forEach((input) => {
    if (input) {
      input.style.setProperty('color', 'red', 'important');
    }
  });

  if (dataSet.involvedIn === 'Import') importCheckbox.checked = true;
  else if (dataSet.involvedIn === 'Export') exportCheckbox.checked = true;

  attachInputTracking(detailsOfActivityInput, ['businessDetails', 'detailsOfActivity']);
  attachInputTracking(dateOfIncorporationInput, ['businessDetails', 'dateOfIncorporation']);
  attachInputTracking(annualTurnOverFiguresInput, ['businessDetails', 'annualTurnOverFigures']);
  attachInputTracking(annualTurnOverWordsInput, ['businessDetails', 'annualTurnOverWords']);

  // Checkbox logic (like radio)
  importCheckbox.addEventListener('change', () => {
    if (importCheckbox.checked) {
      exportCheckbox.checked = false;
      data.originalData.businessDetails.involvedIn = 'Import';
    } else {
      data.originalData.businessDetails.involvedIn = '';
    }
  });

  exportCheckbox.addEventListener('change', () => {
    if (exportCheckbox.checked) {
      importCheckbox.checked = false;
      data.originalData.businessDetails.involvedIn = 'Export';
    } else {
      data.originalData.businessDetails.involvedIn = '';
    }
  });
}

function natureOfIndustry() {
  const labels = [
    'Automobile',
    'Restaurants',
    'IT/Software/BPO',
    'Agricultural Commodities',
    'Petrol Pump',
    'Forex Dealer/Bullion',
    'Media / Entertainment',
    'Leasing & Hire Purchase',
    'Contractors',
    'Chit Funds',
    'Construction',
    'Housing Finance',
    'Oil',
    'Fisheries/Poultry',
    'Steel/Hardware',
    'Fertilizers-Chemicals-Seeds-pesticides',
    'Consultancy',
    'Cements/Paints',
    'Dairy/food processing',
    'Electronics-computer hardware',
    'Education',
    'Engineering Goods',
    'Shroff',
    'Issue & Portfolio Management',
    'NBFC',
    'Pharmaceuticals',
    'Textile/Garments',
    'Hospital/Nursing Home/Clinics',
    'Retail Jewelry',
    'Hotels/Resorts',
    'Printing/publishing',
    'FMCG',
    'Furniture/Timber',
    'Consumer Durables',
    'Travel/Touring Agency',
    'Term Lending Institutions',
    'Broking',
    'Money Lender',
    'Marble/Granite',
    'Auto Finance',
    'Advt. Agencies',
    'Transportation / Logistics',
    'Others',
  ];

  const container = document.querySelector('#nature-of-industry .checkbox_container');
  const selectedValue = data?.originalData?.natureOfIndustry || '';
  let othersInput = null;

  labels.forEach((label, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox_wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = `industry`;
    checkbox.id = `industry-${i}`;

    const labelDiv = document.createElement('div');
    const labelText = document.createElement('p');
    labelText.className = 'text-nowrap';
    labelText.textContent = label;

    labelDiv.appendChild(labelText);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(labelDiv);
    container.appendChild(wrapper);

    // Prefill logic
    const isCustomOthers = label === 'Others' && selectedValue && !labels.includes(selectedValue);
    if (selectedValue === label || isCustomOthers) {
      checkbox.checked = true;
      if (isCustomOthers) {
        createAndAttachOthersInput(wrapper, selectedValue);
      }
    }

    checkbox.addEventListener('change', function () {
      const allCheckboxes = container.querySelectorAll('input[type="checkbox"]');
      allCheckboxes.forEach((cb) => {
        if (cb !== checkbox) cb.checked = false;
      });

      if (othersInput && label !== 'Others') {
        othersInput.remove();
        othersInput = null;
      }

      if (checkbox.checked) {
        if (label === 'Others') {
          createAndAttachOthersInput(wrapper);
          data.originalData.natureOfIndustry = '';
        } else {
          data.originalData.natureOfIndustry = label;
        }
      } else {
        data.originalData.natureOfIndustry = '';
        if (othersInput) {
          othersInput.remove();
          othersInput = null;
        }
      }
    });
  });

  function createAndAttachOthersInput(wrapper, prefill = '') {
    othersInput = document.createElement('input');
    othersInput.type = 'text';
    othersInput.placeholder = 'Please specify...';
    othersInput.className = 'others-industry-input';
    othersInput.style.marginTop = '4px';
    othersInput.value = prefill;

    wrapper.appendChild(othersInput);
    othersInput.focus();

    othersInput.addEventListener('input', () => {
      data.originalData.natureOfIndustry = othersInput.value.trim();
    });

    othersInput.addEventListener('blur', () => {
      if (!othersInput.value.trim()) {
        const othersCheckbox = wrapper.querySelector('input[type="checkbox"]');
        if (othersCheckbox) othersCheckbox.checked = false;
        data.originalData.natureOfIndustry = '';
        othersInput.remove();
        othersInput = null;
      }
    });
  }
}

function entityProofDeclaration() {
  const section = document.querySelector('#entity-proof-declaration');

  const inputs = section.querySelectorAll('input');

  // Destructure and assign fields from your data object
  const { addressProof = '', identityProof = '' } = data?.editedData?.entityProofDeclaration || {};

  // Ensure that editedData.entityProofDeclaration exists
  if (!data?.editedData?.entityProofDeclaration) {
    data.editedData.entityProofDeclaration = data?.originalData?.entityDetails || {};
  }

  const panDoc =
    data.originalData.entityProofDeclaration?.pan || data?.originalData?.entityDetails?.pan;
  const coiDoc =
    data.originalData.entityProofDeclaration?.cin || data?.originalData?.entityDetails?.cin;

  // Prefill values
  inputs[0].value = `PAN - ${panDoc?.panNumber}` || '';
  inputs[1].value = `CIN - ${coiDoc?.cinNumber}` || '';
  inputs[2].value = addressProof;
  inputs[3].value = identityProof;

  // Attach input tracking for changes
  function attachInputTracking(inputField, key) {
    inputField.addEventListener('input', (e) => {
      // Update the corresponding field in editedData on input change
      data.editedData.entityProofDeclaration[key] = e.target.value.trim();
      // Optionally, log the change for debugging
      console.log(`Updated ${key}: `, e.target.value.trim());
    });
  }

  // Attach tracking to the input fields
  attachInputTracking(inputs[0], 'entityProof1');
  attachInputTracking(inputs[1], 'entityProof2');
  attachInputTracking(inputs[2], 'addressProof');
  attachInputTracking(inputs[3], 'identityProof');

  const date = document.getElementById('date-input');
  if (date) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    date.value = `${day}-${month}-${year}`;
    date.readOnly = true;
    date.style.setProperty('color', 'blue', 'important');
  }

  // Handle image sources for authorized signatories
  const signatoryImages = section.querySelectorAll('.aus_sign_img');

  signatoryImages.forEach((imgContainer, index) => {
    const signatoryData = data?.originalData?.authorizedSignatoriesDetails?.[index];
    if (signatoryData) {
      const imageUrl = signatoryData?.personalDetails?.documents?.signature?.url || '';

      if (imageUrl) {
        // If URL exists, create the img element and set the src attribute
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Signature of Authorized Signatory ${index + 1}`; // Alt text for better accessibility

        // Append the img to the container
        imgContainer.appendChild(img);
      }
    }
  });
}

function extendedAnnexure() {
  const extended = data?.originalData.extendedAnnexure || {
    basicDetails: {
      entityName: data.originalData.entityName || '',
      entityCustId: data.originalData.entityCustId || '',
    },
    docEntity: {
      cin: data.originalData.entityDetails?.cin?.cinNumber || '',
    },
    mailAddress: {
      cin: data.originalData.entityDetails?.cin?.cinNumber || '',
    },
  };

  const basicLabelKey = {
    aofNo: 'aofNo',
    nameOfEntity: 'entityName',
    custId: 'entityCustId',
  };

  const docEntityLabel = {
    coi: 'cin',
  };

  const mailAddressLabel = {
    coi: 'cin',
  };

  // Correct input color handling based on original vs edited
  const basicDetailsInputColor = (input, key) => {
    const originalValue = extended.basicDetails[basicLabelKey[key]] || '';
    const currentValue = input.value || '';

    if (originalValue !== currentValue) {
      input.style.setProperty('color', 'orange', 'important'); // modified
    } else {
      input.style.setProperty('color', 'blue', 'important'); // untouched
    }
  };

  // Prefill + bind basic details
  const basicFields = ['date', 'aofNo', 'nameOfEntity', 'custId'];
  basicFields.forEach((key) => {
    const input = document.getElementById(`basic-${key}`);
    if (input) {
      input.value = extended.basicDetails[basicLabelKey[key]] || '';

      basicDetailsInputColor(input, key); // Set initial color

      input.addEventListener('input', () => {
        extended.basicDetails[basicLabelKey[key]] = input.value;

        if (!data.editedData) data.editedData = {};
        if (!data.editedData.extendedAnnexure)
          data.editedData.extendedAnnexure = { basicDetails: {} };
        if (!data.editedData.extendedAnnexure.basicDetails)
          data.editedData.extendedAnnexure.basicDetails = {};

        data.editedData.extendedAnnexure.basicDetails[basicLabelKey[key]] = input.value; // store real input value

        basicDetailsInputColor(input, key); // Check color again after typing
      });
    }
  });

  // Prefill + bind document entity
  const docEntityFields = ['coi', 'rc', 'td', 'moa_aoa'];
  docEntityFields.forEach((key) => {
    const input = document.getElementById(`docEntity-${key}`);
    const check = document.getElementById(`docEntity-${key}-check`);

    const labelKey = docEntityLabel[key];

    if (typeof extended.docEntity[labelKey] !== 'undefined') {
      if (check) check.checked = !!extended.docEntity[labelKey];
      if (input && typeof extended.docEntity[labelKey] === 'string') {
        input.value = extended.docEntity[labelKey];
      }
    }

    if (check) {
      check.addEventListener('change', () => {
        if (!check.checked) {
          extended.docEntity[labelKey] = '';
          if (input) input.value = '';
        } else {
          extended.docEntity[labelKey] = input ? input.value || true : true;
        }
      });
    }

    if (input) {
      input.addEventListener('input', () => {
        if (check?.checked) {
          extended.docEntity[labelKey] = input.value;
        }
      });
    }
  });

  // Prefill + bind mailing address
  const mailFields = ['coi', 'rc', 'other'];
  mailFields.forEach((key) => {
    const input = document.getElementById(`mailAddress-${key}`);
    const check = document.getElementById(`mailAddress-${key}-check`);

    const labelKey = mailAddressLabel[key];

    if (typeof extended.mailAddress[labelKey] !== 'undefined') {
      if (check) check.checked = !!extended.mailAddress[labelKey];
      if (input && typeof extended.mailAddress[labelKey] === 'string') {
        input.value = extended.mailAddress[labelKey];
      }
    }

    if (check) {
      check.addEventListener('change', () => {
        if (!check.checked) {
          extended.mailAddress[labelKey] = '';
          if (input) input.value = '';
        } else {
          extended.mailAddress[labelKey] = input ? input.value : '';
        }
      });
    }

    if (input) {
      input.addEventListener('input', () => {
        if (check?.checked) {
          extended.mailAddress[labelKey] = input.value;
        }
      });
    }
  });
}

function boDetailsTable() {
  const boDetails = data?.originalData?.boDetails; // Assuming data.boDetails contains the details
  const container = document.querySelector('#extended-annexure');
  const detailsContainer = document.querySelector('.bo_details');
  const boContainer = document.createElement('div');
  boContainer.classList.add('bo_container');

  const boLength = boDetails.length;

  // Loop for half the length of boDetails
  for (let i = 0; i < Math.ceil(boLength / 2); i++) {
    const boWrapper = document.createElement('div');
    boWrapper.classList.add('bo_wrapper');

    // Define columns with descriptions and keys
    const columns = [
      { label: 'Name of Beneficial Owner', key: 'boName' },
      { label: 'Address - Line', key: 'addressLine' },
      { label: 'Address - City', key: 'city' },
      { label: 'Address - State', key: 'state' },
      { label: 'Address - Country', key: 'country' },
      { label: 'Address - Pincode', key: 'pin' },
    ];

    // Helper to get deep value safely (if needed later)
    function getValueByPath(obj, path) {
      return path.split('.').reduce((acc, part) => acc?.[part], obj);
    }

    // Loop over BOs
    const currentBo = boDetails[i];
    const nextBo = boDetails[i + 1];

    columns.forEach((col) => {
      const row = document.createElement('div');
      row.classList.add('row');

      const descDiv = document.createElement('div');
      descDiv.classList.add('desc');
      const label = document.createElement('p');
      label.innerText = col.label;
      descDiv.appendChild(label);

      // Handle input1 (currentBO)
      const valueDiv1 = document.createElement('div');
      valueDiv1.classList.add('value');
      const input1 = document.createElement('input');
      input1.type = 'text';
      input1.value = currentBo?.[col.key] || '';

      // Attach manual input tracking for input1
      input1.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        const trueOriginalValue1 =
          data.originalData.boDetails?.find((bo) => bo.boId === currentBo.boId)?.[col.key] ?? '';

        // Handle editedData for input1
        if (trueOriginalValue1 === '') {
          if (value) {
            setByPath(data.editedData, ['boDetails', currentBo.boId, col.key], 'own');
          } else {
            deleteByPath(data.editedData, ['boDetails', currentBo.boId, col.key]);
          }
        } else {
          if (value !== trueOriginalValue1) {
            setByPath(data.editedData, ['boDetails', currentBo.boId, col.key], 'modified');
          } else {
            deleteByPath(data.editedData, ['boDetails', currentBo.boId, col.key]);
          }
        }

        // Set color for input1
        if (trueOriginalValue1 === '') {
          input1.style.setProperty('color', value ? '#4b4b4d' : '#4b4b4d', 'important'); // Grey if Own
        } else {
          // Check if the value is different from the original value and update color
          input1.style.setProperty(
            'color',
            value !== trueOriginalValue1 ? '#D97706' : '#2563EB',
            'important',
          ); // Orange if Modified, Blue if Same
        }

        // Update local object for input1
        if (currentBo) currentBo[col.key] = value;

        // Update originalData for input1
        const boIndex = data.originalData.boDetails.findIndex((bo) => bo.boId === currentBo.boId);
        if (boIndex !== -1) {
          data.originalData.boDetails[boIndex][col.key] = value;
        }
      });

      // Set Initial Color for input1
      const trueOriginalValue1 =
        data.originalData.boDetails?.find((bo) => bo.boId === currentBo.boId)?.[col.key] ?? '';
      const trueEditedValue1 = data.editedData.boDetails?.[currentBo.boId]?.[col.key] ?? ''; // Get the value from editedData

      // Adjust logic: If value is modified in `editedData`, color should be orange (modified)
      if (trueEditedValue1 === 'modified') {
        input1.style.setProperty('color', '#D97706', 'important'); // Orange if Modified
      } else if (trueOriginalValue1 === '') {
        input1.style.setProperty('color', input1.value ? '#4b4b4d' : '#4b4b4d', 'important'); // Grey if Own
      } else {
        input1.style.setProperty(
          'color',
          input1.value !== trueOriginalValue1 ? '#D97706' : '#2563EB',
          'important',
        ); // Orange if Modified, Blue if Same
      }

      valueDiv1.appendChild(input1);

      // Handle input2 (nextBo)
      const valueDiv2 = document.createElement('div');
      valueDiv2.classList.add('value');
      const input2 = document.createElement('input');
      input2.type = 'text';

      if (nextBo) {
        input2.value = nextBo[col.key] || '';

        // Attach manual input tracking for input2
        input2.addEventListener('input', (e) => {
          const value = e.target.value.trim();
          const trueOriginalValue2 =
            data.originalData.boDetails?.find((bo) => bo.boId === nextBo.boId)?.[col.key] ?? '';

          // Handle editedData for input2
          if (trueOriginalValue2 === '') {
            if (value) {
              setByPath(data.editedData, ['boDetails', nextBo.boId, col.key], 'own');
            } else {
              deleteByPath(data.editedData, ['boDetails', nextBo.boId, col.key]);
            }
          } else {
            if (value !== trueOriginalValue2) {
              setByPath(data.editedData, ['boDetails', nextBo.boId, col.key], 'modified');
            } else {
              deleteByPath(data.editedData, ['boDetails', nextBo.boId, col.key]);
            }
          }

          // Set color for input2
          if (trueOriginalValue2 === '') {
            input2.style.setProperty('color', value ? '#4b4b4d' : '#4b4b4d', 'important'); // Grey if Own
          } else {
            // Check if the value is different from the original value and update color
            input2.style.setProperty(
              'color',
              value !== trueOriginalValue2 ? '#D97706' : '#2563EB',
              'important',
            ); // Orange if Modified, Blue if Same
          }

          // Update local object for input2
          if (nextBo) nextBo[col.key] = value;

          // Update originalData for input2
          const boIndex2 = data.originalData.boDetails.findIndex((bo) => bo.boId === nextBo.boId);
          if (boIndex2 !== -1) {
            data.originalData.boDetails[boIndex2][col.key] = value;
          }
        });
      } else {
        input2.disabled = true;
      }

      // Set Initial Color for input2
      const trueOriginalValue2 =
        data.originalData.boDetails?.find((bo) => bo.boId === nextBo.boId)?.[col.key] ?? '';
      const trueEditedValue2 = data.editedData.boDetails?.[nextBo.boId]?.[col.key] ?? ''; // Get the value from editedData

      // Adjust logic: If value is modified in `editedData`, color should be orange (modified)
      if (trueEditedValue2 === 'modified') {
        input2.style.setProperty('color', '#D97706', 'important'); // Orange if Modified
      } else if (trueOriginalValue2 === '') {
        input2.style.setProperty('color', input2.value ? '#4b4b4d' : '#4b4b4d', 'important'); // Grey if Own
      } else {
        input2.style.setProperty(
          'color',
          input2.value !== trueOriginalValue2 ? '#D97706' : '#2563EB',
          'important',
        ); // Orange if Modified, Blue if Same
      }

      valueDiv2.appendChild(input2);

      // Final assembly for the row
      row.appendChild(descDiv);
      row.appendChild(valueDiv1);
      row.appendChild(valueDiv2);
      boWrapper.appendChild(row);
    });

    // Append the wrapper to the boContainer
    boContainer.appendChild(boWrapper);

    // Append boContainer to the detailsContainer
    detailsContainer.appendChild(boContainer);
  }
}

function ausDetails() {
  console.log('reached auss');
  const ausData = data?.originalData?.authorizedSignatoriesDetails || [];
  const labels = [
    'Name of the Authorised Signatory',
    "Father's name",
    'Proof of Identity',
    'Proof of Address',
    'Address - Line',
    'Address - City',
    'Address - State',
    'Address - Country',
    'Address - Pincode',
    'Signature',
    'Photograph',
  ];
  const labelKey = {
    'Name of the Authorised Signatory': 'name',
    "Father's name": 'fatherName',
    'Proof of Identity': 'identityProof',
    'Proof of Address': 'addressProof',
    'Address - Line': 'address.line',
    'Address - City': 'address.city',
    'Address - State': 'address.state',
    'Address - Country': 'address.country',
    'Address - Pincode': 'address.pincode',
    Signature: 'signature',
    Photograph: 'photo',
  };

  const toKey = (label) => label.toLowerCase().replace(/[^a-z0-9]/gi, '');

  function getValueByPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  for (let i = 0; i < ausData.length; i += 2) {
    const aus1 = ausData[i];
    const aus2 = ausData[i + 1];

    const pdfPage = document.createElement('div');
    pdfPage.classList.add('pdf-page', 'ausDetail');

    const section = document.createElement('section');
    section.id = 'aus-details';
    section.classList.add('form_section');

    const header = document.createElement('div');
    header.classList.add('header', 'text-center');
    const h4 = document.createElement('h4');
    h4.classList.add('text-black');
    h4.textContent = 'Authorised Signatories details';
    const p = document.createElement('p');
    p.textContent = '{All fields are mandatory}';
    header.appendChild(h4);
    header.appendChild(p);
    section.appendChild(header);

    const container = document.createElement('div');
    container.classList.add('aus_container');

    const table = document.createElement('table');
    table.classList.add('table');
    const tbody = document.createElement('tbody');

    labels.forEach((label, rowIndex) => {
      const tr = document.createElement('tr');

      // Label Column
      const labelTd = document.createElement('td');
      labelTd.innerHTML = `<p>${label}</p>`;
      tr.appendChild(labelTd);
      tr.style.minHeight = '60px';

      tr.appendChild(createAusCell(aus1, label, rowIndex));
      tr.appendChild(createAusCell(aus2, label, rowIndex));

      // Function to create an input or static media display
      function createAusCell(ausData, label, rowIndex) {
        const td = document.createElement('td');
        const div = document.createElement('div');

        // ausData = {
        //   ...ausData,
        //   personalDetails: {
        //     ...ausData.personalDetails,
        //     address: { city: 'chennai' },
        //     documents: {
        //       ...ausData.personalDetails.documents,
        //       photograph: {
        //         url: 'http://3.109.141.220:3002/uploads/ebitaus-CUS62099-26042025/ebitaus-CUS62099-26042025-AUS3/photograph/musk.png',
        //       },
        //     },
        //   },
        // };

        if (rowIndex === 9) {
          // Signature row
          div.className = 'sign_container';

          const wrapper = document.createElement('div');
          wrapper.className = 'sign_wrapper';

          if (ausData?.personalDetails?.documents?.signature?.url) {
            const img = document.createElement('img');
            img.src = ausData.personalDetails.documents.signature.url;
            wrapper.appendChild(img);
          }

          div.appendChild(wrapper);
        } else if (rowIndex === 10) {
          // Photo row
          div.className = 'photo_container';

          const wrapper = document.createElement('div');
          wrapper.className = 'photo_wrapper';

          if (ausData?.personalDetails?.documents?.photograph?.url) {
            const img = document.createElement('img');
            img.src = ausData.personalDetails.documents.photograph.url;
            wrapper.appendChild(img);
          }

          div.appendChild(wrapper);
        } else {
          // Input field for other rows01327E
          const input = document.createElement('input');
          input.type = 'text';

          const key = labelKey[label];

          // Capture true original value once (important)
          const trueOriginalValue = getValueByPath(ausData?.personalDetails, key) ?? '';

          // Set initial input value
          input.value = trueOriginalValue;

          // 🌟 Function to update color based on value
          function updateColor(value) {
            const editedAus = data.editedData.authorizedSignatoriesDetails?.find(
              (aus) => aus.ausId === ausData.ausId,
            );

            const status = editedAus?.personalDetails?.[key];
            console.log('status 123', status, data.editedData.authorizedSignatoriesDetails);

            if (status === 'own') {
              input.style.setProperty('color', '#4b4b4d', 'important'); // Grey for own
            } else if (status === 'modified') {
              input.style.setProperty('color', '#D97706', 'important'); // Orange for modified
            } else {
              input.style.setProperty('color', '#2563EB', 'important'); // Blue if not edited
            }
          }

          // Set initial color
          updateColor(input.value.trim());

          input.addEventListener('input', (e) => {
            const value = e.target.value.trim();

            // 1. Update color immediately
            updateColor(value);

            // 2. Update editedData manually
            let editedAus = data.editedData.authorizedSignatoriesDetails?.find(
              (aus) => aus.ausId === ausData.ausId,
            );

            if (!editedAus) {
              editedAus = { ausId: ausData.ausId, personalDetails: {} };
              data.editedData.authorizedSignatoriesDetails =
                data.editedData.authorizedSignatoriesDetails || [];
              data.editedData.authorizedSignatoriesDetails.push(editedAus);
            }

            if (trueOriginalValue === '') {
              if (value) {
                editedAus.personalDetails[key] = 'own';
              } else {
                delete editedAus.personalDetails[key];
              }
            } else {
              if (value !== trueOriginalValue) {
                editedAus.personalDetails[key] = 'modified';
              } else {
                delete editedAus.personalDetails[key];
              }
            }

            // Clean if no keys left
            if (Object.keys(editedAus.personalDetails).length === 0) {
              const idx = data.editedData.authorizedSignatoriesDetails.indexOf(editedAus);
              if (idx !== -1) data.editedData.authorizedSignatoriesDetails.splice(idx, 1);
            }

            // 3. Bruteforce update ausData and originalData
            if (ausData) {
              ausData.personalDetails[key] = value;
            }

            const ausIndex = data.originalData.authorizedSignatoriesDetails.findIndex(
              (aus) => aus.ausId === ausData.ausId,
            );

            if (ausIndex !== -1) {
              data.originalData.authorizedSignatoriesDetails[ausIndex].personalDetails[key] = value;
            }
          });

          div.appendChild(input);
        }

        td.appendChild(div);
        return td;
      }

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
    section.appendChild(container);
    pdfPage.appendChild(section);
    document.body.appendChild(pdfPage);
  }
}

function downloadPDF() {
  fetch('http://localhost:3000/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify({ data }), // Convert the data object to a JSON string
  })
    .then((response) => {
      if (response.ok) {
        return response.blob(); // Get the PDF file as a Blob
      }
      throw new Error('Failed to generate PDF');
    })
    .then((blob) => {
      // Create a link element to download the file
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = 'report.pdf'; // Set the file name for the download
      link.click(); // Trigger the download
      window.URL.revokeObjectURL(url); // Clean up the object URL
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
