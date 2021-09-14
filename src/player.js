import { renderSquare } from './renderSquare';
import { buildSquare } from './buildSquare';
import { counterAtack } from './counterAtack';

import { buildFleetPlayer } from './buildFleetPlayer';
import { initiateShipMove } from './shipMove';
import { initiateShipMoveTouch } from './shipMoveTouch';
import { arenaTouch } from './arenaTouch';

import { buildFleet } from './buildFleet';
import { fleetRender } from './fleetRender';
import { aponent } from './name';



export class Player {

  constructor(data) {
      
    if (!data) data = {};
    
    this.options = {
      square: buildSquare(data.squareCount),
      fleet: [],
      sf: data.sf,
      arenaName: data.arenaName,
      player: data.player,
      row: data.row,
      cell: data.cell,
      position: data.position,
      opponent: data.opponent,
      shot: data.shot,
      edit: data.edit,
      block: data.block,
      profile: data.profile,
      shipCount: data.shipCount,
      startbtn: data.startbtn,
      stopMove: true,
      frags: 0
    }
      
  }
    
  start() {
    // renderSquare(this.options, buildFleetPlayer);
    // auto build fleet
    // renderSquare(this.options, buildFleet);
    // fleetRender(this);
    
    // custom build fleet
    renderSquare(this.options, buildFleetPlayer);
    initiateShipMove(this.options);
    initiateShipMoveTouch(this.options);
    arenaTouch(this.options);
    
  }

  cellsRemoveEvt(){
    document.getElementById(this.options.player).removeEventListener('click', this.options.fun);
    document.getElementById(this.options.player).removeEventListener('mousedown', this.options.funMove);
    document.getElementById(this.options.player).removeEventListener('touchstart', this.options.funTouch);
    
  }

  fleetFixed(){
    fleetRender(this);
  }

  strike(apponent) {
    counterAtack(this.options,apponent);
  }
             
}

