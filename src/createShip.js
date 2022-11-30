class Ship {
  constructor(ship, length) {
    this.ship = ship;
    this.length = length;
    this.hits = 0;
    this.sunkStatus = false;
    this.placed = false;
  }

  hit() {
    // if (this.sunkStatus === true) {
    //   throw Error("ship has already sustained max dmg");
    // }

    this.hits += 1;

    if (this.hits === this.length) {
      this.isSunk();
      
      setTimeout(()=>{
      let message = document.getElementById('msgBox')
      message.innerText = `A ${this.ship} was just sunk!!`
      message.setAttribute('style','animation: blinkHit .02s step-end 18')
      setTimeout(()=>{message.setAttribute('style','animation: none')},250);
    },300)


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
