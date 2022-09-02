//Janco Spies u21434159
var venues = [];//array storing all venues returned from the database

function loadVenues(arr) {//function to create the venues page using the data returned from the database as input
    if (arr == null) {
        loadErr("No venues were found");
        return;
    }
    $('.main_container').empty();//clear page and create elements above table
    $('.main_container').append($('<div id="head_container">').html('<h1>All currently registered venues:<h1>'));
    $('#head_container').append('<label for="selVenuesSort" class="lblVenuesSort">Sort by:</label>');
    $('#head_container').append($('<select name="selVenuesSort" id="selVenuesSort" onchange="sortChange()">').html('<option value="name">Name</option><option value="location">Location</option><option value="events">Events hosted</option>'));
    $('#head_container').append('<button id="btnAddVenue" onclick="loadAddVenues()">Add a new venue</button>');
    $('.main_container').append($('<div class="centered_container" id="table_container">'));

    venues = arr;
    populateTable(arr);//populate the venues table

    document.getElementById('selVenuesSort').selectedIndex = "-1";
}

function loadAddVenues() {//function to create the page where new venues are added 
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="addVenue_container">'));

    $('#addVenue_container').append($('<form id="frmVenue" onsubmit="return validateVenue()" action="venues.php" method="post">').append($('<legend>').html('Enter the details of the new venue')));//create the venue form
    $('#frmVenue').append($('<p id="lblError">'));
    $('#frmVenue').append($('<p>').html('<label class="frmLabel" for="VenueName">Name: </label><input required class="frmInp" type="text" name="VenueName">'));
    $('#frmVenue').append($('<p>').html('<label class="frmLabel" for="VenueType">Type: </label><input required class="frmInp" type="text" name="VenueType">'));
    $('#frmVenue').append($('<p>').html('<label class="frmLabel" for="VenueLocation">Location: </label><input required class="frmInp" type="text" name="VenueLocation">'));
    $('#frmVenue').append('<input required class="frmInp" type="hidden" name="operation" value="add">');//hidden input used by php file
    $('#frmVenue').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('#addVenue_container').append($('<h2>').html('<a class="venue_redirect" href="venues.php">Click here to return to all venues</a>'));//Add link to move back to first screen
    $('#lblError').hide();
}

function edtVenue(row) {//function to create page where venues are edited
    var name = row.childNodes[0].innerText;//extract current values for venue from table row
    var type = row.childNodes[1].innerText;
    var location = row.childNodes[2].innerText;
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="addVenue_container">'));

    $('#addVenue_container').append($('<form id="frmVenue" onsubmit="return validateVenue()" action="venues.php" method="post">').append($('<legend>').html('Edit the details for venue ' + name)));//create the venue form
    $('#frmVenue').append($('<p id="lblError">'));
    $('#frmVenue').append($('<p>').html('<label class="frmLabel" for="VenueName">Name: </label><input required class="frmInp" type="text" name="VenueName" value="' + name + '">'));
    $('#frmVenue').append($('<p>').html('<label class="frmLabel" for="VenueType">Type: </label><input required class="frmInp" type="text" name="VenueType" value="' + type + '">'));
    $('#frmVenue').append($('<p>').html('<label class="frmLabel" for="VenueLocation">Location: </label><input required class="frmInp" type="text" name="VenueLocation" value="' + location + '">'));
    $('#frmVenue').append('<input required class="frmInp" type="hidden" name="oldName" value="' + name + '">');//hidden inputs used by php file
    $('#frmVenue').append('<input required class="frmInp" type="hidden" name="oldType" value="' + type + '">');
    $('#frmVenue').append('<input required class="frmInp" type="hidden" name="oldLocation" value="' + location + '">');
    $('#frmVenue').append('<input required class="frmInp" type="hidden" name="operation" value="edit">');
    $('#frmVenue').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('#addVenue_container').append($('<h2>').html('<a class="venue_redirect" href="venues.php">Click here to return to all venues (any changes made will not be saved)</a>'));//Add link to move back to first screen
    $('#lblError').hide();
}

