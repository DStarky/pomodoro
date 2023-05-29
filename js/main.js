// ================== ПЕРЕМЕННЫЕ ==================

let workTime;
let breakTime;
let state = 'break';
let minutes;
let seconds;
let timerInterval;
let myTask = '';

// ================== НОДЫ ==================

const task = document.querySelector('.task')
const main = document.querySelector('.main')
const input = document.querySelector('.input__task');
const pomodoros = document.querySelectorAll('.pomodoro');
const playButton = document.querySelector('.btn__play'); // play
const stopButton = document.querySelector('.btn__stop'); // stop
const newButton = document.querySelector('.btn__new'); // new

// МИНУТЫ И СЕКУНДЫ НА СТРАНИЦЕ

const minutesTimer = document.querySelector('.timer__minutes');
const secondsTimer = document.querySelector('.timer__seconds');

// Получаем элементы для изменения стилей во время отдыха

const wrapper = document.querySelector('.wrapper');

// ================== СТАРТОВЫЙ ЭКРАН ==================

pomodoros.forEach(item => {
  item.addEventListener('click', (event) => {
    myTask = input.value.trim();
    task.innerText = myTask;

    const thisButton = event.target;

    // +++++ ВОТ ЭТО ОЧЕНЬ ХОРОШО ++++
    [minutes, seconds] = thisButton.innerText.split('/');
    workTime = +minutes;
    breakTime = +seconds;
    // +++++ ДЕКОМПОЗИЦИЯ ДЛЯ ПОЛУЧЕНИЯ ЗНАЧЕНИЙ ПО ТЕКСТУ ВНУТРИ КНОПКИ ++++

    pomodoros.forEach(pomodoro => {
      pomodoro.classList.add('fade-out');
      input.classList.add('fade-out');
      setTimeout(() => {
        pomodoro.style.display = 'none';
        input.style.display = 'none';
        main.style.display = 'flex';
        main.classList.add('fade-in')
      }, 450)
    })

    playSound();
    startTimer();
  })
})

// ================== ТАЙМЕР ==================

function startTimer() {
  state = 'work';

  showStop();
  minutes = workTime;
  seconds = 0;
  updateTimerDisplay();

  function updateTimer() {
    if (minutes > 0 && seconds === 0) {
      minutes -= 1;
      seconds = 59;
    } else {
      seconds -= 1;
    }

    updateTimerDisplay()

    if (minutes === 0 && seconds === 0 && state === 'work') {
      startBreak();

    }
    if (minutes === 0 && seconds === 0 && state === 'break') {
      stopTimer();
    }

    function startBreak() {
      task.innerText = 'Отдых! Встань из-за стола'
      state = 'break';
      designBreak();
      playSound();
      minutes = breakTime;
      seconds = 0;
    }

  }

  timerInterval = setInterval(updateTimer, 1000)

}

// ================== ОСТАНОВИТЬ ТАЙМЕР ==================

function stopTimer() {
  task.innerText = myTask;
  state = 'break';
  designWork();
  showPlay();
  playSound();
  clearInterval(timerInterval);
  minutes = workTime;
  seconds = 0;
  updateTimerDisplay();
}


// ================== ЗВУК ==================

const playSound = () => {
  const audio = new Audio();
  audio.src = '../assets/timer.mp3';
  audio.play()
}


// ================== ОБНОВЛЕНИЕ ТАЙМЕРА НА СТРАНИЦЕ ==================
function updateTimerDisplay() {
  minutesTimer.innerHTML = String(minutes).padStart(2, '0');
  secondsTimer.innerHTML = String(seconds).padStart(2, '0');
  document.title = `${state.toUpperCase()} | ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
}

// ================== Показать / скрыть кнопку ==================

function showPlay() {
  playButton.style.display = 'block';
  stopButton.style.display = 'none';
  playButton.classList.add('fade-in');
  newButton.style.display = 'block';
  newButton.classList.add('fade-in');
}

function showStop() {
  playButton.style.display = 'none';
  newButton.style.display = 'none';
  stopButton.style.display = 'block';
  stopButton.classList.add('fade-in');
}


playButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
newButton.addEventListener('click', reset);


// ================== ИЗМЕНИТЬ ДИЗАЙН ==================

function designBreak() {
  wrapper.style.backgroundColor = '#44af42';
  wrapper.style.color = '#ffffff'
}

function designWork() {
  wrapper.style.backgroundColor = '#ffffff';
  wrapper.style.color = '#000000'
}

// ================== ВСЁ ЗАНОВО ==================


function reset() {
  location.reload();
}