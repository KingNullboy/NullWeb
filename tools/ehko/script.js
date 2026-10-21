(() => {
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    const urlInput = document.getElementById('urlInput');
    const addUrlButton = document.getElementById('addUrlButton');
    const importError = document.getElementById('importError');
    const media = document.getElementById('media');
    const youtube = document.getElementById('youtube');
    const emptyPlayer = document.getElementById('emptyPlayer');
    const playlistElement = document.getElementById('playlist');
    const queueCount = document.getElementById('queueCount');
    const playerState = document.getElementById('playerState');
    const elapsed = document.getElementById('elapsed');
    const duration = document.getElementById('duration');
    const seek = document.getElementById('seek');
    const volume = document.getElementById('volume');
    const playButton = document.getElementById('playButton');
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const repeatButton = document.getElementById('repeatButton');
    const clearButton = document.getElementById('clearButton');

    let tracks = [];
    let currentIndex = -1;
    let repeatMode = 0;
    let shuffle = false;
    let draggedIndex = -1;

    function showError(message) {
        importError.textContent = message;
        importError.hidden = !message;
    }

    function formatTime(value) {
        if (!Number.isFinite(value)) return '0:00';
        const total = Math.max(0, Math.floor(value));
        return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
    }

    function youtubeId(value) {
        try {
            const url = new URL(value);
            if (url.hostname.includes('youtu.be')) return url.pathname.slice(1).split('/')[0];
            if (url.hostname.includes('youtube.com')) {
                if (url.pathname === '/watch') return url.searchParams.get('v');
                if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2];
                if (url.pathname.startsWith('/embed/')) return url.pathname.split('/')[2];
            }
        } catch (_) { return null; }
        return null;
    }

    function addTracks(newTracks) {
        if (!newTracks.length) return;
        tracks.push(...newTracks);
        renderPlaylist();
        if (currentIndex === -1) loadTrack(0, true);
    }

    function addFiles(files) {
        showError('');
        const mediaFiles = Array.from(files).filter(file => file.type.startsWith('audio/') || file.type.startsWith('video/'));
        if (!mediaFiles.length) {
            showError('Choose audio or video files to add.');
            return;
        }
        addTracks(mediaFiles.map(file => ({ name: file.name, type: 'file', src: URL.createObjectURL(file), objectUrl: true })));
    }

    function addUrl() {
        showError('');
        const value = urlInput.value.trim();
        if (!value) {
            showError('Paste a direct media URL or YouTube link first.');
            return;
        }
        let parsed;
        try { parsed = new URL(value); } catch (_) {
            showError('Enter a complete URL beginning with http:// or https://.');
            return;
        }
        const id = youtubeId(value);
        addTracks([{ name: id ? 'YouTube video' : (parsed.pathname.split('/').pop() || parsed.hostname), type: id ? 'youtube' : 'url', src: value, id }]);
        urlInput.value = '';
    }

    function getNextIndex(direction = 1) {
        if (!tracks.length) return -1;
        if (shuffle && tracks.length > 1) {
            const offset = Math.floor(Math.random() * (tracks.length - 1)) + 1;
            return (currentIndex + offset * direction + tracks.length) % tracks.length;
        }
        const next = currentIndex + direction;
        if (next >= 0 && next < tracks.length) return next;
        return repeatMode === 1 ? (direction > 0 ? 0 : tracks.length - 1) : -1;
    }

    function loadTrack(index, autoplay = false) {
        if (index < 0 || index >= tracks.length) return;
        currentIndex = index;
        const track = tracks[index];
        emptyPlayer.hidden = true;
        if (track.type === 'youtube') {
            media.pause();
            media.hidden = true;
            youtube.hidden = false;
            youtube.src = `https://www.youtube.com/embed/${encodeURIComponent(track.id)}?autoplay=${autoplay ? 1 : 0}&rel=0`;
            playerState.textContent = 'YouTube';
        } else {
            youtube.hidden = true;
            youtube.src = 'about:blank';
            media.hidden = false;
            media.src = track.src;
            media.load();
            playerState.textContent = 'Ready';
            if (autoplay) media.play().catch(() => {});
        }
        renderPlaylist();
    }

    function renderPlaylist() {
        queueCount.textContent = `${tracks.length} track${tracks.length === 1 ? '' : 's'}`;
        playlistElement.replaceChildren();
        if (!tracks.length) {
            const empty = document.createElement('div');
            empty.className = 'queue-empty';
            empty.innerHTML = '<span>+</span><p>Your playlist is empty.</p>';
            playlistElement.appendChild(empty);
            return;
        }
        tracks.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item${index === currentIndex ? ' active' : ''}`;
            item.draggable = true;
            item.dataset.index = String(index);
            const play = document.createElement('button');
            play.className = 'track-main';
            play.type = 'button';
            play.innerHTML = `<span class="track-number">${String(index + 1).padStart(2, '0')}</span><span class="track-copy"><strong></strong><small></small></span>`;
            play.querySelector('strong').textContent = track.name;
            play.querySelector('small').textContent = track.type === 'youtube' ? 'YouTube' : track.type === 'url' ? 'Direct URL' : 'Local file';
            play.addEventListener('click', () => loadTrack(index, true));
            const remove = document.createElement('button');
            remove.className = 'remove-track';
            remove.type = 'button';
            remove.title = 'Remove track';
            remove.textContent = '×';
            remove.addEventListener('click', () => removeTrack(index));
            const handle = document.createElement('span');
            handle.className = 'drag-handle';
            handle.textContent = '⠿';
            item.append(play, remove, handle);
            item.addEventListener('dragstart', () => { draggedIndex = index; item.classList.add('is-dragging'); });
            item.addEventListener('dragend', () => { draggedIndex = -1; item.classList.remove('is-dragging'); });
            item.addEventListener('dragover', event => event.preventDefault());
            item.addEventListener('drop', event => { event.preventDefault(); reorder(index); });
            playlistElement.appendChild(item);
        });
    }

    function removeTrack(index) {
        const [removed] = tracks.splice(index, 1);
        if (removed?.objectUrl) URL.revokeObjectURL(removed.src);
        if (!tracks.length) {
            currentIndex = -1;
            media.pause();
            media.removeAttribute('src');
            media.hidden = true;
            youtube.hidden = true;
            emptyPlayer.hidden = false;
            playerState.textContent = 'Waiting';
        } else if (index === currentIndex) {
            loadTrack(Math.min(index, tracks.length - 1), true);
        } else if (index < currentIndex) currentIndex -= 1;
        renderPlaylist();
    }

    function reorder(targetIndex) {
        if (draggedIndex < 0 || draggedIndex === targetIndex) return;
        const [moved] = tracks.splice(draggedIndex, 1);
        tracks.splice(targetIndex, 0, moved);
        if (currentIndex === draggedIndex) currentIndex = targetIndex;
        else if (draggedIndex < currentIndex && targetIndex >= currentIndex) currentIndex -= 1;
        else if (draggedIndex > currentIndex && targetIndex <= currentIndex) currentIndex += 1;
        renderPlaylist();
    }

    function nextTrack() {
        const next = repeatMode === 2 ? currentIndex : getNextIndex();
        if (next >= 0) loadTrack(next, true);
    }

    fileInput.addEventListener('change', () => addFiles(fileInput.files));
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', event => { event.preventDefault(); dropZone.classList.add('is-dragging'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('is-dragging'));
    dropZone.addEventListener('drop', event => { event.preventDefault(); dropZone.classList.remove('is-dragging'); addFiles(event.dataTransfer.files); });
    addUrlButton.addEventListener('click', addUrl);
    urlInput.addEventListener('keydown', event => { if (event.key === 'Enter') addUrl(); });
    playButton.addEventListener('click', () => { if (currentIndex < 0) return; if (media.hidden) return; if (media.paused) media.play(); else media.pause(); });
    previousButton.addEventListener('click', () => { if (media.currentTime > 4) media.currentTime = 0; else { const previous = getNextIndex(-1); if (previous >= 0) loadTrack(previous, true); } });
    nextButton.addEventListener('click', nextTrack);
    backButton.addEventListener('click', () => { media.currentTime = Math.max(0, media.currentTime - 10); });
    forwardButton.addEventListener('click', () => { media.currentTime = Math.min(media.duration || 0, media.currentTime + 10); });
    seek.addEventListener('input', () => { if (media.duration) media.currentTime = (Number(seek.value) / 1000) * media.duration; });
    volume.addEventListener('input', () => { media.volume = Number(volume.value); });
    shuffleButton.addEventListener('click', () => { shuffle = !shuffle; shuffleButton.classList.toggle('active', shuffle); });
    repeatButton.addEventListener('click', () => { repeatMode = (repeatMode + 1) % 3; repeatButton.textContent = ['Repeat off', 'Repeat all', 'Repeat one'][repeatMode]; repeatButton.classList.toggle('active', repeatMode > 0); });
    clearButton.addEventListener('click', () => { tracks.forEach(track => { if (track.objectUrl) URL.revokeObjectURL(track.src); }); tracks = []; removeTrack(-1); renderPlaylist(); });

    media.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(media.duration); });
    media.addEventListener('timeupdate', () => { elapsed.textContent = formatTime(media.currentTime); seek.value = media.duration ? String((media.currentTime / media.duration) * 1000) : '0'; });
    media.addEventListener('play', () => { playButton.textContent = 'Ⅱ'; playerState.textContent = 'Playing'; });
    media.addEventListener('pause', () => { playButton.textContent = '▶'; if (currentIndex >= 0) playerState.textContent = 'Paused'; });
    media.addEventListener('ended', nextTrack);
    renderPlaylist();
})();
