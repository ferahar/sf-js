
import {getPosition} from "./getPosition";
import { reviewShip, reviewShip2 } from "./reviewShip";


function getShip(data, position) {
    const fleet = data.fleet;

    for (let index = 0; index < fleet.length; index++) {
        const ship = fleet[index];
        for (let index2 = 0; index2 < ship.length; index2++) {
            const block = ship[index2];
            if ((block[0]==position.y)&&(block[1]==position.x)) {
                return ship;
            }
        }   
    }
    return false;
}


function shipClone(e,data,ship) {
    
    let player = document.getElementById(data.player);
    const shipClones = [];
    const positionsShipBlock = [];
    let rowName = data.row;
    let cellName = data.cell;

    let rows = player.getElementsByClassName(rowName);

    ship.forEach(block => {
        let cells = rows[block[0]].getElementsByClassName(cellName);
        let cell = cells[block[1]];

        let positionBlock = {y:0, x:0};
        positionBlock.y = e.pageY - player.offsetTop - cell.offsetTop;
        positionBlock.x = e.pageX - player.offsetLeft - cell.offsetLeft;
        positionsShipBlock.push(positionBlock);

        let cloneCell = cell.cloneNode(true);
        cloneCell.style.position = 'absolute';
        cloneCell.style.left = cell.offsetLeft +'px';
        cloneCell.style.top = cell.offsetTop +'px';
        cloneCell.className = 'seaFight-move';
        
        player.appendChild(cloneCell);
        shipClones.push({
            ship:cloneCell,
            block:positionBlock
        });

    });
    return shipClones;
}


function shipMove(e,data,shipClone) {
    let player = document.getElementById(data.player);
    for (let index = 0; index < shipClone.length; index++) {
        let ship = shipClone[index].ship;
        let blokPosition = shipClone[index].block;
        ship.style.left = e.pageX - player.offsetLeft - blokPosition.x +'px';
        ship.style.top = e.pageY - player.offsetTop - blokPosition.y +'px';
    }
    data.stopMove = false;
}


function shipClonesRemove(data,ships) {
    let player = document.getElementById(data.player);
    ships.forEach(block => {
        player.removeChild(block.ship);
        // block.ship.remove();
    });
    ships = [];
}


function shipLocation(e,data,ship,positionStart){
    
    let rowName = data.row;
    let cellName = data.cell;
    let edit = data.edit;
    const square = data.square;
    let cell = e.target;
    let position = getPosition(cell.getAttribute(data.position));
    let rows = document.getElementById(data.player).getElementsByClassName(rowName);
    let withinSquare = true;
    let shipDuble = [];
    ship.forEach(block => shipDuble.push(block.slice()));
    
    shipDuble.forEach(block => {
        block[0] = block[0] - positionStart.y + position.y;
        block[1] = block[1] - positionStart.x + position.x;
        if (
            (block[0]<0)||(block[1]<0)||(block[0]>square.length-1)||(block[1]>square.length-1)
            ) withinSquare = false;
    });

    let ifOne = withinSquare && (
            (   reviewShip(shipDuble, data.fleet)==-1)||
            (   (reviewShip(shipDuble, data.fleet)==reviewShip(ship, data.fleet))&&
                (reviewShip2(shipDuble, data.fleet)==1)
            )
    );
    
    if (ifOne) {
        ship.forEach(block => {
            let rowNumber = block[0] - positionStart.y + position.y;
            let cellNumber = block[1] - positionStart.x + position.x;
            let cells = rows[rowNumber].getElementsByClassName(cellName);
            
            square[block[0]][block[1]] = 0;
            cells[cellNumber].classList.add(edit);
            block[0] = rowNumber;
            block[1] = cellNumber;
            square[rowNumber][cellNumber] = 1;
        });
        
    } else {
        ship.forEach(block => {
            rows[block[0]].getElementsByClassName(cellName)[block[1]].classList.add(edit);
            
        });
    };
}


function shipTrace(data, ship) {
    let rowName = data.row;
    let cellName = data.cell;
    let edit = data.edit;
    let rows = document.getElementById(data.player).getElementsByClassName(rowName);
    
    ship.forEach(block => {
        rows[block[0]].getElementsByClassName(cellName)[block[1]].classList.remove(edit);
        // rows[block[0]].getElementsByClassName(cellName)[block[1]].classList.add(profile);
    });
    return false;
}

export function initiateShipMove(data) {
    let player = document.getElementById(data.player);
    let funMousedown = function (e) {
        let cell = e.target;
        let position = getPosition(cell.getAttribute(data.position));
        let cloneShip, ship;
        let move = true;

        function funMove(e) {
            shipMove(e, data, cloneShip);
            if (move) move = shipTrace(data, ship);
        }

        function funMouseUp(e){
            shipClonesRemove(data,cloneShip);
            shipLocation(e,data,ship,position)
            player.removeEventListener('mousemove', funMove);
            player.removeEventListener('mouseup', funMouseUp);
            player.removeAttribute("onselectstart");
        }

        if (cell.classList.contains(data.edit)) {
            ship = getShip(data, position);
            cloneShip = shipClone(e,data,ship);
            player.addEventListener('mousemove', funMove);
            player.addEventListener('mouseup', funMouseUp);
            player.setAttribute("onselectstart", "return false");
        }
    };

    player.addEventListener('mousedown', funMousedown);
    data.funMove = funMousedown;
    
}