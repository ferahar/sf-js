export function buildSquare(n) {
    
    let square = [];
    
    for (let i = 0; i < n; i++) {
        
        let row = [];        
        
        for (let j = 0; j < n; j++) {
            row.push(0);    
        }
        
        square.push(row);
    }

    return square;
}