const horas = document.getElementById('hours');
const minutos = document.getElementById('minutes');
const segundos = document.getElementById('seconds');

const relogio = setInterval(function time(){
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;

    if (min < 10) min = '0' + min;

    if (sec < 10) sec = '0' + sec;

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = sec;
})

/*cronometro*/

const timerel = document.getElementById('timer');
const marklist = document.getElementById('cr_marks_list');
let intervalId = 0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
    const hours = Math.floor((time / 360000));
    const minutos = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const miliSeconds = (time % 100);

    return `${hours.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${miliSeconds.toString().padStart(2, '0')}`
}

const addMarkTolist = (markIndex, markTime) => {
    marklist.innerHTML += `<p> Marca ${markIndex}: ${formatTime(markTime)}<p>`
}
const markTime = () => {
    marks.push(timer);
    addMarkTolist(marks.length, timer);
}

const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if (action == 'start' || action == 'continue') {
        intervalId = setInterval(() => {
            timer += 1; 
            setTimer(timer)
        }, 10);

        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>'
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>'
    }
}

const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marklist.innerHTML = '';
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}



const setTimer = (time) => {
    timerel.textContent = formatTime(time);
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);

