
<html>
	<head>
	</head>
		<body>

<?php
	include_once('db.php');

	$name = $_POST['name'];
	$alcohol = $_POST['alcohol'];
	$age = $_POST['age'];

	if (mysql_query("INSERT INTO `users` (`name`, `alcohol`, `age`) VALUES ('".mysql_real_escape_string($name)."','".mysql_real_escape_string($alcohol)."','".mysql_real_escape_string($age)."')")) {
	    echo 'Success!'
	}
	else
	 {
	    echo mysql_error();
	    exit;
	}


?>
</body>
</html>
