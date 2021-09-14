import { renderSquare } from './renderSquare';
import { buildFleet } from './buildFleet';
import { buildSquare } from './buildSquare';
import { getPosition } from "./getPosition";
import { createMessage } from "./createMessage";
import { showFrags } from "./showFrags";


export class Opponent {

    constructor(data) {

        if (!data) data = {};

        this.options = {
            square: buildSquare(data.squareCount),
            fleet: [],
            frags: 0,
            sf: data.sf,
            arenaName: data.arenaName,
            player: data.opponent,
            cell: data.cell,
            position: data.position,
            shot: data.shot,
            shipCount: data.shipCount,
        }
        
      }
    
    start() {
      renderSquare(this.options, buildFleet);
      
    }

  strike(target, player) {
        
    const square = this.options.square;
    let textLog = "Shot";
    let shot = this.options.shot, 
        posit = this.options.position;
    
    let position = getPosition(target.getAttribute(posit));
    if (square[position.y][position.x]==1) {
        target.classList.add(shot);
        player.options.frags++;
        // showFrags(player.options, this.options);
        return false;
        
    } else {
      target.classList.add('seaFight-strike');
    }
    
    textLog = "Didn't hit the ship. SHOT: " + position.y + ':' + position.x;
    return true;
      
  }
             
}

