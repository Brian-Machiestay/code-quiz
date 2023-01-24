// startScreen obj
startScreenWrapper = document.getElementById("start-screen");

// questions object((
questionsDiv = document.getElementById("questions");

// displays the questions
function displayQuestion(que) {
    let queTitle = document.querySelector("#question-title");
    let choicesDiv = document.querySelector("#choices");
    for (let i = 0; i < que.choices.length; i++) {
        if (document.querySelector(`.choice${i}`) == null) {
            choiceButton = document.createElement("button");
            choiceButton.setAttribute("class", `choice${i}`);
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
    displayQuestion(questions[0])
}



// start object
start = document.getElementById("start");

// attach event listener to start
start.addEventListener("click", startQuiz);