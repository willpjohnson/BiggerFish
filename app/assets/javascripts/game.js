import { values } from 'lodash';
import { drawPiece, drawWater } from './assorted_functions';
import pieces from './piece_objects';

const runGame = (ctx, level, positions) => {
  let victory = false;

  // Reestablish positions according to velocity
  positions.forEach( (pos) => {
    switch (pos.vel) {
      case "up":
        pos.xValPrev = pos.xVal;
        pos.yValPrev = pos.yVal;
        if (pos.yVal !== 40) pos.yVal -= 40;
        break;
      case "right":
        pos.xValPrev = pos.xVal;
        pos.yValPrev = pos.yVal;
        if (pos.xVal !== 360) pos.xVal += 40;
        break;
      case "down":
        pos.xValPrev = pos.xVal;
        pos.yValPrev = pos.yVal;
        if (pos.yVal !== 360) pos.yVal += 40;
        break;
      case "left":
        pos.xValPrev = pos.xVal;
        pos.yValPrev = pos.yVal;
        if (pos.xVal !== 40) pos.xVal -= 40;
        break;
      default:
        break;
    }
  });

  // Redraw Gameboard According to Block Coordinates
  positions.forEach( (pos) => {
    if (pos.xValPrev) drawWater(ctx, pos.xValPrev, pos.yValPrev);
    drawPiece(pos.img, ctx, pos.xVal, pos.yVal);

  });

  // Set New Velocities If Next To Scary Positions
  positions.forEach( (pos1) => {
    positions.forEach( (pos2) => {
      if (pos1 === pos2) return; // Skip to next iteration if pos1 is pos2
      if (pos1.value !== pos2.value - 1) return; // Skip to next iteration unless pos2 is scary to pos1
      if ((pos1.xVal === (pos2.xVal + 40)) && (pos1.yVal === pos2.yVal)) {
        pos1.vel = 'right';
      } else if ((pos1.xVal === (pos2.xVal - 40)) && (pos1.yVal === pos2.yVal)) {
        pos1.vel = 'left';
      } else if ((pos1.yVal === (pos2.yVal + 40)) && (pos1.xVal === pos2.xVal)) {
        pos1.vel = 'down';
      } else if ((pos1.yVal === (pos2.yVal - 40)) && (pos1.xVal === pos2.xVal)) {
        pos1.vel = 'up';
      }
    })
  })
};

export default runGame;
