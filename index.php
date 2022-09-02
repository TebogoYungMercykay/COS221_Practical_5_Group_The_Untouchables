<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/index.css" />
    <title>Home page</title>
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="js/main.js"></script>
</head>

<body>
    <?php $GLOBALS['parent_file'] = 0; //specifies that this file is one folder above header.php (and not in the same folder)
    include_once("php/header.php");
    ?>

    <script>
        $('#homeLink').addClass('active_link') //Add this line in every page to highlight it in the navbar (substituting the id from the header)
    </script>
    <div class="main_container">
        <div class="centered_container">
            <!-- Dummy text for homepage -->
            <h1>Welcome to the athletics database system!</h1>
            <h2>Please sign up or log in to begin</h2>
        </div>
    </div>
</body>

</html>