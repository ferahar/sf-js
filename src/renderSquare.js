// ...
import * as params from './name';

export function renderSquare(options, service) {

    let n = options.square.length;
    let arenaName = "."+options.arenaName
    let box = document.createElement("div");
    box.id = options.player;
    // box.id = boxName;

    for (let i = 0; i < n; i++) {
        let row = document.createElement("div");
        row.className = params.row;
        for (let j = 0; j < n; j++) {
            let cell = document.createElement("div");
            cell.classList.add(params.cell);
            cell.setAttribute(params.position, i+","+j);      
            row.appendChild(cell);
        }
        box.appendChild(row);
    }

    let target = document.querySelector(arenaName);
    
    if (target) {
        target.appendChild(box);
        service(options);
        return true;
    };

    return false;
}