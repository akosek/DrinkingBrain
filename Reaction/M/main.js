var board = document.getElementById("#body-all");

var colorName = new Array;
colorName[0] = "Blue";
colorName[1] = "Red";
colorName[2] = "Green";
colorName[3] = "Yellow";
colorName[4] = "Purple";

var colorVisual = [
 {key:"Blue", value: "#3498db"},
 {key: "Red", value: "#C91B26",},
 {key: "Green", value: "#83BF17"},
 {key: "Yellow", value: "#f1c40f"},
 {key: "Purple", value: "#4B256D"}
];

var timerBackground;
var goalColorIdx;
var goalColor;
var rand;

var reactionTime;
var endTime;
var startTime;
var endSeconds;
var firstSeconds;
var maxNumChanges = 7;
var numChanges;
var numRounds = 5;
var round = 0;
var scores = [];

function getColorTarget(){

    goalColorIdx = getRandomInt(0, colorName.length - 1)
    goalColor = colorName[goalColorIdx];
    console.log ("Click when this color appears " + goalColor);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add(a, b) {
    return a + b;
}

function changeColor(){

    if (numChanges == 0){
        do {rand = getRandomInt(0, colorVisual.length - 1);} while (rand == goalColorIdx);
    }
    else{
        if (numChanges == maxNumChanges){
            rand = goalColorIdx;
        }
        else{
            rand = getRandomInt(0, colorVisual.length - 1);
        }
    }

    $('#body-all').css("background-color", colorVisual[rand].value);
    numChanges += 1;

    if (rand == goalColorIdx){
        startTime = new Date().getTime();
        firstSeconds = ((startTime/1000)).toFixed(2);
    }
    else{
        timerBackground = setTimeout(changeColor, getRandomInt(500,3000));
    }
}

$(window).on("load", function oneRound(){

             numChanges = 0;
             getColorTarget();

             document.getElementById("colorToFind").innerHTML = goalColor + " appears";
             changeColor();

             document.getElementById("stop").addEventListener("click", mouseClick);

             function mouseClick(){

                if (rand == goalColorIdx){

                    endTime = new Date().getTime();
                    endSeconds = (((endTime/1000)).toFixed(2));
                    console.log(endTime);
                    reactionTime = ((endSeconds - firstSeconds).toFixed(2));


                    console.log(firstSeconds);
                    console.log(endSeconds);
                    console.log(reactionTime);

                    swal({
                         title: "Good job!",
                         text: "Your reaction time is " + reactionTime,
                         type: 'success',
                         customClass: 'sweetalert-lg'
                         },
                         function (){
                            document.getElementById("stop").removeEventListener("click", mouseClick);
                            if (reactionTime<=0.15){
                                scores[round]=20;
                            }
                            else{
                                if (reactionTime>=5.15){
                                    scores[round]=0;
                                }
                                else{
                                    scores[round]=20-((reactionTime-0.15)*4);
                                }
                            }

                            round +=1;

                            if (round < numRounds){
                                oneRound();
                            }
                            else{

                                console.log("end of the game");
                                for (ii in scores){
                                    console.log(scores[ii]);
                                }

                                function userPage(){
                                      window.location.href = 'http://www.drinkingbrain.com/Reaction/user.html';
                                      console.log("total score " + scores.reduce(add, 0));
                                }


                            }
                    });
                }
                else {
                    clearTimeout(timerBackground);
                    swal({
                         title: "Oooops!",
                         text: "Not this time, keep playing!",
                         customClass: 'sweetalert-lg',
                         type: "error"
                         },
                         function (){
                            document.getElementById("stop").removeEventListener("click", mouseClick);
                            scores[round]=0;

                            round +=1;

                            if (round < numRounds){
                                oneRound();
                            }
                            else{


                                console.log("end of the game");
                                for (ii in scores){
                                    console.log(scores[ii]);
                                }

                                function userPage(){
                                  window.location.href = 'http://www.drinkingbrain.com/Reaction/user.html';
                                    console.log("total score " + scores.reduce(add, 0));
                                }

                            }
                    });
                }
             }

});
