var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//adapt canvas size
if (window.innerHeight > window.innerWidth){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerWidth *4/3;
}else{
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width  = window.innerHeight *0.75;
}

var barHeight = ctx.canvas.height * 0.02;
var barWidth = ctx.canvas.width / 3;
var barX = ctx.canvas.width / 3;
var x = [];
var y = [];
var dx = [];
var dy = [];
var ballColor = [];
var active = [];
var onGround = [];
var numBalls = 50;
var speed_lim = 7;
var currentBall = 0;
var playgroundH = ctx.canvas.height * 0.9;
var r = Math.floor(ctx.canvas.width * ctx.canvas.height * 0.000025);
var colorName = ["green","red"];

var imgL = document.getElementById("Larrow");
var imgR = document.getElementById("Rarrow");
var imgWidth = canvas.width * 0.1;
var imgHeight = canvas.height * 0.1;

var bigtextSize = Math.floor(canvas.width * 0.07)
var smalltextSize = Math.floor(canvas.width * 0.04)

var score = 0;
var time = 30;


var mc = new Hammer(canvas);

function createBall(){
    
    x[currentBall] = getRandomInt(r, canvas.width-r);
    y[currentBall] = -r;
    do {dx[currentBall] = getRandomInt(-2, 2);} while(dx[currentBall]==0);
    do {dy[currentBall] = getRandomInt(4, 10);} while(dy[currentBall]==0);
    ballColor[currentBall] = getRandomInt(0, 1);
    active[currentBall] = true;
    onGround[currentBall] = false;
    
    //console.log("ball " + currentBall + " created");

    currentBall += 1;
    
    if (currentBall<numBalls){
        timerBackground = setTimeout(createBall, getRandomInt(500,3000));
    }

}


mc.on("panleft panright", function(ev) {
      if (ev.type == "panright" && barX + barWidth < ctx.canvas.width){
        barX += 10;
      }
      if (ev.type == "panleft" && barX > 0){
        barX -= 10;
      }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBall(x,y,color) {
    
    ctx.beginPath();
    ctx.arc(x,y, r, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPlayground(){
    ctx.beginPath();
    ctx.rect(0, playgroundH - barHeight, ctx.canvas.width, barHeight)
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.rect(barX, playgroundH - barHeight, barWidth, barHeight)
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.rect(0,0,ctx.canvas.width, playgroundH)
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.rect(0,0,ctx.canvas.width, ctx.canvas.height)
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();
    ctx.closePath();
}

function checkGoal(index){
    if (x[index]>barX && x[index]<barX+barWidth){
        if(ballColor[index]==0){
            active[index] = false;
            onGround[index] = false;
            score += 2;
        }
        else{
            dy[index] = -dy[index];
        }
    }
    else{
        if(ballColor[index] == 1){
            active[index] = false;
            onGround[index] = false;
            score += 2;
        }
        else{
            dy[index] = -dy[index];
        }
    }
    
}

function drawScore() {
    ctx.font = bigtextSize.toString() + "px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Swipe",canvas.width/2, playgroundH * 1.07);
    
    ctx.font = smalltextSize.toString() + "px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Time: " + time,canvas.width * 0.04, playgroundH * 0.05);
    ctx.fillText("Score: " + score,canvas.width * 0.80, playgroundH * 0.05);


    
    ctx.drawImage(imgL, canvas.width * 0.1, playgroundH, imgWidth, imgHeight);
    ctx.drawImage(imgR, canvas.width * 0.8, playgroundH, imgWidth, imgHeight);
    
    
}

function countdown(){
    time -= 1;
    if (time < 0){
        clearInterval(interval_A);
        cancelAnimationFrame(ID);
        console.log("end of the game");
    }
}

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayground();
    drawScore();
    
    for (i = 0; i < currentBall; i++) {
        if (active[i] == true){
            drawBall(x[i],y[i],colorName[ballColor[i]]);
        
            //colision with bounds
            if(x[i] + dx[i] > canvas.width-r || x[i] + dx[i] < r) {
                dx[i] = -dx[i];
            }
            if(y[i] + dy[i] < r && onGround[i] == true) {
                dy[i] = -dy[i];
            }
            if (y[i] + dy[i] > playgroundH -r -barHeight){
                checkGoal(i);
            }
            
            for(j = i + 1; j < currentBall; j++){
                
                if (active[j]==true){
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
        }
    }
    
    for (i = 0; i < currentBall; i++) {
        if (active[i] == true){
            x[i] += dx[i];
            y[i] += dy[i];
        }
        if (y[i] > r && active[i] == true){
            onGround[i] = true
        }
    }

    ID = requestAnimationFrame(draw);
}
createBall();
draw();
interval_A = setInterval(countdown, 1000);

