// prompt for the name of Player 1
const button1 = document.querySelector(".Speler1");
const owntext = document.querySelector(".owntext");
let promptname = prompt("geef je naam!");

if (promptname != null) {
  owntext.textContent = promptname;
}
  
//Result
let results = {
  player1: 0,
  player2: 0,
};

//Disable buttons on page load
function welcomeFunction() {
  btn3.disabled = true;
  btn4.disabled = true;
}

//dobbelsound Array
const audioArray = ["sound/dice-1.mp3", "sound/dice-2.mp3", "sound/dice-3.mp3"];
function playRandomAudio() {
  const audioIndex = Math.floor(Math.random() * audioArray.length);
  const audio = new Audio(audioArray[audioIndex]);
  audio.play();
}

//Result Sound
let sound = new Audio("sound/switch-sound.mp3");
let Winsound = new Audio("sound/yippee.mp3");
let Losesound = new Audio("sound/dark-souls-you-died.mp3");

//Buttons to enable/disable
const btn1 = document.querySelector(".btn1");
const btn3 = document.querySelector(".btn3");
const btn4 = document.querySelector(".btn4");

//dice with functions
let one1 = document.querySelector(".result1");
let two2 = document.querySelector(".result2");
function throwDice(player) {
  let result = Math.floor(Math.random() * 20) + 1;
  const FirstDiceImage = "img/Number" + result + ".png";
  const SecondDiceImage = "img/Number" + result + ".png";
  if (player === 1) {
    results.player1 = result;
    playRandomAudio();
    one1 = "Speler 1: " + result;
    document.querySelectorAll("img")[0].setAttribute("src", FirstDiceImage);
    btn1.disabled = true;
    btn3.disabled = false;
    btn4.disabled = false;
  } else if (player === 2) {
    results.player2 = result;
    two2 = "Speler 2: " + result;
    document.querySelectorAll("img")[1].setAttribute("src", SecondDiceImage);
    btn1.disabled = true;
    btn3.disabled = false;
    btn4.disabled = false;
  }
}

//credit system
let counterDisplayElem = document.querySelector(".counter-display");
let credit = 0;

//Win and Lose alert
function counterResultWin() {
  if (credit === 10) {
    setTimeout(function(){
      location.reload();
  }, 10000);
  btn1.disabled = true;
    Swal.fire({
      title: "Je hebt Hoger/Lager gewonnen",
      text: "het spel zal nu gereset worden zodat je nog een keer kan spelen",
      icon: "success",
    });
    Winsound.play();
    }
  } 
  function counterResultLose() {
    if (credit === -5) {
      setTimeout(function(){
        location.reload();
    }, 10000);
    btn1.disabled = true;
      Swal.fire({
        title: "Je hebt Hoger/Lager verloren",
        text: "het spel zal nu gereset worden zodat je nog een keer kan spelen",
        icon: "error",
      })
      Losesound.play();
      }
    }

//result of higher
function higherResult() {
  let higher = "";
  
  if (results.player1 > results.player2) {
    higher = Swal.fire({
      text: "Speler 1 heeft gewonnen!",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      backdrop: `
        rgba(0,100,0,0.3)
      `
    });
    btn1.disabled = false;
    btn3.disabled = true;
    btn4.disabled = true;
    sound.play();
    credit++;
    updateDisplay();
    counterResultWin();
    function updateDisplay() {
      counterDisplayElem.innerHTML = credit;
    }
  } else if (results.player1 < results.player2) {
    higher = Swal.fire({
      text: "Speler 2 heeft gewonnen!",
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      backdrop: `
      rgba(100,0,0,0.3)
      `
    });
    btn1.disabled = false;
    btn3.disabled = true;
    btn4.disabled = true;
    sound.play();
    credit--;
    updateDisplay();
    counterResultLose();
    function updateDisplay() {
      counterDisplayElem.innerHTML = credit;
    }
  } else {
    Swal.fire({
      text: "Het is gelijkspel!",
      icon: "info",
      timer: 3000,
      timerProgressBar: true,
      backdrop: `
      rgba(0,0,100,0.3)
      `
    });
    btn1.disabled = false;
    btn3.disabled = true;
    btn4.disabled = true;
    sound.play();
  }
}

//result when lower
function lowerResult() {
  let lower = "";

  if (results.player1 < results.player2) {
    lower = Swal.fire({
      text: "Speler 1 heeft gewonnen!",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
         backdrop: `
      rgba(0,100,0,0.3)
      `
    });
    btn1.disabled = false;
    btn3.disabled = true;
    btn4.disabled = true;
    sound.play();
    credit++;
    updateDisplay();
    counterResultWin();
    function updateDisplay() {
      counterDisplayElem.innerHTML = credit;
    }
  } else if (results.player1 > results.player2) {
    lower = Swal.fire({
      text: "Speler 2 heeft gewonnen!",
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      backdrop: `
      rgba(100,0,0,0.3)
      `
    });
    btn1.disabled = false;
    btn3.disabled = true;
    btn4.disabled = true;
    sound.play();
    credit--;
    updateDisplay();
    counterResultLose();
    function updateDisplay() {
      counterDisplayElem.innerHTML = credit;
    }
  } else {
    lower = Swal.fire({
      text: "Het is gelijkspel!",
      icon: "info",
      timer: 3000,
      timerProgressBar: true,
         backdrop: `
      rgba(0,0,100,0.3)
      `
    });
    btn1.disabled = false;
    btn3.disabled = true;
    btn4.disabled = true;
    sound.play();
  }
}

// The FPS counter for the META players, it checks how many frames you got.
let fps = document.querySelector(".fps");
let startTime = Date.now();
let frame = 0;

function tick() {
  let time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
    startTime = time;
    frame = 0;
  }
  window.requestAnimationFrame(tick);
}

tick();