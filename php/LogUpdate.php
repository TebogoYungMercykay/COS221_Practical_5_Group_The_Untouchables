<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta position="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Daily Feed Commenting</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style type="text/css">
        #addToLogModal input, #logInModal input {
            margin-top: 10px;
        }
    </style>
</head>
<?php
$GLOBALS['parent_file'] = 1;
include_once("header.php"); ?>
    <?php


$loggedIn = false;

if (isset($_SESSION['loggedIn']) && isset($_SESSION['position'])) {
    $loggedIn = true;
}

 $conn= UsersDB::instance();

if (isset($_POST['addToLog'])) {
    $position = $conn->real_escape_string($_POST['Position']);
    $Time = $conn->real_escape_string($_POST['Time']);
    $match_event = $conn->real_escape_string($_POST['Match_event']);
    $ID_Athlete= $conn->real_escape_string($_POST['ID_Athelete']);

//    $conn->query("INSERT INTO results (Position,Time,Match_event,ID_Athlete) VALUES ('$position', '$Time', '$match_event', '$ID_Athlete'");
//    "update playertournamentstats set points = " . $current . " where player_id = " . $player . ";";
    $conn->query("update results set Position = ".$position." where ID_Athelete = ".$ID_Athlete." ");
    $conn->query("update results set Time = ".$Time." where ID_Athelete = ".$ID_Athlete." ");

    exit('success');

}
?>

<body>
<form action="index.php" method="post">
    <input type="number" id="Position" class="form-control" placeholder="Athelete position">
    <input type="time" step="0.001" id="Time" class="form-control" placeholder="Athelete time">
    <input type="number" id="Match_event" class="form-control" placeholder="Match event">
    <input type="number" id="ID_Athelete" class="form-control" placeholder="Athelete ID">
    <button class="btn btn-primary" id="addToLogBtn">addToLog</button>
</form>

<script src="http://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("#addToLogBtn").on('click', function () {
            var position = $("#Position").val();
            var Time = $("#Time").val();
            var match_event = $("#Match_event").val();
            var ID_Athelete = $("#ID_Athelete").val();

            if (position != "" && Time != "" && match_event != "" && ID_Athelete != "") {
                $.ajax({
                    url: 'LogUpdate.php',
                    method: 'POST',
                    dataType: 'text',
                    data: {
                        addToLog: 1,
                        Position: position,
                        Time: Time,
                        Match_event: match_event,
                        ID_Athelete: ID_Athelete
                    }, success: function (response) {
                        if (response === 'failedTime')
                            alert('Please insert valid Time address!');
                        else if (response === 'failedUserExists')
                            alert('User with this Time already exists!');
                        else
                            window.location = window.location;
                    }
                });
            } else
                alert('Please Check Your Inputs');
        });
    });

</script>
</body>
</html>
