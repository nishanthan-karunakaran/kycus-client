let data = {};

document.addEventListener('DOMContentLoaded', async function () {
  await fun();
  await entityBasicInfo();
  await entityMailingAddress();
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
        selfEmployeedProfessional: '',
        natureOfBusiness: 'Real Estate',
        natureOfIndustry: 'Engineering Goods',
      },
      businessDetails: {
        detailsOfActivity: 'FinTech',
        dateOfIncorporation: '30/03/20253',
        annualTurnOverFigures: '10,00,00,000',
        annualTurnOverWords: '10 Crores',
        involvedIn: 'Import',
      },
      entityProofDeclaration: {
        entityProof1: 'Certificate of Incorporation',
        entityProof2: 'MOA (Memorandum of Association) ',
        addressProof: 'Electricity Bill',
        identityProof: 'PAN',
        date: '18/4/25',
      },
      extendedAnnexure: {
        basicDetails: {
          date: '18/04/25',
          aofNo: 'AFO1234',
          nameOfEntity: 'Ebitaus',
          custId: 'CUS1234',
        },
        docEntity: {
          coi: 'COI1234',
          rc: '',
          td: '',
          moa_aoa: true,
        },
        mailAddress: {
          coi: 'COI1234',
          rc: '',
          other: 'Pan Doc',
        },
      },
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
      ausData: [
        {
          nameoftheauthorisedsignatory: 'Alice Johnson',
          fathersname: 'Robert Johnson',
          proofofidentity: 'Passport',
          proofofaddress: 'Utility Bill',
          addressline: '123 Baker Street',
          addresscity: 'London',
          addressstate: 'Greater London',
          addresscountry: 'United Kingdom',
          addresspincode: 'NW1 6XE',
          // signature and photograph will be handled separately
        },
        {
          nameoftheauthorisedsignatory: 'Bob Smith',
          fathersname: 'Edward Smith',
          proofofidentity: "Driver's License",
          proofofaddress: 'Bank Statement',
          addressline: '456 Queen Street',
          addresscity: 'Toronto',
          addressstate: 'Ontario',
          addresscountry: 'Canada',
          addresspincode: 'M5V 2B6',
          // signature and photograph will be handled separately
        },
        {
          nameoftheauthorisedsignatory: 'Alice Johnson',
          fathersname: 'Robert Johnson',
          proofofidentity: 'Passport',
          proofofaddress: 'Utility Bill',
          addressline: '123 Baker Street',
          addresscity: 'London',
          addressstate: 'Greater London',
          addresscountry: 'United Kingdom',
          addresspincode: 'NW1 6XE',
          // signature and photograph will be handled separately
        },
        {
          nameoftheauthorisedsignatory: 'Bob Smith',
          fathersname: 'Edward Smith',
          proofofidentity: "Driver's License",
          proofofaddress: 'Bank Statement',
          addressline: '456 Queen Street',
          addresscity: 'Toronto',
          addressstate: 'Ontario',
          addresscountry: 'Canada',
          addresspincode: 'M5V 2B6',
          // signature and photograph will be handled separately
        },
        {
          nameoftheauthorisedsignatory: 'Alice Johnson',
          fathersname: 'Robert Johnson',
          proofofidentity: 'Passport',
          proofofaddress: 'Utility Bill',
          addressline: '123 Baker Street',
          addresscity: 'London',
          addressstate: 'Greater London',
          addresscountry: 'United Kingdom',
          addresspincode: 'NW1 6XE',
          // signature and photograph will be handled separately
        },
        {
          nameoftheauthorisedsignatory: 'Bob Smith',
          fathersname: 'Edward Smith',
          proofofidentity: "Driver's License",
          proofofaddress: 'Bank Statement',
          addressline: '456 Queen Street',
          addresscity: 'Toronto',
          addressstate: 'Ontario',
          addresscountry: 'Canada',
          addresspincode: 'M5V 2B6',
          // signature and photograph will be handled separately
        },
        {
          nameoftheauthorisedsignatory: 'Alice Johnson',
          fathersname: 'Robert Johnson',
          proofofidentity: 'Passport',
          proofofaddress: 'Utility Bill',
          addressline: '123 Baker Street',
          addresscity: 'London',
          addressstate: 'Greater London',
          addresscountry: 'United Kingdom',
          addresspincode: 'NW1 6XE',
          // signature and photograph will be handled separately
        },
        {
          nameoftheauthorisedsignatory: 'Bob Smith',
          fathersname: 'Edward Smith',
          proofofidentity: "Driver's License",
          proofofaddress: 'Bank Statement',
          addressline: '456 Queen Street',
          addresscity: 'Toronto',
          addressstate: 'Ontario',
          addresscountry: 'Canada',
          addresspincode: 'M5V 2B6',
          // signature and photograph will be handled separately
        },
      ],
    },
  };
}

