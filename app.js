import { positionMover } from './app/assets/javascripts/click_handlers';
import runGame from './app/assets/javascripts/game';
import level1 from './app/assets/javascripts/levels/level1';

document.addEventListener("DOMContentLoaded", () => {
  let board = $("#game-board")[0];
  let ctx = board.getContext('2d');
  let currentPos = [0,0];
  ctx.fillStyle = '#75aec6';
  ctx.fillRect(0,0,440,440);

  // Add Level Pieces to Board
  let presetPieces = level1.preset;
  presetPieces.forEach( (piece) => {
    ctx.fillStyle = piece.color;
    ctx.fillRect(piece.xVal, piece.yVal, 20, 20);
  });

  // Add User Pieces to User Area
  level1.user.forEach( (piece) => {
    $("#game-pieces").append(`<li class="level-pieces">${piece}</li>`)
  });
  $(".level-pieces").click( () => {
    console.log("sup");
  });

  board.addEventListener("click", (click) => {
    let pos = board.getBoundingClientRect();
    let cells = positionMover(click.x - pos.left, click.y - pos.top, ctx, level1);
    if (cells) {
      ctx.fillStyle = '#75aec6';
      ctx.fillRect(currentPos[0], currentPos[1], 20, 20);
      ctx.fillStyle = 'blue';
      ctx.fillRect(cells[0], cells[1], 20, 20);
      currentPos = [cells[0], cells[1]];
    }
  })

  const startButton = $("#start-button")[0];
  startButton.addEventListener("click", () => {
    runGame(ctx, level1, currentPos);
  });
});
