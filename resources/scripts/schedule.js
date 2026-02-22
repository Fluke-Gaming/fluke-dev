// schedule.js
async function loadEvents() {
  const gameIcons = {
    mtg: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 257 86" class="logo">
            <path d="M23.8 17.7c-2 17.9-2.4 19.5-4.7 19.1-1.9-.4-3.8-9.8-4-19.7-.1-3.5-.3-6.2-.5-6-.3.3-1 4.5-1.6 9.4-1.6 12.8-2.9 18.3-4.6 18.9-1.9.7-3.1-2.5-4.6-12.3l-1.2-7.6-.7 8C1.5 31.9.9 37.6.6 40.1c-.5 4.6-.4 4.7 3.3 6.4 5.2 2.3 12.4 9.8 15.6 16.4 1.5 2.9 3.5 9.2 4.4 13.9l1.8 8.5.6-6c1.4-13.3 7.8-24.5 17.5-30.8l6.2-4-.6-10c-.8-13-1.9-15.9-2.7-7.4-.7 7-2.4 12.9-3.8 12.9-.4 0-1.2-.8-1.8-1.8-1.1-2-4.1-19.1-4.2-24.1-.1-2-.7 1.3-1.4 7.3-1.8 14.2-2.2 15.8-4.2 15.4-2.2-.4-3-4.6-4.6-21.8L25.5 1.6l-1.7 16.1z"/>
          </svg>`,
    wow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="logo">
            <path fill-opacity=".5" d="M10.844 9.813a1.414 1.414 0 0 0-1.219 1.781l.688 2.344V14l4.719 20.844-.406 2.094a1.413 1.413 0 0 0 1.375 1.687h6.906c.459.002.89-.221 1.156-.594.266.373.697.596 1.156.594l7.781.032c.461-.004.891-.232 1.151-.612s.321-.862.161-1.294l-.781-2.156 3.469-20 1.312-2.75c.213-.44.184-.958-.076-1.372a1.418 1.418 0 0 0-1.205-.66H30.25a1.414 1.414 0 0 0-1.406 1.656l.375 2.125-1.5 8.406-2.469-9.562a1.413 1.413 0 0 0-2.75 0l-2.469 9.844-1.969-8.75.344-2.094A1.413 1.413 0 0 0 17 9.813h-6a1.353 1.353 0 0 0-.156 0zm13.281 24.25.312.938-.344 1.062-.219-1.062z"/>
            <path d="m10.992 11.219.711 2.398 4.766 21.203L16 37.227h6.914l-.477-2.32 1.57-5.953 1.891 6.031-.672 2.242 7.789.016-.957-2.543 3.58-20.532 1.392-2.953-6.78.004.393 2.386-2.646 15.083-4.121-15.906-3.938 15.625-3.312-14.875.374-2.313z"/>
            <path d="M24 1.157c-12.593 0-22.812 10.233-22.812 22.844S11.407 46.844 24 46.844c12.594 0 22.812-10.233 22.812-22.844S36.594 1.157 24 1.157zm-.094 3.937c10.329 0 18.688 8.379 18.688 18.75s-8.359 18.781-18.688 18.781-18.719-8.41-18.719-18.781c.001-10.371 8.39-18.75 18.719-18.75z"/>
            <path fill-opacity=".5" d="M24 .25C10.915.25.281 10.899.281 24S10.915 47.75 24 47.75c13.086 0 23.719-10.649 23.719-23.75S37.086.25 24 .25zM23.906 6c9.837 0 17.781 7.962 17.781 17.844S33.74 41.719 23.906 41.719 6.094 33.723 6.094 23.844 14.069 6 23.906 6z"/>
          </svg>`,
    rust:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="logo">
              <path fill="none" d="M48 0H0v48h48V0Z"/>
              <path d="M15.721 21.642 5.52 19.969v10.169l10.202-1.673v-6.823ZM20.839 21.642h-3.412v6.79h3.412v-6.79ZM28.465 15.721 30.138 5.52H19.969l1.672 10.202h6.824ZM28.432 17.427h-6.79v3.412h6.79v-3.412ZM25.053 22.642l-2.413 2.412 2.413 2.413 2.412-2.413-2.412-2.412ZM29.269 34.052l5.987 8.429 7.225-7.225-8.43-5.988-4.782 4.784ZM30.455 25.662l-4.801 4.801 2.412 2.413 4.802-4.802-2.413-2.412Z"/>
            </svg>`,
    default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
              <path fill-rule="evenodd" d="M81.61 4.73c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73zm-52 0c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73zM6.4 45.32h110.08V21.47c0-.8-.33-1.53-.86-2.07-.53-.53-1.26-.86-2.07-.86H103c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2h10.55c2.57 0 4.9 1.05 6.59 2.74a9.297 9.297 0 0 1 2.74 6.59v92.09c0 2.57-1.05 4.9-2.74 6.59a9.297 9.297 0 0 1-6.59 2.74H9.33c-2.57 0-4.9-1.05-6.59-2.74a9.339 9.339 0 0 1-2.74-6.6V21.47c0-2.57 1.05-4.9 2.74-6.59a9.297 9.297 0 0 1 6.59-2.74H20.6c1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2H9.33c-.8 0-1.53.33-2.07.86-.53.53-.86 1.26-.86 2.07v23.85zm110.08 6.41H6.4v61.82c0 .8.33 1.53.86 2.07.53.53 1.26.86 2.07.86h104.22c.8 0 1.53-.33 2.07-.86.53-.53.86-1.26.86-2.07V51.73zM50.43 18.54c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2h21.49c1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2H50.43z"/>
              </svg>`
  };

  try {
    const res = await fetch('https://calendar-proxy.flukegaming57.workers.dev');
    const events = await res.json();

    const container = document.getElementById('calendar');
    if (!container) return;

    container.innerHTML = ''; // Clear previous content

    events.forEach(event => {
      const startDate = new Date(event.start);
      const endDate = event.end ? new Date(event.end) : null;

      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };

      const game = event.title.toLowerCase().includes('magic') ? 'mtg'
        : event.title.toLowerCase().includes('raiding') ? 'wow'
        : event.title.toLowerCase().includes('rust') ? 'rust'
        : 'default';

      let displayDate;
      if (event.start.length === 10) {
        // All-day event
        displayDate = startDate.toLocaleDateString(undefined, options);
      } else {
        displayDate = `${startDate.toLocaleDateString(undefined, options)} ${startDate.toLocaleTimeString(undefined, timeOptions)}`;
      }

      const div = document.createElement('div');
      div.className = 'event';
      div.innerHTML = `
        <div class="event-icon">
            ${gameIcons[game]}
        </div>
        <div class="event-content">
            <h3>${event.title}</h3>
            <p class="date">${displayDate}${endDate ? ' - ' + endDate.toLocaleTimeString(undefined, timeOptions) : ''}</p>
            <p class="description">${event.description || ''}</p>
        </div>
        `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading events:', err);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadEvents);