import { merge, values, keys } from 'lodash';
import { positionMover, drawBoardInitial, drawPiece, drawWater } from './app/assets/javascripts/assorted_functions';
import runGame from './app/assets/javascripts/game';
import pieces from './app/assets/javascripts/piece_objects';
import level1 from './app/assets/javascripts/levels/level1';
import level2 from './app/assets/javascripts/levels/level2';

document.addEventListener("DOMContentLoaded", () => {
  let level = merge({}, level2);
  let selectedPieceKey = null;
  let board = $("#game-board")[0];
  let ctx = board.getContext('2d');
  let gameInterval;
  drawBoardInitial(ctx, level);

  // Add User Pieces to User Area
  Object.keys(level.user).forEach( (pieceKey) => {
    let piece = level.user[pieceKey];
    $("#game-pieces").append(`<li class="level-pieces"><img id="user-piece-${pieceKey}" src=${piece.img}></img></li>`)
  });
  $(".level-pieces").click( (e) => {
    e.target.classList.add("on-board");
    selectedPieceKey = e.target.id.substring(11); // Only want the pieceKey section of the li's id
    let piece = level.user[selectedPieceKey];
    let selectionCanvas = $("#selected-piece")[0];
    let selectionCtx = selectionCanvas.getContext('2d');
    selectionCtx.clearRect(0,0,20,20);
    drawPiece(pieces[piece.pieceValue].img, selectionCtx, 0, 0);
  });

  // Add Click Handler to Board
  board.addEventListener("click", (click) => {
    let pos = board.getBoundingClientRect();
    let cells = positionMover(click.x - pos.left, click.y - pos.top, ctx, level);
    if (cells) {
      let pieceObject = level.user[selectedPieceKey];
      let pieceValue = pieceObject.pieceValue;
      if (pieceObject.xVal) drawWater(ctx, pieceObject.xVal, pieceObject.yVal);
      drawPiece(pieces[pieceValue].img, ctx, cells[0], cells[1]);

      pieceObject.xVal = cells[0];
      pieceObject.yVal = cells[1];
    }
  })

  // Add Click Handlers to Buttons
  const startButton = $("#start-button")[0];
  startButton.addEventListener("click", () => {
    runGame(ctx, level, gameInterval);
  });
  const resetButton = $("#reset-button")[0];
  resetButton.addEventListener("click", () => {
    clearInterval(gameInterval);
    drawBoardInitial(ctx, level);
    $(".on-board").removeClass("on-board");
    values(level.user).forEach( (piece) => {
      piece.xVal = null;
      piece.yVal = null;
    });

  });
});
