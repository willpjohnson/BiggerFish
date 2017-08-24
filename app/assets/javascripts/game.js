import { values } from 'lodash';
import { drawPiece, drawWater } from './assorted_functions';
import pieces from './piece_objects';

const runGame = (ctx, level, gameInterval) => {
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
    // Reassign Block Coordinates According To Velocities
    positions.forEach( (pos) => {
      switch (pos.vel) {
        case "up":
          pos.xValPrev = pos.xVal;
          pos.yValPrev = pos.yVal;
          if (pos.yVal !== 20) pos.yVal -= 20;
          break;
        case "right":
          pos.xValPrev = pos.xVal;
          pos.yValPrev = pos.yVal;
          if (pos.xVal !== 400) pos.xVal += 20;
          break;
        case "down":
          pos.xValPrev = pos.xVal;
          pos.yValPrev = pos.yVal;
          if (pos.yVal !== 400) pos.yVal += 20;
          break;
        case "left":
          pos.xValPrev = pos.xVal;
          pos.yValPrev = pos.yVal;
          if (pos.xVal !== 20) pos.xVal -= 20;
          break;
        default:
          break;
      }
    });

    // Redraw Gameboard According to Block Coordinates
    // drawBoardGameplay(ctx, level);
    positions.forEach( (pos) => {
      if (pos.xValPrev) drawWater(ctx, pos.xValPrev, pos.yValPrev);
      drawPiece(pos.img, ctx, pos.xVal, pos.yVal);

    });

    // Set New Velocities If Next To Scary Positions
    positions.forEach( (pos1) => {
      positions.forEach( (pos2) => {
        if (pos1 === pos2) return; // Skip to next iteration if pos1 is pos2
        if (pos1.value !== pos2.value - 1) return; // Skip to next iteration unless pos2 is scary to pos1
        if ((pos1.xVal === (pos2.xVal + 20)) && (pos1.yVal === pos2.yVal)) {
          pos1.vel = 'right';
        } else if ((pos1.xVal === (pos2.xVal - 20)) && (pos1.yVal === pos2.yVal)) {
          pos1.vel = 'left';
        } else if ((pos1.yVal === (pos2.yVal + 20)) && (pos1.xVal === pos2.xVal)) {
          pos1.vel = 'down';
        } else if ((pos1.yVal === (pos2.yVal - 20)) && (pos1.xVal === pos2.xVal)) {
          pos1.vel = 'up';
        }
      })
    })
  }, 200)
};

export default runGame;
