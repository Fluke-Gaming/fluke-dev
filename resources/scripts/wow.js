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

const inputContainers = document.querySelectorAll('div.dropdown-toggle');

inputContainers.forEach(container => {
  if (!container) return;

  const input = container.querySelector('input');
  const display = container.querySelector('.form-input');
  const dropdown = container.querySelector('.form-selects');

  if (!input || !display || !dropdown) return;

  let hadFocusBeforeClick = false;
  const placeholderText = display.dataset.name || display.textContent;

  // ---------- Helpers ----------
  const showDropdown = () => dropdown.style.visibility = 'visible';
  const hideDropdown = () => dropdown.style.visibility = 'hidden';

  const createClearBtn = () => {
    if (!display.querySelector('.clear-btn')) {
      const clear = document.createElement('span');
      clear.textContent = '×';
      clear.className = 'clear-btn';
      display.appendChild(clear);
    }
  };

  const removeClearBtn = () => {
    const btn = display.querySelector('.clear-btn');
    if (btn) btn.remove();
  };

  const resetDisplay = () => {
    display.textContent = placeholderText;
    display.classList.add('placeholder');
    input.value = '';
    removeClearBtn();
  };

  // ---------- Track focus before click ----------
  display.addEventListener('mousedown', () => {
    hadFocusBeforeClick = (document.activeElement === display);
  });

  // ---------- Focus ----------
  display.addEventListener('focus', () => {
    showDropdown();
  });

  // ---------- Blur ----------
  display.addEventListener('blur', () => {
    setTimeout(hideDropdown, 200); // allow dropdown clicks before closing
  });

  // ---------- Click on display ----------
  display.addEventListener('click', (e) => {
    const clear = e.target.closest('.clear-btn');
    if (clear) {
      // clear button clicked — reset display, do not toggle
      e.stopPropagation();
      resetDisplay();
      return;
    }

    e.stopPropagation();

    // only toggle if the display was already focused
    if (hadFocusBeforeClick) {
      setTimeout(() => {
        const isOpen = dropdown.style.visibility === 'visible';
        dropdown.style.visibility = isOpen ? 'hidden' : 'visible';
      }, 100); // delay fixes first-click race with focus
    }
  });

  // ---------- Click on dropdown items ----------
  dropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-item')) {
      display.textContent = e.target.textContent;
      input.value = e.target.dataset.value;
      display.classList.remove('placeholder');
      createClearBtn();
      display.blur(); // close dropdown
    }
  });

  // ---------- Click outside ----------
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      hideDropdown();
    }
  });
});


// remove disabled class if alt checkbox is checked
const checkboxContainer = document.querySelector('div.alt-checkbox');
if (checkboxContainer) {
  const checkbox = checkboxContainer.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    const altLabel = checkboxContainer.querySelector('label');
    if (checkbox.checked) {
      altLabel.classList.remove('placeholder');
    } else {
      altLabel.classList.add('placeholder');
    }

    const altContainers = document.querySelectorAll('.alt-checkbox');
    altContainers.forEach(alt => {
      if (checkbox.checked) {
        alt.classList.remove('disabled');
      } else {
        alt.classList.add('disabled');
        // also reset any selected values in the alt dropdowns
        const altInputs = alt.querySelectorAll('input[type="hidden"]');
        altInputs.forEach(input => input.value = '');
        const altDisplays = alt.querySelectorAll('.form-input');
        altDisplays.forEach(display => {
          display.textContent = display.dataset.name || display.textContent;
          display.classList.add('placeholder');
          const clearBtn = display.querySelector('.clear-btn');
          if (clearBtn) clearBtn.remove();
        });
      }
    });
  });
}