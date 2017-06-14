var board = document.getElementById("#body-all");

var colorName = new Array;
colorName[0] = "Blue";
colorName[1] = "Red";
colorName[2] = "Green";
colorName[3] = "Yellow";
colorName[4] = "Orange";
colorName[5] = "Pink";
colorName[6] = "Purple";

 var colorVisual = [
 {key:"Blue", value: "#74D4ED"},
 {key: "Red", value: "#E63947",},
 {key: "Green", value: "#32746D"},
 {key: "Yellow", value:"#FFD23F"},
 {key: "Orange", value: "#FF7145", },
 {key: "Pink", value: "#FF00BF"},
 {key: "Purple", value: "#9A60FF"}
];

var timerBackground;
var goalColor = colorName[Math.floor(Math.random()*colorName.length)];

console.log ("Click when this color appears " + goalColor);

$( window ).on( "load", function(){

	var reactionTime;
  var endTime;
  var startTime;
  var endSeconds;
  var firstSeconds;


  $('#colorToFind').append(goalColor + " appears");
  changeColor();


  function changeColor(){
      var rand = Math.floor(Math.random()*colorVisual.length);

      $('#body-all').css("background-color", colorVisual[rand].value);
      currentColor = this.colorVisual[rand].key;
      console.log("Color now is " + currentColor);
      console.log("Your are looking for " + goalColor);

      timerBackground = setTimeout(changeColor, Math.random() * 4500);


      if (goalColor === currentColor){

      startTime = new Date().getTime();
      firstSeconds = ((startTime/1000)%60).toFixed(2);

      console.log(goalColor + " is   " + currentColor);

      }

        else {
          console.log("FAILED");

        }
  }



		$('.chronoExample #stop').click(function (startTime){

      if (goalColor === currentColor){

           endTime = new Date().getTime();
           endSeconds = (((endTime/1000)%60).toFixed(2));

           reactionTime = ((endSeconds - firstSeconds).toFixed(2));
           Math.abs(reactionTime);

          console.log(firstSeconds);
          console.log(endSeconds);

          console.log(reactionTime);
          alert("Your reaction time is " + reactionTime);

        clearTimeout(timerBackground);

      }

      else {
          alert("Not this time");
      }

		})

});




//  function checkColor(goalColor, currentColor){
//    console.log(goalColor);
//    console.log(currentColor);
  //  if (goalColor === currentColor){
  //    console.log(goalColor + " to nie  " + currentColor);
  //  }
  //    else {
  //      console.log("sraka");
  //    }
//  }



//function changeWord (){
//	var rand2 = Math.floor(Math.random()*colorName.length);
//	$('#word').val(colorName[rand2]);
//	timer = setTimeout(changeWord, Math.random() * 4000);
//}
