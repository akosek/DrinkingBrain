var numNum = [3, 4, 5, 6];
var numResult = [];
var minLim = 1;
var maxLim = 100;
var index = 0
var round = 0;

//$( document ).ready(function() {


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumbers(){

    for (i=0; i < numNum[round]; i++){
        numResult[i] =  getRandomInt(minLim, maxLim)
    }

    console.log("round " + (round+1) + ", " + numNum[round] + " numbers");

    for (i in numResult) {
        console.log(numResult[i]);
    }
}


function drawNumbers(){
    document .getElementById('number').innerHTML = numResult[index];
    index += 1;

  //  var last_element = numResult[numResult.length - 1];
  //  console.log(last_element);

    if (index == numNum[round]){
        console.log("stop");

        clearInterval(interval_A);
      //  $(last_element).css({'color' : "#33365b"});
    }
}

//});
function runGame(){
    generateNumbers();
    interval_A = setInterval(drawNumbers, 2000);
}

runGame();


function checkNumbers (){
  var userNumbers = document.getElementById('userTry').value;
  console.log(userNumbers);

  goalString = numResult.toString();
  goalString = goalString.replace(/,/g," ");
  console.log("This is your goal " + goalString);

    if (userNumbers == goalString){
      alert("you are rigth!");
      round += 1;
      index = 0;
      document.getElementById("userTry").value = "";
      runGame();
    }
    else {
      alert("You wrong");
      document.getElementById("userTry").value = "";

    }

  }


function refreshPage() {
         window.location.reload();
}
