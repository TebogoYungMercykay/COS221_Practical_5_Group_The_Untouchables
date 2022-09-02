//Adam Osborne u21529583
var athletes = [];//array storing all athletes returned from the database
var teamNames = [];//array storing all team names returned from the database

function loadAthletes(arr) {//function to create the athletes page using the data returned from the database as input
    if (arr == null) {
        loadErr("No athletes were found");
        return;
    }
    $('.main_container').empty();//clear page and create elements above table
    $('.main_container').append($('<div id="head_container">').html('<h1>All currently registered athletes:<h1>'));
    $('#head_container').append('<label for="selAthletesSort" class="lblAthletesSort">Sort by:</label>');
    $('#head_container').append($('<select name="selAthletesSort" id="selAthletesSort" onchange="sortChange()">').html('<option value="DOB">Date Of Birth</option><option value="name">Name</option><option value="sex">Sex</option><option value="time">PB Time</option><option value="teamName">Team Name</option>'));
    $('#head_container').append('<button id="btnAddAthlete" onclick="loadAddAthlete()">Add a new athlete</button>');
    $('.main_container').append($('<div class="centered_container" id="table_container">'));

    athletes = arr;
    populateTable(arr);//populate the athletes table

    document.getElementById('selAthletesSort').selectedIndex = "-1";
}

function loadAddAthlete() {//function to create the page where new athletes are added 
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="addAthlete_container">'));

    $('#addAthlete_container').append($('<form id="frmAthlete" onsubmit="return validateAthlete()" action="athletes.php" method="post">').append($('<legend>').html('Enter the details of the new Athlete')));//create the athlete form
    $('#frmAthlete').append($('<p id="lblError">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteDOB">DOB: </label><input required class="frmInp" type="date" id="AthleteDOB" name="AthleteDOB">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteName">Name: </label><input required class="frmInp" type="text" name="AthleteName">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteSex">Sex: </label><input required class="frmInp" type="text" name="AthleteSex">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteTime">PB Time: </label><input required class="frmInp" type="text" name="AthleteTime">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteTeam">Team Name: </label><select class="frmInp" form="frmAthlete" name="AthleteTeam">'));
    $('#frmAthlete').append('<input required class="frmInp" type="hidden" name="operation" value="add">');//hidden input used by php file
    $('#frmAthlete').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('#addAthlete_container').append($('<h2>').html('<a class="athlete_redirect" href="athletes.php">Click here to return to all athletes</a>'));//Add link to move back to first screen
    $('#lblError').hide();
    populateTeamNames();
    $('#AthleteDOB').attr('max', EndDate());
    $('#AthleteDOB').attr('min', BeginDate());
}

function edtAthlete(row) {//function to create page where athletes are edited
    var DOB = row.childNodes[0].innerText;//extract current values for athlete from table row
    var name = row.childNodes[1].innerText;
    var sex = row.childNodes[2].innerText;
    var time = row.childNodes[3].innerText;
    var team = row.childNodes[4].innerText;
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="addAthlete_container">'));

    $('#addAthlete_container').append($('<form id="frmAthlete" onsubmit="return validateAthlete()" action="athletes.php" method="post">').append($('<legend>').html('Edit the details for athlete ' + name)));//create the athlete form
    $('#frmAthlete').append($('<p id="lblError">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteDOB">DOB: </label><input required class="frmInp" type="date" id="AthleteDOB" name="AthleteDOB" value="' + DOB + '">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteName">Name: </label><input required class="frmInp" type="text" name="AthleteName" value="' + name + '">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteSex">Sex: </label><input required class="frmInp" type="text" name="AthleteSex" value="' + sex + '">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteTime">PB Time: </label><input required class="frmInp" type="text" name="AthleteTime" value="' + time + '">'));
    $('#frmAthlete').append($('<p>').html('<label class="frmLabel" for="AthleteTeam">Team Name: </label><select class="frmInp" form="frmAthlete" name="AthleteTeam">'));
    $('#frmAthlete').append('<input required class="frmInp" type="hidden" name="oldDOB" value="' + DOB + '">');//hidden inputs used by php file
    $('#frmAthlete').append('<input required class="frmInp" type="hidden" name="oldName" value="' + name + '">');
    $('#frmAthlete').append('<input required class="frmInp" type="hidden" name="oldSex" value="' + sex + '">');
    $('#frmAthlete').append('<input required class="frmInp" type="hidden" name="oldTime" value="' + time + '">');
    $('#frmAthlete').append('<input required class="frmInp" type="hidden" name="oldTeam" value="' + team + '">');
    $('#frmAthlete').append('<input required class="frmInp" type="hidden" name="operation" value="edit">');
    $('#frmAthlete').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('#addAthlete_container').append($('<h2>').html('<a class="athlete_redirect" href="athletes.php">Click here to return to all athletes (any changes made will not be saved)</a>'));//Add link to move back to first screen
    $('#lblError').hide();
    populateTeamNames();
    document.getElementsByTagName('select')[0].value = team;
    $('#AthleteDOB').attr('max', EndDate());
    $('#AthleteDOB').attr('min', BeginDate());
}

