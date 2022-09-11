<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log in</title>
    <link rel="stylesheet" href="../css/index.css" />
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="../js/main.js"></script>
</head>

<body>
    <?php
    $GLOBALS['parent_file'] = 1; //specifies that this file is in the same folder as header.php
    include_once("header.php"); ?>
    <div class="main_container">
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") { // if login information has been posted
            $con = UsersDB::instance();
            $response = $con->isValidLogin($_POST['Email'], $_POST['Password']);
            if ($response === true) { //if the login is valid
                echo "<div class='centered_container'><h1 class='errText'>Login successful<br> You will now be redirected to the home page.</h1></div>";
                $t = preg_match("/^\w+/", $_POST['Email'], $n); //name is defined as first part of email
                $_SESSION['user']['email'] = $_POST['Email']; //set email and name session variables
                $_SESSION['user']['name'] = $n[0];
                echo "<script>addUname('" . $n[0] . "')</script>"; //add name to navbar
                include_once("sampledata.php");
                header('Refresh: 4; url=../index.php'); //redirect to homepage after 4 seconds
            } else echo "<script>loadError('" . $response . "')</script>";
        } else echo "<script>loadLogin()</script>"; //if this is the first time visiting this page
        ?>
    </div>
</body>

</html>
