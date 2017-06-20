
<?php

   $myFile = "user.json";
   $arr_data = array(); // create empty array

  try
  {
	   //Get form data
	   $formdata = array(
	      'alcohol'=> $_POST['alcohol'],
	      'name'=> $_POST['name'],
	      'age'=>$_POST['age']

	   );

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);

	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   // Push user data to array
	   array_push($arr_data,$formdata);

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);

	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
	        echo 'Data successfully saved';
	    }
	   else
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }

?>
