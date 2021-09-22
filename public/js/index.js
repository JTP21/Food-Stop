$(document).ready(function () {
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
