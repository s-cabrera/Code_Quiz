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
var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("question");
var answersEl = $("#answers");
var intro = document.getElementById("intro");
var message = document.getElementById("message");
var rules = document.getElementById("rules");
var initials = document.getElementById("initials");
var input = document.getElementById("initials_input");
var final_score = document.getElementById("final_score");
var highscores = document.getElementById("highscores");
var highscores_container = $("#highscores_container");
var correctness = document.getElementById("correctness");
var questions = ["What is a string?", "Which of these are data types?", "What does var stand for?"];
var answers = ["An array of characters", "A function", "A variable", "An object", "Numbers", "Boolean", "String", "All of the above",
    "boolean", "ASCII", "variant", "variable" ];
var correctAnswers = ["An array of characters", "All of the above", "variable"]; 
var guesses = [];
var secondsLeft, score, index;
var initials_storage;// = []; 
var scores_storage;// = [];
rules.textContent = "Try to answer the follwing code-related questions within the time limit.\r\n Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
correctness.style.fontWeight = "bolder"; 

loadHighscores();
function loadHighscores(){
    initials_storage = JSON.parse(localStorage.getItem('initials'));
    scores_storage = JSON.parse(localStorage.getItem('scores'));
    //console.log(`Load initials: ${initials_storage}`)
    //console.log(`Load scores: ${scores_storage}`)
    if(initials_storage != null && scores_storage!= null){
        for(let i = 0; i < initials_storage.length; i++){
            var newLI = $("<li>");
            //Add input value and text to the list item
            newLI.text(initials_storage[i] + " - " + scores_storage[i]);
            newLI.addClass("highscore_entry");
            //Add it to the highscore div
            highscores_container.append(newLI);
        }
    }
    else{
        initials_storage = new Array(0);
        scores_storage = new Array(0);
    }

    //console.log(`Initial Storage: ${initials_storage}`);
    //console.log(`Scores Storage: ${scores_storage}`);
}

function displayElement(element){
    element.style.display = "flex";
}

function hideElement(element){
    element.style.display = "none";
}

function renderQA(index){
    if(index < questions.length ){
        questionEl.textContent = questions[index];
        for(let i = 0; i < 4; i++){
            var newLI = $("<li>");
            newLI.text(answers[(index*4)+i]);
            answersEl.append(newLI);
        }
    }
}
function pause(){
    setTimeout(pause, 1000);
    return;
}

function checkCorrectness(){
    //Get index of the event target
    //console.log(`Guess: ${guesses[index]}`);
    //console.log(`Correct Answer: ${correctAnswers[index]}`)
    //console.log(`Score: ${score}`)
    if(guesses[index] == correctAnswers[index]){
        console.log("Correct");
        score += 10;
        correctness.textContent = "Right";
        pause();
    }
    else{
        console.log("Wrong");
        correctness.textContent = "Wrong";
        secondsLeft -= 10; //penalty
        pause();
    }
    console.log(`Score after check: ${score}`);
}

function checkIfFinished(){
/*WHEN all questions are answered or the timer reaches 0
THEN the game is over*/
    if(guesses.length === questions.length){
        console.log("You finished");
        return true;
    }
    else if(secondsLeft <= 0){
        console.log("Times Up!");
        return true;
    }
    else{return false;}
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      timerEl.textContent = "Timer: " + secondsLeft;
      //console.log("Timer: " + secondsLeft);  
      if(checkIfFinished()) {
        // Stops execution of action at set interval
        timerEl.textContent = "Timer: ";
        hideElement(message);
        // console.log(`Score: ${score}`);
        final_score.textContent = "Your final score is " + score + ".";
        displayElement(initials);
        clearInterval(timerInterval);
      }
      secondsLeft--;
    }, 1000);
}

document.getElementById("start").addEventListener("click", function(){
    // console.log("Start Button Clicked");
    //Set the time and index for questions
    secondsLeft = 60;   
    index = 0;
    score = 0;
    renderQA(index);
    hideElement(intro);
    hideElement(document.getElementById("high_scores"))
    displayElement(message);
    setTime();
});

document.getElementById("submit").addEventListener('click', function(){
    // console.log("Submit Button Clicked");
    //Take the initial input and save it to the webpage
    //console.log(input.value);
    //Make a Highscore list item for this initial
     var newLI = $("<li>");
    //Add input value and text to the list item
    newLI.text(input.value + " - " + score);
    newLI.addClass("highscore_entry");
    //Add it to the highscore div
    highscores_container.append(newLI);

    //Push values to the initial_storage and scores_storage 
    initials_storage.push(input.value);
    scores_storage.push(score);
    //clear the local storage
    //localStorage.removeItem('initials');
    localStorage.clear();
    localStorage.setItem('initials', JSON.stringify(initials_storage));
    localStorage.setItem('scores', JSON.stringify(scores_storage));

    //Hide initials div 
    hideElement(initials);

    //Display highscore div
    displayElement(highscores);
});

document.getElementById("homepage_btn").addEventListener('click', function(){
    //console.log("Homepage Button Clicked");
    //Clear the guesses array
    // console.log(`Before pop for loop: ${guesses}`);
    for(let i = 0; i <= guesses.length; i++){   
        guesses.pop();
    }
    // console.log(`After pop for loop: ${guesses}`);
    //Hide the Highscores div
    hideElement(highscores)
    //Display the Intro div
    displayElement(intro);
    displayElement(document.getElementById("high_scores"));
});

document.getElementById("clear_highscores_btn").addEventListener('click', function(){
    // console.log("Clear Highscores Button Clicked");
    $(highscores_container).empty();
    localStorage.clear();
});

document.getElementById("high_scores").addEventListener('click', function(){
    // console.log("Highscores Link Clicked");
    //Hide the Intro div
    hideElement(intro);
    //Display Highscores div
    displayElement(highscores);
});

document.getElementById("answers").addEventListener('click', function(event){
    //Push user's answer to the guesses array
    // console.log(`Answer selected: ${event.target.textContent}`);
    // console.log(`Array: ${guesses}`)
    guesses.push(event.target.textContent);
    // console.log(`Array: ${guesses}`)
    //Check for correctness
    //console.log(`Index of List item:  ${$(answersEl).children('li').index(event.target)}`);
    //GET THE INDEX OF THE LIST ITEM IN THE ANSWER ORDERED LIST
    checkCorrectness();//$(answersEl).children('li').index(event.target));

    //Set Timeout to give the span to display for a little
    setTimeout(function(){
        //Update the index
        index++;
        //Empty the answers list items and get rid of span text.
        $(answersEl).empty();
        correctness.textContent = "";
        if(index < questions.length){
            renderQA(index);
        }
    },1000)

});