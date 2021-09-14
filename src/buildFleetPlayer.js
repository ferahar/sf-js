import {getPosition} from "./getPosition";
 
// look for a ship in sight
function radar(options, y, x) {
    
    const square = options.square;
    const fleet = options.fleet;

    let yTop = (y==0) ? 0: y-1;
    let yDown = (y==square.length-1) ? square.length-1: y+1;
    let xLeft = (x==0) ? 0: x-1;
    let xRight = (x==square.length-1) ? square.length-1: x+1;
    const challengers = [];

    for (let i = yTop; i <= yDown; i++) {
        for (let j = xLeft; j <= xRight; j++) {
            if (square[i][j]==1) challengers.push([i,j])
        }
    }

    let radiusX = 
        (square[yTop][x] == 1)||
        (square[yDown][x] == 1)||
        (square[y][xLeft] == 1)||
        (square[y][xRight] == 1);
    
    for (let i = 0; i < fleet.length; i++) {
        const ship = fleet[i];
        if (composition(challengers,ship)&&radiusX) {
            return ship;
        } 
    }
    return false;
}

// compare, check for entry into the ship
function composition(challengers, ship) {
    
    if (challengers.length==0) return false;

    let counter = 0;

    challengers.forEach(challenger => {
        ship.forEach( element => {
            if ( (challenger[0]==element[0])&&(challenger[1]==element[1]) ) {counter++};
        });
    });
    
    return (counter==challengers.length) ? true : false;
}

// if only one a ship
function one(options, y,x) {
    
    const square = options.square;
    // console.log("sq",square);
    

    let yStart = (y==0) ? 0: y-1;
    let yEnd = (y==square.length-1) ? square.length-1: y+1;
    let xStart = (x==0) ? 0: x-1;
    let xEnd = (x==square.length-1) ? square.length-1: x+1;

    let radius = [];

    for (let i = yStart; i <= yEnd; i++) {
        for (let j = xStart; j <= xEnd; j++) {
            radius.push(square[i][j])
        }
    }
    
    return radius.reduce((count, e)=>count+e)==0 ? true: false
    
}

// get the ship fleet
function getShip(options, y,x) {
    
    const fleet = options.fleet;
    let shipBuf = {};
    
    fleet.forEach((ship, indexFleet) => {
        ship.forEach((block, indexShip) => {
            
            if ((block[0]==y)&&(block[1]==x)) {
                shipBuf.ship = ship;
                shipBuf.indexShip = indexShip;
                shipBuf.indexFleet = indexFleet;
                
            }
        });
    });

    return shipBuf;
}

// check for edit
function blockShipEditable(options, y, x){

    const square = options.square;
    
    let top,bottom,left,right,topLeft,topRight, bottomLeft, bottomRight;
    
    if ((y==0)&&(x>0)&&(x<square.length-1)) {
        top = 0; 
        topLeft = 0;
        topRight = 0;
        right = square[y][x+1];
        left = square[y][x-1];
    } else if ((x>0)&&(x<square.length-1)) {
        top = square[y-1][x];
        topLeft = square[y-1][x-1];
        topRight = square[y-1][x+1];
    };
    
    if ((y==square.length-1)&&(x>0)&&(x<square.length-1)) {
        bottom = 0;
        bottomLeft = 0;
        bottomRight = 0;
        right = square[y][x+1];
        left = square[y][x-1];
    } else if ((x>0)&&(x<square.length-1)) {
        bottom = square[y+1][x];
        bottomLeft = square[y+1][x-1];
        bottomRight = square[y+1][x+1];
    }; 

    if ((x==0)&&(y>0)&&(y<square.length-1)) {
        left = 0;
        topLeft = 0;
        bottomLeft = 0;
        top = square[y-1][x];
        bottom = square[y+1][x];
    } else if ((y>0)&&(y<square.length-1)) {
        left = square[y][x-1];
        topLeft = square[y-1][x-1];
        bottomLeft = square[y+1][x-1];
    };
    
    if ((x==square.length-1)&&(y>0)&&(y<square.length-1)) {
        right = 0;
        topRight = 0;
        bottomRight = 0;
        top = square[y-1][x];
        bottom = square[y+1][x];
    } else if ((y>0)&&(y<square.length-1)) {
        right = square[y][x+1];
        topRight = square[y-1][x+1];
        bottomRight = square[y+1][x+1];
    };
    //TopLeft
    if ((y==0)&&(x==0)) {
        topLeft = 0;
        topRight = 0;
        bottomLeft = 0;
        top = 0;
        left = 0;
        right = square[y][x+1];
        bottom = square[y+1][x];
        bottomRight = square[y+1][x+1];
    }
    //topRight
    if ((y==0)&&(x==square.length-1)) {
        topLeft = 0;
        topRight = 0;
        bottomLeft = square[y+1][x-1];
        top = 0;
        left = square[y][x-1];
        right = 0;
        bottom = square[y+1][x];
        bottomRight = 0;
    }
    //bottomLeft
    if ((y==square.length-1)&&(x==0)) {
        topLeft = 0;
        top = square[y-1][x];
        topRight = square[y-1][x+1];
        right = square[y][x+1];
        bottomRight = 0;
        bottom = 0;
        bottomLeft = 0;
        left = 0;
    }
    //bottomRight
    if ((y==square.length-1)&&(x==square.length-1)) {
        topLeft = square[y-1][x-1];
        top = square[y-1][x];
        topRight = 0;
        right = 0;
        bottomRight = 0;
        bottom = 0;
        bottomLeft = 0;
        left = square[y][x-1];
    }
    
    let checkA = ( ( (left==1)&&(top==1)&&(topLeft==0) ) && ((right==0)&&(bottom==0)&&(bottomRight==0)) )||
    ( ( (right==1)&&(top==1)&&(topRight==0) ) && ((left==0)&&(bottom==0)&&(bottomLeft==0)) )||
    ( ( (right==1)&&(bottom==1)&&(bottomRight==0) ) && ((left==0)&&(top==0)&&(topLeft==0)) )||
    ( ( (left==1)&&(bottom==1)&&(bottomLeft==0) ) && ((right==0)&&(top==0)&&(topRight==0)) );

    let checkB = (
        ( (left == 1) && (right == 1) && ((top == 0 ) || (bottom == 0)) ) ||
        ( ((left == 0) || (right == 0)) && (top == 1 ) && (bottom == 1) ) ||
        ( (left == 1) && (right == 1) && (top == 1 ) && (bottom == 1) )
    );
    
    return  checkA || checkB;
            
}

