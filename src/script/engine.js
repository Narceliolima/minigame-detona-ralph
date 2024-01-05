
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        volumeSlider: document.querySelector(".music-slider input"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livesRemaining: 3,
    },
    actions: {
        timerID: setInterval(randomSquare, 1000),
        countDownTimerID: setInterval(countDown, 1000),
    },
};

const bkgrnSound = new Audio(`./src/assets/sons/BonusScreenSMW.mp3`);

function handleVolume (event) {
    bkgrnSound.volume = event.target.value;
}

function playbgrnSound(){

    state.view.volumeSlider.addEventListener("input", handleVolume);
    bkgrnSound.volume = state.view.volumeSlider.value;
    bkgrnSound.loop = true;
    bkgrnSound.play();
}

function playAudio(nomeAudio){
    let audio = new Audio(`./src/assets/sons/${nomeAudio}.m4a`);
    audio.volume = state.view.volumeSlider.value;
    audio.play();
}

function countDown(){
    //state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime < 0||state.values.livesRemaining < 1){
        clearInterval(state.actions.countDownTimerID);
        clearInterval(state.actions.timerID);
        alert(`Fim de Jogo! Sua pontuação foi ${state.values.result}`);

    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    const randomNumber = Math.floor(Math.random() * 9);
    const randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", (event) => {
            if(event.button == 0){
                if(square.id === state.values.hitPosition){
                    state.values.result++;
                    state.view.score.textContent = state.values.result;
                    state.values.hitPosition = null;
                    playAudio('hit');
                }
                else if(square.id !== state.values.hitPosition){
                    state.values.livesRemaining--;
                    state.view.lives.textContent = "x"+state.values.livesRemaining;
                    state.values.hitPosition = null;
                    playAudio('miss');
                }
            }
        })
    });
}

//Main
(function () {

    document.addEventListener("click", () => {
        if(!document.hidden){
            playbgrnSound();
        }
    });
    addListenerHitBox();
})();