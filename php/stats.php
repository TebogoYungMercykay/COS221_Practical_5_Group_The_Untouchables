<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css" />
    <title>Statistics</title>
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="../js/main.js"></script>
</head>

<body>

    <?php
    //Lekgotla Motaung u19345993
    $GLOBALS['parent_file'] = 1;
    include_once('header.php');
    echo '<div class="main_container">';

    if (!isset($_SESSION['user']))
        echo '<script> loadLoginErr() </script>';
    else {
        $conn = mysqli_connect($_ENV['DBHOST'], $_ENV['DBUSERNAME'], $_ENV['DBPASSWORD'], $_ENV['MAINDBNAME']);
        $query = "SELECT A.Athlete_ID, A.DOB, A.Name, A.Sex, T.Team_ID, T.Team_Name, T.Country, T.Ranking, R.Position,R.Time
            FROM athlete AS A
            INNER JOIN team AS T
            ON A.ID_Team = T.Team_ID
            INNER JOIN results AS R
            ON A.Athlete_ID = R.ID_Athlete
            ORDER BY Ranking";
        $result = $conn->query($query);

        $ranks = [];
        $size = 0;
    ?>
        <div class="centered_container" id="table_container">
            <!-- Display Team Table -->
            <table align="center" border="1px" id="tblStats">
                <tr>
                    <th colspan="4">
                        <h2></h2>Teams Participating
                    </th>
                </tr>
                <th> Athlete_ID </th>
                <th> DOB </th>
                <th> Name </th>
                <th> Sex </th>
                <th> Team_ID </th>
                <th> Team_Name </th>
                <th> Country </th>
                <th> Ranking </th>
                <th> Position </th>
                <th> Time </th>
                </tr>

                <?php while ($rows = mysqli_fetch_assoc($result)) //Reading from the table Team//
                {
                    $ranks[$size] = $rows['Ranking'];
                    $size++;
                ?>
                    <tr>
                        <td><?php echo $rows['Athlete_ID']; ?></td>
                        <td><?php echo $rows['DOB']; ?></td>
                        <td><?php echo $rows['Name']; ?></td>
                        <td><?php echo $rows['Sex']; ?></td>
                        <td><?php echo $rows['Team_ID']; ?></td>
                        <td><?php echo $rows['Team_Name']; ?></td>
                        <td><?php echo $rows['Country']; ?></td>
                        <td><?php echo $rows['Ranking']; ?></td>
                        <td><?php echo $rows['Position']; ?></td>
                        <td><?php echo $rows['Time']; ?></td>
                    </tr>
                <?php

                }
                //Calculating ranking average//
                $sum = 0;
                for ($i = 0; $i < $size; $i++) {
                    $sum += $ranks[$i];
                }
                $argv = $sum / $size;
                ?>
            </table>
        </div>
        <h2 align="center" border="1px" style="width:600px; line-height:40px;">Average Ranking: <?php echo $argv ?></2><!-- Dispaly average -->
            </div>
        <?php } ?>
</body>