



let game = new GameController
game.p1Queue = game.generateShipQueue()
game.p2Queue = game.generateShipQueue();
game.p2.cpu=true;
game.p1.name= 'Player'
game.p2.name = 'Computer'
