<!DOCTYPE html>
<html>
<head>
	<title>Attention data</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="/../css/bootstrap.min.css">
	<link href="https://fonts.googleapis.com/css?family=Patrick+Hand+SC" rel="stylesheet">
	<link rel="stylesheet" href="data.css">
</head>
	<body>
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-md-12">

					<div class="panel panel-default">
						<div class="panel-body">
							<div class="col-xs-12 col-md-12">
								<div class="btn-group" style="float:right;">
									<button type="button" class="btn btn-reaction" onclick="window.location.href='reaction.php'">Reaction</button>
									<button type="button" class="btn btn-memory" onclick="window.location.href='memory.php'" id="memory">Memory</button>
									<button type="button" class="btn btn-att" onclick="window.location.href='attention.php'" id="attention">Attention</button>
									<button type="button" class="btn btn-suprise" onclick="window.location.href='suprise.php'">Coordination</button>
							</div>
						</div>

						<div class="col-xs-12 col-md-12">
							<h2 class="game-title att-title">ATTENTION</h2>
						</div>

							<div class="table-container" >
								<table class="table table-filter">
									<thead>
    								<tr class="title-row attention-row">
      								<th>#</th>
      								<th>Name</th>
      								<th>Alcohol Level</th>
      								<th>Age</th>
											<th>Score</th>
    								</tr>
  								</thead>
									<tbody id="show">

									</tbody>

								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>

			<script type="text/javascript">

			$(document).ready(function(){

					setInterval(function(){
						$("#show").load('data-attention.php')
					}, 1000);

			});

			</script>
	</body>

</html>
