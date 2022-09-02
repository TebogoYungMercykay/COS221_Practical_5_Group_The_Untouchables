<!DOCTYPE html>
<html lang="en">
<!-- Adam Osborne u21529583-->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css" />
    <title>Teams</title>
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="../js/teams.js"></script>
</head>

<body>
    <?php $GLOBALS['parent_file'] = 1; //specifies that this file is in the same folder as header.php
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

        public function addTeam($VName, $VCountry, $VRank) //function to add new venue; returns true if successful else return string error message
        {
            if (MainDB::teamExists($VName, $VCountry, $VRank)) //check if venue already exists
                return "This team already exists";

            $stmt = $this->connec->prepare("INSERT INTO team (Team_Name, Country, Ranking) VALUES (?,?,?)");
            $stmt->bind_param("ssi", $VName, $VCountry, $VRank);
            $stmt->execute();
            if ($stmt->affected_rows <= 0) //if no rows added 
                return "Internal server error";
            return true;
        }

        public function editTeam($NewName, $NewCountry,$NewRank, $OldName,$OldCountry, $OldRank) //function to edit venue with field values matching "old" values; returns true if successful else return string error message
        {
            if (!MainDB::teamExists($OldName, $OldRank, $OldCountry)) //check if venue exists
                return "This team does not exist";

            $stmt = $this->connec->prepare("UPDATE team SET Team_Name=?, Country=?, Ranking=?  WHERE (Team_Name = ? AND Country = ? AND Ranking = ?)");
            $stmt->bind_param("ssissi", $NewName, $NewCountry,$NewRank, $OldName,$OldCountry, $OldRank);
            $stmt->execute();
            if ($stmt->affected_rows <= 0) //if no rows added 
                return "Internal server error";
            return true;
        }

        public function getTeams() //function to get list of venues used to populate table; returns string encoded json object if successful else null
        {
            $query = "SELECT Team_Name, Country, Ranking FROM team";
            $result = $this->connec->query($query);
            if ($result->num_rows > 0) {
                $ret = [];
                foreach ($result as $r)
                    array_push($ret, $r);
                return json_encode($ret);
            } else return null;
        }

        public function teamExists($VName, $VCountry, $VRank) //function to check whether this venue already exists; returns true if successful else false
        {
            $stmt = $this->connec->prepare("SELECT * FROM team WHERE Team_Name = ? AND Country= ? AND Ranking = ?");
            $stmt->bind_param("ssi", $VName, $VCountry, $VRank);
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0) //if any records returned 
                return true;
            return false;
        }
    }

    ?>
    <script>
        $('#teamsLink').addClass('active_link') //make navbar element the active link
    </script>
    <div class="main_container">
        <?php
        if (!isset($_SESSION['user'])) //if the user is not logged in, show a error message
            echo "<script>loadLoginErr()</script>";
        else {
            $con = MainDB::instance();
            if ($_SERVER["REQUEST_METHOD"] == "POST") { // if form has been posted
                if ($_POST["operation"] == "add") { //if form to add a new venue has been posted
                    $response = $con->addTeam($_POST['TeamName'], $_POST['TeamCountry'], $_POST['TeamRank']);
                    if ($response === true) { //if operation was successful
                        echo "<div class='centered_container'><h1 class='errText'>Team succesfully added</h1><br><h2>This page will refresh shortly</h2></div>";
                        header('Refresh: 3; url=teams.php'); //reload the page after 3 seconds
                    } else //show returned error message
                        echo "<script>loadErr('" . $response . "')</script>";
                } else if ($_POST["operation"] == "edit") { //if form to edit venue has been posted
                    $response = $con->editTeam($_POST['TeamName'], $_POST['Country'], $_POST['Ranking'], $_POST['oldName'], $_POST['oldCountry'], $_POST['oldRanking']);
                    if ($response === true) { //if operation was successful
                        echo "<div class='centered_container'><h1 class='errText'>Team succesfully edited<br>This page will refresh shortly</h1></div>";
                        header('Refresh: 3; url=teams.php'); //reload the page after 3 seconds
                    } else //show returned error message
                        echo "<script>loadErr('" . $response . "')</script>";
                } else { //if unknown post request is received
                    echo "<script>loadErr('Unknown operation')</script>";
                }
            } else echo "<script>loadTeams(" . $con->getTeams() . ")</script>"; //load table with venues
        }
        ?>
    </div>
</body>

</html>