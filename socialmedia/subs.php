<?php
$json_path = 'subs.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['newSubSlug'])) {
    // 1. Clean up the inputs
    $slug = preg_replace('/[^a-z0-9]/', '', strtolower($_POST['newSubSlug']));
    $display = htmlspecialchars($_POST['newSubDisplay']);

    if (!empty($slug)) {
        // Check if file exists, if not, create an empty array
        if (!file_exists($json_path)) {
            file_put_contents($json_path, json_encode([]));
        }

        $json_contents = file_get_contents($json_path);
        $data = json_decode($json_contents, true);
        if (!is_array($data)) { $data = []; }

        // 2. Check for duplicates
        $exists = false;
        foreach ($data as $item) {
            if (isset($item[0]) && $item[0] === $slug) { 
                $exists = true; 
                break; 
            }
        }

        // 3. Save only if it's unique
        if (!$exists) {
            $data[] = [$slug, $display];
            
            // ERROR CHECKING: Check if the server can actually write
            if (is_writable($json_path)) {
                file_put_contents($json_path, json_encode($data, JSON_PRETTY_PRINT));
            } else {
                // If this triggers, you'll know exactly why it's not saving
                die("Critical Error: The server does not have permission to write to subs.json. Run 'chmod 666 subs.json'");
            }
        }
    }
    
    // 4. Redirect
    header("Location: index.php?sub=$slug");
    exit;
}
?>

<!DOCTYPE HTML>
<html>
    <head>
        <?php 
            $title = "Explore - NullMedia"; 
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
                <p>Loading communities...</p>
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
        </main>

        <?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php" ?>
    </body>
</html>