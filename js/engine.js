boardElement = document.getElementById("board");
trayElement = document.getElementById("tray");
gameControlButton = document.getElementById("header");

trayChipArr = trayElement.getElementsByTagName("div");
boardChipArr = boardElement.getElementsByTagName("div");

// Create chip data constructor
class Chip{
    constructor(value, player, position, color, html) {
        this.value = value;
        this.player = player;
        this.position = position;
        this.color = color;
        this.html = html;
        this.active = false;
    }
    setActive() {
        if(this.active == false) {
            this.active = true;
            this.html.style.border = "2px solid yellow";
        }
    }
    setInactive() {
        if(this.active == true) {
            this.active == false;
            this.html.style.border = "none";
        }
    }
}

class Board{
    constructor(){
        this.slots = [0,0,0,0,0,0,0,0,0];
    }
    validMove(slot){
        if(slots[slot] == 0){
            return true;
        }
        else{
            return false;
        }
    }
}

let chipData = [];
const colors = ["var(--neutral)", "var(--player1)", "var(--player2)"];
const bgColors = ["var(--bgNeutral)", "var(--bgPlayer1)", "var(--bgPlayer2)"];
var returner = function(targ){ returnChip(targ.target.id) };

// Initialize game by distributing pieces
function assignPieces(){
    board = new Board();
    var chipValues = [1,2,3,4,5,6,7,8,9];
    // Loop through creating each chip and updating the page
    for(var i=0; i < 8; i++){
        chipKey = Math.floor(Math.random() * (chipValues.length));
        var player = Math.round(i/8) + 1;
        chipData[i] = new Chip(chipValues[chipKey], player, i, colors[player], trayChipArr[i]);
        // Modify number value (innerHTML) and color of tray chip
        document.getElementById(chipData[i].html.id).innerHTML = chipData[i].value;
        document.getElementById(chipData[i].html.id).style.background = bgColors[chipData[i].player]
        chipValues.splice(chipKey, 1);
    }
    console.log(chipData);
    // Remove start game event listener
    gameControlButton.removeEventListener('click', () => { assignPieces(); });
    // Add event listeners for each player to return 1 of their chips
    for(var j=0; j < 8; j++){
        document.getElementById(chipData[j].html.id).addEventListener('click', returner);
    }
}

let returnTracker = [];

function returnChip(id){
    // Hide returned chip
    var returned = document.getElementById(id);
    returned.style.background = "none";
    returned.innerHTML = '';
    // 
    var trayPosition = parseInt(id[4]);
    returnTracker.push(trayPosition);
    var returningPlayer = Math.round(trayPosition / 9);
    for(var i=0; i < 4; i++){
        document.getElementById(chipData[i + returningPlayer*4].html.id).removeEventListener('click', returner);
    }
    if(returnTracker.length == 2){
        returnTracker.sort((a,b) => a - b);
        chipData.splice(returnTracker[1] - 1, 1);
        chipData.splice(returnTracker[0] - 1, 1);
        console.log(chipData);
        initPhaseTwo();
    }
}

function initPhaseTwo(){
    console.log('test');
}

gameControlButton.addEventListener('click', () => { assignPieces(); });