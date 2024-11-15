/*Variáveis usadas para alterar coisas visuais são guardadas no views.
Variáveis que não alteram visualmente o projeto são guardadas no values.
Variáveis que fazem ações por baixo dos panos são guardados no actions*/

const initialVariables = {
  values: {
    timerValue: 1000,
    initialTime: 10,
    initialLives: 2,
  },
}; //Variáveis auxiliares usadas para definir valores padrão ao projeto

const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    totalScore: document.querySelector("#total-score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    totalResult: 0,
    currentTime: initialVariables.values.initialTime,
    currentLive: initialVariables.values.initialLives,
    isGameOver: new Boolean(false),
  },
  actions: {
    timerId: setInterval(randomSquare, initialVariables.values.timerValue), //De tempo em tempo, move o inimigo para uma nova posição
    countDownTimerId: setInterval(
      countDown,
      initialVariables.values.timerValue
    ),
  },
}; //Objeto criado para visualizar e manipular as variáveis presentes no projeto.

function updateScore(){
        //Armazena a pontuação atual no total de pontos e zera a pontuação atual
        state.values.totalResult += state.values.result;
        state.view.totalScore.textContent = state.values.totalResult;
        state.values.result = 0;
        state.view.score.textContent = state.values.result;
}


function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 10) {
    state.view.timeLeft.classList.add("evidence");
  }
  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.timeLeft.classList.remove("evidence");

    if (state.values.currentLive > 0) {
      confirmRestartGame = confirm(
        "Game Over! O seu resultado foi: " +
          state.values.result +
          "\n Deseja jogar novamente?"
      );
      if (confirmRestartGame == true) {
        updateScore();
        restartGame();
      } else {
        isGameOver = true;
        updateScore();
      }
    } else {
      updateScore();
      alert(
        "Suas vidas acabaram. Espero que tenha se divertido! \n Sua pontuação total foi: " +
          state.values.totalResult
      );
    }
  }
} //Verifica se o tempo acabou e mostra na tela qual a pontuação alcançada

function restartGame() {
  //Decrementa a quantidade restante de vida
  state.values.currentLive--;
  state.view.lives.textContent = state.values.currentLive;

  //Retorna o valor do timer para o valor inicial
  state.values.currentTime = initialVariables.values.initialTime;
  state.view.timeLeft.textContent = state.values.currentTime;

  //Reinicia o temporizador
  state.actions.timerId = setInterval(
    randomSquare,
    initialVariables.values.timerValue
  );
  state.actions.countDownTimerId = setInterval(
    countDown,
    initialVariables.values.timerValue
  );
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);

  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
} //Adiciona o inimigo em um square (quadrado) aleatório

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
} //Adiciona os arquivos de audio ao jogo, para serem chamados nas funções.

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
} //Verifica se o quadrado onde estamos clicando é o mesmo quadrado onde nosso inimigo se encontra.

function initialize() {
  state.view.lives.textContent = state.values.currentLive;
  addListenerHitBox();
} //Função principal, que chama todas as outras.

initialize();