function validateVenue() {//function to check all requirements to create new venue are met
    const VALID_CHARS = /^[\w \s \- \']+$/;//all alphabetic and numeric characters together with whitespace, dash and single quote
    var VName = $('[name="VenueName"]').val();
    var VType = $('[name="VenueType"]').val();
    var VLocation = $('[name="VenueLocation"]').val();

    if (VName.length == 0) {//is name entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a venue name');
        $('[name="VenueName"]').focus();
        return false;
    }
    if (VType.length == 0) {//is type entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a venue typr');
        $('[name="VenueType"]').focus();
        return false;
    }
    if (VLocation.length == 0) {//is location entered?
        $('#lblError').show();
        $('#lblError').html('Please enter a venue location');
        $('[name="VenueLocation"]').focus();
        return false;
    }

    if (VName.length > 45) {//is name too long?
        $('#lblError').show();
        $('#lblError').html('Please enter a shorter venue name');
        $('[name="VenueName"]').focus();
        return false;
    }
    if (VType.length > 45) {//is type too long?
        $('#lblError').show();
        $('#lblError').html('Please enter a shorter venue type');
        $('[name="VenueType"]').focus();
        return false;
    }
    if (VLocation.length > 45) {//is location too long?
        $('#lblError').show();
        $('#lblError').html('Please enter a shorter venue location');
        $('[name="VenueLocation"]').focus();
        return false;
    }

    if (!VALID_CHARS.test(VName.trim())) {//does venue name only contain alphanumeric characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid name (only alphanumeric characters allowed)');
        $('[name="VenueName"]').focus();
        return false;
    }
    if (!VALID_CHARS.test(VType.trim())) {//does venue type only contain alphanumeric characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid type (only alphanumeric characters allowed)');
        $('[name="VenueType"]').focus();
        return false;
    }
    if (!VALID_CHARS.test(VLocation.trim())) {//does venue location only contain alphanumeric characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid location (only alphanumeric characters allowed)');
        $('[name="VenueLocation"]').focus();
        return false;
    }
    return true;
}

function loadErr(message) {//function to create page displaying passed in error message
    $('.main_container').empty();//first clear page
    $('.main_container').append($('<div class="centered_container" id="venue_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('An error has occured:'));
    $('.centered_container').append($('<h1 class="errText">').text(message));
    $('.centered_container').append($('<h2>').html('<a class="venue_redirect" href="venues.php">Click here to try again</a>'));//link back to venues page
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
    $('#table_container').append($('<table id="tblVenues">').html('<tr><th>Venue name</th><th>Venue type</th><th>Venue location</th><th>Events hosted</th></tr>'));
    for (o of obj)
        $('#tblVenues').append('<tr onclick="edtVenue(this)"><td>' + o['Venue_Name'] + '</td><td>' + o['Venue_Type'] + '</td><td>' + o['Location'] + '</td><td>' + o['Num_Events'] + '</td></tr>');
}

function sortChange() {//function to sort rows of table
    const sorting = $('#selVenuesSort').val();//find sorting value
    switch (sorting) {
        case 'name': {//sort by name ascending
            for (let out = 0; out < venues.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < venues.length; inn++) {
                    if (venues[out]['Venue_Name'] > venues[inn]['Venue_Name']) {
                        temp = venues[out];
                        venues[out] = venues[inn];
                        venues[inn] = temp;
                    }
                }
            }
            populateTable(venues);//populate table using newly sorted array
            break;
        }
        case 'location': {//sort by location ascending 
            for (let out = 0; out < venues.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < venues.length; inn++) {
                    if (venues[out]['Location'] > venues[inn]['Location']) {
                        temp = venues[out];
                        venues[out] = venues[inn];
                        venues[inn] = temp;
                    }
                }
            }
            populateTable(venues);//populate table using newly sorted array
            break;
        }
        case 'events': {//sort by events descending 
            for (let out = 0; out < venues.length - 1; out++) {//simple selection sort algorithm
                for (let inn = out + 1; inn < venues.length; inn++) {
                    console.log('out: ' + venues[out]['Num_Events'] + ' inn: ' + venues[inn]['Num_Events']);
                    if (venues[out]['Num_Events'] < venues[inn]['Num_Events']) {
                        temp = venues[out];
                        venues[out] = venues[inn];
                        venues[inn] = temp;
                    }
                }
            }
            populateTable(venues);//populate table using newly sorted array
            break;
        }
        default: {
            document.getElementById('selVenuesSort').selectedIndex = "-1";//if unrecognised sort variable, reset selector
            return;
        }
    }
}