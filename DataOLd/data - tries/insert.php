<?php

	$connect = mysqli_connect("localhost", "root", "", "testing");
	if(isset($_POST["alcohol"]))
	{

		$alcohol = mysqli_real_escape_string($connect, $_POST["alcohol"]);

		$name = mysqli_real_escape_string($connect, $_POST["name"]);

		$age = mysqli_real_escape_string($connect, $_POST["age"]);

		$sql = "INSERT INTO tbl_form(alcohol, name, age) VALUES ('".$alcohol."', '".$name."', '".$age."' )";

		if(mysqli_query($connect, $sql)) {
			echo "Massage saved!"
		}

	}

 ?>
