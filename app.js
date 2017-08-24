import { merge, values, keys } from 'lodash';
import { positionMover, drawBoardInitial, drawPiece, drawWater } from './app/assets/javascripts/assorted_functions';
import runGame from './app/assets/javascripts/game';
import pieces from './app/assets/javascripts/piece_objects';
import level1 from './app/assets/javascripts/levels/level1';
import level2 from './app/assets/javascripts/levels/level2';

document.addEventListener("DOMContentLoaded", () => {
  let level = merge({}, level2); //Establish Level
  $("#level-header").html(`Level ${level.levelNum}`); //Add Level Header to Level Div
  let selectedPieceKey = null; //Establish dummy Selected Piece
  let board = $("#game-board")[0]; //Find board on index.html
  let ctx = board.getContext('2d'); //Establish board ctx
  let selectionCanvas = $("#selected-piece")[0];
  let selectionCtx = selectionCanvas.getContext('2d');
  drawBoardInitial(ctx, level);
  $("#level-goal-piece").empty().append(`<img class="level-goal-piece" src=${level.catch.img}>`);
  let gameInterval; //Establish dummy gameInterval

  // Add User Pieces to User Area
  Object.keys(level.user).forEach( (pieceKey) => {
    let piece = level.user[pieceKey];
    $("#game-pieces").append(`<li class="level-pieces"><img id="user-piece-${pieceKey}" src=${piece.img}></img></li>`)
  });
  $(".level-pieces").click( (e) => {
    e.target.classList.add("on-board");
    selectedPieceKey = e.target.id.substring(11); // Only want the pieceKey section of the li's id
    let piece = level.user[selectedPieceKey];
    selectionCtx.clearRect(0,0,24,24);
    drawPiece(pieces[piece.pieceValue].img, selectionCtx, 2, 2);
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
  $("#start-button").on("click", () => {
    $("#start-button").off("click");
    let goal = [level.goal.xVal, level.goal.yVal];
    let positions = [];
    level.preset.forEach( (piece) => {
      positions.push({xVal: piece.xVal, yVal: piece.yVal, xValPrev: null, yValPrev: null,
        img: pieces[piece.pieceValue].img,
        value: piece.pieceValue, vel: null});
    });
    values(level.user).forEach( (piece) => {
      if (piece.xVal) {
        positions.push({xVal: piece.xVal, yVal: piece.yVal, xValPrev: null, yValPrev: null,
          img: pieces[piece.pieceValue].img,
          value: piece.pieceValue, vel: null});
      }
    })
    gameInterval = setInterval( () => {
      runGame(ctx, level, positions);
    }, 200);
  });
  const resetButton = $("#reset-button")[0];

  resetButton.addEventListener("click", () => {
    $("#start-button").on("click", () => {
      $("#start-button").off("click");
      let goal = [level.goal.xVal, level.goal.yVal];
      let positions = [];
      level.preset.forEach( (piece) => {
        positions.push({xVal: piece.xVal, yVal: piece.yVal, xValPrev: null, yValPrev: null,
          img: pieces[piece.pieceValue].img,
          value: piece.pieceValue, vel: null});
      });
      values(level.user).forEach( (piece) => {
        if (piece.xVal) {
          positions.push({xVal: piece.xVal, yVal: piece.yVal, xValPrev: null, yValPrev: null,
            img: pieces[piece.pieceValue].img,
            value: piece.pieceValue, vel: null});
        }
      })
      gameInterval = setInterval( () => {
        runGame(ctx, level, positions);
      }, 200);
    });

    clearInterval(gameInterval);
    drawBoardInitial(ctx, level);
    selectionCtx.clearRect(2,2,20,20);
    $(".on-board").removeClass("on-board");
    values(level.user).forEach( (piece) => {
      piece.xVal = null;
      piece.yVal = null;
    });

  });
});
