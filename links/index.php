<?php
$jsonData = file_get_contents("gxmes.json");
$gxmes = json_decode($jsonData, true);

// just count everything, no filtering nonsense
$gameCount = 0;
foreach ($gxmes["sections"] as $section) {
    $gameCount += count($section["games"]);
}
?>

<!DOCTYPE HTML>
<html lang="en">
<head>
    <?php $title = "Home - NullG*mes"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php"; ?>
    <link href="https://fonts.googleapis.com/css2?family=Amaranth&display=swap" rel="stylesheet">

    <script>
        // simple client-side search (no PHP involvement)
        document.addEventListener("DOMContentLoaded", () => {
            const input = document.getElementById("searchInput");

            input.addEventListener("input", () => {
                const q = input.value.toLowerCase();
                const items = document.querySelectorAll(".game-item");

                items.forEach(el => {
                    const text = el.innerText.toLowerCase();
                    el.style.display = text.includes(q) ? "" : "none";
                });
            });
        });
    </script>
</head>

<body>

<?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

<main class="main-wrapper">

    <center>
        <br>

        <input type="text" id="searchInput"
            placeholder="Search for a g*me..."
            style="margin: 10px; padding: 5px; font-size: 16px;">

        <br><br>

        <p>This is a quick website made using Ruffle and GitHub.</p>

        <p id="gamenum">
            There are <?php echo $gameCount; ?> g*mes of varying quality!
        </p>

        <button id="randomGxmeBtn">Random G*me</button>

        <br><br>

        <div class="gxme-container">

            <?php foreach ($gxmes["sections"] as $section): ?>
                <h2><?php echo htmlspecialchars($section["name"]); ?></h2>

                <?php foreach ($section["games"] as $game): ?>
                    <a class="lnkgxmnavbtn game-item"
                       href="<?php echo htmlspecialchars($game['url']); ?>">
                        <?php echo htmlspecialchars($game["title"]); ?>
                    </a>
                <?php endforeach; ?>

            <?php endforeach; ?>

        </div>

        <br><br>

        <p><b>Yes, the search is now dumb again. On purpose.</b></p>

    </center>

</main>

<?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>

</body>
</html>