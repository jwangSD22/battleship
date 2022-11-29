import { Gameboard } from "./gameboard.js";
import { Ship } from "./createShip.js";

//start game check when all ships are placed..

export default class GameController {
  constructor() {
    this.p1 = new Gameboard();
    this.p2 = new Gameboard();
    this.p1RdyStatus = false;
    this.p2RdyStatus = false;
    this.p1Queue;
    this.p2Queue;
  }

  generateShipQueue() {
    let carrier = new Ship("Carrier", 5);
    let battleship = new Ship("Battleship", 4);
    let destroyer = new Ship("Destroyer", 3);
    let submarine = new Ship("Submarine", 3);
    let patrolBoat = new Ship("Patrol Boat", 2);
    return [patrolBoat, submarine, destroyer, battleship, carrier];
  }

  autoGenerate(board, queue, status) {
    while (status === false) {
      let current = queue[queue.length - 1];

      while (current.placed === false) {
        let orientation = oriRandomizer();
        board.orientation = orientation;
        let coord = coordRandomizer();
        board.placeShip(current, coord);
      }

      queue.pop();
      if (queue[queue.length - 1] === undefined) {
        status = true;
      }
    }
  }

  p1PlaceShip(coord) {
    let current = this.p1Queue[this.p1Queue.length - 1];
    this.p1.placeShip(current, coord);
    //this should throw an error and prevent the dequeue from happening if it's a duplicate coord

    if (current.placed === false) {
      return console.log("not successfully placed");
    } else {
      this.p1Queue.pop();

      if (this.p1Queue[this.p1Queue.length - 1] === undefined) {
        //when p1 is done, auto generate computer board // future functionality would pass the turn on to p2

        this.autoGenerate(this.p2, this.p2Queue, this.p2RdyStatus);
        this.p2RdyStatus=true;
        return (this.p1RdyStatus = true);
      }
    }
  }

  p1MakeAttack(coord) {
    if (this.p2.board[coord[0]][coord[1]] > 0) {
      //RETURNS AN ERROR BECAUSE SPOT NOT ELIGIBLE
      return console.log('pick another spot')
    } else {
      this.p2.receiveAttack(coord);

      if (this.p2.checkAllSunk()) {
       
        return this.winnerFound(this.p1);
      }

      if (this.p2.cpu === true) {
        let coord = coordRandomizer();
        while (this.p1.board[coord[0]][coord[1]] > 0) {
          console.log(this.p1.board[coord[0]][coord[1]]);
          let newCoord = coordRandomizer();
          coord = newCoord;
        }

        this.p1.receiveAttack(coord);
        if (this.p1.checkAllSunk()) {
          
          return this.winnerFound(this.p2);
        }
      }
      return;
    }
  }

  winnerFound(winner) {
    console.log(winner.name)
    alert(`${winner.name} WINS!!`)
  }

  resetBoard() {
    this.p1 = new Gameboard();
    this.p2 = new Gameboard();
    this.p1RdyStatus = false;
    this.p2RdyStatus = false;
    this.p1Queue = [];
    this.p2Queue = [];
  }
}

function coordRandomizer() {
  let array = [0, 0];
  array[0] = Math.floor(Math.random() * 10);
  array[1] = Math.floor(Math.random() * 10);

  return array;
}

function oriRandomizer() {
  let orientation = "";
  let random = Math.floor(Math.random() * 10);
  if (random > 4) {
    orientation = "Y";
  } else {
    orientation = "X";
  }
  return orientation;
}

function counter(array) {
  let newArray = array.flat();
  let counter = 0;
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] === 1 || newArray[i] === 2) {
      counter++;
    }
  }

  return counter;
}
