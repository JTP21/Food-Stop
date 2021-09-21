$(document).ready(function () {
    $(`#formUsername`).keyup(function () {
        var username = $(`#formUsername`).val()

        $.get("/getCheckUsername", { username: username }, function (result) {
            console.log(`Result: ${result} | Username: ${result.username}`)
            if (result.username == username) {
                $(`#formUsername`).css(`background-color`, `red`)
                $(`#submit`).prop(`disabled`, true);
            }
            else {
                $(`#formUsername`).css(`background-color`, `#E3E3E3`)
                $(`#submit`).prop(`disabled`, false);
            }
        })
    });
});