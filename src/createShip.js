class Ship {
  constructor(ship, length) {
    this.ship = ship;
    this.length = length;
    this.hits = 0;
    this.sunkStatus = false;
    this.placed = false;
  }

  hit() {
    if (this.sunkStatus === true) {
      throw Error("ship has already sustained max dmg");
    }

    this.hits += 1;

    if (this.hits === this.length) {
      this.isSunk();
      console.log(`you just sunk a ${this.ship}!!!!`);
      //dom needs to reflect this 
      return this.sunkStatus;
    }
  }
  isSunk() {
    if (this.hits === this.length) {
      this.sunkStatus = true;
    }
    return this.sunkStatus;
  }
}

export { Ship };
