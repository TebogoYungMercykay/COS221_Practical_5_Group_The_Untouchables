//Adam Osborne u21529583
var teams = [];//array storing all venues returned from the database

function loadTeams(arr) {//function to create the venues page using the data returned from the database as input
    if (arr == null) {
        loadErr("No teams were found");
        return;
    }
    $('.main_container').empty();//clear page and create elements above table
    $('.main_container').append($('<div id="head_container">').html('<h1>All currently registered Teams:<h1>'));
    $('#head_container').append('<label for="selTeamsSort" class="lblTeamsSort">Sort by:</label>');
    $('#head_container').append($('<select name="selTeamsSort" id="selTeamsSort" onchange="sortChange()">').html('<option value="name">Name</option><option value="country">Country</option><option value="rank">Rank</option>'));
    $('#head_container').append('<button id="btnAddTeam" onclick="loadAddTeam()">Add a new team</button>');
    $('.main_container').append($('<div class="centered_container" id="table_container">'));

    teams = arr;
    populateTable(arr);//populate the venues table

    document.getElementById('selTeamsSort').selectedIndex = "-1";
}

function loadAddTeam() {//function to create the page where new venues are added 
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="addTeam_container">'));

    $('#addTeam_container').append($('<form id="frmTeam" onsubmit="return validateTeam()" action="teams.php" method="post">').append($('<legend>').html('Enter the details of the new Team')));//create the venue form
    $('#frmTeam').append($('<p id="lblError">'));
    $('#frmTeam').append($('<p>').html('<label class="frmLabel" for="TeamName">Name: </label><input required class="frmInp" type="text" name="TeamName">'));
    $('#frmTeam').append($('<p>').html('<label class="frmLabel" for="TeamCountry">Country: </label><input required class="frmInp" type="text" name="TeamCountry">'));
    $('#frmTeam').append($('<p>').html('<label class="frmLabel" for="TeamRank">Rank: </label><input required class="frmInp" type="text" name="TeamRank">'));
    $('#frmTeam').append('<input required class="frmInp" type="hidden" name="operation" value="add">');//hidden input used by php file
    $('#frmTeam').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('#addTeam_container').append($('<h2>').html('<a class="team_redirect" href="teams.php">Click here to return to all teams</a>'));//Add link to move back to first screen
    $('#lblError').hide();
}

function edtTeam(row) {//function to create page where venues are edited
    var name = row.childNodes[0].innerText;//extract current values for venue from table row
    var country = row.childNodes[1].innerText;
    var rank = row.childNodes[2].innerText;
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="addTeam_container">'));

    $('#addTeam_container').append($('<form id="frmTeam" onsubmit="return validateTeam()" action="teams.php" method="post">').append($('<legend>').html('Edit the details for team ' + name)));//create the venue form
    $('#frmTeam').append($('<p id="lblError">'));
    $('#frmTeam').append($('<p>').html('<label class="frmLabel" for="TeamName">Name: </label><input required class="frmInp" type="text" name="TeamName" value="' + name + '">'));
    $('#frmTeam').append($('<p>').html('<label class="frmLabel" for="TeamCountry">Country: </label><input required class="frmInp" type="text" name="TeamCountry" value="' + country + '">'));
    $('#frmTeam').append($('<p>').html('<label class="frmLabel" for="TeamRank">Rank: </label><input required class="frmInp" type="text" name="TeamRank" value="' + rank + '">'));
    $('#frmTeam').append('<input required class="frmInp" type="hidden" name="oldName" value="' + name + '">');//hidden inputs used by php file
    $('#frmTeam').append('<input required class="frmInp" type="hidden" name="oldCountry" value="' + country + '">');
    $('#frmTeam').append('<input required class="frmInp" type="hidden" name="oldRank" value="' + rank + '">');
    $('#frmTeam').append('<input required class="frmInp" type="hidden" name="operation" value="edit">');
    $('#frmTeam').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('#addTeam_container').append($('<h2>').html('<a class="team_redirect" href="teams.php">Click here to return to all teams (any changes made will not be saved)</a>'));//Add link to move back to first screen
    $('#lblError').hide();
}

