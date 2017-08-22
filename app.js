import { merge, values, keys } from 'lodash';
import { positionMover } from './app/assets/javascripts/click_handlers';
import runGame from './app/assets/javascripts/game';
import level1 from './app/assets/javascripts/levels/level1';

document.addEventListener("DOMContentLoaded", () => {
  let level = merge({}, level1);
  let selectedPieceKey = null;
  let board = $("#game-board")[0];
  let ctx = board.getContext('2d');
  ctx.fillStyle = '#75aec6';
  ctx.fillRect(0,0,440,440);

  // Add Level Pieces to Board
  let presetPieces = level.preset;
  presetPieces.forEach( (piece) => {
    ctx.fillStyle = piece.color;
    ctx.fillRect(piece.xVal, piece.yVal, 20, 20);
  });

  // Add User Pieces to User Area
  Object.keys(level.user).forEach( (pieceKey) => {
    $("#game-pieces").append(`<li class="level-pieces">${pieceKey}</li>`)
  });
  $(".level-pieces").click( (e) => {
    $("#selected-piece").html(`${e.target.innerHTML}`);
    selectedPieceKey = e.target.innerHTML;
  });

  // Add Click Handler to Board
  board.addEventListener("click", (click) => {
    let pos = board.getBoundingClientRect();
    let cells = positionMover(click.x - pos.left, click.y - pos.top, ctx, level);
    if (cells) {
      let pieceObject = level.user[selectedPieceKey];
      ctx.fillStyle = '#75aec6';
      ctx.fillRect(pieceObject.xVal, pieceObject.yVal, 20, 20);
      ctx.fillStyle = pieceObject.color;
      ctx.fillRect(cells[0], cells[1], 20, 20);
      pieceObject.xVal = cells[0];
      pieceObject.yVal = cells[1];
    }
  })

  const startButton = $("#start-button")[0];
  startButton.addEventListener("click", () => {
    runGame(ctx, level);
  });
});
