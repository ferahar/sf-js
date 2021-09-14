
function getMarginShip(ship) {
    const marginShip = [];
    ship.forEach(block => {
        marginShip.push(block);
        marginShip.push([block[0],block[1]+1]);
        marginShip.push([block[0],block[1]-1]);
        marginShip.push([block[0]+1,block[1]]);
        marginShip.push([block[0]-1,block[1]]);
        marginShip.push([block[0]+1,block[1]+1]);
        marginShip.push([block[0]-1,block[1]-1]);
        marginShip.push([block[0]+1,block[1]-1]);
        marginShip.push([block[0]-1,block[1]+1]);
    });
    
    return marginShip;
}

function intersectionShip(ship_1, ship_2) {
    
    return ship_1.findIndex(s1 => {
        return getMarginShip(ship_2).findIndex(s2 => {
            if ((s1[0]==s2[0])&&(s1[1]==s2[1])) return true;
            return false;
        })>-1;
    });
    
}

export function reviewShip(ship,fleet) {
    return fleet.findIndex(el => {
        if (intersectionShip(ship,el)>-1) return true;
        return false;
    })
}

export function reviewShip2(ship,fleet) {
    let counter = 0;

    fleet.forEach(shipB => {
        if (intersectionShip(ship,shipB)>-1) counter++;
    });

    return counter;
}