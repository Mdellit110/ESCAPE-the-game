const body = document.querySelector('body');
const startButton = document.querySelector('#start');
const tutorialButton = document.querySelector('#tutorial');
const title = document.querySelector('.title')

//player creation
const createPlayer = () => {
  const player = document.querySelector('.player');
  player.style.background = 'blue';
  player.name = 'matt';
  player.setAttribute ('id','player');
  player.style.left = '740px'
  return player;
}

//player movement
let move = 740;
const movePlayer = (ev) => {
  const player = document.querySelector('.player');
  if (ev.keyCode === 39 && move < 1490) { //rightArrow
    move += 50;
    player.style.left = `${move}px`;
  } else if (ev.keyCode === 37 && move > 0) { //leftArrow
    move -= 50;
    player.style.left = `${move}px`;
  }
}

// start button initiates game start;
const startGame = (ev) => {
  startButton.style.display = 'none';
  title.style.display = 'none';
  tutorialButton.style.display = 'none';
  createPlayer();
  body.addEventListener('keydown', movePlayer);
}

//creates blocks that fall from the sky
const generateBlocks = () => {
  
}

startButton.addEventListener('click', startGame)
