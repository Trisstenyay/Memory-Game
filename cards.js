
var cardList = [
    "audi",
    "bmw",
    "bugatti",
    "challenger",
    "fastest car in world",
    "ferrari",
    "lamborghini",
    "mercedes benz",
    "nissan gtr",
    "slowest car in world"
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;
var errors = 0;
var NUMBER_OF_TRIES = 15;
var matches = 0;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet);
    //shuffle
    for( let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length); //get random index
    //swap
    j = j%10;
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
    console.log('j', j);
}
console.log(cardSet);
}

function startGame() {
    //arrange the board 4x5
    for(let r = 0; r < rows; r++) {
        let row = [];
        for(let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg)//JS

            // <img id="0-0" class="card" src="img.jpg">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "images-folder/" + cardImg + ".jpg"; 
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

console.log(board);
setTimeout(hideCards, 1000);
}

function hideCards() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "images-folder/back.jpg";
        }
    }
}

function selectCard() {if (errors === NUMBER_OF_TRIES){
    return;
};

    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;
            console.log('card1Selected',card1Selected);
            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "images-folder/" + board[r][c] + ".jpg";
           
        }
        else if (!card2Selected && this !=card1Selected) {
            card2Selected = this;
            console.log('card2Selected',card2Selected);
            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "images-folder/" + board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    } 
}

function update() {
    if (card1Selected.src !== card2Selected.src) {
        card1Selected.src = "images-folder/back.jpg";
        card2Selected.src = "images-folder/back.jpg";
        errors += 1;

        if (errors < NUMBER_OF_TRIES) {
            document.getElementById("errors").innerText = errors;
        } else {
            document.getElementById("status-text").style.display = "none";
            document.getElementById("game-result-text").innerText = "Game Over Loser😜";
            document.getElementById("game-result-text").style.display = "block";

            // 🔊 Play evil laugh sound
            const loseSound = new Audio("images-folder/loser-laugh.mp3");
            loseSound.play();

            // 🔁 Show Try Again button
            const tryAgainBtn = document.getElementById("try-again");
            tryAgainBtn.style.display = "inline-block";

            // Optional: Add a click handler to reload the page
            tryAgainBtn.onclick = function () {
                document.getElementById("status-text").style.display = "block";
                document.getElementById("game-result-text").style.display = "none";
                location.reload(); // Reloads the game
            };
        }

    } else {
        matches++;
        if (matches === cardList.length) {

             // Hide the status-text
            document.getElementById("status-text").style.display = "none";

            // Show the game result
            const resultText = document.getElementById("game-result-text");
            resultText.innerText = "🏆 Congrats! You're a winner!... until next time😏";
            resultText.style.display = "block";

            // ✅ Play winning sound
            const winSound = new Audio("images-folder/winner-laugh.mp3");
            winSound.play();

            // 🎊 Trigger confetti animation
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });

            // 🔁 Show Try Again button on win
            const tryAgainBtn = document.getElementById("try-again");
            tryAgainBtn.style.display = "inline-block";
            tryAgainBtn.onclick = function () {
                location.reload(); // Reloads the game
            };
        }
    }

    // Reset selections either way
    card1Selected = null;
    card2Selected = null;
}
