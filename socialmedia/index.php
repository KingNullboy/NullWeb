<?php
// 1. Get the sub slug from URL
$sub_slug = isset($_GET['sub']) ? htmlspecialchars($_GET['sub']) : 'index';

// 2. Load the Pretty Name from subs.json
$display_name = ucfirst($sub_slug); // Default fallback
$json_path = 'subs.json';

if (file_exists($json_path)) {
    $json_data = json_decode(file_get_contents($json_path), true);
    if (is_array($json_data)) {
        foreach ($json_data as $community) {
            // Check if slug matches the one in the URL
            if ($community[0] === $sub_slug) {
                $display_name = $community[1];
                break;
            }
        }
    }
}
?>
<!DOCTYPE HTML>
<html>
    <head>
        <?php 
            $title = $display_name . " - NullMedia"; 
            include $_SERVER['DOCUMENT_ROOT'] . '/includes/meta.php'; 
        ?>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>
        <script src="script.js" defer></script>
    </head>
    <body>
        <?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/navbar.php'; ?>

        <main class="main-wrapper">
            <h2 id="communityTitle" style="color: <?= $border ?>; text-transform: uppercase;">
                <?php echo $display_name; ?>
            </h2>

            <div id="form" name="form">
                <div id="formatBtns">
                    <button id="boldBtn" class="formatBtn"><b>B</b></button>
                    <button id="italicBtn" class="formatBtn"><i>I</i></button>
                    <button id="codeBlockBtn" class="formatBtn">Code</button>
                    <button id="insertImageBtn" class="formatBtn">Image</button>
                    <input type="file" id="imageInput" style="display:none;" accept="image/*">
                </div>
                <input type="text" id="title" name="title" placeholder="Title*"><br>
                <textarea id="postContent" name="postContent" placeholder="Body"></textarea><br>
                <button id="submit">Submit</button>
                <button id="scrollBtn" onclick="window.scrollTo(0, document.body.scrollHeight);">Go to bottom</button>
            </div>

            <br>
            <div id="postsContainer"></div>
            <button onclick="window.scrollTo(0, 0);" id="scrollBtn">Go to top</button>
        </main>

        <?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php" ?>
    </body>
</html>