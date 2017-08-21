const runGame = (ctx, level, position) => {
  let positions = [{xVal: position[0], yVal: position[1], color: "blue", value: 5, vel: null}];
  let values = {"blue": 5, "white": 4, "#3d677f": 3, "#b2721e": 2, "#d8ad00": 1};
  level.forEach( (block) => {
    positions.push({xVal: block[0], yVal: block[1], color: block[2], value: values[block[2]], vel: null});
  });
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
      ctx.fillStyle = pos.color;
      ctx.fillRect(pos.xVal, pos.yVal, 20, 20);
    });

    // Set New Velocities If Next To Scary Positions
    positions.forEach( (pos1) => {
      positions.forEach( (pos2) => {
        if (pos1 === pos2) return; // Skip to next iteration if pos1 is pos2
        if (pos1.value !== pos2.value - 1) return; // Skip to next iteration if pos2 isn't scary to pos1
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
