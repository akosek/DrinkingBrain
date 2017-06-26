<?php
$conn = mysqli_connect("localhost","wyqhiksy_prueba","Prueba22","wyqhiksy_players");

if (!$conn) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}


if(isset($_POST["name"]))
{
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $alcohol =  mysqli_real_escape_string($conn, $_POST["alcohol"]);
    $age =  mysqli_real_escape_string($conn, $_POST["age"]);
    $score =  mysqli_real_escape_string($conn, $_POST["score"]);
    $query = "INSERT INTO suprisedb(name, alcohol, age, score) VALUES ('".$name."', '".$alcohol."', '".$age."', '".$score."')";

    if(mysqli_query($conn, $query))
    {
        echo '<p style="color:green;font-size:70px;">Score sent..</p>';
    }
    else
    {
        echo '<p style="color:red;font-size:70px;">not OK..</p>';
    }
}
?>
