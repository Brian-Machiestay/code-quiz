// startScreen obj
startScreenWrapper = document.getElementById("start-screen");

// questions object((
questionsDiv = document.getElementById("questions");

// counter to track question number
let counter = 0;

// time object
timeObj = document.getElementById("time");

// set the timer
let time = 100;

// keep track of scores
let score = 0;


// displays the questions
function displayQuestion(que) {
    let queTitle = document.querySelector("#question-title");
    let choicesDiv = document.querySelector("#choices");
    for (let i = 0; i < que.choices.length; i++) {
        if (document.querySelector(`.choice${i}`) == null) {
            choiceButton = document.createElement("button");
            choiceButton.setAttribute("class", `choice${i}`);
            choiceButton.classList.add("indiviChoice")
        }
        choicesDiv.appendChild(choiceButton);
        let choice = document.querySelector(`.choice${i}`);
        choice.textContent = que.choices[i];
    }
    queTitle.textContent = que.title;
}

//starts the questions display
function startQuiz (event) {
    // create the timer
    timeObj.textContent = time;
    let timer = setInterval( function() {
    time--;
    timeObj.textContent = time;
    if (time == 0) {
        clearInterval(timer);
        document.getElementById('end-screen').setAttribute("class", "show");
        questionsDiv.setAttribute("class", "hide");
    }
    }, 1000);

    startScreenWrapper.setAttribute("class", "hide");
    questionsDiv.setAttribute("class", "show");
    displayQuestion(questions[counter]);
    
    // indivichoices object
    let indiviChoice = document.querySelectorAll(".indiviChoice");
    for (el of indiviChoice) {
        el.addEventListener("click", markMe)
    }
}

// displays correct or wrong for answer and next question
function markMe(event) {
    if (document.querySelector("hr") == null) {
        let line = document.createElement("hr");
        questionsDiv.appendChild(line);
    }

    let mark = document.createElement("p");
    questionsDiv.appendChild(mark);
    mark.setAttribute("class", "mark"); 
    if (event.target.textContent === questions[counter].answer) {
        document.querySelector(".mark").textContent = "Correct";
        score++;
    }
    else {
        document.querySelector(".mark").textContent = "Wrong";
        if(time - 10 <= 0) {
            clearInterval(timer);
            timeObj.textContent = 0;
            document.getElementById('end-screen').setAttribute("class", "show");
            questionsDiv.setAttribute("class", "hide");
        }
        else time -= 10;
    }
    counter++;
    setTimeout(function () {
        document.querySelector('hr').remove();
        document.querySelector(".mark").remove();
        if (questions.length == counter) { 
            document.getElementById('end-screen').setAttribute("class", "show");
            questionsDiv.setAttribute("class", "hide");
            clearInterval(timer);
            timeObj.textContent = 0;
        }
        else displayQuestion(questions[counter])
    }, 500);
}

// start object
let start = document.getElementById("start");

// attach event listener to start
start.addEventListener("click", startQuiz);


// listen to the submit for initials
let subObj = document.getElementById('submit');


let storeScore = [];

// add an event listener to the submit button to display scores
subObj.addEventListener("click", function() {
    let ini = document.querySelector("#initials");
    if (localStorage.getItem('score') == null) {
        storeScore.push(`${ini.value} - ${score}`);
        localStorage.setItem("score", JSON.stringify(storeScore));
    }
    else {
        storeScore = JSON.parse(localStorage.getItem("score"));
        if (storeScore.length < 5) {
            storeScore.push(`${ini.value} - ${score}`);
            localStorage.setItem("score", JSON.stringify(storeScore))
        }
    }
    console.log(storeScore);
    window.location.href = './highscores.html';
})
