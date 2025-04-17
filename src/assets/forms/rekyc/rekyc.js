document.addEventListener('DOMContentLoaded', function () {
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
});
