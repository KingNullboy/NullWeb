<!DOCTYPE HTML>
<html>
    <head>
        <?php $title = "NullMC Network Overview - NullWiki"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
    </head>
    <body>
        <?php $navbarLogoRelPath = "../"; include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

        <main class="main-wrapper">
            <div class="wiki-container">

                <h1>The NullMC Server Network</h1>

                <p>
                    The <strong>NullMC Network</strong> is a unified collection of Minecraft and Eaglercraft
                    servers hosted by KingNullboy. The network supports Java Edition, Bedrock Edition (via
                    Geyser), and even browser-based Eaglercraft players. This page explains how to join each
                    server and what makes them unique.
                </p>

                <h2>NullMC (Main Proxy Hub)</h2>
                <p>
                    <strong>NullMC</strong> is the central hub of the entire network. It acts as a proxy,
                    letting players switch between servers using simple commands. All Java and Bedrock players
                    connect through this entry point.
                </p>

                <ul>
                    <li><strong>Java Join Address:</strong> <code>www.null-web.vastserve.com:25565</code></li>
                    <li><strong>Bedrock Join Address:</strong> <code>www.null-web.vastserve.com</code></li>
                    <li><strong>Bedrock Port:</strong> <code>19132</code></li>
                    <li><strong>Supported:</strong> Java Edition + Bedrock Edition (via Geyser)</li>
                    <li><strong>Purpose:</strong> Main gateway to all other servers</li>
                </ul>

                <p>
                    Once connected, players can switch servers instantly using commands like:
                </p>

                <ul>
                    <li><code>/server survival</code> — Join NullSMP</li>
                    <li><code>/server creative</code> — Join NullCMP</li>
                </ul>

                <h2>NullSMP (Survival Server)</h2>
                <p>
                    <strong>NullSMP</strong> is the main survival world of the network. It features classic
                    Minecraft gameplay with community builds, exploration, and long-term progression.
                </p>

                <ul>
                    <li><strong>Join Method:</strong> Connect to NullMC → <code>/server survival</code></li>
                    <li><strong>Supported:</strong> Java Edition + Bedrock Edition</li>
                    <li><strong>Gameplay:</strong> Survival, building, exploration</li>
                </ul>

                <h2>NullCMP (Creative Server)</h2>
                <p>
                    <strong>NullCMP</strong> is the creative-mode server where players can build freely without
                    resource limits. It’s ideal for testing designs, creating pixel art, or experimenting with
                    redstone.
                </p>

                <ul>
                    <li><strong>Join Method:</strong> Connect to NullMC → <code>/server creative</code></li>
                    <li><strong>Supported:</strong> Java Edition + Bedrock Edition</li>
                    <li><strong>Gameplay:</strong> Creative mode, freebuild or plots</li>
                </ul>

                <h2>NullSMP‑X (Eaglercraft‑Only Server)</h2>
                <p>
                    <strong>NullSMP‑X</strong> is a special survival server designed exclusively for
                    <strong>Eaglercraft</strong> players. It uses a WebSocket connection instead of a normal
                    Minecraft port, making it playable directly from a browser.
                </p>

                <ul>
                    <li><strong>Join Address:</strong> <code>wss://www.null-web.vastserve.com:25569</code></li>
                    <li><strong>Supported:</strong> Eaglercraft clients only</li>
                    <li><strong>Gameplay:</strong> Survival (browser-compatible)</li>
                </ul>

                <p>
                    This server exists so players using Eaglercraft can still participate in the NullMC
                    ecosystem without needing Java or Bedrock.
                </p>

                <h2>Summary</h2>
                <p>
                    The NullMC Network supports multiple platforms and playstyles:
                </p>

                <ul>
                    <li><strong>NullMC</strong> — Main hub (Java + Bedrock)</li>
                    <li><strong>NullSMP</strong> — Survival world (Java + Bedrock)</li>
                    <li><strong>NullCMP</strong> — Creative world (Java + Bedrock)</li>
                    <li><strong>NullSMP‑X</strong> — Eaglercraft-only survival server</li>
                </ul>

                <p>
                    Whether you're playing on Java, Bedrock, or straight from a browser, the NullMC Network
                    has a server ready for you.
                </p>

            </div>
        </main>

        <?php include "includes/footer.php"; ?>
    </body>
</html>
