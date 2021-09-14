import { getRandom } from './getRandom';

export function createShip(n) {
    
    const ship = [];
    let x = getRandom(n);
    let y = getRandom(n);
    ship.push([x,y]);

    while (ship.length<n) {
        
        let newX = getRandom(n);
        let newY = getRandom(n);        
        
        let vicinal = (((newX+1 == x)||(newX-1 == x))&&(newY==y)) || (((newY+1 == y)||(newY-1 == y))&&(newX==x));
        
        if (vicinal) {
            
            let d = ship.findIndex( el => (el[0]==newX)&&(el[1]==newY) );

            if (  d == -1 ) {
                ship.push([newX,newY]);
                x = newX;
                y = newY;    
            }
            
        } 

    }
    return ship;
}