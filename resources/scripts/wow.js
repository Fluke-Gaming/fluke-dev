// ADD CLASS & ROLE OPTIONS TO DROPDOWNS

function populateDropdown(containerSelector, options) {
  const containers = document.querySelectorAll(containerSelector);
  
  containers.forEach(container => {
    container.innerHTML = '';
    
    options.forEach(({ value, text }) => {
      const item = document.createElement('p');
      item.className = 'select-item';
      item.dataset.value = value;
      item.textContent = text;
      container.appendChild(item);
    });
  });
}

const classOptions = [
  { value: 'death-knight', text: 'Death Knight' },
  { value: 'demon-hunter', text: 'Demon Hunter' },
  { value: 'druid', text: 'Druid' },
  { value: 'evoker', text: 'Evoker' },
  { value: 'hunter', text: 'Hunter' },
  { value: 'mage', text: 'Mage' },
  { value: 'monk', text: 'Monk' },
  { value: 'paladin', text: 'Paladin' },
  { value: 'priest', text: 'Priest' },
  { value: 'rogue', text: 'Rogue' },
  { value: 'shaman', text: 'Shaman' },
  { value: 'warlock', text: 'Warlock' },
  { value: 'warrior', text: 'Warrior' }
];

const roleOptions = [
  { value: 'melee', text: 'Melee DPS' },
  { value: 'ranged', text: 'Ranged DPS' },
  { value: 'healer', text: 'Healer' },
  { value: 'tank', text: 'Tank' }
];

populateDropdown('div[name="class-input"]', classOptions);
populateDropdown('div[name="role-input"]', roleOptions);

// ADD EVENT LISTENERS TO ACTIVATE THE INPUT SELECTORS
const inputSelects = [ 'div[name="main-class"]', 'div[name="main-role"]', 'div[name="main-offspec"]' ];

inputSelects.forEach(selector => {
  const inputContainer = document.querySelector(selector);
  if (!inputContainer) return;

  const input = inputContainer.querySelector('input');
  const dropdown = inputContainer.querySelector('.form-selects');

  if (input && dropdown) {
    input.addEventListener('focus', () => {
      dropdown.style.visibility = 'visible';
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        dropdown.style.visibility = 'hidden';
      }, 200);
    });

    dropdown.addEventListener('click', (e) => {
      if (e.target.classList.contains('select-item')) {
        input.value = e.target.textContent;
        dropdown.style.visibility = 'hidden';
      }
    });

    // Optional: hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!inputContainer.contains(e.target)) {
        dropdown.style.visibility = 'hidden';
      }
    });
  }
});