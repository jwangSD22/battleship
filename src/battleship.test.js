import {Ship} from "./createShip.js"
import {Gameboard} from "./gameboard.js"

test('Hits are registered x2', ()=>{
    let booty = new Ship('battleship',4);
    booty.hit();
    booty.hit();
expect(booty.hits).toBe(2);
})

test('Hits are registered x3', ()=>{
    let booty = new Ship('battleship',4);
    booty.hit();
    booty.hit();
    booty.hit();
expect(booty.hits).toBe(3);
})

test('If hits exceed ship length, throw error', ()=>{
    let booty = new Ship('battleship',4);
    booty.hit();
    booty.hit();
    booty.hit();
    booty.hit();
expect(()=>booty.hit()).toThrowError();
    
})


test('Sunk status correctly registers', ()=>{
let booty = new Ship('submarine',3);
booty.hit();
booty.hit();
booty.hit();
expect (booty.isSunk()).toBe(true)

})


test('A ship of XYZ length [head---> tail] can be placed on the board', ()=>{
    let board = new Gameboard;
    let ship = new Ship('battleship',4);
    board.initializeBoard();
    board.placeShip(ship,[0,3]);
    expect (board.board[0][3]).toBe(ship);
    expect (board.board[0][0]).toBe(ship);
})

test('ship occupies the correct number of spaces on the board', ()=>{
    let board = new Gameboard;
    let ship = new Ship('carrier',5);
    board.initializeBoard();
    board.placeShip(ship,[3,5]);
    expect (board.board[3][5]).toBe(ship);
    expect (board.board[3][1]).toBe(ship);
})

test('the ship tail does not fall off of the gameboard', ()=>{
    let board = new Gameboard;
    let ship = new Ship('carrier',5);
    board.initializeBoard();
    expect(()=>{board.placeShip(ship,[3,3])}).toThrowError();

})

test('the spaces on the board all reference back to the same origin ship', ()=>{
    let board = new Gameboard;
    let ship = new Ship('carrier',5);
    board.initializeBoard();
    board.placeShip(ship,[3,5]);
    board.receiveAttack([3,5])
    board.receiveAttack([3,1])
    expect(ship.hits).toBe(2);
})

test('multiple ships can be placed on the board', ()=>{
    let board = new Gameboard;
    let ship$1 = new Ship('carrier',5);
    let ship$2 = new Ship('battleship',4);
    board.initializeBoard();
    board.placeShip(ship$1,[3,5]);
    board.placeShip(ship$2,[9,9]);
    expect (board.board[3][5]).toBe(ship$1);
    expect (board.board[3][1]).toBe(ship$1);
    expect (board.board[9][9]).toBe(ship$2);
    expect (board.board[9][6]).toBe(ship$2);
    expect (board.board[9][5]).toBe(0);
})

test('ship can be placed in x-plane by switching board orientation key', ()=>{
    let board = new Gameboard;
    let ship$1 = new Ship('carrier',5);
    let ship$2 = new Ship('battleship',4);
    board.initializeBoard();
    board.orientation='X'
    board.placeShip(ship$1,[3,5]);
    
    expect (board.board[3][5]).toBe(ship$1);
    expect (board.board[7][5]).toBe(ship$1);
    expect (()=>{board.placeShip(ship$2,[9,9])}).toThrowError();
    expect (board.board[3][4]).toBe(0);
})

test('gameboard registers all playing pieces in its .ships key', ()=>{
    let board = new Gameboard;
    board.initializeBoard();
    let ship$1 = new Ship('carrier',5);
    let ship$2 = new Ship('battleship',4);
    board.placeShip(ship$1,[3,5]);
    board.placeShip(ship$2,[9,9]);
    expect(board.ships.length).toBe(2);
    expect(board.ships[0]).toBe(ship$1);
    expect(board.ships[1]).toBe(ship$2);
    board.receiveAttack([9,9]);
    expect(board.ships[1].hits).toBe(1);
    board.receiveAttack([9,6]);
    expect(board.ships[1].hits).toBe(2);

})

test('does checkAllSunk method correctly determine if all boats are sunk',()=>{
    let board1 = new Gameboard;
    board1.initializeBoard();
    let board2 = new Gameboard;
    board2.initializeBoard()
    let ship$1 = new Ship('patrol',1);
    let ship$2 = new Ship('patrol',1);
    let ship$3 = new Ship('patrol',1);
    let ship$4 = new Ship('patrol',1);
    board1.placeShip(ship$1,[0,0])
    board1.placeShip(ship$2,[9,9])
    board2.placeShip(ship$3,[0,0])
    board2.placeShip(ship$4,[9,9])
    board1.receiveAttack([0,0])
    board1.receiveAttack([9,9])
    board2.receiveAttack([0,0])
    expect(board1.checkAllSunk()).toBe(true)
    expect(board2.checkAllSunk()).toBe(false)



})
