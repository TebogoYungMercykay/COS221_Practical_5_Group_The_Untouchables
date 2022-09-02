/***************************************************** Signup page ************************************************************/
function loadSignup() {//create the signup page and form
    $('.main_container').empty();//remove any existing elements
    $('.main_container').append($('<div class="centered_container">'));

    $('.centered_container').append($('<form id="frmSignup" onsubmit="return validateSignup()" action="signup.php" method="post">').append($('<legend>').html('Enter your details to sign up')));//create the signup form
    $('#frmSignup').append($('<p id="lblError">'));
    $('#frmSignup').append($('<p>').html('<label class="frmLabel" for="Name">Name: </label><input required class="frmInp" type="text" name="Name">'));
    $('#frmSignup').append($('<p>').html('<label class="frmLabel" for="Sname">Surname: </label><input required class="frmInp" type="text" name="Sname">'));
    $('#frmSignup').append($('<p>').html('<label class="frmLabel" for="Email">Email address: </label><input required class="frmInp" type="text" name="Email">'));
    $('#frmSignup').append($('<p>').html('<label class="frmLabel" for="Password">Password: </label><input required class="frmInp" type="password" name="Password">'));
    $('#frmSignup').append($('<p>').html('<label class="frmLabel" for="ConPassword">Confirm password: </label><input required class="frmInp" type="password" name="ConPassword">'));
    $('#frmSignup').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Already have an account? Click here to log in</a>'));//add signup form and redirect link to container
    $('#lblError').hide();
}
function validateSignup() {//function to check all requirements to create new user are met
    const EMAIL_EXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const PASS_UPPER = /[A-Z]+/;
    const PASS_LOWER = /[a-z]+/;
    const PASS_NUM = /[0-9]+/;
    const PASS_SYM = /[$%^&-+=()#?!@*_/]+/;
    const NAME_EXP = /[a-zA-Z]+/;
    const ILLEGAL_CHARS = /\\|<[^>]*>/;//illegal characters defined as \ or any text enclosed in <> tags

    var fName = $('[name="Name"]').val();
    var sName = $('[name="Sname"]').val();
    var Email = $('[name="Email"]').val();
    var Pass = $('[name="Password"]').val();
    var conPass = $('[name="ConPassword"]').val();
    $('#lblError').html('');
    $('#lblError').hide();

    if (!NAME_EXP.test(fName.trim()) || ILLEGAL_CHARS.test(fName.trim())) {//does name only contain alphabetic characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid name');
        $('[name="Name"]').focus();
        return false;
    }
    if (!NAME_EXP.test(sName.trim()) || ILLEGAL_CHARS.test(sName.trim())) {//does surname only contain alphabetic characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid surname');
        $('[name="Sname"]').focus();
        return false;
    }
    if (!EMAIL_EXP.test(Email.trim()) || ILLEGAL_CHARS.test(Email.trim())) {//is email in valid format? 
        $('#lblError').show();
        $('#lblError').html('Please enter a valid email address');
        $('[name="Email"]').focus();
        return false;
    }
    if (!PASS_UPPER.test(Pass.trim())) {//does password contain at least one upper case character?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid password (containing at least one upper case character)');
        $('[name="Password"]').focus();
        return false;
    }
    if (!PASS_LOWER.test(Pass.trim())) {//does password contain at least one lower case character?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid password (containing at least one lower case character)');
        $('[name="Password"]').focus();
        return false;
    }
    if (!PASS_NUM.test(Pass.trim())) {//does password contain at least one number?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid password (containing at least one numeric character)');
        $('[name="Password"]').focus();
        return false;
    }
    if (!PASS_SYM.test(Pass.trim())) {//does password contain at least one special symbol?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid password (containing at least one special character)');
        $('[name="Password"]').focus();
        return false;
    }
    if (ILLEGAL_CHARS.test(Pass.trim())) {//does password contain any illegal characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid password (not containing \\ or <>)');
        $('[name="Password"]').focus();
        return false;
    }
    if (Pass.length < 8) {//is password long enough?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid password (at least 8 characters long)');
        $('[name="Password"]').focus();
        return false;
    }
    if (Pass !== conPass) {//does password match the confirmation password?
        $('#lblError').show();
        $('#lblError').html('Please ensure that your passwords match');
        $('[name="ConPassword"]').focus();
        return false;
    }
    if (Pass === Email) {//is password and email identical?
        $('#lblError').show();
        $('#lblError').html('Password and email cannot be the same.');
        $('[name="Password"]').focus();
        return false;
    }
    return true;
}
function signupError(message) {//display passed in message as error if signup was unsuccessful
    $('.main_container').empty();//first cleat page
    $('.main_container').append($('<div class="centered_container" id="login_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('An error has occured:'));
    $('.centered_container').append($('<h1 class="errText">').text(message));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Click here to try again</a>'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Click here to log in instead</a>'));
}
function addUname(name) {//update navbar to contain username and logout button (since the changed header will only be loaded when the page is refreshed)
    $('#login_btns').empty();//remove signup and login buttons 
    $('#login_btns').append($('<li>').html('<a id="username_text">' + name + '</a>'));
    $('#login_btns').append($('<li>').html('<a href="logout.php" id="btnLogout">Log out</a>'));
    $('#username_text').addClass('flashing');//add flashing animation to username
}

/***************************************************** Login page ************************************************************/
function loadLogin() {//create login page and form
    $('.main_container').empty();//remove any existing elements
    $('.main_container').append($('<div class="centered_container">'));

    $('.centered_container').append($('<form id="frmLogin" onsubmit="return validateLogin()" action="login.php" method="post">').append($('<legend>').html('Enter your details to Log in')));//create login form
    $('#frmLogin').append($('<p id="lblError">'));
    $('#frmLogin').append($('<p>').html('<label class="frmLabel" for="Email">Email address: </label><input required class="frmInp" type="text" name="Email">'));
    $('#frmLogin').append($('<p>').html('<label class="frmLabel" for="Password">Password: </label><input required class="frmInp" type="password" name="Password">'));
    $('#frmLogin').append($('<input class="frmSub" type="submit" value="Submit"/>'));

    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Don\'t have an account yet? Click here to sign up</a>'));
    $('#lblError').hide();

}
function validateLogin() {//function to check all requirements to log in are met
    const ILLEGAL_CHARS = /\\|<[^>]*>/;
    var Email = $('[name="Email"]').val();
    var Pass = $('[name="Password"]').val();
    if (Pass.length == 0) {//is password entered?
        $('#lblError').show();
        $('#lblError').html('Please enter your password');
        $('[name="Password"]').focus();
        return false;
    }
    if (Email.length == 0) {//is email entered?
        $('#lblError').show();
        $('#lblError').html('Please enter your email address');
        $('[name="Email"]').focus();
        return false;
    }
    if (ILLEGAL_CHARS.test(Pass.trim())) {//does password contain any illegal characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid password (not containing \\ or <>)');
        $('[name="Password"]').focus();
        return false;
    }
    if (ILLEGAL_CHARS.test(Email.trim())) {//does email contain any illegal characters?
        $('#lblError').show();
        $('#lblError').html('Please enter a valid email address (not containing \\ or <>)');
        $('[name="Email"]').focus();
        return false;
    }
    return true;
}
function loginError(message) {//display passed in message as error if login was unsuccessful
    $('.main_container').empty();//first clear page 
    $('.main_container').append($('<div class="centered_container" id="login_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('An error has occured:'));
    $('.centered_container').append($('<h1 class="errText">').text(message));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Click here to try again</a>'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Click here to sign up instead</a>'));
}

