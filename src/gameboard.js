// import {Ship} from "./createShip.js"
class Whip {
    constructor(ship,length){
        this.ship = ship
        this.length = length
        this.hits = 0
        this.sunkStatus = false;
    }

    hit(){
     
        if(this.sunkStatus===true){
            throw Error('ship has already sustained max dmg')
        }

        this.hits +=1     

        if(this.hits===this.length){
           
            this.isSunk();
            console.log(`you just sunk a ${this.ship}!!!!`)
            return this.sunkStatus
        }

    }
    isSunk(){
        if(this.hits===this.length){
            this.sunkStatus=true;
    }
    return this.sunkStatus;
    }
    
}


class Gameboard{
    constructor(){
        this.board = []
        this.size = 10
        this.orientation = 'Y';
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
                for (let i = 0;i<length;i++){
                    board[x+i][y]=ship;
                }
            }
        }
        else if (orientation==='Y'){
            if(checkY(coord,length,board)===true){
                for (let i = 0;i<length;i++){
                    board[x][y-i]=ship;
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

        if (board[x][y]===1){
            return 'choose another square'
        }

        else {board[x][y].hit();
        board[x][y]=1
        }

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








let booty = new Gameboard;
booty.initializeBoard();
console.log(booty.board);
let myShip = new Whip('battleship',4);

console.log(checkY([0,4],4,booty.board))
console.log(booty.orientation)
booty.placeShip(myShip,[5,9])
booty.receiveAttack([5,9])
booty.receiveAttack([5,6])
booty.receiveAttack([5,7])
booty.receiveAttack([5,8])
console.log(booty.board);

