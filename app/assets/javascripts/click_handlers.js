export const positionMover = (xPos, yPos, ctx, level) => {
  let xCell = Math.floor(xPos / 20) * 20;
  let yCell = Math.floor(yPos / 20) * 20;
  if (xCell >= 20 && xCell < 420 && yCell >= 20 && yCell < 420) {
    let returnValue = [xCell, yCell];
    level.forEach( (block) => {
      if (block[0] === xCell && block[1] === yCell) returnValue = null;
    });
    return returnValue;
  } else {
    return null;
  }
}
