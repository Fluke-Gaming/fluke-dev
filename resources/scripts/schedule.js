// schedule.js
async function loadEvents() {
  const gameIcons = {
    mtg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
          <path fill-rule="evenodd" d="M81.61 4.73c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73zm-52 0c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73zM6.4 45.32h110.08V21.47c0-.8-.33-1.53-.86-2.07-.53-.53-1.26-.86-2.07-.86H103c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2h10.55c2.57 0 4.9 1.05 6.59 2.74a9.297 9.297 0 0 1 2.74 6.59v92.09c0 2.57-1.05 4.9-2.74 6.59a9.297 9.297 0 0 1-6.59 2.74H9.33c-2.57 0-4.9-1.05-6.59-2.74a9.339 9.339 0 0 1-2.74-6.6V21.47c0-2.57 1.05-4.9 2.74-6.59a9.297 9.297 0 0 1 6.59-2.74H20.6c1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2H9.33c-.8 0-1.53.33-2.07.86-.53.53-.86 1.26-.86 2.07v23.85zm110.08 6.41H6.4v61.82c0 .8.33 1.53.86 2.07.53.53 1.26.86 2.07.86h104.22c.8 0 1.53-.33 2.07-.86.53-.53.86-1.26.86-2.07V51.73zM50.43 18.54c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2h21.49c1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2H50.43z"/>
          </svg>`,
    wow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
          <path fill-rule="evenodd" d="M81.61 4.73c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73zm-52 0c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73zM6.4 45.32h110.08V21.47c0-.8-.33-1.53-.86-2.07-.53-.53-1.26-.86-2.07-.86H103c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2h10.55c2.57 0 4.9 1.05 6.59 2.74a9.297 9.297 0 0 1 2.74 6.59v92.09c0 2.57-1.05 4.9-2.74 6.59a9.297 9.297 0 0 1-6.59 2.74H9.33c-2.57 0-4.9-1.05-6.59-2.74a9.339 9.339 0 0 1-2.74-6.6V21.47c0-2.57 1.05-4.9 2.74-6.59a9.297 9.297 0 0 1 6.59-2.74H20.6c1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2H9.33c-.8 0-1.53.33-2.07.86-.53.53-.86 1.26-.86 2.07v23.85zm110.08 6.41H6.4v61.82c0 .8.33 1.53.86 2.07.53.53 1.26.86 2.07.86h104.22c.8 0 1.53-.33 2.07-.86.53-.53.86-1.26.86-2.07V51.73zM50.43 18.54c-1.77 0-3.2-1.43-3.2-3.2 0-1.77 1.43-3.2 3.2-3.2h21.49c1.77 0 3.2 1.43 3.2 3.2 0 1.77-1.43 3.2-3.2 3.2H50.43z"/>
          </svg>`,
    rust:   `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" class="outline">
              <path fill="#CD412B" d="M48 0H0v48h48V0Z"/>
              <path fill="#1E2020" d="M15.721 21.642 5.52 19.969v10.169l10.202-1.673v-6.823ZM20.839 21.642h-3.412v6.79h3.412v-6.79ZM28.465 15.721 30.138 5.52H19.969l1.672 10.202h6.824ZM28.432 17.427h-6.79v3.412h6.79v-3.412ZM25.053 22.642l-2.413 2.412 2.413 2.413 2.412-2.413-2.412-2.412ZM29.269 34.052l5.987 8.429 7.225-7.225-8.43-5.988-4.782 4.784ZM30.455 25.662l-4.801 4.801 2.412 2.413 4.802-4.802-2.413-2.412Z"/>
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