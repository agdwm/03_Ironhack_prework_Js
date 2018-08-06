class Robot {

	constructor(direction, y, x, travelLog) {
		this.direction = direction;
		this.y = y;
		this.x = x;
		this.travelLog = travelLog;
	}

	getVal (attr) {
		return this[attr];
	}

	setVal (attr, val) {
		if (Number.isInteger(val)) {
			if (val < 0) {
				this[attr] -= val;
				return;
			}
			this[attr] += val;
			return;
		}
		this[attr] = val;
		return;
	}

	updateTravelLog () {
		this.travelLog.push([this.y, this.x]);
		return;
	}
};

const grid = {
	matrix: [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	updateMatrix(robotName) {
		const position = this.matrix[robotName.y][robotName.x];
		if (position === 1) {
			this.matrix[robotName.y][robotName.x] = 0;
			return;
		}
		return;
	}
};

const right = {
	N: 'E',
	W: 'N',
	S: 'W',
	E: 'S'
};

const left = {
	N: 'W',
	W: 'S',
	S: 'E',
	E: 'N'
};

// Turn the robot to 'left' or 'right' depending on the param 'turnDir'
function turn (robotName, dir, turnDir) {
	robotName.setVal(dir, turnDir[robotName.getVal(dir)]);
	return;
} 

function moveForward (robotName) {
	const dirVal = robotName.getVal('direction');
	const posY = robotName.getVal('y'); 
	const posX = robotName.getVal('x');
	let coordinate = null;

	if (dirVal === 'N' || dirVal === 'S')  coordinate = 'y'
	else coordinate = 'x';

	switch(dirVal) {
		case 'N':
			if (posY > 0) {
				robotName.setVal(coordinate, -1);
			}else{
				return true;
			}
			break;
		case 'S':
			if (posY < grid.matrix.length) {         
				robotName.setVal(coordinate, 1);
			}else{
				return true;
			}
			break;
		case 'E':
			if (posX < grid.matrix[0].length) {         
				robotName.setVal(coordinate, 1);
			}else{
				return true;
			}
			break;
		case 'W':
			if (posX > 0) {                  
				robotName.setVal(coordinate, -1);
			}else{
				return true;
			}
			break;
	}
}

function move(commandsList, robotName) {
	const commandsAllowed = ['L', 'R', 'F'];
	const commandsListArr = commandsList.toUpperCase().split('');
	const dir = 'direction';
	let i;
	
	for (i = 0; i < commandsListArr.length; i++) {
		if(commandsAllowed.includes(commandsListArr[i])) {
			let turDir = null;
			switch (commandsListArr[i]) {
				case 'L':
					turDir = left;
					turn(robotName, dir, turDir);
					break;
				case 'R':
					turDir = right;
					turn(robotName, dir, turDir);
					break;
				case 'F':
					if(!moveForward(robotName)) {
						grid.updateMatrix(robotName);                
						robotName.updateTravelLog();
					}else{
						console.log('Out of the grid');
						i = commandsListArr.length;
					}
					break;
			}
		}else{
			console.log(`${commandsListArr[i]}: Command not allowed!`);
		}
	}
	return;
}

const rover = new Robot('N', 0, 0, []);

grid.updateMatrix(rover);
rover.updateTravelLog();

move('rffrfflfrff', rover);
console.log(grid);