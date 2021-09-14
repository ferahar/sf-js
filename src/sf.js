"use strict"

import { Opponent } from './opponent';
import { Player } from './player';
import { getReadiness } from "./getReadiness";
import * as params from './name';

const sf = params.sf;
const arenaName = params.arenaName;
const toolsName = params.toolsName;
const player = params.player;
const opponent = params.opponent;
const row = params.row;
const cell = params.cell;
const shot = params.shot;
const edit = params.edit;
const block = params.block;
const profile = params.profile;
const shipCount = params.shipCount;
const position = params.position;

class Sf {
    
    constructor(data) {
        
        if (!data) data = {};
        
        this.options = {
          squareCount: !!data.squareCount ? data.squareCount : params.squareCount,
          shipCount: !!data.shipCount ? data.shipCount : shipCount,
          sf: !!data.sf ? data.sf : sf,
          arenaName: arenaName,
          toolsName: toolsName,
          player: player,
          opponent: opponent,
          row: row,
          position: position,
          cell: cell,
          shot: shot,
          edit: edit,
          block: block,
          profile: profile
        }

        this.opponent = new Opponent(this.options);
        this.player = new Player(this.options);
         
    }

    createSections() {
        let content = document.createElement("div");
        content.className = 'sf_content';

        let arena = document.createElement("div");
        arena.className = this.options.arenaName;
        content.appendChild(arena);

        let tools = document.createElement("div");
        tools.className = this.options.toolsName;
        content.appendChild(tools);
        
        let score = document.createElement("h5");
        score.className = "hide";
        tools.appendChild(score);
        
        let loger = document.createElement("div");
        loger.className = params.log +" "+ params.logStyle+ " "+"hide";
        
        let btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = "Fight";
        btn.setAttribute("disabled", true);
        tools.appendChild(btn);
        
        let target = document.getElementById(this.options.sf);
        
        if (target) {
            target.appendChild(content);
            // target.appendChild(arena);
            // target.appendChild(tools);
            target.appendChild(loger);
            
            // this.startbtn = btn;
            return true;    
        }
        return false;
        
    }

    start() {
        if (this.createSections()) {
            // this.aponent.start();
            this.player.start();
            getReadiness(this.player.options, this);
            
        } else {
            console.log("something is wrong");
        }

        
    }
}


export function sfStart(data) {
    let sf = new Sf(data);
    sf.start();
}
