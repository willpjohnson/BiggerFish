import { values } from 'lodash';
import { drawPiece } from './assorted_functions';
import pieces from './piece_objects';

const runGame = (ctx, level) => {
  let positions = [];
  level.preset.forEach( (piece) => {
    positions.push({xVal: piece.xVal, yVal: piece.yVal, img: pieces[piece.pieceValue].img,
      value: piece.pieceValue, vel: null});
  });
  values(level.user).forEach( (piece) => {
    positions.push({xVal: piece.xVal, yVal: piece.yVal, img: pieces[piece.pieceValue].img,
      value: piece.pieceValue, vel: null});
  })

  let gameInterval = setInterval( () => {
    // Reassign Block Coordinates According To Velocities
    positions.forEach( (pos) => {
      switch (pos.vel) {
        case "up":
          pos.yVal -= 20;
          break;
        case "right":
          pos.xVal += 20;
          break;
        case "down":
          pos.yVal += 20;
          break;
        case "left":
          pos.xVal -= 20;
          break;
        default:
          break;
      }
    });

    // Redraw Gameboard According to Block Coordinates
    ctx.fillStyle = '#75aec6';
    ctx.fillRect(0,0,440,440);
    positions.forEach( (pos) => {
      // ctx.fillStyle = pos.color;
      // ctx.fillRect(pos.xVal, pos.yVal, 20, 20);
      drawPiece(pos.img, ctx, pos.xVal, pos.yVal);
    });
    ctx.fillStyle = 'black';
    ctx.fillRect(level.goal.xVal, level.goal.yVal, 20, 20);

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