/******************************************** Logout page ************************************************************/
function logoutFail() {//display message if logout was unsuccessful
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="login_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('Failed to log out'));
    $('.centered_container').append($('<h1 class="errText">').text('There is no user logged in'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Click here to sign up</a>'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Click here to log in</a>'));
}
function logoutSuccess() {//display message if logout was successful
    $('.main_container').empty();
    $('.main_container').append($('<div class="centered_container" id="login_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('You have successfully been logged out'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Click here to log back in</a>'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Click here to sign up</a>'));
    removeUname();//if logout was successful, rememove username and logout button from navbar
}
function removeUname() {//update navbar to contain signup and login buttons (since the changed header will only be loaded when the page is refreshed)
    console.log('removing uname');
    $('#login_btns').empty();//remove username and logout button
    $('#login_btns').append($('<li>').html('<a href="signup.php" id="btnSignup">Sign up</a>'));
    $('#login_btns').append($('<li>').html('<a href="login.php" id="btnLogin">Log in</a>'));
}

function loadLoginErr() {//function to display message for the user to log in first
    $('.main_container').empty();//first clear page 
    $('.main_container').append($('<div class="centered_container" id="login_error">'));
    $('.centered_container').append($('<h1 class="errText">').text('You must be logged in to access this content'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="login.php">Click here to log in</a>'));
    $('.centered_container').append($('<h2>').html('<a class="registration_redirect" href="signup.php">Click here to sign up instead</a>'));
}