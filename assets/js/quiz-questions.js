var timeElement = document.querySelector("#time");
var wrapperElement = document.querySelector(".wrapper");
var btnElement = document.querySelector("#start");
var divContEL = document.querySelector(".divContainer");
var hElement = document.querySelector("#title");
var orderListEl = document.querySelector("#q-list");
var doneDiv = document.querySelector(".done-section");
var finalScore = document.querySelector("#result");
var errMsg = document.querySelector("#errorMsg");
var initialInput = document.querySelector("#inputInitial");
var responsDiv = document.querySelector("#response");
var finalPageEl = document.querySelector(".final-page");
var initialAndScore = document.querySelector("#staticEmail")




// Create an  array of questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        title: "The condition in an if / else statement is enclosed with ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],

        answer: "quotes",
    },
    {   
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", 
        "for loops", "console.log"],
        answer: "console.log",
    }
]


 /**Create next questions to be added to the HTML document dynamically*/
function displayQuestions() {
    var holdQ1Title = questions[i].title
    hElement.textContent = holdQ1Title
    var holdq1Choice1 = questions[i].choices[0];
    var holdq1Choice2 = questions[i].choices[1];
    var holdq1Choice3 = questions[i].choices[2];
    var holdq1Choice4 = questions[i].choices[3];

    orderListEl.innerHTML = '';

    var liTag1 = document.createElement("li");
    liTag1.setAttribute("class", "all_li")
    var btn = document.createElement('button');
    btn.setAttribute("class", "all_btn")
    btn.textContent = holdq1Choice1;
    liTag1.appendChild(btn)
    orderListEl.appendChild(liTag1);
    divContEL.appendChild(orderListEl);

    var liTag2 = document.createElement("li");
    liTag2.setAttribute("class", "all_li");
    var btn2 = document.createElement('button');
    btn2.setAttribute("class", "all_btn")
    btn2.textContent = holdq1Choice2;
    liTag2.appendChild(btn2)
    orderListEl.appendChild(liTag2)
    divContEL.appendChild(orderListEl);

    var liTag3 = document.createElement("li");
    liTag3.setAttribute("class", "all_li")
    var btn3 = document.createElement('button');
    btn3.setAttribute("class", "all_btn")
    btn3.textContent = holdq1Choice3;
    liTag3.appendChild(btn3)
    orderListEl.appendChild(liTag3)
    divContEL.appendChild(orderListEl);

    var liTag4 = document.createElement("li");
    liTag4.setAttribute("class", "all_li")
    var btn4 = document.createElement('button');
    btn4.setAttribute("class", "all_btn");
    btn4.textContent = holdq1Choice4;
    liTag4.appendChild(btn4);
    orderListEl.appendChild(liTag4);
    divContEL.appendChild(orderListEl);
    var allBtnEl = document.querySelectorAll(".all_btn")
    allBtnEl.forEach(function (event) {
        event.addEventListener("click", onclickHandler)
    });

}
/**set the time to zero*/
var timer = 75;
var timeCount;
/**this is the timer function which will start counting as soon as the quiz starts*/
function setupTimer() {
    timeCount = setInterval(function () {
        timer--;
        var timeReset = timeElement.textContent = "Time:" + " " + timer;
       timer = timer;
        if (timer <= 0) {         
            clearInterval(timeCount);
              
            timeElement.textContent = timeReset;
             
        }
    }, 1000)
}
 
/**  Here is the event listener to start the timer and hide the quiz button*/
document.addEventListener("click", function (event) {
    if (event.target === btnElement) {
        wrapperElement.style.display = "none";
        setupTimer()
        displayQuestions();
    }

})

 
/**declare the index variable for the onclickHandler function**/
var i = 0;

/**Add a function to compare the answers and 
 * display each questions as the buttons are clicked.*/
function onclickHandler(event) {
     
    if(timer<=0){
        clearInterval(timeCount);
        divContEL.style.display="none";
        displayResult();
    }
    var answerText = event.target.textContent 
    if (answerText === questions[i].answer) {
        timer = timer;
        responsDiv.setAttribute("style", "color: green")
        responsDiv.textContent = "Correct";
    } else {

        responsDiv.setAttribute("style", "color: red")
        responsDiv.textContent = "Wrong";
        timer = timer - 10;
     }
    
      
     
    if (i < questions.length-1) {

      i++;

      setTimeout(function () {
      displayQuestions();
      responsDiv.textContent = "";
    }, 1000)
    }else {
        setTimeout(function () {
            responsDiv.textContent = "";
            displayResult();
            clearInterval(timeCount);
          
        }, 500)
    

        divContEL.innerHTML = '';
     }
     
    /**function to display users final score */
    function displayResult() {
        doneDiv.style.visibility = "visible";
        timeElement.textContent = "Time:" + " " + timer;
        var HighScores = timer;
        // localStorage.getItem(HighScores)
        finalScore.textContent = "Your final score is: " + HighScores;
         localStorage.setItem("HighScores", HighScores)
 
    }
}
/**function to show the last page  */
function renderLastItem() {
    var yourScore = localStorage.getItem("HighScores");
     var yourInitial = localStorage.getItem("Initial");
     if (yourScore && yourInitial === "") {
        return
    }
    doneDiv.textContent = "";
    var finalPageEl = document.querySelector(".high-score");
    finalPageEl.style.visibility = "visible";
    var initialAndScore = document.querySelector("#staticEmail");
    initialAndScore.value = yourInitial + ":" + " " + yourScore;

}
 
//** This event listener submit the initial and final score to the local storage */
document.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialInput = document.querySelector("#inputInitial").value;
    if (initialInput === "") {
        errMsg.setAttribute("style", "color: red")
        errMsg.textContent = "Initial input field cannot be empty"
    } else {
        errMsg.textContent = "";
        // localStorage.getItem(initialInput)
        localStorage.setItem("Initial", initialInput)
         renderLastItem()
    }
    window.location.replace("./high-score.html")

})
/**This function will refresh the page and send user back to beginning page when go back button is clicked */
function init() {
     location.reload();
 
}
/**This function will  clear initial and score displayed on the final page */
function clearScore() {
    initialAndScore.value = "";
}
const highScoreList = document.getElementById ('highScoreList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Loading local storage upon opening page
// document.addEventListener("DOMContentLoaded", function () {
//     var initial = localStorage.getItem("Initial");
//     console.log(initial);
//     var highScores = localStorage.getItem("HighScores");
//     console.log(highScores);

// })

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});