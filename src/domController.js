import GameController from "./gameController.js";

let p1Grid = document.getElementById("p1Grid");
let p2Grid = document.getElementById("p2Grid");

function render(game) {
  let p1Array = game.p1.board.flat();
  let p2Array = game.p2.board.flat();
  const coordList = coordListGen();

  for (let i = 0; i < 100; i++) {
    let p1Div = divMaker(p1Array[i]);
    p1Div.setAttribute("id", `${coordList[i]}`);

    let p2Div = divMaker(p2Array[i]);
    p2Div.setAttribute("id", `${coordList[i]}`);
    p2Div.addEventListener("click", () => {
      game.p1MakeAttack([`${coordList[i][1]}`, `${coordList[i][2]}`]);
      resetField();
      render(game);
    });

    p1Grid.appendChild(p1Div);
    p2Grid.appendChild(p2Div);
  }
}

function resetField() {
  while (p1Grid.firstChild) {
    p1Grid.removeChild(p1Grid.firstChild);
  }
  while (p2Grid.firstChild) {
    p2Grid.removeChild(p2Grid.firstChild);
  }
}

function coordListGen() {
  let array = [];
  for (let i = 0; i < 10; i++) {
    for (let y = 0; y < 10; y++) {
      let text = "a" + i + y;
      array.push(text);
    }
  }

  return array;
}

function newGameSetup() {
  let openingContainer = document.querySelector(".openingContainer");
  let placementContainer = document.querySelector(".placementContainer");
  openingContainer.style.display = "none";
  placementContainer.style.display = "flex";
  let game = new GameController();
  game.p1Queue = game.generateShipQueue();
  game.p2Queue = game.generateShipQueue();
  // game.autoGenerate(game.p1, game.p1Queue, game.p1RdyStatus);
  //   game.autoGenerate(game.p2, game.p2Queue, game.p2RdyStatus);
  game.p2.cpu = true;
  game.p1.name = "PLAYER 1";
  renderPlaceGrid(game);
  let btn = document.querySelector(".orientationButton");
  btn.addEventListener("click", () => {
    oriSwitch(game);
    renderPlaceGrid(game);
  });
}

function divMaker(value) {
  let blankDiv = document.createElement("div");
  blankDiv.className = "box0";
  blankDiv.innerHTML = `${value}`;

  let missDiv = document.createElement("div");
  missDiv.className = "box1";

  let hitDiv = document.createElement("div");
  hitDiv.className = "box2";

  if (value == 2) {
    return hitDiv;
  } else if (value == 1) {
    return missDiv;
  } else {
    return blankDiv;
  }
}

function renderPlaceGrid(game) {

  wipePlaceGrid();
  const coord = coordListGen();
  let current = game.p1Queue[game.p1Queue.length - 1];
  let p1Array = game.p1.board.flat();
  let placeGrid = document.getElementById("placeGrid");
  let msgBox = document.querySelector(".placementMsgBox");
  for (let i = 0; i < 100; i++) {
    let x = coord[i][1];
    let y = coord[i][2];
    let div = document.createElement("div");
    div.setAttribute("id", `${coord[i]}`);
    div.className = "placeDiv";
    if (game.p1Queue[0]){
    placementHighlighter(div,current.length,game.p1.orientation);
    }
    div.addEventListener("click", () => {
      game.p1PlaceShip([x, y]);
      renderPlaceGrid(game);
    });

    if (typeof p1Array[i] === "object") {
      div.className = "alreadyPlaced";
      placeGrid.appendChild(div);
    } else {
      placeGrid.appendChild(div);
      div.innerText = `${coord[i]}`;
    }
  }

  if (game.p1Queue[game.p1Queue.length - 1] === undefined) {
    //all ships have been placed 
    //create two buttons -- start battle && reset board
    preBattle(game);
    return console.log("ready!");
  }

  msgBox.innerText = `Place your ${current.ship} (${current.length})`;
}

function wipePlaceGrid() {
  let placeGrid = document.getElementById("placeGrid");

  while (placeGrid.firstChild) {
    placeGrid.removeChild(placeGrid.firstChild);
  }
}

function oriSwitch(game) {
  if (game.p1.orientation === "Y") {
    game.p1.orientation = "X";
  } else {
    game.p1.orientation = "Y";
  }
}

function placementHighlighter(div,length,orientation) {
div.addEventListener('mouseover',()=>{
if(orientation==='X'){
let x = parseInt(div.id[1])
let y = parseInt(div.id[2])

for (let i = 0;i<length;i++){
  if(x+i>9){return}
  let findDiv = document.getElementById(`a${x+i}${y}`)
  if(findDiv.className === 'alreadyPlaced'){return}
  findDiv.className = 'placeDivHov'

}


}
if(orientation==='Y'){
  let x = div.id[1]
  let y = div.id[2]
  
  for (let i = 0;i<length;i++){
    if (y-i<0){return}
    let findDiv = document.getElementById(`a${x}${y-i}`)
    if(findDiv.className === 'alreadyPlaced'){return}
    findDiv.className = 'placeDivHov'
  
  }
  



}

})
div.addEventListener('mouseout', ()=>{
  if(orientation==='X'){
    let x = parseInt(div.id[1])
    let y = parseInt(div.id[2])
    
    for (let i = 0;i<length;i++){
      if(x+i>9){return}
      let findDiv = document.getElementById(`a${x+i}${y}`)
      if(findDiv.className === 'alreadyPlaced'){return}
      findDiv.className = 'placeDiv'
    
    }
    
    
    }
    if(orientation==='Y'){
      let x = div.id[1]
      let y = div.id[2]
      
      for (let i = 0;i<length;i++){
        if (y-i<0){return}
        let findDiv = document.getElementById(`a${x}${y-i}`)
        if(findDiv.className === 'alreadyPlaced'){return}
        
        findDiv.className = 'placeDiv'
      
      }
      
    
    
    
    }





})



return div
}

function preBattle(game){
  let mainBody = document.querySelector('.mainBody')
  let placementContainer = document.querySelector('.placementContainer')
  let msgBox = document.querySelector(".placementMsgBox")
  msgBox.innerHTML = ''
  let startBtn = document.createElement('div')
  startBtn.id = 'startBtn'
  startBtn.innerText = 'Start Battle!'

  let resetBtn = document.createElement('div')
  resetBtn.id = resetBtn
  resetBtn.innerText = 'Reset Board'

  startBtn.addEventListener('click',()=>{
    placementContainer.style.display = 'none'
  mainBody.style.display = 'flex'
    render(game);
  })

    msgBox.appendChild(startBtn);
    msgBox.appendChild(resetBtn);




}

export { oriSwitch, render, resetField, newGameSetup };
