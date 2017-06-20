
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
    $age =  mysqli_real_escape_string($conn, $_POST["age"]);
    $email =  mysqli_real_escape_string($conn, $_POST["email"]);
    $query = "INSERT INTO drunkdudes(name, age, email) VALUES ('".$name."', '".$age."', '".$email."')";
    if(mysqli_query($conn, $query))
    {
        echo '<p style="color:green;">Data Inserted OK..</p>';
    }
    else
    {
        echo '<p style="color:red;">not OK..</p>';
    }
}
?>
