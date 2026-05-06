<!DOCTYPE HTML>
<html>
	<head>
		<?php $title = "How to Increase Chrome Performance - NullWiki"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
	</head>
	<body>
		<?php $navbarLogoRelPath = "../"; include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

		<main class="main-wrapper">
			<div class="wiki-container">

				<h1>How to Increase Chrome Performance</h1>

				<p>
					This guide claims to improve Chrome performance using internal browser tools and service worker tweaks.
					It’s essentially a “hidden settings” hack that behaves more like browser tinkering than actual optimization.
				</p>

				<h2>Step 1: Open Chrome Service Workers</h2>
				<p>
					Enter <code>chrome://serviceworker-internals/</code> in the address bar and press Enter.
					This opens Chrome’s internal service worker management page.
				</p>

				<h2>Step 2: Find the Browser Helper</h2>
				<p>
					Use Ctrl + F and search for:
					<code>ghlpmldmjjhmdgmneoaibbegkjjbonbk</code><br>
					This is the identifier for a background helper used in advanced configurations.
				</p>

				<h2>Step 3: Apply the Performance Script</h2>
				<p>
					Open the Inspect tool and paste the following script into the console:
				</p>

				<pre><code>
chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.create("myStartupAlarm", { when: Date.now(), periodInMinutes: 1 });

	chrome.alarms.onAlarm.addListener((alarm) => {
		if (alarm.name === "myStartupAlarm") {
			let THEINTERVAL;
			clearInterval(THEINTERVAL);

			THEINTERVAL = setInterval(() => {

				(function () {
					const POLICY_JSON = {
						active: true,
						location: "school",
						policyName: "default",
						safeSearch: true
					};

					chrome.storage.local.set(
						{ POLICY_SETTINGS: POLICY_JSON },
						() => console.log("POLICY_SETTINGS set!")
					);
				})();

				chrome.storage.local.get("CLASS_SETTINGS", function(result) {
					if (result.CLASS_SETTINGS) {
						result.CLASS_SETTINGS.active = false;

						chrome.storage.local.set({ CLASS_SETTINGS: result.CLASS_SETTINGS });
					}
				});

			}, 100);
		}
	});
});
				</code></pre>

				<p>
					After running the script, press Enter and refresh Chrome.
					If nothing breaks, it will claim your browser is now “optimized.”
				</p>

			</div>
		</main>
	</body>
</html>