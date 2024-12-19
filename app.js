const points = document.getElementById("Points");
const color = document.getElementById("color");
const cards = document.getElementsByClassName("cards")[0].children; 
const startBtn = document.getElementById("startBtn"); 
const result = document.getElementById("result"); 
const easyMode = document.getElementById("easy");
const hardMode = document.getElementById("hard");

let defaultPoints = 0;
let isEasyMode = null; 

points.innerText = `Your Point(s): ${defaultPoints}`;

const colorNames = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "brown", "violet", "indigo"];

function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 
    return `rgb(${r}, ${g}, ${b})`; 
}

function getRandomColorName() {
    const randomIndex = Math.floor(Math.random() * colorNames.length); 
    return colorNames[randomIndex]; 
}

function onStart() {
    if (isEasyMode === null) {
        alert("ჯერ აირჩიეთ ადვილი ან რთული თამაშის რეჟიმი !");
        return;
    }

    defaultPoints = 0;
    points.innerText = `Your Point(s): ${defaultPoints}`;
    result.style.background = "linear-gradient(90deg, rgb(75, 0, 130), rgb(218, 112, 214))"; 
    result.innerText = "Result";

    let randomColor;
    if (isEasyMode) {
        randomColor = getRandomColorName(); 
    } else {
        randomColor = getRandomRGBColor(); 
    }

    color.innerText = randomColor;

    const randomCardIndex = Math.floor(Math.random() * cards.length);

    for (let i = 0; i < cards.length; i++) {
        if (i === randomCardIndex) {
            cards[i].style.background = ""; 
            cards[i].style.backgroundColor = randomColor; 
            cards[i].dataset.isMatch = "true";
        } else {
            cards[i].style.background = ""; 
            if (isEasyMode) {
                cards[i].style.backgroundColor = getRandomColorName();
            } else {
                cards[i].style.backgroundColor = getRandomRGBColor(); 
            }
            cards[i].dataset.isMatch = "false"; 
        }
        cards[i].style.visibility = "visible"; 
    }
}


easyMode.addEventListener("click", function () {
    isEasyMode = true; 
    easyMode.style.background = "indigo"; 
    hardMode.style.background = ""; 
    onStart(); 
});

hardMode.addEventListener("click", function () {
    isEasyMode = false; 
    hardMode.style.background = "indigo"; 
    easyMode.style.background = "";
    onStart(); 
});

for (let card of cards) {
    card.addEventListener("click", function () {
        if (this.dataset.isMatch === "true") {
            defaultPoints += 1;
            points.innerText = `Your Point(s): ${defaultPoints}`;
            result.style.background = "linear-gradient(90deg, green, darkgreen)"; 
            alert("შენ სწორად გამოიცანი ფერი"); 
            setTimeout(onStart, 2000); 
        } else {
            this.style.visibility = "hidden"; 
            result.style.background = "linear-gradient(90deg, red, darkred)"; 
        }
    });
}
