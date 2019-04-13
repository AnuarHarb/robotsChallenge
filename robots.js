// Input: robots = [1, 2, 1, 2, 1, 1]
// Output: 1
//
// Input: robots = [3, 3, 3]
// Output: 5
//
// Input: robots = [3, 0, 3, 0, 3]
// Output: 9

function robot_attack(robots, shootCounter = 0) {
  const aliveRobotsCounter = getAliveRobots(robots).length;
  if(aliveRobotsCounter > 0) {
    const lowerTargetsPositions = getLowerTargetsPositions(robots);
    const lowerTargetsValues = getLowerTargetsValues(robots, lowerTargetsPositions);
    const bestTarget = getBestTarget(lowerTargetsValues);
    robots = shoot(robots, bestTarget);
    shootCounter += 1;
    return 1 + robot_attack(robots, shootCounter);
  } else {
    console.log('total shoots', shootCounter);
  }
}

function getAliveRobots(robots) {
  // Dead robots has 0 or lower value
  return robots.filter(robot => robot > 0);
}

function getLowerTargetsPositions(robots) {
  const aliveRobots = getAliveRobots(robots);
  const min = Math.min(...aliveRobots);

  const lowerTargetsPositions = [];
  for(let position in robots) {
    if(robots[position] === min) {
      lowerTargetsPositions.push(Number(position));
    }
  }
  return lowerTargetsPositions;
}

function getLowerTargetsValues(robots, lowerTargetsPositions) {
  const lowerTargetsValues = [];
  for(let position of lowerTargetsPositions) {
    let sideValue = [robots[position - 1], robots[position + 1]];
    sideValue = sideValue.map(( value ) => {
      if(value != undefined) {
        return value;
      } else {
        return 0;
      }
    });
    sideValue = sideValue[0] + sideValue[1];
    lowerTargetsValues.push({
      position: position,
      sideValue: sideValue,
      selfValue: robots[position]
    });
  }
  return lowerTargetsValues;
}

function getBestTarget(lowerTargetsValues) {
  const bestTarget = lowerTargetsValues.sort((a,b) => {
    if (a.sideValue < b.sideValue) {
      return 1;
    }
    if (a.sideValue > b.sideValue) {
      return -1;
    }
    return 0;
  });
  console.log('best target: ', bestTarget[0]);
  return bestTarget[0];
}

function shoot(robots, bestTarget) {
  // if(bestTarget === undefined) {
  //   return robots;
  // }
  robots[bestTarget.position] = bestTarget.selfValue - 1;
  if(robots[bestTarget.position] === 0) {
    if(robots[bestTarget.position - 1] != undefined) {
      robots[bestTarget.position - 1] = robots[bestTarget.position - 1] - 2;
    }
    if(robots[bestTarget.position + 1] != undefined) {
      robots[bestTarget.position + 1] = robots[bestTarget.position + 1] - 2;
    }
  }
  console.log('shoot',  robots);
  return robots;
}

// const robots = [1, 2, 1, 2, 1, 1];
const robots = [3, 3, 3];
// const robots = [0, 0, 0, 0, 0];
robot_attack(robots);
