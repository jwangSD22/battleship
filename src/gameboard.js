import {Ship} from "./createShip.js"

class Gameboard{
    constructor(){
        this.board = []
        this.size = 10
        this.orientation = 'Y';
        this.ships = []
    }

    initializeBoard(){
        let board = new Array(10).fill().map(()=>new Array(10).fill(0))
        this.board = board
    }

    placeShip(ship,coord){
        let board = this.board;
        let length = ship.length;
        let orientation = this.orientation;
        let x = coord[0];
        let y = coord[1];

        if (orientation==='X'){
            if(checkX(coord,length,board)===true){
                this.ships.push(ship);
                for (let i = 0;i<length;i++){
                    board[x+i][y]=ship;
                    ship.placed=true
                   
                }
            }
        }
        else if (orientation==='Y'){
            if(checkY(coord,length,board)===true){
                this.ships.push(ship);
                for (let i = 0;i<length;i++){
                    board[x][y-i]=ship;
                    ship.placed=true
                    
                }
            }
        }
        
    }

    receiveAttack(coord){
        let x = coord[0];
        let y = coord[1];
        let board = this.board;
        if (board[x][y]===0){
            return board[x][y]=1
        }

        if (board[x][y]===1||board[x][y]===2){
            return 'choose another square'
        }

        else {board[x][y].hit();
        board[x][y]=2
        }

    }

    checkAllSunk(){
        for(let i = 0;i<this.ships.length;i++){
            if (this.ships[i].sunkStatus===false)
            {return false}
        }
        return true
 
}






}

function checkX(coord,length,board){
    //this function checks if the ship can be placed on the X-PLANE
    //ship orientation is west to east
    let x = coord[0];
    let y = coord[1];
    if (board[x][y]!== 0){
        throw new Error('head coord already taken')
 
    }

        for (let i = 0;i<length;i++)
        {            if (board[x+i][y]!==0){
                throw new Error('ship and its length can not occupy the space OR falls out of the grid range')
         
            }
        }
    
return true

}

function checkY(coord,length,board){
        //this function checks if the ship can be placed on the Y-PLANE
        //ship orientation is north to south
        let x = coord[0];
        let y = coord[1];
        
        if (board[x][y]!==0){
              throw new Error('head coord already taken')
        }
    
            for (let i = 0;i<length;i++)
            {
                
                if (board[x][y-i]!==0||y<0){
                    
                    throw new Error('ship and its length can not occupy the space OR falls out of the grid range')
                }
            }
            return true
}


export {Gameboard}





let booty = new Gameboard;
booty.initializeBoard();
console.log(booty.board);
let myShip = new Ship('battleship',4);
let otherShip = new Ship('battleship',4);
console.log(checkY([0,4],4,booty.board))
console.log(booty.orientation)
booty.placeShip(myShip,[5,9])
booty.placeShip(otherShip,[0,5])
booty.receiveAttack([5,9])
booty.receiveAttack([5,6])
booty.receiveAttack([5,7])
booty.receiveAttack([5,8])
console.log(booty.board)
booty.receiveAttack([5,8]);

console.log(booty.ships);

booty.checkAllSunk();

