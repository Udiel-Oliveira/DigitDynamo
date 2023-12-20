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



const markAnimation = document.getElementById('marka');

markAnimation.addEventListener('click', function(){
    this.classList.toggle('descer');
});



const valor = document.getElementById('value');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const resetButton = document.getElementById('resete');

let contador = 0;
let intervalIdcon = 0;

const updateValue = () => {
    valor.innerHTML = contador
}

plusButton.addEventListener('mousedown', () => {
    intervalIdcon = setInterval(() => {
        contador +=1;
        updateValue();
    }, 100);
});

document.addEventListener('mouseup', () => clearInterval(intervalIdcon));


minusButton.addEventListener('mousedown', () => {
    intervalIdcon = setInterval(() => {
        contador -=1;
        updateValue();
    }, 100);
});

resetButton.addEventListener('click', () => {
    contador = 0;
    updateValue();
});

document.addEventListener('mouseup', () => clearInterval(intervalIdcon));



const form = document.getElementById('forms');


form.addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = document.getElementById('Peso').values;
    const height = document.getElementById('Alt').values;
    
    const bmi = (weight / (height * height)).toFixed(2);

    const values = document.getElementById('value2');
    let description = '';

    document.getElementById('infos1').classList.remove('hidden');

    if (bmi < 18.5) {
        description = 'Cuidado! Você está abaixo do peso!';
    }else if(bmi>=18.5 && bmi <= 25)
    {
        description = 'Wow! Você está no peso ideial!';
    }else if(bmi > 25 && bmi <= 30)
    {
        description = 'Cuidado! você está com sobrepeso!';
    }
    else if(bmi > 30 && bmi <= 35)
    {
        description = 'Cuidado! você está com obesidade moderada!';
    }
    else if(bmi > 35 && bmi <= 40)
    {
        description = 'Cuidado! você está com obesidade severa!';
    } else 
    {
        description = 'Cuidado! você está com obesidade morbida!';
    };

    values.textContent = bmi.replace('.', ',');
    document.getElementById('description').textContent = description;

});


/*encurtador de link*/

function encurtarURL ()
{
    let url = document.getElementById('input_enc').value;

    if(!url){
        alert("É preciso inserir uma URL pra encurtar")
    };


    // api key: 59053b7db31e47e19b0b9cd9e6deb564

    //header
    let headers = {
        "Content-Type": "application/json",
        "apikey": "59053b7db31e47e19b0b9cd9e6deb564"
    }
    //dados
    let linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" }
    }

    fetch("https://api.rebrandly.com/v1/links",
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify(linkRequest)
        }
    ).then(Response => Response.json())
     .then(json => {
        console.log(json);
        
        let inputUrl = document.getElementById('input_enc');
        inputUrl.value = json.shortUrl;
     });
};

function copiar(){
    let inputUrl = document.getElementById('input_enc');
    
    inputUrl.select();
    inputUrl.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(inputUrl.value);

    alert(`URL copiado ${inputUrl.value}`)
}





