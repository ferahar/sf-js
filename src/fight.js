import { showFrags } from "./showFrags";
import { getMaxBlockAllShips } from "./getReadiness";

export function fight(player, opponent) {
    
    let maxBlockAllShips = getMaxBlockAllShips(player.options.shipCount);
    let playerElement = document.getElementById(opponent.options.player);

    let fun = function (e) {
        let cell = e.target;
        if (cell.classList.contains(opponent.options.cell)) {
            if ( opponent.strike(cell,player) ) {
                playerElement.removeEventListener('click', fun);
                player.strike(opponent);
                // setTimeout(()=> player.strike(opponent), 1000);
                // setTimeout(()=> playerElement.addEventListener('click', fun), 2000);
                playerElement.addEventListener('click', fun);
            }
        }

        showFrags(`${player.options.frags}:${opponent.options.frags}`);
        // let scoreText = `${player.options.frags}:${opponent.options.frags}`;
        if (maxBlockAllShips==player.options.frags) {
            console.log('You win!');
            showFrags('You win!');
            playerElement.removeEventListener('click', fun);
        } else if (maxBlockAllShips==opponent.options.frags) {
            console.log('You loose!');
            showFrags('You loose!');
            playerElement.removeEventListener('click', fun);
        }

        
        
    };

    playerElement.addEventListener('click', fun);
}