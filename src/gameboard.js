import { Ship } from "./createShip.js";

class Gameboard {
  constructor() {
    this.board = new Array(10).fill().map(() => new Array(10).fill(0));
    this.size = 10;
    this.orientation = "Y";
    this.ships = [];
    this.cpu = false;
    this.name = "";
  }

  placeShip(ship, coord) {
    let board = this.board;
    let length = ship.length;
    let orientation = this.orientation;
    let x = parseInt(coord[0]);
    let y = parseInt(coord[1]);

    if (orientation === "X") {
      if (checkX(coord, length, board) === true) {
        this.ships.push(ship);
        for (let i = 0; i < length; i++) {
          board[x + i][y] = ship;
          //test with a number for console GUI
          ship.placed = true;
        }
      }
    } else if (orientation === "Y") {
      if (checkY(coord, length, board) === true) {
        this.ships.push(ship);
        for (let i = 0; i < length; i++) {
          board[x][y - i] = ship;
          //test with a number for console GUI
          ship.placed = true;
        }
      }
    }
    return false;
  }

  receiveAttack(coord) {
    let x = coord[0];
    let y = coord[1];
    let board = this.board;
    if (board[x][y] === 0) {
      //MISSED SHOT
      return (board[x][y] = 1);
    }

    if (board[x][y] === 1 || board[x][y] === 2) {
      //INVALID SPACE ALREADY FIRED UPON
      return false;
    } else {
      board[x][y].hit();
      //HIT TRIGGERED HERE
      board[x][y] = 2;
    }
  }

  checkAllSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].sunkStatus === false) {
        return false;
      }
    }
    return true;
  }
}

function checkX(coord, length, board) {
  //this function checks if the ship can be placed on the X-PLANE
  //ship orientation is west to east
  let x = coord[0];
  let y = coord[1];
  if (board[x][y] !== 0) {
    return false;
    throw new Error("head coord already taken");
  }

  for (let i = 0; i < length; i++) {
    if (x + i > 9 || board[x + i][y] !== 0) {
      return false;

      throw new Error(
        "ship and its length can not occupy the space OR falls out of the grid range"
      );
    }
  }

  return true;
}

function checkY(coord, length, board) {
  //this function checks if the ship can be placed on the Y-PLANE
  //ship orientation is north to south
  let x = coord[0];
  let y = coord[1];

  if (board[x][y] !== 0) {
    return false;

    throw new Error("head coord already taken");
  }

  for (let i = 0; i < length; i++) {
    if (board[x][y - i] !== 0 || y - i < 0) {
      return false;

      throw new Error(
        "ship and its length can not occupy the space OR falls out of the grid range"
      );
    }
  }
  return true;
}

export { Gameboard };