function validateTeam() {//function to check all requirements to create new venue are met
    const VALID_CHARS = /^[\w \s \- \']+$/;//all alphabetic and numeric characters together with whitespace, dash and single quote
    var VName = $('[name="TeamName"]').val();
    var VCountry = $('[name="TeamCountry"]').val();
    var VRank = $('[name="TeamRank"]').val();

    if (VName.length == 0) {//is name entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a team name');
        $('[name="TeamName"]').focus();
        return false;
    }

    if (VCountry.length == 0) {//is type entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a Country');
        $('[name="TeamCountry"]').focus();
        return false;
    }

    if (VRank.length == 0) {//is type entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a Rank');
        $('[name="TeamRank"]').focus();
        return false;
    }

    if (VName.length > 45) {//is name too long?
        $('#lblError').show();
        $('#lblError').html('Please enter a shorter team name');
        $('[name="TeamName"]').focus();
        return false;
    }

    if (VCountry.length > 45) {//is name too long?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid country');
        $('[name="TeamCountry"]').focus();
        return false;
    }

    if (!VALID_CHARS.test(VName.trim())) {//does venue name only contain alphanumeric characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid name (only alphanumeric characters allowed)');
        $('[name="TeamName"]').focus();
        return false;
    }

    if (!VALID_CHARS.test(VCountry.trim())) {//does venue type only contain alphanumeric characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid country (only alphanumeric characters allowed)');
        $('[name="TeamCountry"]').focus();
        return false;
    }
    return true;
}

function loadErr(message) {//function to create page displaying passed in error message
    $('.main_container').empty();//first clear page
    $('.main_container').append($('<div class="centered_container" id="team_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('An error has occured:'));
    $('.centered_container').append($('<h1 class="errText">').text(message));
    $('.centered_container').append($('<h2>').html('<a class="team_redirect" href="teams.php">Click here to try again</a>'));//link back to venues page
}

function loadLoginErr() {//function to display message for the user to log in first
    $('.main_container').empty();//first clear page 
    $('.main_container').append($('<div class="centered_container" id="login_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('You must be logged in to access this content'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Click here to log in</a>'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Click here to sign up instead</a>'));
}

function populateTable(obj) {//function to populate the venues table using the passed in json array
    $('#table_container').empty();//first table container
    $('#table_container').append($('<table id="tblTeams">').html('<tr><th>Team name</th><th>Team country</th><th>Team rank</th></tr>'));
    for (o of obj)
        $('#tblTeams').append('<tr onclick="edtTeam(this)"><td>' + o['Team_Name'] + '</td><td>' + o['Country'] + '</td><td>' + o['Ranking'] + '</td></tr>');
}

function sortChange() {//function to sort rows of table
    const sorting = $('#selTeamsSort').val();//find sorting value
    switch (sorting) {
        case 'name': {//sort by name ascending
            for (let out = 0; out < teams.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < teams.length; inn++) {
                    if (teams[out]['Team_Name'] > teams[inn]['Team_Name']) {
                        temp = teams[out];
                        teams[out] = teams[inn];
                        teams[inn] = temp;
                    }
                }
            }
            populateTable(teams);//populate table using newly sorted array
            break;
        }
        case 'country': {//sort by rank ascending 
            for (let out = 0; out < teams.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < teams.length; inn++) 
                {
                    if (teams[out]['Country'] > teams[inn]['Country']) 
                    {
                        temp = teams[out];
                        teams[out] = teams[inn];
                        teams[inn] = temp;
                    }
                }
            }
            populateTable(teams);//populate table using newly sorted array
            break;
        }

        case 'rank': {//sort by rank ascending 
            for (let out = 0; out < teams.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < teams.length; inn++) 
                {
                    if (teams[out]['Ranking'] > teams[inn]['Ranking']) 
                    {
                        temp = teams[out];
                        teams[out] = teams[inn];
                        teams[inn] = temp;
                    }
                }
            }
            populateTable(teams);//populate table using newly sorted array
            break;
        }
        default: {
            document.getElementById('selTeamsSort').selectedIndex = "-1";//if unrecognised sort variable, reset selector
            return;
        }
    }
}