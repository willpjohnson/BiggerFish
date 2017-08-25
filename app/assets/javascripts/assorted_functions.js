import pieces from './piece_objects';

export const positionMover = (xPos, yPos, ctx, level) => {
  let xCell = Math.floor(xPos / 40) * 40;
  let yCell = Math.floor(yPos / 40) * 40;
  if (xCell >= 40 && xCell < 400 && yCell >= 40 && yCell < 400) {
    let returnValue = [xCell, yCell];
    level.preset.forEach( (block) => {
      if (block.xVal === xCell && block.yVal === yCell) returnValue = null;
    });
    return returnValue;
  } else {
    return null;
  }
};

export const drawPiece = (src, ctx, xVal, yVal) => {
  let img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, xVal, yVal);
  }
};

export const drawBorder = (ctx, level) => {
  let top = new Image();
  top.src = "app/assets/images/border/top.png";
  let topRight = new Image();
  topRight.src = "app/assets/images/border/top-right.png";
  let right = new Image();
  right.src = "app/assets/images/border/right.png";
  let bottomRight = new Image();
  bottomRight.src = "app/assets/images/border/bottom-right.png";
  let bottom = new Image();
  bottom.src = "app/assets/images/border/bottom.png";
  let bottomLeft = new Image();
  bottomLeft.src = "app/assets/images/border/bottom-left.png";
  let left = new Image();
  left.src = "app/assets/images/border/left.png";
  let topLeft = new Image();
  topLeft.src = "app/assets/images/border/top-left.png";
  let xGoal = level.goal.xVal;
  let yGoal = level.goal.yVal;
  let goal = new Image();
  goal.src = ((xGoal === 0 || xGoal === 400) ? "app/assets/images/goals/vertical.png" : "app/assets/images/goals/horizontal.png");
  top.onload = () => {
    [40,80,120,160,200,240,280,320,360].forEach( (coord) => {
      if ([xGoal, yGoal] === [coord, 0]) return;
      ctx.drawImage(top, coord, 0);
    });
  }
  topRight.onload = () => {
    ctx.drawImage(topRight, 400, 0);
  }
  right.onload = () => {
    [40,80,120,160,200,240,280,320,360].forEach( (coord) => {
      if ([xGoal, yGoal] === [400, coord]) return;
      ctx.drawImage(right, 400, coord);
    });
  }
  bottomRight.onload = () => {
    ctx.drawImage(bottomRight, 400, 400);
  }
  bottom.onload = () => {
    [40,80,120,160,200,240,280,320,360].forEach( (coord) => {
      if ([xGoal, yGoal] === [coord, 400]) return;
      ctx.drawImage(bottom, coord, 400);
    });
  }
  bottomLeft.onload = () => {
    ctx.drawImage(bottomLeft, 0, 400);
  }
  left.onload = () => {
    [40,80,120,160,200,240,280,320,360].forEach( (coord) => {
      if ([xGoal, yGoal] === [0, coord]) return;
      ctx.drawImage(left, 0, coord);
    });
  }
  topLeft.onload = () => {
    ctx.drawImage(topLeft, 0, 0);

  }

  goal.onload = () => {
    ctx.drawImage(goal, xGoal, yGoal);
  }
}

export const drawBoardInitial = (ctx, level) => {
  let ocean = new Image();
  ocean.src = "app/assets/images/ocean.png";
  ocean.onload = () => {
    [40,80,120,160,200,240,280,320,360].forEach( (x) => {
      [40,80,120,160,200,240,280,320,360].forEach( (y) => {
        ctx.drawImage(ocean, x, y);
      });
    });

    drawBorder(ctx, level);

    level.preset.forEach( (preset) => {
      let piece = pieces[preset.pieceValue];
      drawPiece(piece.img, ctx, preset.xVal, preset.yVal);
    });
  }
}

export const drawWater = (ctx, xVal, yVal) => {
  let img = new Image();
  img.src = "app/assets/images/ocean.png";
  img.onload = () => {
    ctx.drawImage(img, xVal, yVal);
  }
}
