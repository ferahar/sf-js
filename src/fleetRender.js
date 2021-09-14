import { buildFleetPlayer } from './buildFleetPlayer';

export function fleetRender2(player) {
    
    const fleet = player.options.fleet;
    let rowName = player.options.row;
    let cellName = player.options.cell;
    let edit = player.options.edit;
    
    let rows = document.getElementById(player.options.player).getElementsByClassName(rowName);
    
    fleet.forEach(ship => {
        ship.forEach(block => {
            let cells = rows[block[0]].getElementsByClassName(cellName);
            cells[block[1]].classList.add(edit);
        });
    });
    buildFleetPlayer(player.options);
}

export function fleetRender(player) {
    
    let cellName = player.options.cell;
    let playerTag = document.getElementById(player.options.player);
    let cells = playerTag.getElementsByClassName(cellName);
    
    for (let index = 0; index < cells.length; index++) {
        cells[index].classList.add('sf_fixed');
    }

}


