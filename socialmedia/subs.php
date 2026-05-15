<?php
// --- DB CONNECTION (env-based, no .env files) ---
$db = pg_connect(
    "host=" . getenv('DB_HOST') .
    " port=" . getenv('DB_PORT') .
    " dbname=" . getenv('DB_NAME') .
    " user=" . getenv('DB_USER') .
    " password=" . getenv('DB_PASS')
);

if (!$db) {
    die("Database connection failed. Congrats, nothing works.");
}

// --- HANDLE CREATE SUB ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['newSubSlug'])) {

    // 1. Clean inputs
    $slug = preg_replace('/[^a-z0-9]/', '', strtolower($_POST['newSubSlug']));
    $display = trim($_POST['newSubDisplay']);

    if (!empty($slug) && !empty($display)) {

        // 2. Check duplicate (DB does this better, but fine)
        $check = pg_query_params(
            $db,
            "SELECT 1 FROM subs WHERE slug = $1",
            [$slug]
        );

        if (pg_num_rows($check) === 0) {

            // 3. Insert safely
            $insert = pg_query_params(
                $db,
                "INSERT INTO subs (slug, display_name) VALUES ($1, $2)",
                [$slug, $display]
            );

            if (!$insert) {
                die("Insert failed. The database is judging you.");
            }
        }
    }

    // 4. Redirect
    header("Location: index.php?sub=" . urlencode($slug));
    exit;
}
?>

<!DOCTYPE HTML>
<html>
    <head>
        <?php 
            $title = "Subs - NullMedia"; 
            include $_SERVER['DOCUMENT_ROOT'] . '/includes/meta.php'; 
        ?>
        <script src="search.js" defer></script>
    </head>

    <body>
        <?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/navbar.php'; ?>

        <main class="main-wrapper">

            <div class="searchContainer" style="margin-top: 20px;">
                <div class="searchRow">
                    <input id="searchBar" type="text" placeholder="Search posts...">
                    <button id="searchButton" class="searchBtn">Search</button>
                </div>
                <div id="searchResults"></div>
            </div>

            <hr style="width: 80%; border: 1px solid <?= $border ?>; margin: 30px auto;">

            <h3 style="text-transform: uppercase; color: <?= $border ?>;">Active Communities</h3>

            <div id="subsList" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; max-width: 800px; margin: 0 auto;">

            <?php

            $result = pg_query(
                $db,
                "SELECT slug, display_name FROM subs ORDER BY display_name ASC"
            );

            if ($result && pg_num_rows($result) > 0) {

                while ($row = pg_fetch_assoc($result)) {

                    $slug = htmlspecialchars($row['slug']);
                    $display = htmlspecialchars($row['display_name']);

                    echo '
                        <a href="index.php?sub=' . urlencode($slug) . '"
                        class="headerbtn"
                        style="text-decoration:none; padding:10px 15px;">
                            ' . $display . '
                        </a>
                    ';
                }

            } else {

                echo '<p>No communities found.</p>';

            }

            ?>

            </div>

            <hr style="width: 50%; border: 1px solid <?= $border ?>; margin: 50px auto 20px;">

            <div class="create-sub-section" style="text-align: center;">
                <h3 style="text-transform: uppercase; color: <?= $border ?>;">Create a Sub</h3>

                <form method="POST" action="subs.php" style="display: flex; flex-direction: column; align-items: center; gap: 10px;">

                    <input type="text" name="newSubDisplay" placeholder="Community Name (e.g. Potato Society)" required
                        style="width: 300px; padding: 10px; border-radius: 15px;">

                    <input type="text" name="newSubSlug" placeholder="url-slug (e.g. potatosociety)" required
                        style="width: 300px; padding: 10px; border-radius: 15px;">

                    <button type="submit" class="headerbtn">Create</button>
                </form>
            </div>

            <div style="margin-top: 20px;">
                <a href="chat.php">
                    <button type="button" class="headerbtn">
                        Open Realtime Chat
                    </button>
                </a>
            </div>

        </main>

        <?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php" ?>
    </body>
</html>
