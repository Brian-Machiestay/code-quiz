
// get highscore div
let highDiv = document.getElementById('highscores');

let scoreDiv = document.getElementById('highscores');
if (localStorage.getItem('score') !== null) {
    let localscore = JSON.parse(localStorage.getItem('score'));
    for (let sc of localscore) {
        let liEl = document.createElement('li');
        liEl.setAttribute("class", "list-group-item");
        liEl.textContent = sc;
        highDiv.appendChild(liEl);
    }
}

highDiv.classList.remove("hide");

// clear high score
let clearHigh = document.getElementById('clear');
clearHigh.addEventListener('click', function() {
    localStorage.clear();
    highDiv.classList.add("hide");
})