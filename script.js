const allModBtns = document.querySelectorAll('.container .mode-btns-box button');
const focusBtn = document.querySelector('.container .mode-btns-box .focus-btn');
const shortBreakBtn = document.querySelector('.container .mode-btns-box .short-break-btn');
const longBreakBtn = document.querySelector('.container .mode-btns-box .long-break-btn');
const startBtn = document.querySelector('.container .btns .start-btn');
const pauseBtn = document.querySelector('.container .btns .pause-btn');
const resetBtn = document.querySelector('.container .btns .reset-btn');
const timeDisplay = document.querySelector('.container .timer');

let intervalId;
let secondsLeft = 59;
let isPaused = true;
let minutesLeft = 24;
let activeMode = "focus";

timeDisplay.innerHTML = `${minutesLeft + 1}:00`;

const addZero = (value) => {
  return value < 10 ? "0" + value : value;
};

const resetTimer = () => {
  pauseTimer();
  switch (activeMode) {
    case "long":
      minutesLeft = 14;
      break;
    case "short":
      minutesLeft = 4;
      break;
    default:
      minutesLeft = 29;
      break;
  }
  secondsLeft = 59;
  timeDisplay.innerHTML = `${minutesLeft + 1}:00`;
};

resetBtn.addEventListener('click', resetTimer);

const removeButtonFocus = () => {
  allModBtns.forEach((button) => {
    button.classList.remove('btn-focus');
  });
};

const setMode = (mode, minutes) => {
  activeMode = mode;
  removeButtonFocus();
  pauseTimer();
  secondsLeft = 59;
  minutesLeft = minutes;
  timeDisplay.innerHTML = `${minutesLeft + 1}:00`;
};

focusBtn.addEventListener('click', () => {
  setMode("focus", 24);
  focusBtn.classList.add('btn-focus');
});

shortBreakBtn.addEventListener('click', () => {
  setMode("short", 4);
  shortBreakBtn.classList.add('btn-focus');
});

longBreakBtn.addEventListener('click', () => {
  setMode("long", 14);
  longBreakBtn.classList.add('btn-focus');
});

const pauseTimer = () => {
  isPaused = true;
  clearInterval(intervalId);
  resetBtn.style.display = 'none';
  pauseBtn.style.display = 'none';
  startBtn.style.display = 'block';
};

pauseBtn.addEventListener('click', pauseTimer);

startBtn.addEventListener('click', () => {
  resetBtn.style.display = 'block';
  pauseBtn.style.display = 'block';
  startBtn.style.display = 'none';

  if (isPaused) {
    isPaused = false;
    timeDisplay.innerHTML = `${addZero(minutesLeft)}:${addZero(secondsLeft)}`;
    intervalId = setInterval(() => {
      secondsLeft--;
      timeDisplay.innerHTML = `${addZero(minutesLeft)}:${addZero(secondsLeft)}`;
      if (secondsLeft === 0) {
        if (minutesLeft !== 0) {
          minutesLeft--;
          secondsLeft = 60;
        } else {
          clearInterval(intervalId);
        }
      }
    }, 1000);
  }
});
