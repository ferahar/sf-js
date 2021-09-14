import { getRandom } from './getRandom';
import { createMessage } from "./createMessage";
import { showFrags } from "./showFrags";

export function counterAtack(data, opponent) {
  const square = data.square;
  let shot = data.shot;
  let rowName = data.row;
  let cellName = data.cell;
  let player = data.player;
  let n = square.length;
  let textLog = 'shot';
      
  let position = {
    y: getRandom(n),
    x: getRandom(n),
  };

  let rows = document.getElementById(player).getElementsByClassName(rowName);

  while (square[position.y][position.x]==1) {
    
    opponent.options.frags++;
    // showFrags(data, opponent.options);
    textLog = "I hit you!  SHOT: " + position.y + ':' + position.x + ' FRAGS: ' + opponent.options.frags ;
    createMessage('opponent', textLog, 'blue-grey darken-3');
    let cells = rows[position.y].getElementsByClassName(cellName);
    cells[position.x].classList.add(shot);
    position.y = getRandom(n);
    position.x = getRandom(n);
  }
  
  let cells = rows[position.y].getElementsByClassName(cellName);
  cells[position.x].classList.add('seaFight-strike');
  
  textLog = "Didn't hit the ship. SHOT: " + position.y + ':' + position.x;
  createMessage('opponent', textLog, 'blue-grey darken-1');
}