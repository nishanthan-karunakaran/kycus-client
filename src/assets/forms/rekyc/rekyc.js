let data = {};

document.addEventListener('DOMContentLoaded', async function () {
  await fun();
  await entityBasicInfo();
  await entityMailingAddress();
  await entityType();
  await entitySubCategory();
  await renderNatureOfIndustry();
});

function fun() {
  // fetch('http://3.109.141.220:3002/kycus/rekyc/rekycForm/ebitaus123-123456789-09042025', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
  data = {
    _id: '67f63f970345d33252eb1858',
    entityId: 'ebitaus123-123456789-09042025',
    bankName: 'HDFC Bank',
    entityName: 'EBITAUS PRIVATE LIMITED',
    reason: 'Re-KYC',
    entityType: 'Private',
    entityFilledBy: 'ebitaus123-123456789-09042025-OTHER',
    entityDetails: {
      cin: {
        cinNumber: 'U62099TN2023PTC158659',
        isVerified: false,
        verifiedSource: 'Protean',
        timestamp: '2025-04-09T17:58:18.204Z',
      },
      gstin: {
        gstinNumber: '33AAHCE4484E1ZQ',
        isVerified: true,
        verifiedSource: 'API Sethu',
        timestamp: '2025-04-09T12:43:02.396Z',
      },
      pan: {
        panNumber: 'AAHC1885M',
        isVerified: true,
        verifiedSource: 'OpenAI',
        timestamp: '2025-04-09T11:45:29.994Z',
      },
      iec: {
        iecNumber: '',
        isVerified: false,
        verifiedSource: '',
        timestamp: '',
      },
      businessType: '',
      natureOfBusiness: '',
      natureOfIndustry: '',
      dateOfIncorporation: '',
      annualTurnover: '',
      employeeCount: 0,
      importExport: false,
      status: 'in-progress',
      documents: {
        entityDocs: [
          {
            type: 'PAN',
            fileName: 'Screenshot 2025-04-09 161525.png',
            fileType: 'image/png',
            url: '/uploads\\ebitaus123-123456789-09042025\\entityPan/Screenshot 2025-04-09 161525.png',
            isVerified: false,
            verifiedSource: '',
            timestamp: '2025-04-09T11:45:19.063Z',
          },
          {
            type: 'GSTIN',
            fileName: 'Screenshot 2025-04-09 123904.png',
            fileType: 'image/png',
            url: '/uploads\\ebitaus123-123456789-09042025\\entityGstin/Screenshot 2025-04-09 123904.png',
            isVerified: true,
            verifiedSource: 'Protean',
            timestamp: '2025-04-09T12:42:52.594Z',
          },
          {
            type: 'MOM',
            fileName: 'GEPL-MOA-and-AOA-August.pdf',
            fileType: 'application/pdf',
            url: '/uploads\\ebitaus123-123456789-09042025\\entityDocs/GEPL-MOA-and-AOA-August.pdf',
            isVerified: false,
            verifiedSource: '',
            timestamp: '2025-04-10T09:19:04.969Z',
          },
        ],
        entityProofs: [
          {
            type: 'COI',
            fileName: 'Ebitaus P Ltd - Certificate of Incorporation.pdf',
            fileType: 'application/pdf',
            url: '/uploads\\ebitaus123-123456789-09042025\\entityProofs/Ebitaus P Ltd - Certificate of Incorporation.pdf',
            isVerified: false,
            verifiedSource: '',
            timestamp: '2025-04-09T17:57:57.397Z',
          },
          {
            type: 'MOA',
            fileName: 'GEPL-MOA-and-AOA-August.pdf',
            fileType: 'application/pdf',
            url: '/uploads\\ebitaus123-123456789-09042025\\entityProofs/GEPL-MOA-and-AOA-August.pdf',
            isVerified: false,
            verifiedSource: '',
            timestamp: '2025-04-10T09:39:48.696Z',
          },
          {
            type: 'AOA',
            fileName: 'Tata Communications - MoA-AoA-Amended.pdf',
            fileType: 'application/pdf',
            url: '/uploads\\ebitaus123-123456789-09042025\\entityProofs/Tata Communications - MoA-AoA-Amended.pdf',
            isVerified: false,
            verifiedSource: '',
            timestamp: '2025-04-10T04:59:03.735Z',
          },
        ],
        entityAddressProof: {
          type: 'addressProof',
          fileName: 'Hathway.pdf',
          fileType: 'application/pdf',
          url: '/uploads\\ebitaus123-123456789-09042025\\entityAddressProofs/Hathway.pdf',
          isVerified: true,
          verifiedSource: 'Internal',
          timestamp: '2025-04-11T05:48:39.666Z',
        },
        form32: {
          type: 'form32',
          fileName: 'form32.pdf',
          fileType: 'application/pdf',
          url: '/uploads\\ebitaus123-123456789-09042025\\form32/form32.pdf',
          isVerified: false,
          verifiedSource: '',
          timestamp: '2025-04-10T11:46:09.113Z',
        },
      },
      registeredOfficeAddress: {
        buildingName: 'PM Towers',
        street: 'Greams Road, Thousand Lights',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        pin: '600006',
        landline: '',
        mobile: '9786190876',
        email: 'kumar.nagaraji@ebitaus.com',
        ownership: '',
      },
    },
    authorizedSignatoriesDetails: [
      {
        ausId: 'ebitaus123-123456789-09042025-AUS1',
        name: 'Harichandana',
        email: 'harichandana.vegesna@ebitaus.com',
        emailLink:
          'http://localhost:4020/rekyc/customer/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlYml0YXVzMTIzLTEyMzQ1Njc4OS0wOTA0MjAyNSIsImNvbXBhbnlOYW1lIjoiRWJpdGF1czEyMyIsImN1c3RJZCI6MTIzNDU2Nzg5LCJlbnRpdHlUeXBlIjoiUHJpdmF0ZSIsImlhdCI6MTc0NDE5MTM4MywiZXhwIjoxNzc1NzI3MzgzfQ.fTgp5B4oFlh8JOkJ156Immn9hYDf6_oCiLFLMdtuXzk',
        isVerified: false,
        status: 'pending',
        isSigned: false,
        personalDetails: {
          name: 'Vegesna Harichandana',
          fatherName: '',
          dateOfBirth: '10/04/1996',
          designation: '',
          din: '',
          companyEmail: '',
          mobile: '',
          address: '8-3-169/23 3rd FLOOR, SIDARTH NAGAR, MADHURA NAGAR, HYDERABAD',
          documents: {
            identityProof: {
              type: 'identityProof',
              fileName: 'Image.png',
              fileType: 'image/png',
              url: '/uploads\\ebitaus123-123456789-09042025\\ebitaus123-123456789-09042025-AUS1\\identityProof/Image.png',
              isVerified: true,
              verifiedSource: 'Internal',
              timestamp: '2025-04-11T10:50:07.826Z',
            },
            photograph: {
              type: 'photograph',
              fileName: 'Screenshot 2025-04-11 172215.png',
              fileType: 'image/png',
              url: '/uploads/ebitaus123-123456789-09042025/ebitaus123-123456789-09042025-AUS1/photograph/Screenshot 2025-04-11 172215.png',
              isVerified: false,
              verifiedSource: '',
              timestamp: '2025-04-15T05:47:46.324Z',
            },
            signature: {
              type: 'signature',
              fileName: 'Screenshot 2025-04-11 172310.png',
              fileType: 'image/png',
              url: '/uploads\\ebitaus123-123456789-09042025\\ebitaus123-123456789-09042025-AUS1\\signature/Screenshot 2025-04-11 172310.png',
              isVerified: false,
              verifiedSource: '',
              timestamp: '2025-04-11T12:02:07.177Z',
            },
            addressProof: {
              type: 'addressProof',
              fileName: 'Image4.png',
              fileType: 'image/png',
              url: '/uploads\\ebitaus123-123456789-09042025\\ebitaus123-123456789-09042025-AUS1\\addressProof/Image4.png',
              isVerified: true,
              verifiedSource: 'Internal',
              timestamp: '2025-04-11T12:31:46.488Z',
            },
          },
        },
      },
    ],
    directorDetails: [
      {
        din: '10061417',
        directorName: 'PITCHAI VENKATESH',
        directorEmail: '',
        mailUrl: '',
        isSigned: false,
        status: 'active',
      },
      {
        din: '10099999',
        directorName: '.KOKIL',
        directorEmail: '',
        mailUrl: '',
        isSigned: false,
        status: 'active',
      },
    ],
    boDetails: [
      {
        boName: 'Rajeev Sharma',
        addressLine: 'Flat No 101, Green Residency',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        pin: '500032',
      },
      {
        boName: 'Vikram Rao',
        addressLine: 'A-24, Sector 3',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        pin: '201301',
      },
    ],
    editedData: {
      entityDetails: {
        entityMailingAddress: 'noChangeInEmailAddress',
        entityType: 'Private',
        subCategory: 'pubPvtLtdCompany: Financial Services Company',
      },
    },
  };
}

