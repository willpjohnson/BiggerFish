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
