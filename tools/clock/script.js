(() => {
    const timeDisplay = document.getElementById('timeDisplay');
    const dateDisplay = document.getElementById('dateDisplay');
    const timezoneSelect = document.getElementById('timezoneSelect');
    const timers = [];
    const alarms = [];
    let stopwatch = 0;
    let stopwatchStarted = 0;
    let stopwatchInterval = null;
    let lapNumber = 0;

    function beep() {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = 740;
        gain.gain.setValueAtTime(0.001, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.55);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.6);
        oscillator.addEventListener('ended', () => context.close());
    }

    const localOption = new Option('Local timezone', 'local');
    timezoneSelect.appendChild(localOption);
    (Intl.supportedValuesOf ? Intl.supportedValuesOf('timeZone') : []).forEach(zone => timezoneSelect.appendChild(new Option(zone.replaceAll('_', ' '), zone)));
    const savedZone = localStorage.getItem('nullclock-zone');
    timezoneSelect.value = savedZone && [...timezoneSelect.options].some(option => option.value === savedZone) ? savedZone : 'local';
    timezoneSelect.addEventListener('change', () => { localStorage.setItem('nullclock-zone', timezoneSelect.value); updateClock(); });

    function updateClock() {
        const zone = timezoneSelect.value === 'local' ? undefined : timezoneSelect.value;
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: zone });
        dateDisplay.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: zone });
        const localTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        alarms.forEach(alarm => { if (alarm.enabled && alarm.time === localTime && alarm.last !== now.toDateString()) { alarm.last = now.toDateString(); beep(); alarm.row.classList.add('ringing'); } });
    }
    setInterval(updateClock, 1000); updateClock();

    document.querySelectorAll('.clock-tab').forEach(tab => tab.addEventListener('click', () => {
        document.querySelectorAll('.clock-tab').forEach(item => item.classList.toggle('active', item === tab));
        document.querySelectorAll('.clock-panel').forEach(panel => { panel.hidden = panel.id !== `${tab.dataset.tab}Tab`; });
    }));

    function emptyState(container, text) { if (!container.children.length) { const empty = document.createElement('div'); empty.className = 'list-empty'; empty.textContent = text; container.appendChild(empty); } }
    function formatTimer(seconds) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }
    document.getElementById('addTimer').addEventListener('click', () => {
        const minutes = Math.max(0, Number(document.getElementById('timerMinutes').value) || 0);
        const seconds = Math.min(59, Math.max(0, Number(document.getElementById('timerSeconds').value) || 0));
        const total = minutes * 60 + seconds;
        if (!total) return;
        const list = document.getElementById('timersList'); list.replaceChildren();
        const timer = { remaining: total, running: false, interval: null };
        const row = document.createElement('div'); row.className = 'clock-item';
        const label = document.createElement('strong'); label.textContent = formatTimer(total);
        const start = document.createElement('button'); start.className = 'small-button'; start.textContent = 'Start';
        const remove = document.createElement('button'); remove.className = 'small-button danger'; remove.textContent = 'Remove';
        row.append(label, start, remove); list.prepend(row); timer.row = row; timers.push(timer);
        start.addEventListener('click', () => { if (timer.running) { clearInterval(timer.interval); timer.running = false; start.textContent = 'Resume'; return; } timer.running = true; start.textContent = 'Pause'; timer.interval = setInterval(() => { timer.remaining--; label.textContent = timer.remaining > 0 ? formatTimer(timer.remaining) : 'Done'; if (timer.remaining <= 0) { clearInterval(timer.interval); timer.running = false; start.textContent = 'Dismiss'; beep(); row.classList.add('ringing'); } }, 1000); });
        remove.addEventListener('click', () => { clearInterval(timer.interval); row.remove(); timers.splice(timers.indexOf(timer), 1); emptyState(list, 'No timers running.'); });
    });

    document.getElementById('addAlarm').addEventListener('click', () => { const time = document.getElementById('alarmTime').value; if (!time) return; const list = document.getElementById('alarmsList'); list.querySelector('.list-empty')?.remove(); const alarm = { time, enabled: true, last: '' }; const row = document.createElement('div'); row.className = 'clock-item'; const label = document.createElement('strong'); label.textContent = time; const toggle = document.createElement('button'); toggle.className = 'small-button'; toggle.textContent = 'Enabled'; const remove = document.createElement('button'); remove.className = 'small-button danger'; remove.textContent = 'Remove'; row.append(label, toggle, remove); list.appendChild(row); alarm.row = row; alarms.push(alarm); toggle.addEventListener('click', () => { alarm.enabled = !alarm.enabled; toggle.textContent = alarm.enabled ? 'Enabled' : 'Paused'; row.classList.toggle('muted', !alarm.enabled); }); remove.addEventListener('click', () => { row.remove(); alarms.splice(alarms.indexOf(alarm), 1); emptyState(list, 'No alarms set.'); }); });

    function renderStopwatch() { const total = stopwatch / 10; const hours = Math.floor(total / 3600); const minutes = Math.floor((total % 3600) / 60); const seconds = Math.floor(total % 60); const tenths = stopwatch % 10; document.getElementById('stopwatchDisplay').textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`; }
    document.getElementById('swStartPause').addEventListener('click', event => { if (stopwatchInterval) { clearInterval(stopwatchInterval); stopwatchInterval = null; event.currentTarget.innerHTML = 'Resume <b>▶</b>'; document.getElementById('stopwatchState').textContent = 'Paused'; return; } stopwatchStarted = performance.now() - stopwatch * 100; stopwatchInterval = setInterval(() => { stopwatch = Math.floor((performance.now() - stopwatchStarted) / 100); renderStopwatch(); }, 50); event.currentTarget.innerHTML = 'Pause <b>Ⅱ</b>'; document.getElementById('stopwatchState').textContent = 'Running'; });
    document.getElementById('swLap').addEventListener('click', () => { if (!stopwatch) return; const list = document.getElementById('laps'); list.querySelector('.list-empty')?.remove(); lapNumber++; const row = document.createElement('div'); row.className = 'clock-item'; row.innerHTML = `<span>Lap ${lapNumber}</span><strong>${document.getElementById('stopwatchDisplay').textContent}</strong>`; list.prepend(row); });
    document.getElementById('swReset').addEventListener('click', () => { clearInterval(stopwatchInterval); stopwatchInterval = null; stopwatch = 0; lapNumber = 0; renderStopwatch(); document.getElementById('swStartPause').innerHTML = 'Start <b>▶</b>'; document.getElementById('stopwatchState').textContent = 'Ready'; document.getElementById('laps').innerHTML = '<div class="list-empty">Laps will appear here.</div>'; });
})();
