import { getRandom } from './getRandom';
import { createShip } from "./createShip";
import { reviewShip, reviewShip2 } from "./reviewShip";


function prepareShip(ship, square) {
    
    let n = square.length - ship.length;
    let x = getRandom(n);
    let y = getRandom(n);
    let shipBuf = [];
    ship.forEach(e => {
        shipBuf.push([e[0] + y, e[1] + x]);
    });
    return shipBuf;
}

function sendShip(ship, square) {  
    
    ship.forEach(e => {  
        square[e[0]][e[1]] = 1;
    });
}


export function buildFleet(options) {
    
    const shipCount = options.shipCount;
    const square = options.square;
    const fleet = options.fleet;
    
    for (let count = shipCount; count > 0; count--) {
        for (let element = 0; element < shipCount-count+1; element++) {
            let ship;
            do {
                ship = prepareShip(createShip(count),square);
            } while (reviewShip2(ship, fleet)>0);
            fleet.push(ship);
            sendShip(ship, square);    
        }
    }
    console.log(square);
    // console.log(fleet);
    return fleet;
}