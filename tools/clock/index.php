<?php
$title = "NullClock – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head><?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?></head>
<body>
<main class="clock-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>
    <header class="clock-hero"><div><p class="eyebrow">LOCAL TOOL / TIME</p><h1>Time that works for you.</h1><p class="intro-copy">Keep a world clock, countdowns, alarms, and a stopwatch in one calm workspace.</p></div><div class="clock-mark" aria-hidden="true">◷</div></header>
    <section class="clock-display"><div><span class="section-label">CURRENT TIME</span><div id="timeDisplay" class="time-display">--:--:--</div><p id="dateDisplay" class="date-display">Loading date…</p></div><label class="timezone-field" for="timezoneSelect">Timezone<select id="timezoneSelect"></select></label></section>
    <nav class="clock-tabs" aria-label="Clock tools"><button class="clock-tab active" data-tab="timers" type="button">Timers</button><button class="clock-tab" data-tab="alarms" type="button">Alarms</button><button class="clock-tab" data-tab="stopwatch" type="button">Stopwatch</button></nav>
    <section id="timersTab" class="clock-panel"><div class="panel-heading"><div><span class="section-label">01 / COUNTDOWN</span><h2>Timers</h2></div><span class="status-pill">Local only</span></div><div class="inline-form"><label for="timerMinutes">Minutes<input id="timerMinutes" type="number" min="0" max="999" value="5"></label><label for="timerSeconds">Seconds<input id="timerSeconds" type="number" min="0" max="59" value="0"></label><button id="addTimer" class="primary-button" type="button">Add timer <b>+</b></button></div><div id="timersList" class="clock-list"><div class="list-empty">No timers running.</div></div></section>
    <section id="alarmsTab" class="clock-panel" hidden><div class="panel-heading"><div><span class="section-label">02 / ALERTS</span><h2>Alarms</h2></div><span class="status-pill">Uses local time</span></div><div class="inline-form"><label for="alarmTime">Time<input id="alarmTime" type="time"></label><button id="addAlarm" class="primary-button" type="button">Add alarm <b>+</b></button></div><div id="alarmsList" class="clock-list"><div class="list-empty">No alarms set.</div></div></section>
    <section id="stopwatchTab" class="clock-panel" hidden><div class="panel-heading"><div><span class="section-label">03 / ELAPSED TIME</span><h2>Stopwatch</h2></div><span id="stopwatchState" class="status-pill">Ready</span></div><div id="stopwatchDisplay" class="stopwatch-display">00:00:00.0</div><div class="stopwatch-actions"><button id="swStartPause" class="primary-button" type="button">Start <b>▶</b></button><button id="swLap" class="secondary-button" type="button">Lap</button><button id="swReset" class="secondary-button" type="button">Reset</button></div><div id="laps" class="clock-list"><div class="list-empty">Laps will appear here.</div></div></section>
    <audio id="alarmSound" preload="auto"></audio>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
