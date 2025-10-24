document.addEventListener('DOMContentLoaded', () => {
  const geoapifyKey = "69f719bfe604441f9b8ed2264f23b0a8"; // get a free key from geoapify.com
  const ALERT_RADIUS_M = 1000; // radius to search in meters
  let lastAlerts = [];

  var lat;
  var lon;

  // --- Map init ---
  const map = L.map('map').setView([39.5, -98.35], 4);

  const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'OSM' });
  const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'ESRI' });
  streets.addTo(map);
  L.control.layers({ "Streets": streets, "Satellite": satellite }).addTo(map);

  // --- UI elements ---
  const markerListDiv = document.getElementById('markerList');
  const policeAlertsDiv = document.getElementById('policeAlerts');
  const speedDisplay = document.getElementById('speedDisplay');

  // voice toggles
  const voiceToggle = document.getElementById('voiceToggle');
  const screamToggle = document.getElementById('screamToggle');
  let voiceEnabled = voiceToggle.checked;
  let screamEnabled = screamToggle.checked;
  voiceToggle.addEventListener('change', () => voiceEnabled = voiceToggle.checked);
  screamToggle.addEventListener('change', () => screamEnabled = screamToggle.checked);

  // --- Markers ---
  const markers = [];
  map.on('click', e => {
    const title = prompt("Enter marker title:");
    if (!title) return;
    L.marker(e.latlng).addTo(map).bindPopup(title);
    markers.push({ lat: e.latlng.lat, lng: e.latlng.lng, title });
    updateMarkerList();
  });
  document.getElementById('exportMarkers').addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(markers, null, 2)).then(() => alert("Markers copied!"));
  });
  function updateMarkerList() {
    markerListDiv.innerHTML = markers.map((m, i) => `${i + 1}. ${escapeHtml(m.title)} (${m.lat.toFixed(4)}, ${m.lng.toFixed(4)})`).join('<br>');
  }
  function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }

  // --- Search (LocationIQ) ---
  const locIQKey = "pk.60fb9d576b3af312a1118708e66c1d62";
  document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    try {
      const res = await fetch(`https://us1.locationiq.com/v1/search.php?key=${locIQKey}&q=${encodeURIComponent(query)}&format=json`);
      const data = await res.json();
      if (!data || data.length === 0) { alert("Location not found"); return; }
      const loc = data[0];
      map.setView([parseFloat(loc.lat), parseFloat(loc.lon)], 16);
      L.marker([parseFloat(loc.lat), parseFloat(loc.lon)]).addTo(map).bindPopup(loc.display_name).openPopup();
    } catch (e) {
      console.error(e);
      alert("Search failed");
    }
  });

  // --- Directions (Leaflet Routing Machine) ---
  let routingControl = null;
  let activeRoute = null;            // holds last route object from LRM
  let routePolyline = null;          // L.Polyline of current route
  let routeManeuvers = [];           // built maneuvers (latlng, text, announced, arrived)
  document.getElementById('dirBtn').addEventListener('click', () => {
    if (routingControl) map.removeControl(routingControl);
    alert("Click start and end markers for route");
    const points = [];
    const clickHandler = e => {
      points.push(e.latlng);
      L.marker(e.latlng).addTo(map).bindPopup(points.length === 1 ? "Start" : "End").openPopup();
      if (points.length === 2) {
        routingControl = L.Routing.control({
          waypoints: points,
          routeWhileDragging: true,
          showAlternatives: false,
          fitSelectedRoute: true
        }).addTo(map);

        // When routes are found, extract geometry and build maneuvers
        routingControl.on('routesfound', function (e) {
          activeRoute = e.routes[0];
          buildRoutePolyline(activeRoute);
          buildManeuversFromPolyline();
          announceRouteReady();
        });

        map.off('click', clickHandler);
      }
    };
    map.on('click', clickHandler);
  });

  // Build L.Polyline for route coords and add to map (replace old)
  function buildRoutePolyline(route) {
    if (routePolyline) {
      map.removeLayer(routePolyline);
      routePolyline = null;
    }
    // route.coordinates is an array of LatLngs
    const coords = route.coordinates.map(c => L.latLng(c.lat || c[1], c.lng || c[0] || c[1] || c[0]));
    // LRM sometimes returns arrays [lng,lat] or objects; robustify:
    const normCoords = route.coordinates.map(c => {
      if (Array.isArray(c)) { // [lng, lat] or [lat, lng] ambiguous
        // assume [lat,lng] when lat in plausible range else swap
        if (Math.abs(c[0]) <= 90 && Math.abs(c[1]) <= 180) {
          // assume [lat, lng]
          return L.latLng(c[0], c[1]);
        } else {
          return L.latLng(c[1], c[0]);
        }
      } else if (c && typeof c === 'object') {
        return L.latLng(c.lat, c.lng || c.lon);
      } else return null;
    }).filter(Boolean);

    routePolyline = L.polyline(normCoords, { color: 'cyan', weight: 5, opacity: 0.8 }).addTo(map);
    map.fitBounds(routePolyline.getBounds(), { padding: [60, 60] });
  }

  // Build maneuvers by scanning polyline vertices for heading changes
  function buildManeuversFromPolyline() {
    routeManeuvers = [];
    if (!routePolyline) return;
    const pts = routePolyline.getLatLngs();
    if (pts.length < 2) return;

    // compute bearings per segment
    const bearings = [];
    for (let i = 0; i < pts.length - 1; i++) bearings.push(bearingBetween(pts[i], pts[i + 1]));

    // detect vertices where absolute heading change > threshold -> maneuver
    const TURN_THRESHOLD_DEG = 30; // adjustable
    for (let i = 1; i < bearings.length; i++) {
      const diff = smallestAngleDiff(bearings[i - 1], bearings[i]);
      if (Math.abs(diff) >= TURN_THRESHOLD_DEG) {
        // mark maneuver at pts[i]
        const text = turnTextFromBearingDiff(diff);
        routeManeuvers.push({
          latlng: pts[i],
          text,
          announced: false,
          arrived: false
        });
      }
    }

    // Always add final arrival as last maneuver (destination)
    routeManeuvers.push({
      latlng: pts[pts.length - 1],
      text: "Arrive at destination",
      announced: false,
      arrived: false
    });

    // Debug: show maneuver markers (optional)
    // routeManeuvers.forEach((m, idx) => L.circleMarker(m.latlng, {radius:6, color: idx === 0 ? 'lime':'yellow'}).addTo(map).bindPopup(m.text));
    console.log('maneuvers built', routeManeuvers);
  }

  // --- Voice / Scream functions ---
  const SCREAM_SRC = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Wilhelm_Scream.ogg'; // public clip
  function speak(text, opts = {}) {
    if (!voiceEnabled) return;
    // small safety: cancel previous utterances for immediate feedback
    try { window.speechSynthesis.cancel(); } catch (e) { }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate ?? 1.0;
    u.pitch = opts.pitch ?? 1.0;
    window.speechSynthesis.speak(u);
  }
  function screamThenSpeak(text) {
    if (!voiceEnabled) return;
    if (screamEnabled) {
      const audio = new Audio(SCREAM_SRC);
      audio.volume = 1.0;
      audio.play().catch(() => { /* ignore failures */ });
      audio.onended = () => speak(text);
      // if the audio fails to play, fallback to speak after short timeout
      setTimeout(() => {
        if (!audio.ended) speak(text);
      }, 1000);
    } else {
      speak(text);
    }
  }

  function announceRouteReady() {
    if (!activeRoute) return;
    const approxSteps = routeManeuvers.length;
    screamThenSpeak(`Route ready. ${approxSteps} upcoming instruction${approxSteps > 1 ? 's' : ''}.`);
  }

  // --- Speed limits & Traffic / Police (placeholders reused from original) ---
  const tomTomApiKey = 'TdcCkY3GJQm5HAROLqYD3pOE0cpgKvLp'; // keep or replace
  async function fetchSpeedLimit(lat, lon) {
    try {
      const res = await fetch(`https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${lat},${lon}&unit=MPH&key=${tomTomApiKey}`);
      const data = await res.json();
      if (data.flowSegmentData && data.flowSegmentData.freeFlowSpeed) return data.flowSegmentData.freeFlowSpeed;
    } catch (e) { console.error("Error fetching speed limit", e); }
    return null;
  }
  // --- Geoapify / Traffic Throttled Fetching ---
  let lastGeoapifyFetchTime = 0;
  let lastGeoapifyFetchPos = null;
  const GEOAPIFY_FETCH_INTERVAL = 10000; // 10 seconds
  const GEOAPIFY_FETCH_MIN_DISTANCE = 200; // meters
  async function fetchGeoapifyAlerts(lat, lon) {
    try {
      const categories = ["police", "speed-camera"];
      const alerts = [];

      for (const cat of categories) {
        const url = `https://api.geoapify.com/v2/places?categories=roads.${cat}&filter=circle:${lon},${lat},${ALERT_RADIUS_M}&limit=20&apiKey=${geoapifyKey}`;
        const res = await fetch(url);
        if (!res.ok) continue; // skip failed requests
        const data = await res.json();
        if (data.features) {
          data.features.forEach(f => {
            const name = f.properties.name || cat.replace("-", " ");
            const distance = haversineMeters(lat, lon, f.geometry.coordinates[1], f.geometry.coordinates[0]);
            alerts.push({ name, lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0], distance });
          });
        }
      }

      lastAlerts = alerts;
      if (alerts.length > 0) {
        const html = alerts.map(a => `${a.name} (${a.distance.toFixed(0)} m)`).join("<br>");
        policeAlertsDiv.innerHTML = `Alerts:<br>${html}`;

        // announce nearest alert if voice enabled
        if (voiceEnabled) {
          const nearest = alerts.reduce((p, c) => p.distance < c.distance ? p : c);
          screamThenSpeak(`Alert! ${nearest.name} ahead, ${nearest.distance.toFixed(0)} meters.`);
        }
      } else {
        policeAlertsDiv.innerHTML = "Alerts: None";
      }

    } catch (e) {
      console.error("Geoapify alerts error", e);
      policeAlertsDiv.innerHTML = "Alerts: Error";
    }
  }

  // throttled & distance-aware wrapper
  async function fetchGeoapifyAlertsThrottled(lat, lon) {
    const now = Date.now();
    if (now - lastGeoapifyFetchTime < GEOAPIFY_FETCH_INTERVAL) return;
    if (lastGeoapifyFetchPos) {
      const d = haversineMeters(lat, lon, lastGeoapifyFetchPos.lat, lastGeoapifyFetchPos.lon);
      if (d < GEOAPIFY_FETCH_MIN_DISTANCE) return;
    }
    lastGeoapifyFetchTime = now;
    lastGeoapifyFetchPos = { lat, lon };
    await fetchGeoapifyAlertsThrottled(lat, lon);
  }

  // --- Traffic incidents (optional TomTom) ---
  let lastTrafficFetchTime = 0;
  const TRAFFIC_FETCH_INTERVAL = 10000; // 10 seconds
  async function fetchTrafficIncidentsThrottled(lat, lon) {
    const now = Date.now();
    if (now - lastTrafficFetchTime < TRAFFIC_FETCH_INTERVAL) return;
    lastTrafficFetchTime = now;

    try {
      const res = await fetch(`https://api.tomtom.com/traffic/services/4/incidentDetails?bbox=${lat - 0.05},${lon - 0.05},${lat + 0.05},${lon + 0.05}&key=${tomTomApiKey}`);
      if (!res.ok) {
        console.warn("Traffic API unavailable:", res.status);
        return; // exit early if server returns 4xx/5xx
      }
      const data = await res.json();
      if (data.incidents && data.incidents.length > 0) {
        const incidents = data.incidents.map(i => `${i.type} on ${i.roadName || 'road'} (${i.delayInMinutes || 0} min delay)`).join('<br>');
        policeAlertsDiv.innerHTML = `Traffic & Alerts:<br>${incidents}`;
        speak(`Traffic incident detected nearby.`);
      }
    } catch (e) {
      console.error('Error fetching traffic incidents', e);
    }
  }

  // --- Live location & route-following ---
  let userMarker = null;
  let watchId = null;
  let lastPos = null;
  let lastSpeedMps = 0;
  let offRouteStart = null;
  const OFFROUTE_DISTANCE_M = 30;
  const OFFROUTE_GRACE_MS = 3000;
  document.getElementById('locBtn').addEventListener('click', () => {
    if (!navigator.geolocation) { alert("Geolocation not supported."); return; }
    if (watchId) { navigator.geolocation.clearWatch(watchId); watchId = null; alert("Live location stopped."); return; }

    watchId = navigator.geolocation.watchPosition(async pos => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
      const speed = (typeof pos.coords.speed === 'number' && pos.coords.speed !== null) ? pos.coords.speed : computeSpeedFromLastPos(pos);
      lastSpeedMps = speed ?? lastSpeedMps;
      lastPos = { lat, lon, speed: lastSpeedMps, heading: pos.coords.heading };

      if (!userMarker) {
        userMarker = L.marker([lat, lon], { title: 'You' }).addTo(map).bindPopup("You").openPopup();
      } else {
        userMarker.setLatLng([lat, lon]);
      }

      const yourSpeedMph = lastSpeedMps ? (lastSpeedMps * 2.23694) : null;
      const yourSpeedDisplay = yourSpeedMph ? yourSpeedMph.toFixed(1) : "N/A";
      const limit = await fetchSpeedLimit(lat, lon) || "N/A";
      speedDisplay.textContent = `Speed Limit: ${limit} mph | Your Speed: ${yourSpeedDisplay} mph`;

      // Speed warning (threshold: limit + 5 mph)
      if (limit !== "N/A" && yourSpeedMph && yourSpeedMph > limit + 5) {
        screamThenSpeak(`Slow down! Speed limit is ${limit} miles per hour.`);
      }

      // Fetch nearby alerts/traffic
      fetchGeoapifyAlertsThrottled(lat, lon);
      fetchTrafficIncidentsThrottled(lat, lon);

      // If there is an active route, follow it
      if (routePolyline && routeManeuvers.length > 0) {
        followRouteLogic(lat, lon, lastSpeedMps);
      }

    }, err => {
      console.warn('geolocation error', err);
      alert("Unable to get live location");
    }, { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 });

    alert("Live location started. Click again to stop.");
  });

  // provide crude fallback speed calculation when pos.coords.speed is unavailable
  function computeSpeedFromLastPos(pos) {
    try {
      if (!lastPos) return 0;
      const dt = (pos.timestamp - (lastPos.timestamp || 0)) / 1000;
      if (dt <= 0) return lastPos.speed || 0;
      const d = haversineMeters(lastPos.lat, lastPos.lon, pos.coords.latitude, pos.coords.longitude);
      lastPos.timestamp = pos.timestamp;
      return d / dt; // m/s
    } catch (e) { return 0; }
  }

  // Route-following main logic
  function followRouteLogic(lat, lon, speedMps) {
    const posLatLng = L.latLng(lat, lon);
    // 1) find distance from route (nearest point)
    const nearestInfo = nearestPointOnPolyline(routePolyline.getLatLngs(), posLatLng);
    const distFromRoute = nearestInfo.distance; // meters
    if (distFromRoute > OFFROUTE_DISTANCE_M) {
      if (!offRouteStart) offRouteStart = Date.now();
      else if (Date.now() - offRouteStart > OFFROUTE_GRACE_MS) {
        screamThenSpeak('Off route. Recalculating.');
        requestReroute(lat, lon);
        offRouteStart = null;
      }
    } else {
      offRouteStart = null;
    }

    // 2) find next maneuver (first one not arrived)
    const nextIndex = routeManeuvers.findIndex(m => !m.arrived);
    if (nextIndex === -1) return; // nothing left
    const nextM = routeManeuvers[nextIndex];
    const distToNext = haversineMeters(lat, lon, nextM.latlng.lat, nextM.latlng.lng);

    // approach distance depends on speed:
    // make it proportional to speed (m/s * factor) with bounds
    const approachDistance = Math.max(15, Math.min(200, (speedMps || 5) * 3)); // meters
    const arrivalThreshold = 15; // meters

    // Announce when within approachDistance and haven't announced this maneuver
    if (!nextM.announced && distToNext <= approachDistance) {
      nextM.announced = true;
      // speak the instruction
      screamThenSpeak(nextM.text);
    }

    // Mark arrived when within arrivalThreshold
    if (!nextM.arrived && distToNext <= arrivalThreshold) {
      nextM.arrived = true;
      console.log('arrived at maneuver', nextIndex, nextM.text);
      // optional small confirmation
      speak('Turn completed.');
      // Immediately announce the following maneuver if it's already within its approach distance
      const afterIndex = routeManeuvers.findIndex(m => !m.arrived);
      if (afterIndex !== -1) {
        const afterM = routeManeuvers[afterIndex];
        const distToAfter = haversineMeters(lat, lon, afterM.latlng.lat, afterM.latlng.lng);
        const approachAfter = Math.max(15, Math.min(200, (speedMps || 5) * 3));
        if (!afterM.announced && distToAfter <= approachAfter) {
          afterM.announced = true;
          screamThenSpeak(afterM.text);
        }
      } else {
        // no more steps -> arrive
        screamThenSpeak('You have arrived at your destination.');
      }
    }
  }

  // Reroute: use routingControl when available
  function requestReroute(lat, lon) {
    if (!routingControl) return;
    // Replace the first waypoint (start) with current position and recompute
    const wps = routingControl.getWaypoints();
    if (!wps || wps.length < 2) return;
    const newStart = L.Routing.waypoint(L.latLng(lat, lon));
    wps[0] = newStart;
    routingControl.setWaypoints(wps);
    // reset maneuvers when new route is found (routesfound handler will rebuild)
  }

  // --- Utilities: geometry, bearings, distance ---
  function haversineMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function toRad(deg) { return deg * Math.PI / 180; }
  function toDeg(rad) { return rad * 180 / Math.PI; }

  // Bearing from A to B in degrees 0..360
  function bearingBetween(a, b) {
    const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
    const dLon = toRad(b.lng - a.lng);
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let brng = toDeg(Math.atan2(y, x));
    brng = (brng + 360) % 360;
    return brng;
  }

  // smallest signed angle difference between two bearings in degrees (-180..180)
  function smallestAngleDiff(a, b) {
    let d = (b - a + 540) % 360 - 180;
    return d;
  }

  // Produce human-friendly turn text from signed bearing diff
  function turnTextFromBearingDiff(diff) {
    const absd = Math.abs(diff);
    if (absd < 45) return 'Slight bend ahead';
    if (absd < 135) return (diff > 0) ? 'Turn right' : 'Turn left';
    return 'Make a U-turn';
  }

  // Find nearest point on polyline (array of LatLngs). Returns {distance, nearestLatLng, t, index}
  function nearestPointOnPolyline(latlngs, point) {
    let minDist = Infinity;
    let nearest = null;
    for (let i = 0; i < latlngs.length - 1; i++) {
      const a = latlngs[i];
      const b = latlngs[i + 1];
      const proj = projectPointOnSegment(a, b, point);
      const d = haversineMeters(point.lat, point.lng, proj.lat, proj.lng);
      if (d < minDist) {
        minDist = d;
        nearest = { distance: d, latlng: proj, segmentIndex: i };
      }
    }
    return nearest || { distance: Infinity, latlng: latlngs[0], segmentIndex: 0 };
  }

  // Project point P on segment AB (latlngs). Returns a LatLng on segment.
  function projectPointOnSegment(A, B, P) {
    // convert to ECEF-like local coordinates (approx using lat/lon to meters)
    // Use simple equirectangular projection relative to A
    const R = 6371000;
    const latRad = toRad(A.lat);
    const k = Math.cos(latRad);
    const ax = A.lng * k;
    const ay = A.lat;
    const bx = B.lng * k;
    const by = B.lat;
    const px = P.lng * k;
    const py = P.lat;
    const vx = bx - ax, vy = by - ay;
    const wx = px - ax, wy = py - ay;
    const vv = vx * vx + vy * vy;
    let t = 0;
    if (vv > 0) t = (vx * wx + vy * wy) / vv;
    t = Math.max(0, Math.min(1, t));
    const ix = ax + vx * t;
    const iy = ay + vy * t;
    // convert back to lat/lng
    const lng = ix / k;
    const lat = iy;
    return L.latLng(lat, lng);
  }

  document.getElementById("curLocBtn").addEventListener("click", (pos) => {
    map.setView([lat, lon], 16);
  })

  // --- End of main DOMContentLoaded ---
});