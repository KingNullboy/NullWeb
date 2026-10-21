<?php
$title = "Ehko Media Player – NullWeb";
$navbarLogoRelPath = "../../";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/meta.php"; ?>
</head>
<body>
<main class="ehko-shell">
    <?php include $_SERVER['DOCUMENT_ROOT'] . "/includes/navbar.php"; ?>

    <header class="ehko-hero">
        <div>
            <p class="eyebrow">LOCAL TOOL / MEDIA</p>
            <h1>Your media, your queue.</h1>
            <p class="intro-copy">Play local files, direct media links, and YouTube videos from one focused playlist.</p>
        </div>
        <div class="ehko-mark" aria-hidden="true">▶</div>
    </header>

    <section class="ehko-import" aria-labelledby="import-title">
        <div class="section-heading"><span class="section-label">01 / IMPORT</span><div><h2 id="import-title">Add something to play</h2><p>Files stay in your browser. URLs are loaded directly from their source.</p></div></div>
        <div id="dropZone" class="ehko-drop-zone">
            <input id="fileInput" type="file" accept="audio/*,video/*" multiple>
            <span class="upload-icon">↑</span>
            <strong>Drop audio or video files here</strong>
            <small>or click to browse multiple files at once</small>
        </div>
        <div class="url-row">
            <label for="urlInput">Media URL or YouTube link<input id="urlInput" type="url" placeholder="https://example.com/audio.mp3 or youtube.com/watch?v=..." autocomplete="url"></label>
            <button id="addUrlButton" class="primary-button" type="button">Add URL <b>+</b></button>
        </div>
        <p id="importError" class="form-error" role="alert" hidden></p>
    </section>

    <section class="ehko-player" aria-labelledby="player-title">
        <div class="player-heading"><div><span class="section-label">02 / PLAYER</span><h2 id="player-title">Now playing</h2></div><span id="playerState" class="status-pill">Waiting</span></div>
        <div class="media-frame">
            <video id="media" preload="metadata" playsinline></video>
            <iframe id="youtube" title="YouTube player" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen hidden></iframe>
            <div id="emptyPlayer" class="empty-player"><span>♪</span><p>Add a track to start listening.</p></div>
        </div>
        <div class="transport">
            <div class="seek-row"><span id="elapsed">0:00</span><input id="seek" type="range" min="0" max="1000" value="0" aria-label="Seek through track"><span id="duration">0:00</span></div>
            <div class="transport-row">
                <div class="transport-group"><button id="previousButton" class="icon-button" type="button" title="Previous">⏮</button><button id="playButton" class="play-button" type="button" title="Play">▶</button><button id="nextButton" class="icon-button" type="button" title="Next">⏭</button></div>
                <div class="transport-group"><button id="backButton" class="text-button" type="button">−10s</button><button id="forwardButton" class="text-button" type="button">+10s</button><button id="shuffleButton" class="text-button" type="button">Shuffle</button><button id="repeatButton" class="text-button" type="button">Repeat off</button><label class="volume-control" for="volume"><span>Vol</span><input id="volume" type="range" min="0" max="1" step="0.05" value="1"></label></div>
            </div>
        </div>
    </section>

    <section class="ehko-queue" aria-labelledby="queue-title">
        <div class="queue-heading"><div><span class="section-label">03 / QUEUE</span><h2 id="queue-title">Playlist</h2></div><div class="queue-actions"><span id="queueCount" class="status-pill">0 tracks</span><button id="clearButton" class="quiet-button" type="button">Clear all</button></div></div>
        <div id="playlist" class="playlist"><div class="queue-empty"><span>+</span><p>Your playlist is empty.</p></div></div>
    </section>
    <p class="ehko-note">Tip: drag tracks to reorder them. Local files are never uploaded.</p>
</main>
<script src="script.js?v=1"></script>
</body>
</html>
