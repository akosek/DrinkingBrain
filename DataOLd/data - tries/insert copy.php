<html>
<body>
<?php

    /* Attempt MySQL server connection. Assuming you are running MySQL
    server with default setting (user 'root' with no password) */

    $link = mysqli_connect("localhost", "wyqhiksy_roskilde123", "P[6,wgyNB7&K", "wyqhiksy_players");

    // Check connection

    if($link === false){
        die("ERROR: Could not connect. " . mysqli_connect_error());
    }

    // Escape user inputs for security
    $first_name = mysqli_real_escape_string($link, $_POST['firstname']);
    $last_name = mysqli_real_escape_string($link, $_POST['lastname']);
    $email_address = mysqli_real_escape_string($link, $_POST['email']);

    // attempt insert query execution
    $sql = "INSERT INTO users (name, alcohol, age) VALUES ('$fname', '$alcohol', '$age')";

    if(mysqli_query($link, $sql)){
        echo "Records added successfully.";
    } else{
        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
    }

    // close connection
    mysqli_close($link);
?>
</body>
</html>
