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

//a ship of xyz length [head---->tail] can be placed on the board
//ship occupies the correct number of spaces on the board
//the ship's tail does not fall off of the gameboard
//the spaces on the board all reference back to the same origin ship
//test this by hitting a ship on the head, and see if the tail registers the same number of hits
//multiple ships can be placed on the board
//ship can be placed in x-plane 
//ship can be placed on y plane