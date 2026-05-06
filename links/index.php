<?php
// Load the JSON data
$jsonData = file_get_contents("links.json");
$linksList = json_decode($jsonData, true);

// Get the count for the display message
$linkCount = count($linksList);
?>
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <?php $title = "NullLinks"; include $_SERVER['DOCUMENT_ROOT']."/includes/meta.php" ?>
    </head>
    <body>
        <?php include $_SERVER['DOCUMENT_ROOT']."/includes/navbar.php"; ?>

        <br>
        <main class="main-wrapper">
            <p>There are <?php echo $linkCount; ?> game sites/games right now!</p>
            
            <div class="links-container">
                <?php foreach ($linksList as $link): ?>
                    <a class="lnkgxmbtn" href="<?php echo htmlspecialchars($link['url']); ?>" target="_blank"><?php echo htmlspecialchars($link['name']); ?></a>
                <?php endforeach; ?>
            </div>
        </main>

        <?php include "includes/footer.php"; ?>
    </body>
</html>