function entityBasicInfo() {
  const entityCustId = document.getElementById('entityCustId');
  const entityName = document.getElementById('entityName');
  const entityPan = document.getElementById('entityPan');
  entityCustId.value = data?.entityCustId || '';
  entityName.value = data?.entityName || '';
  entityPan.value = data?.entityDetails?.pan?.panNumber || '';
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

function selfEmployedProfessional() {
  const container = document.querySelector('#self-employeed-professional');
  if (!container) return;

  const allCheckboxes = container.querySelectorAll('.checkbox_wrapper input[type="checkbox"]');
  const allTextInputs = container.querySelectorAll('.checkbox_wrapper input[type="text"]');

  const preSelected = data.editedData?.entityDetails?.selfEmployeedProfessional || '';

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
          data.editedData.entityDetails.selfEmployeedProfessional = `Others: ${inputEl.value.trim()}`;
        } else {
          data.editedData.entityDetails.selfEmployeedProfessional = label;
        }
      } else {
        data.editedData.entityDetails.selfEmployeedProfessional = null;
      }

      console.log('Updated:', data.editedData.entityDetails.selfEmployeedProfessional);
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

        data.editedData.entityDetails.selfEmployeedProfessional = `Others: ${inputEl.value.trim()}`;
        console.log('Updated:', data.editedData.entityDetails.selfEmployeedProfessional);
      });
    }
  });
}

