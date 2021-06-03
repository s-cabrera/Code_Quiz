/*
 GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/

var startEl = document.getElementById("start");
var timerEl = document.getElementById("timer");
var secondsLeft = 60; //A minute

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timerEl.textContent = "Timer: " + secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        scores(false);
        alert("GAME OVER!");
      }
      secondsLeft--;
    }, 1000);
}

start.addEventListener("click", function(){
    setTime();

    //Game over 
    
});