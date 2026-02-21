// Fetch your Worker endpoint
const res = await fetch('https://calendar-proxy.flukegaming57.workers.dev');
const events = await res.json();

const container = document.getElementById('calendar');
container.innerHTML = ''; // Clear previous content

events.forEach(event => {
const startDate = new Date(event.start);
const endDate = event.end ? new Date(event.end) : null;

// Format dates nicely
const options = { weekday: 'short', month: 'short', day: 'numeric' };
const timeOptions = { hour: '2-digit', minute: '2-digit' };

let displayDate;
if (event.start.length === 10) {
    // All-day event
    displayDate = startDate.toLocaleDateString(undefined, options);
} else {
    displayDate = `${startDate.toLocaleDateString(undefined, options)} ${startDate.toLocaleTimeString(undefined, timeOptions)}`;
}

// Create the HTML for this event
const div = document.createElement('div');
div.className = 'event';
div.innerHTML = `
    <h3>${event.title}</h3>
    <p class="date">${displayDate}${endDate ? ' - ' + endDate.toLocaleTimeString(undefined, timeOptions) : ''}</p>
    <p class="description">${event.description || ''}</p>
`;

container.appendChild(div);
});