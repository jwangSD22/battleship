let p1Grid = document.getElementById("p1Grid")
let p2Grid = document.getElementById("p2Grid")

function render(game){
let p1Array = game.p1.board.flat();
let p2Array = game.p2.board.flat();
const coordList = coordListGen();

for (let i = 0;i<100;i++){
 
let p1Div = divMaker(p1Array[i])
p1Div.setAttribute('id',`${coordList[i]}`)




let p2Div = divMaker(p2Array[i])
p2Div.setAttribute('id',`${coordList[i]}`)
p2Div.addEventListener('click',()=>{
    game.p1MakeAttack([`${coordList[i][1]}`,`${coordList[i][2]}`]);
    resetField();
    render(game);
})



p1Grid.appendChild(p1Div);
p2Grid.appendChild(p2Div);
}
}





function resetField(){
    while(p1Grid.firstChild){
        p1Grid.removeChild(p1Grid.firstChild)
    }
    while(p2Grid.firstChild){
        p2Grid.removeChild(p2Grid.firstChild)
    }
}





function coordListGen(){
    let array = []
    for (let i = 0;i<10;i++){
        for (let y = 0; y<10; y++){
let text = 'a'+i+y
array.push(text)
        }
    }

    return array
}



function divMaker(value){
let blankDiv = document.createElement('div')
blankDiv.className="box0"
blankDiv.innerHTML=`${value}`

let missDiv = document.createElement('div')
missDiv.className = "box1"

let hitDiv = document.createElement('div')
hitDiv.className = "box2"

    if (value==2){
return hitDiv;
    }

   else if (value==1){
    return missDiv;
   }
      else{return blankDiv}
}

export {render,resetField};