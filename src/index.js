import css from "./mainContainer.css"
import GameController from "./gameController.js"
import {render,resetField} from "./domController.js"


let game = new GameController();
game.p1Queue = game.generateShipQueue();
game.p2Queue = game.generateShipQueue();
game.autoGenerate(game.p1, game.p1Queue, game.p1RdyStatus);
game.autoGenerate(game.p2, game.p2Queue, game.p2RdyStatus);
game.p2.cpu=true;
game.p1.name  = 'PLAYER 1'
render(game);

