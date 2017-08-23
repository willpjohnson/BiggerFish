import { merge, values, keys } from 'lodash';
import { positionMover, drawPiece } from './app/assets/javascripts/assorted_functions';
import runGame from './app/assets/javascripts/game';
import pieces from './app/assets/javascripts/piece_objects';
import level1 from './app/assets/javascripts/levels/level1';
import level2 from './app/assets/javascripts/levels/level2';

document.addEventListener("DOMContentLoaded", () => {
  let level = merge({}, level1);
  let selectedPieceKey = null;
  let board = $("#game-board")[0];
  let ctx = board.getContext('2d');
  ctx.fillStyle = '#75aec6';
  ctx.fillRect(0,0,440,440);


  // Add Level Pieces to Board
  level.preset.forEach( (preset) => {
    let piece = pieces[preset.pieceValue];
    drawPiece(piece.img, ctx, preset.xVal, preset.yVal);
  });

  // Add Goal to Board
  ctx.fillStyle = 'black';
  ctx.fillRect(level.goal.xVal, level.goal.yVal, 20, 20);

  // Add User Pieces to User Area
  Object.keys(level.user).forEach( (pieceKey) => {
    let piece = level.user[pieceKey];
    $("#game-pieces").append(`<li id="user-piece-${pieceKey}" class="level-pieces">${pieces[piece.pieceValue].name}</li>`)
  });
  $(".level-pieces").click( (e) => {
    selectedPieceKey = e.target.id.substring(11); // Only want the pieceKey section of the li's id
    let piece = level.user[selectedPieceKey];
    let selectionCanvas = $("#selected-piece")[0];
    let selectionCtx = selectionCanvas.getContext('2d');
    drawPiece(pieces[piece.pieceValue].img, selectionCtx, 0, 0);
  });

  // Add Click Handler to Board
  board.addEventListener("click", (click) => {
    let pos = board.getBoundingClientRect();
    let cells = positionMover(click.x - pos.left, click.y - pos.top, ctx, level);
    if (cells) {
      let pieceObject = level.user[selectedPieceKey];
      let pieceValue = pieceObject.pieceValue;
      ctx.fillStyle = '#75aec6';
      ctx.fillRect(pieceObject.xVal, pieceObject.yVal, 20, 20);
      drawPiece(pieces[pieceValue].img, ctx, cells[0], cells[1]);

      pieceObject.xVal = cells[0];
      pieceObject.yVal = cells[1];
    }
  })

  const startButton = $("#start-button")[0];
  startButton.addEventListener("click", () => {
    runGame(ctx, level);
  });
});