function loadTeamNames(arr) {
    teamNames = arr;
}

function populateTeamNames() {
    console.log(teamNames);
    for (t of teamNames)
        $('[name="AthleteTeam"]').append('<option value="' + t['Team_Name'] + '">' + t['Team_Name'] + '</option>');

    document.getElementsByTagName('select')[0].selectedIndex = "-1";
}

function validateAthlete() {//function to check all requirements to create new athlete are met
    const VALID_CHARS = /^[\w \s \- \']+$/;//all alphabetic and numeric characters together with whitespace, dash and single quote
    const VALID_SEX = /^[MF]$/;
    const VALID_TIME = /^\d{2}:\d{2}:\d{2}\.\d{2}$/;
    var VDOB = $('[name="AthleteDOB"]').val();
    var VName = $('[name="AthleteName"]').val();
    var VSex = $('[name="AthleteSex"]').val();
    var VTime = $('[name="AthleteTime"]').val();
    var VTeam = $('[name="AthleteTeam"]').val();

    if (VDOB.length == 0) {//is name entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a athlete name');
        $('[name="AthleteDOB"]').focus();
        return false;
    }

    if (VName.length == 0) {//is name entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a athlete name');
        $('[name="AthleteName"]').focus();
        return false;
    }

    if (VSex.length == 0) {//is type entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a sex');
        $('[name="AthleteSex"]').focus();
        return false;
    }

    if (VTime.length == 0) {//is type entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a time');
        $('[name="AthleteTime"]').focus();
        return false;
    }

    if (VTeam.length == 0) {//is type entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a team');
        $('[name="AthleteTeam"]').focus();
        return false;
    }

    if (VName.length > 45) {//is name too long?
        $('#lblError').show();
        $('#lblError').html('Please enter a shorter Athlete name');
        $('[name="AthleteName"]').focus();
        return false;
    }

    if (!VALID_CHARS.test(VName.trim())) {//does athlete name only contain alphanumeric characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid name (only alphanumeric characters allowed)');
        $('[name="AthleteName"]').focus();
        return false;
    }

    if (!VALID_SEX.test(VSex.trim())) {//is the sex in a valid format?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid sex (M or F)');
        $('[name="AthleteSex"]').focus();
        return false;
    }

    if (!VALID_TIME.test(VTime.trim()) || VTime === '00:00:00.00') {//is the time in a valid format?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid PB time (HH:MM:SS.mm)');
        $('[name="AthleteTime"]').focus();
        return false;
    }
    return true;
}

function loadErr(message) {//function to create page displaying passed in error message
    $('.main_container').empty();//first clear page
    $('.main_container').append($('<div class="centered_container" id="team_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('An error has occured:'));
    $('.centered_container').append($('<h1 class="errText">').text(message));
    $('.centered_container').append($('<h2>').html('<a class="athlete_redirect" href="athletes.php">Click here to try again</a>'));//link back to athletes page
}

function loadLoginErr() {//function to display message for the user to log in first
    $('.main_container').empty();//first clear page 
    $('.main_container').append($('<div class="centered_container" id="login_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('You must be logged in to access this content'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Click here to log in</a>'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Click here to sign up instead</a>'));
}

function populateTable(obj) {//function to populate the athletes table using the passed in json array
    $('#table_container').empty();//first table container
    $('#table_container').append($('<table id="tblAthletes">').html('<tr><th>Athlete DOB</th><th>Athlete Name</th><th>Athlete Sex</th><th>Athlete PB Time</th><th>Team Name</th></tr>'));
    for (o of obj)
        $('#tblAthletes').append('<tr onclick="edtAthlete(this)"><td>' + o['DOB'] + '</td><td>' + o['Name'] + '</td><td>' + o['Sex'] + '</td><td>' + o['PB_Time'] + '</td><td>' + o['Team_Name'] + '</td></tr>');
}

function sortChange() {//function to sort rows of table
    const sorting = $('#selAthletesSort').val();//find sorting value
    switch (sorting) {
        case 'DOB': {//sort by name ascending
            for (let out = 0; out < athletes.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < athletes.length; inn++) {
                    if (athletes[out]['DOB'] > athletes[inn]['DOB']) {
                        temp = athletes[out];
                        athletes[out] = athletes[inn];
                        athletes[inn] = temp;
                    }
                }
            }
            populateTable(athletes);//populate table using newly sorted array
            break;
        }
        case 'name': {//sort by rank ascending 
            for (let out = 0; out < athletes.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < athletes.length; inn++) {
                    if (athletes[out]['Name'] > athletes[inn]['Name']) {
                        temp = athletes[out];
                        athletes[out] = athletes[inn];
                        athletes[inn] = temp;
                    }
                }
            }
            populateTable(athletes);//populate table using newly sorted array
            break;
        }

        case 'sex': {//sort by rank ascending 
            for (let out = 0; out < athletes.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < athletes.length; inn++) {
                    if (athletes[out]['Sex'] > athletes[inn]['Sex']) {
                        temp = athletes[out];
                        athletes[out] = athletes[inn];
                        athletes[inn] = temp;
                    }
                }
            }
            populateTable(athletes);//populate table using newly sorted array
            break;
        }

        case 'time': {//sort by rank ascending 
            for (let out = 0; out < athletes.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < athletes.length; inn++) {
                    if (athletes[out]['PB_Time'] > athletes[inn]['PB_Time']) {
                        temp = athletes[out];
                        athletes[out] = athletes[inn];
                        athletes[inn] = temp;
                    }
                }
            }
            populateTable(athletes);//populate table using newly sorted array
            break;
        }

        case 'teamName': {//sort by rank ascending 
            for (let out = 0; out < athletes.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < athletes.length; inn++) {
                    if (athletes[out]['Team_Name'] > athletes[inn]['Team_Name']) {
                        temp = athletes[out];
                        athletes[out] = athletes[inn];
                        athletes[inn] = temp;
                    }
                }
            }
            populateTable(athletes);//populate table using newly sorted array
            break;
        }
        default: {
            document.getElementById('selAthletesSort').selectedIndex = "-1";//if unrecognised sort variable, reset selector
            return;
        }
    }
}

function EndDate() {
    var today = new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today

    //if day is below 10, add a zero before (ex: 9 -> 09)
    if(dd<10) {
        dd='0'+dd
    }

    //like the day, do the same to month (3->03)
    if(mm<10) {
        mm='0'+mm
    }

    //finally join yyyy mm and dd with a "-" between then
    return (yyyy-1)+'-'+mm+'-'+dd;
}

function BeginDate() {
    var today = new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today

    //if day is below 10, add a zero before (ex: 9 -> 09)
    if(dd<10) {
        dd='0'+dd
    }

    //like the day, do the same to month (3->03)
    if(mm<10) {
        mm='0'+mm
    }

    //finally join yyyy mm and dd with a "-" between then
    return (yyyy-100)+'-'+mm+'-'+dd;
}