function entityBasicInfo() {
  const entityCustId = document.getElementById('entityCustId');
  const entityName = document.getElementById('entityName');
  const entityPan = document.getElementById('entityPan');
  entityCustId.value = data.entityCustId;
  entityName.value = data.entityName;
  entityPan.value = data.entityDetails.pan.panNumber;
}

function entityMailingAddress() {
  const noChangeInEmailAddress = document.getElementById('noChangeInEmailAddress');
  const changeInEmailAddress = document.getElementById('changeInEmailAddress');

  const entityMailingAddress = data?.editedData?.entityDetails?.entityMailingAddress;

  console.log(entityMailingAddress);

  noChangeInEmailAddress.checked = entityMailingAddress
    ? entityMailingAddress === 'noChangeInEmailAddress'
    : true;
  changeInEmailAddress.checked = entityMailingAddress
    ? entityMailingAddress === 'changeInEmailAddress'
    : false;
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

  const selectedLabel = data.editedData.entityDetails.entityType;
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
      data.editedData.entityDetails.entityType = input.checked ? label : null;
      console.log(data.editedData.entityDetails.entityType);
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
  const preSelected = data.editedData?.entityDetails?.subCategory || '';
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
            data.editedData.entityDetails.subCategory = `${categoryClass}-others: ${inputEl.value.trim()}`;
          });
        } else {
          data.editedData.entityDetails.subCategory = `${categoryClass}: ${textNode.textContent.trim()}`;
        }
      } else {
        const anyChecked = [...allCheckboxes].some((cb) => cb.checked);
        if (!anyChecked) {
          data.editedData.entityDetails.subCategory = null;
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

        data.editedData.entityDetails.subCategory = `${categoryClass}-others: ${inputEl.value.trim()}`;
      });
    }
  });
}

function renderNatureOfIndustry() {
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

  let natureOfIndustry = '';

  for (let i = 0; i < labels.length; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'checkbox_wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = `industry`;
    checkbox.id = `industry-${i}`;
    checkbox.checked = false;

    const labelDiv = document.createElement('div');
    const labelText = document.createElement('p');
    labelText.className = 'text-nowrap';
    labelText.textContent = labels[i];

    labelDiv.appendChild(labelText);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(labelDiv);
    container.appendChild(wrapper);

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        const allCheckboxes = container.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false;
        });

        natureOfIndustry = labels[i];
        console.log(`Selected nature of industry: ${natureOfIndustry}`);
      } else {
        natureOfIndustry = '';
        console.log(`Cleared selection`);
      }
    });
  }
}
