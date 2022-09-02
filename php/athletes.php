<!DOCTYPE html>
<html lang="en">
<!-- Adam Osborne u21529583-->

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css" />
    <title>Athletes</title>
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="../js/athletes.js"></script>
</head>

<body>
    <?php

    use MainDB as GlobalMainDB;

    $GLOBALS['parent_file'] = 1; //specifies that this file is in the same folder as header.php
    include_once("header.php");
    class MainDB //class used to interact with the main database
    {
        private $connec; //connection object to interact with db
        public static function instance() //singleton function
        {
            static $instance = null;
            if ($instance === null)
                $instance = new MainDB();
            return $instance;
        }
        private function __construct() //connecting to the db using environment variables in .env file
        {
            $this->connec = new mysqli($_ENV['DBHOST'], $_ENV['DBUSERNAME'], $_ENV['DBPASSWORD']);
            if ($this->connec->connect_error)
                die("Connection failure: " . $this->connec->connect_error);
            else {
                $this->connec->select_db($_ENV['MAINDBNAME']);
            }
        }
        public function __destruct() //destructor closes connection
        {
            $this->connec->close();
        }

        public function addAthlete($VDOB, $VName, $VSex, $VTime, $VTeamName) //function to add new venue; returns true if successful else return string error message
        {
            $VTeam = MainDB::teamByName($VTeamName);
            echo '<script>alert("Team: '.$VTeam.'")</script>';
            if ($VTeam === null)
                return "Team not found";

            if (MainDB::athleteExists($VDOB, $VName, $VSex, $VTime, $VTeam)) //check if venue already exists
                return "This Athlete already exists";

            $stmt = $this->connec->prepare("INSERT INTO athlete (DOB, Name, Sex, PB_Time,ID_Team) VALUES (?,?,?,?,?)");
            $stmt->bind_param("ssssi", $VDOB, $VName, $VSex, $VTime, $VTeam);
            $stmt->execute();
            if ($stmt->affected_rows <= 0) //if no rows added 
                return "Internal server error";
            return true;
        }

        public function editAthlete($NewDOB, $NewName, $NewSex, $NewTime, $NewTeamName, $OldDOB, $OldName, $OldSex, $OldTime, $OldTeamName) //function to edit venue with field values matching "old" values; returns true if successful else return string error message
        {
            $NewTeam = MainDB::teamByName($NewTeamName);
            $OldTeam = MainDB::teamByName($OldTeamName);
            if ($NewTeam === null || $OldTeam === null)
                return "Team not found";

            if (!MainDB::athleteExists($OldDOB, $OldName, $OldSex, $OldTime, $OldTeam)) //check if venue exists
                return "This athlete does not exist";

            $stmt = $this->connec->prepare("UPDATE athlete SET DOB=?, Name=?, Sex=?, PB_Time = ? ID_Team = ? WHERE (DOB = ? AND Name = ? AND Sex = ? AND PB_Time = ? AND ID_Team = ?)");
            $stmt->bind_param("ssssissssi", $NewDOB, $NewName, $NewSex, $NewTime, $NewTeam, $OldDOB, $OldName, $OldSex, $OldTime, $OldTeam);
            $stmt->execute();
            if ($stmt->affected_rows <= 0) //if no rows added 
                return "Internal server error";
            return true;
        }

        public function getAthletes() //function to get list of venues used to populate table; returns string encoded json object if successful else null
        {
            $query = "SELECT Team_Name, DOB, Name, Sex, PB_Time FROM athlete,team WHERE ID_Team = Team_ID";
            $result = $this->connec->query($query);
            if ($result->num_rows > 0) {
                $ret = [];
                foreach ($result as $r)
                    array_push($ret, $r);
                return json_encode($ret);
            } else return null;
        }

        public function athleteExists($VDOB, $VName, $VSex, $VTime, $VTeam) //function to check whether this venue already exists; returns true if successful else false
        {
            $stmt = $this->connec->prepare("SELECT * FROM athlete WHERE DOB = ? AND Name= ? AND Sex = ? AND PB_Time = ? AND ID_Team = ?");
            $stmt->bind_param("ssssi", $VDOB, $VName, $VSex, $VTime, $VTeam);
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0) //if any records returned 
                return true;
            return false;
        }

        public function teamByName($VName) //function to check whether this venue already exists; returns true if successful else false
        {
            $stmt = $this->connec->prepare("SELECT Team_ID FROM team WHERE Team_Name = ?");
            $stmt->bind_param("s", $VName);
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0) //if any records returned 
                foreach ($res as $r)
                    return $r['Team_ID'];
            return null;
        }

        public function getTeamNames()
        {
            $query = "SELECT Team_Name FROM team";
            $result = $this->connec->query($query);
            if ($result->num_rows > 0) {
                $ret = [];
                foreach ($result as $r)
                    array_push($ret, $r);
                return json_encode($ret);
            } else return null;
        }
    }

    ?>
    <script>
        $('#athletesLink').addClass('active_link') //make navbar element the active link
    </script>
    <div class="main_container">
        <?php
        if (!isset($_SESSION['user'])) //if the user is not logged in, show a error message
            echo "<script>loadLoginErr()</script>";
        else {
            $con = MainDB::instance();
            if ($_SERVER["REQUEST_METHOD"] == "POST") { // if form has been posted
                if ($_POST["operation"] == "add") { //if form to add a new venue has been posted
                    $response = $con->addAthlete($_POST['AthleteDOB'], $_POST['AthleteName'], $_POST['AthleteSex'], $_POST['AthleteTime'], $_POST['AthleteTeam']);
                    if ($response === true) { //if operation was successful
                        echo "<div class='centered_container'><h1 class='errText'>Athlete succesfully added</h1><br><h2>This page will refresh shortly</h2></div>";
                        header('Refresh: 3; url=athletes.php'); //reload the page after 3 seconds
                    } else //show returned error message
                        echo "<script>loadErr('" . $response . "')</script>";
                } else if ($_POST["operation"] == "edit") { //if form to edit venue has been posted
                    $response = $con->editVenue($_POST['AthleteDOB'], $_POST['AthleteName'], $_POST['AthleteSex'], $_POST['AthleteTime'], $_POST['AthleteTeam'], $_POST['oldDOB'], $_POST['oldName'], $_POST['oldSex'], $_POST['oldTime'], $_POST['oldTeam']);
                    if ($response === true) { //if operation was successful
                        echo "<div class='centered_container'><h1 class='errText'>Athlete succesfully edited<br>This page will refresh shortly</h1></div>";
                        header('Refresh: 3; url=athletes.php'); //reload the page after 3 seconds
                    } else //show returned error message
                        echo "<script>loadErr('" . $response . "')</script>";
                } else { //if unknown post request is received
                    echo "<script>loadErr('Unknown operation')</script>";
                }
            } else echo "<script>loadAthletes(" . $con->getAthletes() . "); loadTeamNames(". $con->getTeamNames() .")</script>"; //load table with venues
        }
        ?>
    </div>
</body>

</html>