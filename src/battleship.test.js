import { Ship } from "./createShip.js";
import { Gameboard } from "./gameboard.js";
import GameController from "./gameController.js";

test("Hits are registered x2", () => {
  let booty = new Ship("battleship", 4);
  booty.hit();
  booty.hit();
  expect(booty.hits).toBe(2);
});

test("Hits are registered x3", () => {
  let booty = new Ship("battleship", 4);
  booty.hit();
  booty.hit();
  booty.hit();
  expect(booty.hits).toBe(3);
});

test("If hits exceed ship length, throw error", () => {
  let booty = new Ship("battleship", 4);
  booty.hit();
  booty.hit();
  booty.hit();
  booty.hit();
  expect(() => booty.hit()).toThrowError();
});

test("Sunk status correctly registers", () => {
  let booty = new Ship("submarine", 3);
  booty.hit();
  booty.hit();
  booty.hit();
  expect(booty.isSunk()).toBe(true);
});

test("A ship of XYZ length [head---> tail] can be placed on the board", () => {
  let board = new Gameboard();
  let ship = new Ship("battleship", 4);
  board.placeShip(ship, [0, 3]);
  expect(board.board[0][3]).toBe(ship);
  expect(board.board[0][0]).toBe(ship);
});

test("ship occupies the correct number of spaces on the board", () => {
  let board = new Gameboard();
  let ship = new Ship("carrier", 5);
  board.placeShip(ship, [3, 5]);
  expect(board.board[3][5]).toBe(ship);
  expect(board.board[3][1]).toBe(ship);
});

test("the ship tail does not fall off of the gameboard", () => {
  let board = new Gameboard();
  let ship = new Ship("carrier", 5);
  expect(board.placeShip(ship, [3, 3])).toBe(false);
});

test("the spaces on the board all reference back to the same origin ship", () => {
  let board = new Gameboard();
  let ship = new Ship("carrier", 5);
  board.placeShip(ship, [3, 5]);
  board.receiveAttack([3, 5]);
  board.receiveAttack([3, 1]);
  expect(ship.hits).toBe(2);
});

test("multiple ships can be placed on the board", () => {
  let board = new Gameboard();
  let ship$1 = new Ship("carrier", 5);
  let ship$2 = new Ship("battleship", 4);
  board.placeShip(ship$1, [3, 5]);
  board.placeShip(ship$2, [9, 9]);
  expect(board.board[3][5]).toBe(ship$1);
  expect(board.board[3][1]).toBe(ship$1);
  expect(board.board[9][9]).toBe(ship$2);
  expect(board.board[9][6]).toBe(ship$2);
  expect(board.board[9][5]).toBe(0);
});

test("ship can be placed in x-plane by switching board orientation key", () => {
  let board = new Gameboard();
  let ship$1 = new Ship("carrier", 5);
  let ship$2 = new Ship("battleship", 4);
  board.orientation = "X";
  board.placeShip(ship$1, [3, 5]);

  expect(board.board[3][5]).toBe(ship$1);
  expect(board.board[7][5]).toBe(ship$1);
  board.placeShip(ship$2, [9, 9]);
  expect(board.board[9][9]).toBe(0);
  expect(board.board[3][4]).toBe(0);
});

test("gameboard registers all playing pieces in its .ships key", () => {
  let board = new Gameboard();
  let ship$1 = new Ship("carrier", 5);
  let ship$2 = new Ship("battleship", 4);
  board.placeShip(ship$1, [3, 5]);
  board.placeShip(ship$2, [9, 9]);
  expect(board.ships.length).toBe(2);
  expect(board.ships[0]).toBe(ship$1);
  expect(board.ships[1]).toBe(ship$2);
  board.receiveAttack([9, 9]);
  expect(board.ships[1].hits).toBe(1);
  board.receiveAttack([9, 6]);
  expect(board.ships[1].hits).toBe(2);
});

test("does checkAllSunk method correctly determine if all boats are sunk", () => {
  let board1 = new Gameboard();
  let board2 = new Gameboard();
  let ship$1 = new Ship("patrol", 1);
  let ship$2 = new Ship("patrol", 1);
  let ship$3 = new Ship("patrol", 1);
  let ship$4 = new Ship("patrol", 1);
  board1.placeShip(ship$1, [0, 0]);
  board1.placeShip(ship$2, [9, 9]);
  board2.placeShip(ship$3, [0, 0]);
  board2.placeShip(ship$4, [9, 9]);
  board1.receiveAttack([0, 0]);
  board1.receiveAttack([9, 9]);
  board2.receiveAttack([0, 0]);
  expect(board1.checkAllSunk()).toBe(true);
  expect(board2.checkAllSunk()).toBe(false);
});

test("player 2 CPU board is auto generated after last player 1 ship is placed from the queue", () => {
  let game = new GameController();
  game.p1Queue = game.generateShipQueue();
  game.p2Queue = game.generateShipQueue();
  expect(game.p1Queue.length).toBe(5);
  expect(game.p1Queue.length).toBe(5);
  game.p1PlaceShip([1, 5]);
  game.p1PlaceShip([3, 4]);
  game.p1PlaceShip([2, 9]);
  game.p1PlaceShip([9, 8]);
  game.p1PlaceShip([3, 7]);
  //places 5 ships
  expect(game.p1Queue.length).toBe(0);
  expect(game.p2Queue.length).toBe(0);
});

test("check p1 make attack correctly registers on p2", () => {
  let game = new GameController();
  game.p1Queue = game.generateShipQueue();
  game.p2Queue = game.generateShipQueue();
  game.autoGenerate(game.p1, game.p1Queue, game.p1RdyStatus);
  game.autoGenerate(game.p2, game.p2Queue, game.p2RdyStatus);
  game.p1MakeAttack([5, 5]);
  expect(game.p2.board[5][5]).toBe(1 || 2);
  game.p1MakeAttack([3, 3]);
  expect(game.p2.board[3][3]).toBe(1 || 2);
});

//

//p1 make attack triggers p2 to make response attack

//
