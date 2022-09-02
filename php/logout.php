<!DOCTYPE html>
<html lang="en">
<!-- Janco Spies u21434159 -->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log out</title>
    <link rel="stylesheet" href="../css/index.css" />
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="../js/main.js"></script>
</head>

<body>
    <?php
    $GLOBALS['parent_file'] = 1;//specifies that this file is in the same folder as header.php
    include_once("header.php"); ?>

    <div class="main_container">
        <?php
        if (isset($_SESSION['user'])) { //if there is a user logged in
            session_unset();
            session_destroy();
            echo "<script>logoutSuccess()</script>";
        } else {
            echo "<script>logoutFail()</script>";
        }
        ?>
    </div>
</body>

</html>