// Step1 = keypress->game start
//Step2 = btnflash+Level1
//step3 = gameseq[],userseq[] which refill again at each level
//Step4 = user press btn seq=check userseq[]==gameseq[] then Level Up,else GameOver

let gameSeq= [];
let userSeq= [];
let highScore=0;
let btns=["yellow","red","blue","green"];

let started= false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;//only one time the game can start as when it is false at that time only
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    btnFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}
function checkAns(idx){
    // console.log("curr level:",level);
    if(userSeq[idx]=== gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        if(level>highScore){
            highScore=level;
        }
        h2.innerHTML=`Game Over! Your score was <b>${level}</b><br>High Score :<b> ${highScore}</b><br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress(){
    // Here the work should come which should happen when btn was pressed
    let btn=this;
    btnFlash(btn);
    let userColor=btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    // console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}