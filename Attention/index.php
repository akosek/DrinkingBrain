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
									<button type="button" class="btn btn-success btn-filter" data-target="reaction" id="attention">Attention</button>
									<button type="button" class="btn btn-warning btn-filter" data-target="memory" id="memory">Memory</button>
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
											<tr  data-status="attention">
											</tr>

											<tr data-status="memory">
											</tr>

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


				$("#attention").click(function(memoryInterval){

					$(this).data('clicked', true);
					if($("#memory").data('clicked', true)){
						$("#memory").data('clicked', false);
						clearInterval(memoryInterval);
					}
					var attentionInterval= setInterval(function(){
						$("#show").load('data.php')
					}, 3000);

				});

					$("#memory").click(function(attentionInterval){

 					 		$(this).data('clicked', true);

						 if($("#attention").data('clicked', true)){
							 $('#attention').data('clicked', false);
							 clearInterval(attentionInterval);
						 }

						 var memoryInterval= setInterval(function(){
					 		$("#show").load('memory-data.php')
					 	}, 3000);


					});

			});


			</script>
	</body>

</html>
