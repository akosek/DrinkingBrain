<?php
$username = "wyqhiksy_prueba";
$password = "Prueba22";
$host = "localhost";
//make connection
$connector = mysql_connect($host,$username,$password)
		or die("Unable to connect");
	 echo "Connections are made successfully::";
$selected = mysql_select_db("wyqhiksy_players", $connector)
		or die("Unable to connect");

$result = mysql_query("SELECT * FROM attentiondb;");


	while( $row = mysql_fetch_assoc( $result ) ){
	echo
		"<tr>
			<td>{$row['#']}</td>
			<td>{$row['name']}</td>
			<td>{$row['alcohol']}</td>
			<td>{$row['age']}</td>
			<td>{$row['score']}</td>
		</tr>\n";
	}
	error_reporting(E_ALL);
	ini_set("display_errors", "On");
?>
