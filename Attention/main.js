var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var num_real_balls = [1,2,3,5];
var num_fake_balls = [3,5,5,5];
var round = 0;
var num_total_balls = num_real_balls[round];

var x = [];
var y = [];
var dx = [];
var dy = [];
var overlap = false;
var moving = true;
var pressed = []
var CountDown = 5
var attemptCount = 0;
var rightBall = 0;

console.log("ratio " + window.innerHeight/window.innerWidth);

if (window.innerHeight > window.innerWidth){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerWidth * 4/3;
}else{
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width  = window.innerHeight * 0.75;
}


var r = Math.floor(ctx.canvas.width * ctx.canvas.height * 0.00005);
var speed_lim = Math.floor(ctx.canvas.width * ctx.canvas.height * 0.00002);
console.log("height: " + ctx.canvas.height);
console.log("width: " + ctx.canvas.width);
console.log("area: " + ctx.canvas.width * ctx.canvas.height);
console.log("radius: " + r);
console.log("speedlim: " + speed_lim);

function restartGame(){

    moving = true;
    CountDown = 5;
    round += 1
    x = [];
    y = [];
    dx = [];
    dy = [];
    attemptCount = 0;
    num_total_balls = num_real_balls[round];

    createRalBalls ();
    draw();

    setTimeout(addFakeBalls, 5000);
    setTimeout( function(){
               document.addEventListener("click", mouseClick);
               cancelAnimationFrame(ID);
               }, 13000);
}

function mouseClick(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;

    for (i = 0; i < num_total_balls; i++) {

        var disx = (relativeX - x[i]);
        var disy = (relativeY - y[i]);
        var distance = Math.sqrt(disx * disx + disy * disy);

        if (distance < r){
            if (i<num_real_balls[round]){
                drawBall(x[i]-dx[i],y[i]-dy[i],"#83BF17");
                rightBall += 1;
                if (pressed[i] == false)
                    attemptCount += 1;
            }
            else{
                drawBall(x[i]-dx[i],y[i]-dy[i],"#BB0F00");
                if (pressed[i] == false)
                    attemptCount += 1;
            }
            pressed[i] = true;
        }
    }

    if (attemptCount==num_real_balls[round]){
        document.removeEventListener("click", mouseClick);

        if (round < num_real_balls.length - 1){
            interval_B = setInterval(drawCountDown, 1000);
        }
        else{
            console.log("end of the game");
            var score = ((rightBall/num_real_balls.reduce(add, 0))*100).toFixed(2);
            console.log("Your score is: " + score);
            localStorage.removeItem('score');
            localStorage.setItem('score',score);
            setTimeout("window.location.href = 'user.html';", 2000);
        }
    }
}

function add(a, b) {
    return a + b;
}

function drawCountDown(){

    drawScore();
    CountDown -= 1;

    if (CountDown < 0){
        clearInterval(interval_B);
        restartGame();
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
    var textSize = Math.floor(canvas.width * 0.07)
    ctx.font = textSize.toString() + "px Patrick Hand SC";
    ctx.fillStyle = "#00CCD6";
    ctx.textAlign = "center";
    ctx.fillText("Next round starts in " + CountDown + " seconds",canvas.width/2, (canvas.height/2));

}

function drawBall(x,y,color) {

    ctx.beginPath();
    ctx.arc(x,y, r, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawInstructions(){

    var textSize = Math.floor(canvas.width * 0.03)
    ctx.font = textSize.toString() + "px Patrick Hand SC";
    ctx.fillStyle = "#00CCD6";
    ctx.textAlign = "center";
    ctx.fillText("Follow the circle until it stops moving, then tap on it", canvas.width/2, canvas.height*0.05);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.rect(0,0,ctx.canvas.width, ctx.canvas.height)
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();
    ctx.closePath();

  //  if (round == 0){
  //      drawInstructions();
  //  }

    for (i = 0; i < num_total_balls; i++) {
        drawBall(x[i],y[i],"#00CCD6");

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
                var xColision = (x[i] + dx[i] + x[j] + dx[j])/2;
                var yColision = (y[i] + dy[i] + y[j] + dy[j])/2;

                if (xColision >= x[i]){
                     dx[i] = -Math.abs(dx[i]);
                }
                else{
                    dx[i] = Math.abs(dx[i]);
                }

                if (xColision > x[j]){
                    dx[j] = -Math.abs(dx[j]);
                }
                else{
                    dx[j] = Math.abs(dx[j]);
                }

                if (yColision >= y[i]){
                    dy[i] = -Math.abs(dy[i]);
                }
                else{
                    dy[i] = Math.abs(dy[i]);
                }

                if (yColision > y[j]){
                    dy[j] = -Math.abs(dy[j]);
                }
                else{
                    dy[j] = Math.abs(dy[j]);
                }

            }
        }
    }

    for (i = 0; i < num_total_balls; i++) {
        x[i] += dx[i];
        y[i] += dy[i];
    }

    ID = requestAnimationFrame(draw);
}

createRalBalls ();
draw();
setTimeout(addFakeBalls, 5000);
setTimeout( function(){
           document.addEventListener("click", mouseClick, false);
           cancelAnimationFrame(ID);
           }, 13000);
