$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#refno` text field.
            The code checks if the current reference number entered by the user
            in the text field does not exist in the database.

            If the current reference number exists in the database:
            - `#refno` text field background color turns to red
            - `#error` displays an error message `Reference number already in
            the database`
            - `#submit` is disabled

            else if the current reference number does not exist in the
            database:
            - `#refno` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    $('#username').keyup(function () {
        var refno = $("#username").val();

        $.get('/getCheckRefNo', {username: username}, function(result){
            if(result.username == username){
                $("#error").html("The username is already used");
                $("#refno").css("background-color", "red");
                $("#submit").prop("disabled", true);
            }
            else{
                $("#error").html("");
                $("#refno").css("background-color", "white");
                $("#submit").prop("disabled", false);
            }
        });
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if all text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            If at least one field is empty, the `#error` paragraph displays
            the error message `Fill up all fields.`

            If there are no errors, the new transaction should be displayed
            immediately, and without refreshing the page, after the values
            are saved in the database.

            The name, reference number, and amount fields are reset to empty
            values.
    */
    $('#submit').click(function () {
        var name = $("#name")
        var username = $("#username")
        var about = $("#about")
        var email = $("#email")
        var password = $("#password")
        
        if (name.val() != "" && username.val() != "" && about.val() != "" 
            && email.val() != "" && password.val() != ""){
            $("#error").html("");
            var addUser = {
                name: name.val(),
                username: username.val(),
                about: about.val(),
                email: email.val(),
                password: password.val()
                }
            $.get("/add", addUser, function(data, status){
            if(status == "success"){
                $("#cards").append(data)
                }
            else{
                console.log("Error!")
            }                   
            });
        }

        else{
            $("#error").html("Fill up all the fields!");
        }
    });
})
