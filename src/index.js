import cssOpen from "./openContainer.css"
import cssMain from "./mainContainer.css"
import cssPlacement from "./placementContainer.css"
import GameController from "./gameController.js"
import {oriSwitch, render,resetField,newGameSetup} from "./domController.js"

(function setupOpening (){
    let openingContainer = document.querySelector('.openingContainer')
    console.log(openingContainer)
    let div = document.createElement('div')
    div.id = "startGameButton"
    div.innerText = 'START GAME'
    div.addEventListener('click',newGameSetup);
    openingContainer.appendChild(div);

})();





