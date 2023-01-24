// startScreen obj
startScreenWrapper = document.getElementById("start-screen");

// questions object((
questionsDiv = document.getElementById("questions");

// counter to track question number
let counter = 0;

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
        console.log(que.choices[i]);
        choice.textContent = que.choices[i];
    }
    queTitle.textContent = que.title;
}

//starts the questions display
function startQuiz (event) {
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
    }
    else {
        document.querySelector(".mark").textContent = "Wrong";
    }
    counter++;
    setTimeout(function () {
        document.querySelector('hr').remove();
        document.querySelector(".mark").remove();
        displayQuestion(questions[counter])
    }, 900);
}

// start object
let start = document.getElementById("start");

// attach event listener to start
start.addEventListener("click", startQuiz);


//
timeObj = document.getElementById("time");

// set the timer
let time = 45;
timeObj.textContent = time;
let timer = setInterval( function() {
    time--;
    timeObj.textContent = time;
    if (time == 0) {
        clearInterval(timer);
    }
}, 1000);