<?php
$title = "NullWeb - System Status";

$uptime = trim((string) shell_exec('uptime -p 2>/dev/null'));
$temperatureOutput = trim((string) shell_exec('sudo -n /usr/bin/vcgencmd measure_temp 2>/dev/null'));
$temperature = preg_match("/^temp=([0-9]+(?:\\.[0-9]+)?)/", $temperatureOutput, $matches)
    ? $matches[1]
    : null;
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<?php include "includes/meta.php"; ?>
		<style>
			.status-page {
				display: grid;
				min-height: 55vh;
				place-items: center;
				padding: clamp(36px, 8vw, 88px) 20px;
			}

			.status-panel {
				width: min(100%, 760px);
				padding: clamp(24px, 6vw, 52px);
				border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
				border-radius: 28px;
				background: color-mix(in srgb, currentColor 5%, transparent);
				box-shadow: 0 24px 80px color-mix(in srgb, currentColor 8%, transparent);
				text-align: left;
			}

			.status-eyebrow {
				display: flex;
				align-items: center;
				gap: 10px;
				margin-bottom: 16px;
				font-size: 0.78rem;
				font-weight: 700;
				letter-spacing: 0.14em;
				opacity: 0.72;
				text-transform: uppercase;
			}

			.status-eyebrow::before {
				width: 9px;
				height: 9px;
				border-radius: 50%;
				background: #55d99a;
				box-shadow: 0 0 16px #55d99a;
				content: "";
			}

			.status-heading {
				margin-bottom: 12px;
				font-size: clamp(2.2rem, 7vw, 4rem);
				line-height: 1.05;
				letter-spacing: -0.055em;
			}

			.status-intro {
				max-width: 48ch;
				margin-bottom: 32px;
				font-size: 1.05rem;
				opacity: 0.72;
			}

			.status-metrics {
				display: grid;
				grid-template-columns: repeat(2, minmax(0, 1fr));
				gap: 14px;
			}

			.status-metric {
				min-width: 0;
				padding: 22px;
				border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
				border-radius: 18px;
				background: color-mix(in srgb, currentColor 4%, transparent);
			}

			.status-metric-label {
				margin-bottom: 14px;
				font-size: 0.78rem;
				font-weight: 700;
				letter-spacing: 0.12em;
				opacity: 0.65;
				text-transform: uppercase;
			}

			.status-metric-value {
				font-size: clamp(1.35rem, 4vw, 2rem);
				font-weight: 600;
				line-height: 1.25;
				overflow-wrap: anywhere;
			}

			.status-metric-value.unavailable {
				opacity: 0.55;
			}

			.status-unit {
				margin-left: 5px;
				font-size: 0.55em;
				font-weight: 500;
				opacity: 0.68;
			}

			.status-footnote {
				margin-top: 20px;
				font-size: 0.85rem;
				opacity: 0.58;
			}

			.status-home {
				display: inline-flex;
				align-items: center;
				gap: 8px;
				margin-top: 28px;
				padding: 10px 16px;
				border: 1px solid color-mix(in srgb, currentColor 24%, transparent);
				border-radius: 999px;
				color: inherit;
				font-weight: 600;
				text-decoration: none;
				transition: background-color 160ms ease, transform 160ms ease;
			}

			.status-home:hover {
				background: color-mix(in srgb, currentColor 10%, transparent);
				transform: translateY(-2px);
			}

			.status-home:focus-visible {
				outline: 2px solid currentColor;
				outline-offset: 4px;
			}

			@media (max-width: 560px) {
				.status-metrics {
					grid-template-columns: 1fr;
				}

				.status-metric {
					padding: 18px;
				}
			}

			@media (prefers-reduced-motion: reduce) {
				.status-home {
					transition: none;
				}
			}
		</style>
	</head>
	<body>
		<main class="status-page">
			<section class="status-panel" aria-labelledby="status-heading">
				<p class="status-eyebrow">Server snapshot</p>
				<h1 class="status-heading" id="status-heading">System status</h1>
				<p class="status-intro">A quick look at the machine keeping NullWeb online.</p>

				<div class="status-metrics">
					<article class="status-metric">
						<h2 class="status-metric-label">System uptime</h2>
						<p class="status-metric-value<?= $uptime === '' ? ' unavailable' : '' ?>">
							<?= htmlspecialchars($uptime !== '' ? $uptime : 'Not available', ENT_QUOTES, 'UTF-8') ?>
						</p>
					</article>

					<article class="status-metric">
						<h2 class="status-metric-label">CPU temperature</h2>
						<p class="status-metric-value<?= $temperature === null ? ' unavailable' : '' ?>">
							<?php if ($temperature !== null): ?>
								<?= htmlspecialchars($temperature, ENT_QUOTES, 'UTF-8') ?><span class="status-unit">°C</span>
							<?php else: ?>
								Not available
							<?php endif; ?>
						</p>
					</article>
				</div>

				<p class="status-footnote">Readings are collected when this page loads.</p>
				<a class="status-home" href="/" aria-label="Return to NullWeb home">← <span>Back to NullWeb</span></a>
			</section>
		</main>

		<?php include "includes/footer.php"; ?>
	</body>
</html>
