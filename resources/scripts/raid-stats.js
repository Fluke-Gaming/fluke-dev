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

loadRaiderIO();