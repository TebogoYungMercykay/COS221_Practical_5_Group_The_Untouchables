<!DOCTYPE html>
<html lang="en">
<!-- Janco Spies u21434159 -->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign up</title>
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
        if ($_SERVER["REQUEST_METHOD"] == "POST") { //if the signup form has been posted
            $con = UsersDB::instance(); //create new usersdb instance
            $response = $con->addUser($_POST['Name'], $_POST['Sname'], $_POST['Email'], $_POST['Password'], (isset($_POST['Participant']) && $_POST['Participant'] == "on") ? 1 : 0);
            if ($response === true) { //if the user was added successfully
                echo "<div class='centered_container'><h1 class='errText'>Sign up successful<br> You will now be redirected to the home page.</h1></div>";
                $t = preg_match("/^\w+/", $_POST['Email'], $n);//name is defined as first part of email
                $_SESSION['user']['email'] = $_POST['Email']; //set email and name session variables  
                $_SESSION['user']['name'] = $n[0]; 
                echo "<script>addUname('" . $n[0] . "')</script>"; //call js function to add username to navbar
                header('Refresh: 4; url=../index.php'); //redirect to homepage after 4 seconds
            } else echo "<script>loadError('" . $response . "')</script>";
        } else echo "<script>loadSignup()</script>"; //if first time loading page
        ?>
    </div>
</body>

</html>