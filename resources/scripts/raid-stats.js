async function loadRaiderIO() {
    const element = document.getElementById('fluke-raiderio');

    const GUILD  = 'Fluke';
    const REALM  = 'frostmane';
    const REGION = 'us';
    const FIELDS = 'guild_name,realm,region,raid_progression,raid_rankings';
    const URL    = `https://raider.io/api/v1/guilds/profile?region=${REGION}&realm=${REALM}&name=${encodeURIComponent(GUILD)}&fields=${FIELDS}`;

    try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const d = await res.json();
        if (d.statusCode) throw new Error(d.message || 'Guild not found');

        const prog  = d.raid_progression || {};
        const ranks = d.raid_rankings    || {};
        const tiers = Object.entries(prog).slice(0, 3);

        const stats = tiers.map(([key, r]) => {
            const total     = r.total_bosses;
            const hKills    = r.heroic_bosses_killed;
            const nKills    = r.normal_bosses_killed;
            const tierRanks = ranks[key] || null;
            const realmRank = tierRanks?.heroic?.realm ?? '—';
            const worldRank = tierRanks?.heroic?.world ?? '—';

            return `
                    <div class="card__stats">
                    <h4>Raid Progression</h4>
                    <div class="grid grid--2">
                        <p class="card__text"><span class="u-emphasis">${nKills}/${total}</span> Normal</p>
                        <p class="card__text"><span class="u-emphasis">${hKills}/${total}</span> Heroic</p>
                    </div>
                    </div>
                    <div class="card__stats">
                    <h4>Heroic Ranking</h4>
                    <div class="grid grid--2">
                        <p class="card__text"><span class="u-emphasis">#${realmRank}</span> Realm</p>
                        <p class="card__text"><span class="u-emphasis">#${worldRank}</span> World</p>
                    </div>
                    </div>
                    <p class="card__text--footnote">Data via Raider.IO</p>`;
        }).join('');

        element.innerHTML = stats;
        
    } catch (err) {
        grid.innerHTML = `<div class="error">Could not load guild data: ${err.message}</div>`;
    }
}

async function loadWCLRankings() {
    const element = document.getElementById('fluke-warcraftlogs');

    const WORKER_URL = 'https://warcraft-logs.flukegaming57.workers.dev';

    try {
        const res = await fetch(WORKER_URL);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const d = await res.json();
        if (d.error) throw new Error(d.error);

        const colorClass = (color) => `wcl-rank--${color}`;

        element.innerHTML = `
            <div class="card__stats">
                <h4>Progress Ranking</h4>
                <div class="grid grid--3">
                    <p class="card__text">
                        <span class="u-emphasis ${colorClass(d.progress.server?.color)}">#${d.progress.server?.number ?? '—'}</span>
                        Realm
                    </p>
                    <p class="card__text">
                        <span class="u-emphasis ${colorClass(d.progress.region?.color)}">#${d.progress.region?.number ?? '—'}</span>
                        Region
                    </p>
                    <p class="card__text">
                        <span class="u-emphasis ${colorClass(d.progress.world?.color)}">#${d.progress.world?.number ?? '—'}</span>
                        World
                    </p>
                </div>
            </div>
            <div class="card__stats">
                <h4>Speed Ranking</h4>
                <div class="grid grid--2">
                    <p class="card__text">
                        <span class="u-emphasis ${colorClass(d.speed.server?.color)}">#${d.speed.server?.number ?? '—'}</span>
                        Realm
                    </p>
                    <p class="card__text">
                        <span class="u-emphasis ${colorClass(d.speed.world?.color)}">#${d.speed.world?.number ?? '—'}</span>
                        World
                    </p>
                </div>
            </div>
            <p class="card__text--footnote">Data via Warcraft Logs</p>
        `;

    } catch (err) {
        element.innerHTML = `<p class="card__text">Could not load Warcraft Logs data: ${err.message}</p>
            <p class="card__text">Click this tile to visit WCL directly.</p>`;
    }
}

async function loadWCLLastRaid() {
    const element = document.getElementById('fluke-lastraid');

    const WORKER_URL = 'https://warcraft-logs.flukegaming57.workers.dev/lastraid';

    try {
        const res = await fetch(WORKER_URL);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const d = await res.json();
        if (d.error) throw new Error(d.error);

        const bossPills = d.bosses.map(b => {
            const killed  = b.kill;
            const label   = killed
                ? `✓ ${b.name}`
                : b.bestPull !== null
                    ? `✗ ${b.name} (${b.bestPull}%)`
                    : `✗ ${b.name}`;
            const cls = killed ? 'boss-pill--kill' : 'boss-pill--wipe';
            return `<span class="boss-pill ${cls}">${label}</span>`;
        }).join('');

        element.innerHTML = `
            <div class="card__stats">
                <h4>Last raid · ${d.date}</h4>
                <div class="grid grid--2">
                    <p class="card__text"><span class="u-emphasis">${d.kills}/${d.total}</span> Heroic</p>
                    <p class="card__text"><span class="u-emphasis">${d.duration}</span></p>
                </div>
            </div>
            <div class="card__stats">
                <div class="boss-pill-row">${bossPills}</div>
            </div>
            <p class="card__text--footnote">Data via Warcraft Logs</p>
        `;

    } catch (err) {
        element.innerHTML = `<div class="error">Could not load raid data: ${err.message}</div>`;
    }
}

loadWCLLastRaid();

loadRaiderIO();