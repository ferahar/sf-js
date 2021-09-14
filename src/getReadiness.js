import { fight } from "./fight";


export function getMaxBlockAllShips(typeShip) {
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

function getAllblockFleet(fleet) {
    return fleet.length > 2 ? fleet.reduce((counter,e)=>counter+e.length, 0) : 0;
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

function getPermPlay(data) {
    let fleet = data.fleet;
    let shipCountMax = getMaxCountShip(data.shipCount);
    let maxBlockAllShips = getMaxBlockAllShips(data.shipCount);
    let countAllblockFleet = getAllblockFleet(fleet);
    
    return ((fleet.length==shipCountMax)&&(maxBlockAllShips==countAllblockFleet));
}

function arenaFight(data) {
    let arena = document.getElementById(data.sf).querySelector(".sf_arena");
    arena.classList.add("sf_arena_fight");
}


export function getReadiness(data,obj) {
    let player = document.getElementById(data.player);
    let btn = document.getElementById(data.sf).querySelector(".btn");
    
    let fun = function () {
        obj.opponent.start();
        obj.player.cellsRemoveEvt();
        obj.player.fleetFixed();
        fight(obj.player, obj.opponent);
        player.removeEventListener('click', funActiveBtn);
        btn.removeEventListener('click',fun);
        btn.remove();
        arenaFight(data);
    }

    let funActiveBtn = function () {
        if (getPermPlay(data)) {
            btn.removeAttribute("disabled");
            btn.addEventListener('click',fun);
            
        } else {
            btn.setAttribute("disabled",true);
            btn.removeEventListener('click',fun)
        }
    }

    player.addEventListener('click', funActiveBtn);
}

