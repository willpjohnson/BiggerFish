import pieces from './piece_objects';

export const positionMover = (xPos, yPos, ctx, level) => {
  let xCell = Math.floor(xPos / 20) * 20;
  let yCell = Math.floor(yPos / 20) * 20;
  if (xCell >= 20 && xCell < 420 && yCell >= 20 && yCell < 420) {
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
  goal.src = ((xGoal === 0 || xGoal === 420) ? "app/assets/images/goals/vertical.png" : "app/assets/images/goals/horizontal.png");
  top.onload = () => {
    [20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].forEach( (coord) => {
      if ([xGoal, yGoal] === [coord, 0]) return;
      ctx.drawImage(top, coord, 0);
    });
  }
  topRight.onload = () => {
    ctx.drawImage(topRight, 420, 0);
  }
  right.onload = () => {
    [20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].forEach( (coord) => {
      if ([xGoal, yGoal] === [420, coord]) return;
      ctx.drawImage(right, 420, coord);
    });
  }
  bottomRight.onload = () => {
    ctx.drawImage(bottomRight, 420, 420);
  }
  bottom.onload = () => {
    [20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].forEach( (coord) => {
      if ([xGoal, yGoal] === [coord, 420]) return;
      ctx.drawImage(bottom, coord, 420);
    });
  }
  bottomLeft.onload = () => {
    ctx.drawImage(bottomLeft, 0, 420);
  }
  left.onload = () => {
    [20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].forEach( (coord) => {
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
    [20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].forEach( (x) => {
      [20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].forEach( (y) => {
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
