import { merge, values, keys } from 'lodash';
import { positionMover, drawBoardInitial, drawPiece, drawWater } from './app/assets/javascripts/assorted_functions';
import runGame from './app/assets/javascripts/game';
import pieces from './app/assets/javascripts/piece_objects';
import level1 from './app/assets/javascripts/levels/level1';
import level2 from './app/assets/javascripts/levels/level2';
import level3 from './app/assets/javascripts/levels/level3';

document.addEventListener("DOMContentLoaded", () => {
  let origLevels = [level1, level2, level3];
  let levels = [];
  origLevels.forEach( (level) => {
    levels.push(merge({}, level));
  });
  let levelIndex = 0;

  let levelSetup = (level) => {
    $("#level-header").html(`Level ${level.levelNum}`); //Add Level Header to Level Div
    let selectedPieceKey = null; //Establish dummy Selected Piece
    $("#game-board").replaceWith($('#game-board').clone());
    $("#game-pieces").replaceWith($('#game-pieces').clone());
    let board = $("#game-board")[0];
    let ctx = board.getContext('2d'); //Establish board ctx
    let userPiecesCanvas = $("#game-pieces")[0];
    let userPiecesCtx = userPiecesCanvas.getContext('2d');
    let levelGoalCanvas = $("#level-goal-piece")[0];
    let levelGoalCtx = levelGoalCanvas.getContext('2d');
    levelGoalCtx.clearRect(0,0,44,44);
    drawPiece(level.catch.img, levelGoalCtx, 2, 2);
    drawBoardInitial(ctx, level);
    // $("#level-goal-piece").empty().append(`<img class="level-goal-piece" src=${level.catch.img}>`);
    let gameInterval; //Establish dummy gameInterval

    // Add User Pieces to User Area
    userPiecesCtx.clearRect(0,0,44,420);
    let xPos = 0;
    Object.keys(level.user).forEach( (pieceKey) => {
      let piece = level.user[pieceKey]
      drawPiece(piece.img, userPiecesCtx, xPos, 0);
      xPos += 45;
    });

    // Add Drag Handler to User Pieces
    userPiecesCanvas.addEventListener("mousedown", (drag) => {
      let pos = userPiecesCanvas.getBoundingClientRect();
      selectedPieceKey = Math.ceil((drag.x - pos.left) / 45);
      $("body").addClass(`cursor-${level.user[selectedPieceKey].name}`);
    })

    // Add Drop Handler to Board
    board.addEventListener("mouseup", (drag) => {
      let pos = board.getBoundingClientRect();
      let cell = positionMover(drag.x - pos.left, drag.y - pos.top, ctx, level);
      if (cell) {
        let pieceObject = level.user[selectedPieceKey];
        let pieceValue = pieceObject.pieceValue;
        if (pieceObject.xVal) drawWater(ctx, pieceObject.xVal, pieceObject.yVal);
        drawPiece(pieces[pieceValue].img, ctx, cell[0], cell[1]);
        pieceObject.xVal = cell[0];
        pieceObject.yVal = cell[1];
        $("body").removeClass(`cursor-${level.user[selectedPieceKey].name}`);
        selectedPieceKey = null;
      }
    })

    // Add Click Handlers to Buttons
    $("#start-button").on("click", () => {
      $("#start-button").off("click");
      let goal = [level.goal.xVal, level.goal.yVal, level.catch.value];
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
        let victory = runGame(ctx, positions, goal);
        if (victory) {
          clearInterval(gameInterval);
          $("#board-cover").removeClass("hidden");
        }
      }, 200);
    });

    $("#reset-button").on("click", () => {
      clearInterval(gameInterval);
      levelSetup(levels[levelIndex])
    });
  }
  // Establish Next Level Button Upon Level Completion
  $("#next-level").on("click", () => {
    levelIndex += 1
    levelSetup(levels[levelIndex])
    $("#board-cover").addClass("hidden");
  });

  levelSetup(levels[levelIndex]);
});
