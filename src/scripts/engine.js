/*Variáveis usadas para alterar coisas visuais são guardadas no views.
Variáveis que não alteram visualmente o projeto são guardadas no values.
Variáveis que fazem ações por baixo dos panos são guardados no actions*/

const state = {
  view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      lives: document.querySelector("#lives"),

  },
  values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      currentTime: 15,
  },
  actions: {
      timerId: setInterval(randomSquare, 1000), //De tempo em tempo, move o inimigo para uma nova posição
      countDownTimerId: setInterval(countDown, 1000),
  }
}; //Objeto criado para visualizar e manipular as variáveis presentes no projeto.

function countDown(){
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if(state.values.currentTime <= 10){
    state.view.timeLeft.classList.add("evidence");
  }
  if(state.values.currentTime <= 0){
      clearInterval(state.actions.countDownTimerId)
      clearInterval(state.actions.timerId)
      state.view.timeLeft.classList.remove("evidence");
      alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}; //Verifica se o tempo acabou e mostra na tela qual a pontuação alcançada


function randomSquare() {
  state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
  });

let randomNumber = Math.floor(Math.random() * 9);

let randomSquare = state.view.squares[randomNumber];
randomSquare.classList.add("enemy");
state.values.hitPosition = randomSquare.id;
}; //Adiciona o inimigo em um square (quadrado) aleatório

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}; //Adiciona os arquivos de audio ao jogo, para serem chamados nas funções.


function addListenerHitBox(){
  state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", ()=> {
          if(square.id === state.values.hitPosition){
          state.values.result++
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
          }
      })
  })
}; //Verifica se o quadrado onde estamos clicando é o mesmo quadrado onde nosso inimigo se encontra.


function initialize() {
  addListenerHitBox();
}; //Função principal, que chama todas as outras.

initialize();