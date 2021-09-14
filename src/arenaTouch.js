
import {getPosition} from "./getPosition";
import { reviewShip, reviewShip2 } from "./reviewShip";

export function arenaTouch(data) {
    
    
    let arena = document.getElementById(data.sf).querySelector('.'+data.arenaName);
    
    
    let funTouch = function (e) {
    
        // let start = Math.round((e.changedTouches[0].pageX - arena.offsetLeft) * 200 / arena.clientWidth);
        let start = e.changedTouches[0].pageX;
        let opponent = document.getElementById(data.opponent);

        if (opponent) {


            function funMove(e) {
                // let step = Math.round((e.changedTouches[0].pageX - arena.offsetLeft) * 200 / arena.clientWidth);
                let step = e.changedTouches[0].pageX - start;
                let style = arena.currentStyle || window.getComputedStyle(arena);
                arena.style.marginLeft = parseInt(style.marginLeft) + step + "px";    
                
            }
    
            function funMouseUp(e){
                // let step = Math.round((e.changedTouches[0].pageX - arena.offsetLeft) * 200 / arena.clientWidth);
                let step = e.changedTouches[0].pageX;
                
                if (step<start) {
                    arena.classList.add("sf_arena_show");
                    arena.removeAttribute('style');    
                } else {
                    arena.classList.remove("sf_arena_show");
                    arena.removeAttribute('style');
                } 
                
                arena.removeEventListener('touchmove', funMove);
                arena.removeEventListener('touchend', funMouseUp);
            }

            
            arena.addEventListener('touchmove', funMove);
            arena.addEventListener('touchend', funMouseUp);
            
        }
    };

    arena.addEventListener('touchstart', funTouch);
    // data.funTouch = funTouch;
    
}