function natureOfBusiness() {
  const container = document.querySelector('#nature-of-business');
  if (!container) return;

  const allCheckboxes = container.querySelectorAll('.checkbox_wrapper input[type="checkbox"]');
  const allTextInputs = container.querySelectorAll('.checkbox_wrapper input[type="text"]');

  const preSelected = data.editedData?.entityDetails?.natureOfBusiness || '';

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
          data.editedData.entityDetails.natureOfBusiness = `Others: ${inputEl.value.trim()}`;
        } else {
          data.editedData.entityDetails.natureOfBusiness = label;
        }
      } else {
        data.editedData.entityDetails.natureOfBusiness = null;
      }

      console.log('Updated:', data.editedData.entityDetails.natureOfBusiness);
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

        data.editedData.entityDetails.natureOfBusiness = `Others: ${inputEl.value.trim()}`;
        console.log('Updated:', data.editedData.entityDetails.natureOfBusiness);
      });

      // Handle blur: if input is empty, unselect it
      inputEl.addEventListener('blur', () => {
        if (inputEl.value.trim() === '') {
          checkbox.checked = false;
          data.editedData.entityDetails.natureOfBusiness = null;
          console.log('Cleared Others due to empty input');
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

  // Pre-fill if any data exists
  const dataSet = data.editedData?.businessDetails || {};

  detailsOfActivityInput.value = dataSet.detailsOfActivity || '';
  dateOfIncorporationInput.value = dataSet.dateOfIncorporation || '';
  annualTurnOverFiguresInput.value = dataSet.annualTurnOverFigures || '';
  annualTurnOverWordsInput.value = dataSet.annualTurnOverWords || '';

  if (dataSet.involvedIn === 'Import') importCheckbox.checked = true;
  else if (dataSet.involvedIn === 'Export') exportCheckbox.checked = true;

  // Input listeners
  detailsOfActivityInput.addEventListener('input', () => {
    data.editedData.businessDetails.detailsOfActivity = detailsOfActivityInput.value.trim();
    console.log(data.editedData.businessDetails.detailsOfActivity);
  });

  dateOfIncorporationInput.addEventListener('input', () => {
    data.editedData.businessDetails.dateOfIncorporation = dateOfIncorporationInput.value.trim();
    console.log(data.editedData.businessDetails.dateOfIncorporation);
  });

  annualTurnOverFiguresInput.addEventListener('input', () => {
    data.editedData.businessDetails.annualTurnOverFigures = annualTurnOverFiguresInput.value.trim();
    console.log(data.editedData.businessDetails.annualTurnOverFigures);
  });

  annualTurnOverWordsInput.addEventListener('input', () => {
    data.editedData.businessDetails.annualTurnOverWords = annualTurnOverWordsInput.value.trim();
    console.log(data.editedData.businessDetails.annualTurnOverWords);
  });

  // Checkbox logic (like radio)
  importCheckbox.addEventListener('change', () => {
    if (importCheckbox.checked) {
      exportCheckbox.checked = false;
      data.editedData.businessDetails.involvedIn = 'Import';
    } else {
      data.editedData.businessDetails.involvedIn = '';
    }
    console.log(data.editedData.businessDetails.involvedIn);
  });

  exportCheckbox.addEventListener('change', () => {
    if (exportCheckbox.checked) {
      importCheckbox.checked = false;
      data.editedData.businessDetails.involvedIn = 'Export';
    } else {
      data.editedData.businessDetails.involvedIn = '';
    }
    console.log(data.editedData.businessDetails.involvedIn);
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
  const selectedValue = data.editedData?.entityDetails?.natureOfIndustry || '';
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
          data.editedData.entityDetails.natureOfIndustry = '';
        } else {
          data.editedData.entityDetails.natureOfIndustry = label;
        }
      } else {
        data.editedData.entityDetails.natureOfIndustry = '';
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
      data.editedData.entityDetails.natureOfIndustry = othersInput.value.trim();
    });

    othersInput.addEventListener('blur', () => {
      if (!othersInput.value.trim()) {
        const othersCheckbox = wrapper.querySelector('input[type="checkbox"]');
        if (othersCheckbox) othersCheckbox.checked = false;
        data.editedData.entityDetails.natureOfIndustry = '';
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
  const {
    entityProof1 = '',
    entityProof2 = '',
    addressProof = '',
    identityProof = '',
    date = '',
  } = data.editedData?.entityProofDeclaration || {};

  // Prefill values
  inputs[0].value = entityProof1;
  inputs[1].value = entityProof2;
  inputs[2].value = addressProof;
  inputs[3].value = identityProof;
  inputs[4].value = date;

  // Update on input
  inputs[0].addEventListener('input', (e) => {
    data.editedData.entityProofDeclaration.entityProof1 = e.target.value.trim();
  });

  inputs[1].addEventListener('input', (e) => {
    data.editedData.entityProofDeclaration.entityProof2 = e.target.value.trim();
  });

  inputs[2].addEventListener('input', (e) => {
    data.editedData.entityProofDeclaration.addressProof = e.target.value.trim();
  });

  inputs[3].addEventListener('input', (e) => {
    data.editedData.entityProofDeclaration.identityProof = e.target.value.trim();
  });

  inputs[4].addEventListener('input', (e) => {
    data.editedData.entityProofDeclaration.date = e.target.value.trim();
  });
}

function extendedAnnexure() {
  const extended = data.editedData.extendedAnnexure;

  // Prefill + bind basic details
  const basicFields = ['date', 'aofNo', 'nameOfEntity', 'custId'];
  basicFields.forEach((key) => {
    const input = document.getElementById(`basic-${key}`);
    if (input) {
      input.value = extended.basicDetails[key] || '';
      input.addEventListener('input', () => {
        extended.basicDetails[key] = input.value;
      });
    }
  });

  // Prefill + bind document entity
  const docEntityFields = ['coi', 'rc', 'td', 'moa_aoa'];
  docEntityFields.forEach((key) => {
    const input = document.getElementById(`docEntity-${key}`);
    const check = document.getElementById(`docEntity-${key}-check`);

    if (typeof extended.docEntity[key] !== 'undefined') {
      if (check) check.checked = !!extended.docEntity[key];
      if (input && typeof extended.docEntity[key] === 'string') {
        input.value = extended.docEntity[key];
      }
    }

    if (check) {
      check.addEventListener('change', () => {
        if (!check.checked) {
          extended.docEntity[key] = '';
          if (input) input.value = '';
        } else {
          extended.docEntity[key] = input ? input.value || true : true;
        }
      });
    }

    if (input) {
      input.addEventListener('input', () => {
        if (check?.checked) {
          extended.docEntity[key] = input.value;
        }
      });
    }
  });

  // Prefill + bind mailing address
  const mailFields = ['coi', 'rc', 'other'];
  mailFields.forEach((key) => {
    const input = document.getElementById(`mailAddress-${key}`);
    const check = document.getElementById(`mailAddress-${key}-check`);

    if (typeof extended.mailAddress[key] !== 'undefined') {
      if (check) check.checked = !!extended.mailAddress[key];
      if (input && typeof extended.mailAddress[key] === 'string') {
        input.value = extended.mailAddress[key];
      }
    }

    if (check) {
      check.addEventListener('change', () => {
        if (!check.checked) {
          extended.mailAddress[key] = '';
          if (input) input.value = '';
        } else {
          extended.mailAddress[key] = input ? input.value : '';
        }
      });
    }

    if (input) {
      input.addEventListener('input', () => {
        if (check?.checked) {
          extended.mailAddress[key] = input.value;
        }
      });
    }
  });
}

function boDetailsTable() {
  const boDetails = data.editedData.boDetails; // Assuming data.boDetails contains the details
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

    // Handle the pair of BOs for each iteration
    const currentBo = boDetails[i];
    const nextBo = boDetails[i + 1];

    columns.forEach((col) => {
      const row = document.createElement('div');
      row.classList.add('row');

      // Description part (first column)
      const descDiv = document.createElement('div');
      descDiv.classList.add('desc');
      const label = document.createElement('p');
      label.innerText = col.label;
      descDiv.appendChild(label);

      // Value part (second column - for first input of BO[i])
      const valueDiv1 = document.createElement('div');
      valueDiv1.classList.add('value');
      const input1 = document.createElement('input');
      input1.type = 'text';
      input1.value = currentBo[col.key] || ''; // Prefill the value if available
      input1.addEventListener('input', (event) => {
        boDetails[i][col.key] = event.target.value;
      });
      valueDiv1.appendChild(input1);

      // Value part (third column - for second input, either for BO[i+1] or empty)
      const valueDiv2 = document.createElement('div');
      valueDiv2.classList.add('value');
      const input2 = document.createElement('input');
      input2.type = 'text';
      if (nextBo) {
        input2.value = nextBo[col.key] || ''; // Prefill the value if available
        input2.addEventListener('input', (event) => {
          boDetails[i + 1][col.key] = event.target.value;
        });
      } else {
        input2.disabled = true; // If no next BO, disable input
      }
      valueDiv2.appendChild(input2);

      // Append all three parts to the row
      row.appendChild(descDiv);
      row.appendChild(valueDiv1);
      row.appendChild(valueDiv2);

      // Append row to the wrapper
      boWrapper.appendChild(row);
    });

    // Append the wrapper to the boContainer
    boContainer.appendChild(boWrapper);

    // Append boContainer to the detailsContainer
    detailsContainer.appendChild(boContainer);
  }
}

function ausDetails() {
  const ausData = data?.editedData?.ausData || [];
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

  const toKey = (label) => label.toLowerCase().replace(/[^a-z0-9]/gi, '');

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
    const h2 = document.createElement('h2');
    h2.classList.add('text-black');
    h2.textContent = 'Authorised Signatories details';
    const p = document.createElement('p');
    p.textContent = 'All fields are mandatory';
    header.appendChild(h2);
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

      // AUS 1
      const aus1Td = document.createElement('td');
      const aus1Div = document.createElement('div');

      if (rowIndex === 9) {
        aus1Div.className = 'sign_container';
        aus1Div.innerHTML = `<div class="sign_wrapper"></div>`;
      } else if (rowIndex === 10) {
        aus1Div.className = 'photo_container';
        aus1Div.innerHTML = `<div class="photo_wrapper"></div>`;
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        const key = toKey(label);
        input.value = aus1?.[key] || '';
        input.addEventListener('input', (e) => {
          if (aus1) aus1[key] = e.target.value;
        });
        aus1Div.appendChild(input);
      }
      aus1Td.appendChild(aus1Div);
      tr.appendChild(aus1Td);

      // AUS 2
      const aus2Td = document.createElement('td');
      const aus2Div = document.createElement('div');

      if (rowIndex === 9) {
        aus2Div.className = 'sign_container';
        aus2Div.innerHTML = `<div class="sign_wrapper"></div>`;
      } else if (rowIndex === 10) {
        aus2Div.className = 'photo_container';
        aus2Div.innerHTML = `<div class="photo_wrapper"></div>`;
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        const key = toKey(label);
        input.value = aus2?.[key] || '';
        input.addEventListener('input', (e) => {
          if (aus2) aus2[key] = e.target.value;
        });
        aus2Div.appendChild(input);
      }
      aus2Td.appendChild(aus2Div);
      tr.appendChild(aus2Td);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
    section.appendChild(container);
    pdfPage.appendChild(section);
    document.body.appendChild(pdfPage);
  }
}
