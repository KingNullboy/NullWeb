<!DOCTYPE HTML>
<html>
    <head>
        <?php 
            $title = "Login - NullMedia"; 
            include $_SERVER['DOCUMENT_ROOT'] . '/includes/meta.php'; 
        ?>
        <script src="script.js" defer></script>
    </head>
    <body>
        <?php include $_SERVER['DOCUMENT_ROOT'] . '/includes/navbar.php'; ?>

        <main class="main-wrapper" style="display: flex; justify-content: center; align-items: center; min-height: 70vh;">
            <div id="form" style="max-width: 400px; width: 90%; border: 2px solid <?= $border ?>; padding: 40px; border-radius: 20px; background: <?= $bg ?>;">
                
                <h2 style="color: <?= $border ?>; margin-bottom: 25px; letter-spacing: 2px;">
                    Login
                </h2>

                <div style="text-align: left;">
                    <label style="font-size: 0.8rem; opacity: 0.7;">Username</label>
                    <input type="text" id="username" placeholder="Username" 
                           style="width: 100%; margin-bottom: 15px; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid <?= $border ?>; color: <?= $text ?>; border-radius: 10px;">
                    
                    <label style="font-size: 0.8rem; opacity: 0.7;">Password</label>
                    <input type="password" id="password" placeholder="Password" 
                           style="width: 100%; margin-bottom: 25px; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid <?= $border ?>; color: <?= $text ?>; border-radius: 10px;">
                </div>

                <button id="loginBtn" class="headerbtn" style="width: 100%; padding: 15px; font-weight: bold; font-size: 1rem;">
                    AUTHENTICATE
                </button>

                <p id="loginError" style="color: #ff4444; margin-top: 15px; display: none; font-weight: bold;"></p>
            </div>
        </main>

        <?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php" ?>
    </body>
</html>