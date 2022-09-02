<?php session_start(); ?>
<!-- Navbar Code -->
<ul id="navbar">
    <li><a id="homeLink" href=<?php if ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) echo "\"index.php\"";
                                else echo "\"../index.php\""; ?>>Homepage</a></li>
    <li><a id="venuesLink" href=<?php if ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) echo "\"php/venues.php\"";
                                else echo "\"venues.php\""; ?>>Venues</a></li>
    <li><a id="teamsLink" href=<?php if ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) echo "\"php/teams.php\"";
                                else echo "\"teams.php\""; ?>>Teams</a></li>
    <li><a id="athletesLink" href=<?php if ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) echo "\"php/athletes.php\"";
                                    else echo "\"athletes.php\""; ?>>Athletes</a></li>
    <li><a id="uploadMediaLink" href=<?php if ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) echo "\"php/uploadMedia.php\"";
                                        else echo "\"uploadMedia.php\""; ?>>Upload Media</a></li>
    <li><a id="statisticsLink" href=<?php if ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) echo "\"php/stats.php\"";
                                    else echo "\"stats.php\""; ?>>Statistics</a></li>
    <li><a id="captureLink" href=<?php if ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) echo "\"php/LogUpdate.php\"";
                                    else echo "\"LogUpdate.php\""; ?>>Capture scores</a></li>
    <div id="login_btns">
        <?php if (!isset($_SESSION['user'])) {
            $path = ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) ? "php/" : "../php/";
            echo '<li><a href="' . $path . 'signup.php" id="btnSignup">Sign up</a></li>';
            echo '<li><a href="' . $path . 'login.php" id="btnLogin">Log in</a></li>';
        } else {
            $path = ((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) ? "php/" : "../php/";
            echo '<li><a id="username_text">' . $_SESSION['user']['name'] . '</a></li>';
            echo '<li><a href="' . $path . 'logout.php" id="btnLogout">Log out</a></li>';
        } ?>
    </div>
</ul>


<?php
// .env file setup code (if it is marked as having a syntax error, try logging in to see if it works and just ignore the error)
((isset($GLOBALS) && $GLOBALS['parent_file'] == 0)) ? require_once('vendor/autoload.php') : require_once('../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// db Class to connect to users database
class UsersDB
{
    private $connec; //connection object to interact with db
    public static function instance() //singleton function
    {
        static $instance = null;
        if ($instance === null)
            $instance = new UsersDB();
        return $instance;
    }
    private function __construct() //connecting to the db using environment variables in .env file
    {
        $this->connec = new mysqli($_ENV['DBHOST'], $_ENV['DBUSERNAME'], $_ENV['DBPASSWORD']);
        if ($this->connec->connect_error)
            die("Connection failure: " . $this->connec->connect_error);
        else {
            $this->connec->select_db($_ENV['USERSDBNAME']);
        }
    }
    public function __destruct() //destructor closes connection
    {
        $this->connec->close();
    }

    public function addUser($name, $sname, $email, $password) //function to add new user to the db; returns true if successful else return string error message
    {
        if (UsersDB::userExists($email))
            return "User already exists";

        //hash password using current timestamp as salt with sha512 algorithm and pbkdf2 function to make it slower
        $time = time();
        $hashedPass = hash_pbkdf2("sha512", $password, $time, 1000, 30);

        $stmt = $this->connec->prepare("INSERT INTO users (name, surname, email, password, time_created) VALUES (?,?,?,?,?)");
        $stmt->bind_param("sssii", $name, $sname, $email, $hashedPass, $time);
        $stmt->execute();
        if ($stmt->affected_rows <= 0) //if no rows added 
            return "Internal server error";
        return true;
    }

    public function userExists($email) //function to check whether a user exists by their email; returns true if successful else return false
    {
        $stmt = $this->connec->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $res = $stmt->get_result();
        if ($res->num_rows == 0)
            return false;
        return true;
    }

    public function isValidLogin($email, $password) // function to check whether provided login details are correct; returns true if successful else return string error message
    {
        if (!UsersDB::userExists($email))
            return "User does not exist";
        $stmt = $this->connec->prepare("SELECT password, time_created FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $res = $stmt->get_result();
        if ($res->num_rows > 0) { //if a result is returned
            foreach ($res as $r) {
                $pass = $r['password'];
                $time = $r['time_created'];
            }
        } else
            return "Internal server error";

        $hash_check = hash_pbkdf2("sha512", $password, $time, 1000, 30);
        if ($pass === $hash_check) //verify password against hash
            return true;
        return "Incorrect password";
    }
}
?>