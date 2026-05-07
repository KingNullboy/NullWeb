<header>
    <div class="header-left">
        <a href="/">
            <img class="logo" src="<?= $navbarLogoRelPath ?? "" ?>logo.png" alt="logo" width="40px">
        </a>
    </div>
        
    <h1 id="pagetitle"><?= $title ?? "NullWeb" ?></h1>

    <div class="nav-group">
        <a class="headerbtn" href="<?= $navbarLogoRelPath ?? "./" ?>">Home</a>
        <?php if (file_exists("info.php")): ?>
            <a class="headerbtn" href="info.php">Info</a>
        <?php endif; ?>
        <?php
        if (str_contains($_SERVER['REQUEST_URI'], '/socialmedia/')): 
        ?>
            <a class="headerbtn" href="subs.php">Subs</a>
            <a id="login" class="headerbtn" href="login.php">Login</a>
        <?php endif; ?>
    </div>
</header>