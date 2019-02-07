const body = document.querySelector('body');
const startButton = document.querySelector('#start');
const tutorialButton = document.querySelector('#tutorial');
const title = document.querySelector('.title')
const player = document.querySelector('.player');
const tryAgain = document.querySelector('.tryAgain');
const yesButton = document.querySelector('#yes');
const noButton = document.querySelector('#no');
const finalScore = document.querySelector('.finalScore');
let blocks = [];
let score = 0;
let move = 50;
let int;
let blockMaker;
let left = false;
let right = false;
let startMove
let stopMove

//player movement
const movePlayer = (ev) => {
  if (ev.keyCode === 39 && player.offsetLeft <= (document.body.clientWidth - 10)) { //rightArrow
    right = true;
    player.classList.add('goRight')
  } else if (ev.keyCode === 37 && move > 1) { //leftArrow
    left = true;
    player.classList.add('goLeft')
  };
};
const unMovePlayer = (ev) => {
  if (ev.keyCode === 39 && player.offsetLeft <= (document.body.clientWidth - 10)) { //rightArrow
    right = false;
    player.classList.remove('goRight')
  } else if (ev.keyCode === 37 && move > 1) { //leftArrow
    left = false;
    player.classList.remove('goLeft')
  };
};

const movingPlayer = () => {
  if (left){
    if (player.offsetLeft <= 0) {
    move = 100;
    }
    move -= 1;
  } else if (right){
    if (player.offsetLeft >= window.innerWidth - player.offsetWidth) {
    move = 1;
    }
    move += 1;
  };
  player.style.left = `${move}%`;
  window.requestAnimationFrame(movingPlayer);
}
window.requestAnimationFrame(movingPlayer);
//generates all blocks inline
const generateBlocks = () => {
    const block = document.createElement('div');
    block.className = 'block'
    block.style.left = `${randOffLeft(block)}px`;
    blocks.push(block);
    body.appendChild(block);
};

checkCollision = (i) => {
  blockPos = blocks[i].getBoundingClientRect();
  playerPos = player.getBoundingClientRect();
  if (playerPos.bottom >= blockPos.bottom) {
    if (playerPos.left >= blockPos.left && playerPos.right <= blockPos.right || playerPos.right >= blockPos.left && playerPos.left <= blockPos.right) {
      if (playerPos.top <= blockPos.bottom) {
        clearInterval(int);
        youLose();
      };
    };
  };
};
//move blocks downwards
const dropEm = () => {
  for (let i=0; i<blocks.length; i++) {
    checkCollision(i);
    if (blocks[i] !== undefined && (blocks[i].offsetTop) < (window.innerHeight - blocks[i].offsetHeight)) {
        blocks[i].style.top =`${blocks[i].offsetTop + (window.innerHeight / 100)}px`;
    } else {
      resetBlock();
    };
  };
  score += 1;
};
const moveBlocks = () => {
  int = setInterval(dropEm, 18);
};

// number generators
const randOffLeft = () => {
  return (Math.floor(Math.random() * (window.innerWidth - 40)));
};
const randomInterval = () => {
  return (Math.floor(Math.random() * 1000));
};

// start button initiates game start;
const startGame = () => {
  startButton.style.display = 'none';
  title.style.display = 'none';
  tutorialButton.style.display = 'none';
  tryAgain.style.display = 'none';
  yesButton.style.display = 'none';
  noButton.style.display = 'none';
  player.style.display = 'block';
  finalScore.style.display = 'none';
  blockMaker = setInterval(generateBlocks, 130);
  moveBlocks();
  startMove = body.addEventListener('keydown', movePlayer, true);
  stopMove = body.addEventListener('keyup', unMovePlayer, true);
};

const restartGame = () => {
  startGame();
  resetBlocks();
  score = 0;
  player.classList.remove('dead')
};

const resetBlock = () => {
    let firstBlock = blocks.shift();
    firstBlock.parentNode.removeChild(firstBlock);
};

const resetBlocks = () => {
  while (blocks.length > 1){
    resetBlock();
  }
};

// when loss conditions are met
const youLose = () => {
  tryAgain.style.display = 'block';
  yesButton.style.display = 'block';
  noButton.style.display = 'block';
  finalScore.style.display = 'block';
  player.classList.add('dead')
  finalScore.innerText = `SCORE: ${Math.floor(score)}`;
  clearInterval(blockMaker);
  body.removeEventListener('keydown', movePlayer, true);
  body.removeEventListener('keyup', unMovePlayer, true);
  yesButton.addEventListener('click', restartGame);
  noButton.addEventListener('click', backToMain);
};

startButton.addEventListener('click', startGame);


const backToMain = () => {
  resetBlocks();
  score = 0
  startButton.style.display = 'block';
  title.style.display = 'block';
  finalScore.style.display = 'none';
  tryAgain.style.display = 'none';
  yesButton.style.display = 'none';
  noButton.style.display = 'none';
  player.style.display = 'none';
  player.classList.remove('dead')
}