// check for add a ship
function fleetInspection(options, targetShip) {
    
    const fleet = options.fleet;
    let blockCount = 0;
    let counterShip = 0;
    let max = options.shipCount;
    let blockMax = getMaxBlockAllShips(max);
    const boxFleet = [];
    let shipType = targetShip.length;
    
    for (let i = shipType; i < max; i++) {
        for (let j = i; j < max; j++) {
            counterShip++;
        }
    }

    for (let index = 0; index < max; index++) {
        boxFleet[index] = 0;
        fleet.forEach(ship => {
            if (ship.length >= index+1) {
                boxFleet[index]++;
            }
        })
    }

    fleet.forEach(ship => {
        ship.forEach(() => blockCount++)
    });

    return  (boxFleet[shipType] < counterShip)&&
            (blockCount <= blockMax);

}

function getMaxBlockAllShips(typeShip) {

    let blockMax = 0;

    for (let i = 0; i <= typeShip; i++) {
        let buf = 0;
        for (let j = i; j <= typeShip; j++) {
            buf++;
        }
        blockMax = blockMax + buf*i;
    }

    return blockMax;
}

function getMaxCountShip(max) {

    let counter = 0;

    for (let i = 0; i < max; i++) {
        for (let j = i; j < max; j++) {
            counter++;
        }
    }

    return counter;
}

function editShipPlayer(options, cell) {

    const fleet = options.fleet;
    let edit = options.edit;
    let square = options.square;
    let shipCountMax = getMaxCountShip(options.shipCount);
    let position = getPosition(cell.getAttribute(options.position));
    
    if (square[position.y][position.x] == 0) {
        
        const ship = radar(options, position.y, position.x);
        const oneShip = one(options,position.y, position.x);
        const flin = fleetInspection(options,ship);
        
        if (ship&&flin) {
            cell.classList.add(edit);
            square[position.y][position.x] = 1;
            ship.push([position.y, position.x]);
        } 
        
        if (oneShip&&(fleet.length<shipCountMax)) {
            cell.classList.add(edit);
            square[position.y][position.x] = 1;
            fleet.push([[position.y, position.x]]);
        }
    } 
}

function removeShipPlayer(options, cell) {

    const fleet = options.fleet;
    let edit = options.edit;
    let square = options.square;
    let position = getPosition(cell.getAttribute(options.position));
        
    if(!blockShipEditable(options, position.y, position.x)) {
        
        let target = getShip(options, position.y, position.x);

        cell.classList.remove(edit);
        square[position.y][position.x] = 0;
        
        
        if (target.ship.length==1) {
            fleet.splice(target.indexFleet,1);
        } else {
            target.ship.splice(target.indexShip,1);
        }

        event.preventDefault();
    }
    
    
}


export function buildFleetPlayer(data) {

    let player = document.getElementById(data.player);

    let funClick = function (e) {
        let cell = e.target;
        if (cell.classList.contains(data.edit)) {
            removeShipPlayer(data, cell);
        } else if (cell.classList.contains(data.cell)) {
            editShipPlayer(data, cell);  
        }
    };
    
    player.addEventListener('click', funClick);    
    data.fun = funClick;
    
}