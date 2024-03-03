let game = [];
let user = [];
let color = ["red", "green", "blue", "yellow"]


let h = document.querySelector("h2");
let red = document.querySelector("#red");
let green = document.querySelector("#green");
let blue = document.querySelector("#blue");
let yellow = document.querySelector("#yellow");
let h3 = document.querySelector("h3");


let body = document.querySelector("body");

let level = 0;
let high = 0;
let currhigh = 0;
let started = false;

body.addEventListener("keypress", () => {
    if(!started)
    {
        let level = 0;
        let currhigh = 0;
        h.innerText = `level ${level}`;
        started = true;
        console.log("game Started");
    }
    levelup();
    
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash")
    },200);
}


function levelup() {
    user = [];
    level++;
    currhigh ++;
    h.innerText = `level ${level}`;
    let rand = Math.floor(Math.random() * 3) + 1;
    let randcolor = color[rand];
    game.push(randcolor);
    let randbtn = document.querySelector(`.${randcolor}`);
    btnFlash(randbtn);
};

let allbtns = document.querySelectorAll(".colors");
for(let btn of allbtns){
    btn.addEventListener("click", btnpress)
}


function checkans(idx) {
    if(user[idx] === game[idx])
    {
        if(user.length == game.length)
        {
            setTimeout(levelup,1000);
        }
        
    }else{
        h.innerText = "Game Over!!! press any key to start again";
        btnFlash(body);
        let audio = new Audio('/sounds/wrong.mp3');
        audio.play();
        if(high < currhigh){
            high = currhigh;
            h3.innerText = `high score: ${high}`;
            currhigh = 0;
        }
        reset();
    }
}

function btnpress() {
    
    let btn = this;
    btnFlash(btn);
    let idx = btn.getAttribute("id");

    
    user.push(idx);
    console.log(user);
    console.log(game);
    checkans(user.length-1);

    // Play a sound
    let audio = new Audio('/sounds/yellow.mp3');
    audio.play();
}

function reset() {
    started = false;
    game = [];
    user = [];
    level = 0;
}
