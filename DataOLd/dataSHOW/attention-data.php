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
//select db
//$database = mysql_select_db('wyqhiksy_players');

//$sql = "SELECT * FROM attentiondb";

//$records = mysql_query($sql);
?>

<!DOCTYPE html>
<html>
<head>
	<title>Attention data</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="/../css/bootstrap.min.css">
	<link href="https://fonts.googleapis.com/css?family=Patrick+Hand+SC" rel="stylesheet">

</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-12">
					<div class="panel panel-default">
						<div class="panel-body">
							<div class="pull-right">
								<div class="btn-group">
									<button type="button" class="btn btn-success btn-filter" data-target="reaction">Attention</button>
									<button type="button" class="btn btn-warning btn-filter" data-target="memory">Memory</button>
									<button type="button" class="btn btn-danger btn-filter" data-target="attention">Reaction</button>
									<button type="button" class="btn btn-danger btn-filter" data-target="coordination">Coordination</button>
									<button type="button" class="btn btn-default btn-filter" data-target="all">All</button>
								</div>
							</div>
							<div class="table-container" >
								<table class="table table-filter">
									<thead>
    								<tr>
      								<th>#</th>
      								<th>Name</th>
      								<th>Alcohol Level</th>
      								<th>Age</th>
											<th>Score</th>
    								</tr>
  								</thead>
									<tbody id="show">

									<?php
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

									</tbody>

								</table>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
			<script src="../data.js"></script>
	</body>

</html>
<?php mysql_close($connector); ?>
