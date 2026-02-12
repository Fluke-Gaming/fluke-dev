// ADD CLASS & ROLE OPTIONS TO DROPDOWNS

function populateDropdown(containerSelector, options) {
  const containers = document.querySelectorAll(containerSelector);
  if (containers.length === 0) return;
  
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

populateDropdown('.class-options', classOptions);
populateDropdown('.role-options', roleOptions);

// ADD EVENT LISTENERS TO ACTIVATE THE INPUT SELECTORS
const inputSelects = [ 'div[data-name="main-class"]', 'div[data-name="main-role"]', 'div[data-name="main-offspec"]' ];

inputSelects.forEach(selector => {
  const inputContainer = document.querySelector(selector);
  if (!inputContainer) return;

  const input = inputContainer.querySelector('input');
  const display = inputContainer.querySelector('.form-input');
  const dropdown = inputContainer.querySelector('.form-selects');

  if (input && display && dropdown) {
    display.addEventListener('focus', () => {
      dropdown.style.visibility = 'visible';
    });

    display.addEventListener('blur', () => {
      setTimeout(() => {
        dropdown.style.visibility = 'hidden';
      }, 200);
    });

    dropdown.addEventListener('click', (e) => {
      if (e.target.classList.contains('select-item')) {
        display.textContent = e.target.textContent;
        input.value = e.target.dataset.value;
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