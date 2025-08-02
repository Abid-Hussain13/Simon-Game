var buttonsColor = ["red","blue","green","yellow"]

var gamePattern = []

var userClickedPattern = []

function nextSequence (){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level)

    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonsColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor);
        
}

$(".btn").on("click",function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);


    checkAnswer(userClickedPattern.length-1)
})
function playSound(name){
    var soundPath = "./sounds/" + name + ".mp3";
    console.log("Trying to play sound:", soundPath); // Debug line
    var audio = new Audio(soundPath);
    audio.play().catch(function(err){
        console.error("Audio play failed:", err);
    });
}



function animatePress(name){
    $("#"+name).addClass("pressed")
    setTimeout(function() {
        $("#"+name).removeClass("pressed");
    }, 100);
}

var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        console.log("Started")
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong")

        playSound("wrong");

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)

        $("#level-title").text("Game Over, Press Any Key To Start")
        startOver();
    }
    
}

function startOver(){
    level = 0
    gamePattern = [];
    started = false
}