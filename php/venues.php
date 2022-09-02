<!DOCTYPE html>
<html lang="en">
<!-- Janco Spies u21434159 -->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css" />
    <title>Venues</title>
    <script src="https://code.JQuery.com/JQuery-3.4.1.min.js"></script>
    <script src="../js/venues.js"></script>
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

        public function addVenue($VName, $VType, $VLocation) //function to add new venue; returns true if successful else return string error message
        {
            if (MainDB::venueExists($VName, $VType, $VLocation)) //check if venue already exists
                return "This venue already exists";

            $stmt = $this->connec->prepare("INSERT INTO venues (Venue_Name, Venue_Type, Location) VALUES (?,?,?)");
            $stmt->bind_param("sss", $VName, $VType, $VLocation);
            $stmt->execute();
            if ($stmt->affected_rows <= 0) //if no rows added 
                return "Internal server error";
            return true;
        }

        public function editVenue($NewName, $NewType, $NewLocation, $OldName, $OldType, $OldLocation) //function to edit venue with field values matching "old" values; returns true if successful else return string error message
        {
            if (!MainDB::venueExists($OldName, $OldType, $OldLocation)) //check if venue exists
                return "This venue does not exist";

            $stmt = $this->connec->prepare("UPDATE venues SET Venue_Name=?, Venue_Type=?, Location=?  WHERE (Venue_Name = ? AND Venue_Type = ? AND Location = ?)");
            $stmt->bind_param("ssssss", $NewName, $NewType, $NewLocation, $OldName, $OldType, $OldLocation);
            $stmt->execute();
            if ($stmt->affected_rows <= 0) //if no rows added 
                return "Internal server error";
            return true;
        }

        public function getVenues() //function to get list of venues used to populate table; returns string encoded json object if successful else null
        {
            $query = "SELECT v.Venue_Name, v.Venue_Type, v.Location, COUNT(DISTINCT(e.Event_ID)) as Num_Events FROM venues as v LEFT JOIN `100m sprint` as e ON v.Venue_ID = e.Venue GROUP BY v.Venue_Name";
            $result = $this->connec->query($query);
            if ($result->num_rows > 0) {
                $ret = [];
                foreach ($result as $r)
                    array_push($ret, $r);
                return json_encode($ret);
            } else return null;
        }

        public function venueExists($VName, $VType, $VLocation) //function to check whether this venue already exists; returns true if successful else false
        {
            $stmt = $this->connec->prepare("SELECT * FROM venues WHERE Venue_Name = ? AND Venue_Type = ? AND Location = ?");
            $stmt->bind_param("sss", $VName, $VType, $VLocation);
            $stmt->execute();
            $res = $stmt->get_result();
            if ($res->num_rows > 0) //if any records returned 
                return true;
            return false;
        }
    }

    ?>
    <script>
        $('#venuesLink').addClass('active_link') //make navbar element the active link
    </script>
    <div class="main_container">
        <?php
        if (!isset($_SESSION['user'])) //if the user is not logged in, show a error message
            echo "<script>loadLoginErr()</script>";
        else {
            $con = MainDB::instance();
            if ($_SERVER["REQUEST_METHOD"] == "POST") { // if form has been posted
                if ($_POST["operation"] == "add") { //if form to add a new venue has been posted
                    $response = $con->addVenue($_POST['VenueName'], $_POST['VenueType'], $_POST['VenueLocation']);
                    if ($response === true) { //if operation was successful
                        echo "<div class='centered_container'><h1 class='errText'>Venue succesfully added</h1><br><h2>This page will refresh shortly</h2></div>";
                        header('Refresh: 3; url=venues.php'); //reload the page after 3 seconds
                    } else //show returned error message
                        echo "<script>loadErr('" . $response . "')</script>";
                } else if ($_POST["operation"] == "edit") { //if form to edit venue has been posted
                    $response = $con->editVenue($_POST['VenueName'], $_POST['VenueType'], $_POST['VenueLocation'], $_POST['oldName'], $_POST['oldType'], $_POST['oldLocation']);
                    if ($response === true) { //if operation was successful
                        echo "<div class='centered_container'><h1 class='errText'>Venue succesfully edited<br>This page will refresh shortly</h1></div>";
                        header('Refresh: 3; url=venues.php'); //reload the page after 3 seconds
                    } else //show returned error message
                        echo "<script>loadErr('" . $response . "')</script>";
                } else { //if unknown post request is received
                    echo "<script>loadErr('Unknown operation')</script>";
                }
            } else echo "<script>loadVenues(" . $con->getVenues() . ")</script>"; //load table with venues
        }
        ?>
    </div>
</body>

</html>