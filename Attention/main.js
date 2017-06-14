var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var r = 10;
var num_real_balls = [1,3,5];
var num_fake_balls = [3,5,7];
var speed_lim = 3;
var round = 0;
var num_total_balls = num_real_balls[round];

var x = [];
var y = [];
var dx = [];
var dy = [];
//  var identity = [];
var overlap = false;
var moving = true;
var pressed = []
var rightCount = 0
var CountDown = 5

function restartGame(){

		moving = true;
		rightCount = 0;
		CountDown = 5;
		round += 1
		x = [];
		y = [];
		dx = [];
		dy = [];
		num_total_balls = num_real_balls[round];

		createRalBalls ();
		refreshIntervalId = setInterval(draw, 10);
		setTimeout(addFakeBalls, 2000);
		setTimeout( function(){
							 document.addEventListener("click", mouseClick);
							 clearInterval(refreshIntervalId);
							 }, 5000);
}

function mouseClick(e) {
		var relativeX = e.clientX - canvas.offsetLeft;
		var relativeY = e.clientY - canvas.offsetTop;

		for (i = 0; i < num_total_balls; i++) {

				var disx = (relativeX - x[i]);
				var disy = (relativeY - y[i]);
				var distance = Math.sqrt(disx * disx + disy * disy);

				if (distance < r){
						console.log(i);
						if (i<num_real_balls[round]){
								drawBall(x[i]-dx[i],y[i]-dy[i],"green");
								rightCount+=1
						}
						else
								drawBall(x[i]-dx[i],y[i]-dy[i],"red");
						pressed[i] = true;
				}
		}
		if (rightCount==num_real_balls[round]){
				interval_B = setInterval(drawCountDown, 1000);
		}
}

function drawCountDown(){

		console.log(CountDown);
		drawScore();
		CountDown -= 1;

		if (CountDown < 0){
				clearInterval(interval_B);
				restartGame();
				console.log("iniciar nueva ronda");
		}
}

function createRalBalls (){
		//create random position and direction avoiding overlap
		for (i = 0; i < num_real_balls[round]; i++) {
				x[i] = getRandomInt(r, canvas.width-r);
				y[i] = getRandomInt(r, canvas.height-r);
				do {
						overlap = false;
						for (j = 0; j < i ; j++){
								var disx = (x[i] + r) - (x[j] + r);
								var disy = (y[i] + r) - (y[j] + r);
								var distance = Math.sqrt(disx * disx + disy * disy);
								if (distance < r + r){
										overlap = true;
								}
						}
						if (overlap==true){
								x[i] = getRandomInt(r, canvas.width-r);
								y[i] = getRandomInt(r, canvas.height-r);
						}
				} while (overlap==true);
				do {dx[i] = getRandomInt(-speed_lim, speed_lim);} while(dx[i]==0);
				do {dy[i] = getRandomInt(-speed_lim, speed_lim);} while(dy[i]==0);
				pressed[i] = false;
		}
}

function addFakeBalls(){
		document.getElementById("demo").innerHTML = "2 segundos";

		for (i = num_real_balls[round]; i < num_real_balls[round] + num_fake_balls[round]; i++) {
				x[i] = getRandomInt(r, canvas.width-r);
				y[i] = getRandomInt(r, canvas.height-r);
				do {
						overlap = false;
						for (j = 0; j < i ; j++){
								var disx = (x[i] + r) - (x[j] + r);
								var disy = (y[i] + r) - (y[j] + r);
								var distance = Math.sqrt(disx * disx + disy * disy);
								if (distance < r + r){
										overlap = true;
								}
						}
						if (overlap==true){
								x[i] = getRandomInt(r, canvas.width-r);
								y[i] = getRandomInt(r, canvas.height-r);
						}
				} while (overlap==true);
				do {dx[i] = getRandomInt(-speed_lim, speed_lim);} while(dx[i]==0);
				do {dy[i] = getRandomInt(-speed_lim, speed_lim);} while(dy[i]==0);
				pressed[i] = false;
		}

		num_total_balls = num_real_balls[round] + num_fake_balls[round];

}

function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawScore() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = "20px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.textAlign = "center";
		ctx.fillText("Good job!", canvas.width/2, (canvas.height/2)-10);
		ctx.fillText("Next round starts in " + CountDown + " seconds",canvas.width/2, (canvas.height/2) + 20);

}

function drawBall(x,y,color) {

		ctx.beginPath();
		ctx.arc(x,y, r, 0, Math.PI*2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
}

function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (i = 0; i < num_total_balls; i++) {
				drawBall(x[i],y[i],"#0095DD");

				//colision with bounds
				if(x[i] + dx[i] > canvas.width-r || x[i] + dx[i] < r) {
						dx[i] = -dx[i];
				}
				if(y[i] + dy[i] > canvas.height-r || y[i] + dy[i] < r) {
						dy[i] = -dy[i];
				}
		}

		//collision between balls
		for(i = 0; i < num_total_balls - 1; i++){
				for(j = i + 1; j < num_total_balls; j++){

						var disx = (x[i] + dx[i] + r) - (x[j] + dx[j] +r);
						var disy = (y[i] + dy[i] + r) - (y[j] + dy[j] +r);
						var distance = Math.sqrt(disx * disx + disy * disy);

						if (distance < r + r) {
								//artificial movement but it works
								dx[i] = -dx[i];
								dy[i] = -dy[i];
								dx[j] = -dx[j];
								dy[j] = -dy[j];
						}
				}
		}

				for (i = 0; i < num_total_balls; i++) {
						x[i] += dx[i];
						y[i] += dy[i];
				}

}

createRalBalls ();
interval_A = setInterval(draw, 10);
setTimeout(addFakeBalls, 2000);
setTimeout( function(){
						document.addEventListener("click", mouseClick);
						clearInterval(interval_A);
						}, 5000);
