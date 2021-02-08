const holes = document.querySelectorAll('.hole');

const moles = document.querySelectorAll('.mole');

const scoreBoard = document.querySelector('#scoreBoard');

const timer = document.querySelector('#timer');

const startButton = document.querySelector('#startGame');

let lastHole;

let timeUp = false;

let score = 0;

function randomTime(min, max){

    return Math.round(Math.random() * (max-min) + min);

}

function randomHole(holes){

    const idx = Math.floor(Math.random()*holes.length);

    const hole = holes[idx];

    if(hole == lastHole){

        console.log('Nope');

        return randomHole(holes);

    }


    lastHole = hole;

    return hole;

}

function peep(){

    const time = randomTime(200,1000);

    const hole = randomHole(holes);

    hole.classList.add('up');

    setTimeout(() => {

        hole.classList.remove('up');

        if(!timeUp){

            peep();

        }

    }, time);

}

function startGame(){

    startButton.classList.add('hide');

    startButton.innerHTML = 'Play Again';

    scoreBoard.innerHTML = 0;

    timeUp = false;

    peep();

    setTimeout(() => {

        timeUp = true

        startButton.classList.remove('hide');
    
    }, 10000);

    score = 0;

}

function bonk(e){

    if(!e.isTrusted){

        alert('Cheater');

        window.location.reload();

    }

    score++;

    this.parentNode.classList.remove('up');

    scoreBoard.innerHTML = score;

}

moles.forEach(mole => mole.addEventListener('click', bonk));