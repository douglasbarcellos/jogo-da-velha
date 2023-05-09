// selecionando as células do jogo
const cells = document.querySelectorAll('.cell');

// selecionando a div que mostra o resultado
const result = document.querySelector('#result');

// selecionando o botão de reiniciar
const restartButton = document.querySelector('#restart');

// definindo as constantes para as peças do jogo
const X_CLASS = 'x';
const O_CLASS = 'o';

// definindo o jogador atual
let currentPlayer = X_CLASS;

// criando a matriz que representa o estado atual do jogo
let gameState = ['', '', '', '', '', '', '', '', ''];

// criando uma constante com as combinações vencedoras
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// adicionando os listeners de clique para as células do jogo
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

// adicionando o listener de clique para o botão de reiniciar
restartButton.addEventListener('click', restartGame);

// função que é chamada quando uma célula é clicada
function handleClick(event) {
  // selecionando a célula clicada
  const cell = event.target;
  // obtendo o índice da célula clicada
  const index = getIndex(cell);
  // atualizando o estado do jogo com a peça do jogador atual
  gameState[index] = currentPlayer;
  // desenhando a peça do jogador atual na célula clicada
  drawPiece(cell, currentPlayer);
  // verificando se o jogo terminou
  if (checkWin()) {
    endGame(false);
  } else if (checkDraw()) {
    endGame(true);
  } else {
    // trocando o jogador atual
    swapPlayer();
    // atualizando a mensagem de resultado
    updateResult();
  }
}

// função que desenha a peça do jogador atual na célula clicada
function drawPiece(cell, player) {
  cell.classList.add(player);
  cell.textContent = player;
}

// função que retorna o índice de uma célula com base no seu ID
function getIndex(cell) {
  return parseInt(cell.id.split('-')[1]);
}

// função que verifica se uma combinação vencedora foi atingida
function checkWin() {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

// função que verifica se o jogo terminou em empate
function checkDraw() {
  return gameState.every(cell => {
    return cell !== '';
  });
}

// função que finaliza o jogo
function endGame(draw) {
  if (draw) {
    result.textContent = 'Empate!';
  } else {
    result.textContent = `${currentPlayer} venceu!`;
  }
  // removendo os listeners de clique das células do jogo
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

// função que troca o jogador atual
function swapPlayer() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

// função que atualiza a mensagem de resultado
function updateResult() {
    result.textContent = `É a vez de ${currentPlayer}`;
}
    
    // função que reinicia o jogo
    function restartGame() {
    // limpando o estado do jogo
    gameState = ['', '', '', '', '', '', '', '', ''];
    // limpando o desenho das peças do jogo
    cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.textContent = '';
    // adicionando novamente o listener de clique para a célula
    cell.addEventListener('click', handleClick, { once: true });
    });
    // trocando para o jogador X começar
    currentPlayer = X_CLASS;
    // atualizando a mensagem de resultado
    updateResult();
    }
    
    // chamando a função que atualiza a mensagem de resultado pela primeira vez
    updateResult();