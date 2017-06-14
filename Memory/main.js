var numNum = [3, 4, 5, 6];
var numResult = [];
var minLim = 1;
var maxLim = 100;
var index = 0
var round = 0;
var digits = 2;

$( window ).on( "load", function(){


  runGame();


});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumbers(){

    document.getElementById('userTry').disabled = true;

    for (i=0; i < numNum[round]; i++){
        numResult[i] =  getRandomInt(minLim, maxLim)
    }

    console.log("round " + (round+1) + ", " + numNum[round] + " numbers");

    for (i in numResult) {
        console.log(numResult[i]);
    }
}




function drawNumbers(){

    document.getElementById('number').innerHTML = numResult[index];
    index += 1;

    document.getElementById("number").style.color = "white";

    var last_element = numResult[numResult.length - 1];
  //  console.log(last_element);

    if (index == numNum[round]){
        console.log("stop");
        clearInterval(interval_A);

        setTimeout(function () {
            document.getElementById("number").style.color = "#33365b";
        }, 2000);
          document.getElementById('userTry').disabled = false;


    }
}


//function changeColor(){
//    document.getElementById("number").style.color = "red";
//}

function runGame(){
    generateNumbers();
    interval_A = setInterval(drawNumbers, 2000);
}

//runGame();

function checkNumbers (){
  var userNumbers = document.getElementById('userTry').value;
  console.log(userNumbers);

  goalString = numResult.toString();
  goalString = goalString.replace(/,/g," ");
  console.log("This is your goal " + goalString);


    if (userNumbers == goalString){

      swal({
        title: 'Good job!',
        text: 'Keep going',
        customClass: 'sweetalert-lg',
        type: 'success',
        showConfirmButton: false,
        timer: 1400
        })

      digits += 1;
      console.log(digits);

      round += 1;
      index = 0;
      document.getElementById("userTry").value = "";
      runGame();
    }

    else {
      swal({
         html:true,
          title: "Ooops!",
          text:"You can remeber up to " + digits + " digits",

        //  text: "The right numbers: "  + goalString,
          type: 'error',
          customClass: 'sweetalert-lg'
        });

        document.getElementById("userTry").value = "";

    }

  }

function refreshPage() {
         window.location.reload();
}
