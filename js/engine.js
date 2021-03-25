boardElement = document.getElementById("board");
trayElement = document.getElementById("tray");
gameControlButton = document.getElementById("header");

trayChipArr = trayElement.getElementsByTagName("div");
boardChipArr = boardElement.getElementsByTagName("div");

activePlayer = null;
playerActive = null;
let phase = 0;
// Create chip data constructor
class Chip{
    constructor(value, player, position, color, id) {
        this.value = value;
        this.player = player;
        this.position = position;
        this.color = color;
        this.id = id;
        this.active = false;
    }
    setActive() {
        if(this.active == false) {
            this.active = true;
            var thisElement = document.getElementById(this.id);
            thisElement.style.color = "var(--select)";
            thisElement.addEventListener('click', deselector);
            thisElement.removeEventListener('click', selector);
            playerActive = true;
        }
    }
    setInactive() {
        if(this.active == true) {
            this.active = false;
            var thisElement = document.getElementById(this.id);
            thisElement.style.color = "var(--unselect)";
            thisElement.removeEventListener('click', deselector);
            thisElement.addEventListener('click', selector);
            playerActive = null;
        }
    }
    placeChip(boardPosition) {
        if(this.active == true){
            this.position = boardPosition;
            // Remove chip from tray
            var thisElement = document.getElementById(this.id);
            thisElement.style.background = bgColors[0];
            thisElement.innerHTML = '';
            thisElement.style.color = "var(--unselect)";
            thisElement.removeEventListener('click', deselector);
            // Add chip to board and update html id of chip
            this.id = board.idx[boardPosition];
            board.placeChip(this.value,this.player,boardPosition);
            playerActive = null;
            activePlayer = 3 - activePlayer;
        }
    }
}

class Board{
    constructor(){
        this.slots = [0,1,2,3,4,5,6,7,8];
        this.values = [0,0,0,0,0,0,0,0,0];
        this.idx = [];
    }
    placeChip(val,pl,pos){
        // Update board data and UI
        this.values[pos] = val;
        console.log(this.idx);
        console.log(pos);
        var thisElement = document.getElementById(this.idx[pos]);
        thisElement.style.background = bgColors[pl];
        thisElement.innerHTML = val;
    }
    validMove(slot){
        if(values[slot] == 0){
            return true;
        }
        else{
            return false;
        }
    }
}

let chipData = [];
const colors = ["var(--neutral)", "var(--player1)", "var(--player2)"];
const bgColors = ["var(--bgEmpty)", "var(--bgPlayer1)", "var(--bgPlayer2)"];
let returner = function(targ){ returnChip(targ.target.id) };

// Initialize game by distributing pieces
function assignPieces(){
    phase = 1;
    board = new Board();
    var chipValues = [1,2,3,4,5,6,7,8,9];
    // Loop through creating each chip and updating the page
    for(var i=0; i < 8; i++){
        chipKey = Math.floor(Math.random() * (chipValues.length));
        var player = Math.round(i/8) + 1;
        chipData[i] = new Chip(chipValues[chipKey], player, i, colors[player], trayChipArr[i].id);
        // Modify number value (innerHTML) and color of tray chip
        document.getElementById(chipData[i].id).innerHTML = chipData[i].value;
        document.getElementById(chipData[i].id).style.background = bgColors[chipData[i].player]
        chipValues.splice(chipKey, 1);
    }
    console.log(chipData);
    // Remove start game event listener
    gameControlButton.removeEventListener('click', () => { assignPieces(); });
    // Add event listeners for each player to return 1 of their chips
    for(var j=0; j < 8; j++){
        document.getElementById(chipData[j].id).addEventListener('click', returner);
    }
}

let returnTracker = [];

function returnChip(id){
    // Hide returned chip
    var returned = document.getElementById(id);
    returned.style.background = bgColors[0];
    returned.innerHTML = '';
    // Get tray position from html element, keep tray of which were returned
    var trayPosition = parseInt(id[4]);
    returnTracker.push(trayPosition);
    var returningPlayer = Math.round(trayPosition / 7);
    // When a chip is returned, remove event listeners for returning chips from that player's chips
    for(var i=0; i < 4; i++){
        document.getElementById(chipData[i + returningPlayer*4].id).removeEventListener('click', returner);
    }
    // Once each player returns a chip, remove those two chips from chipData and move to phase 2
    if(returnTracker.length == 2){
        returnTracker.sort((a,b) => a - b);
        chipData.splice(returnTracker[1], 1);
        chipData.splice(returnTracker[0], 1);
        console.log(chipData);
        phase = 2;
        initPhaseTwo();
    }
}

let activeChip = -1;
// Deselector for phase 2 and 3
const deselector = function(targ){
    if(phase == 2){
        for(subArr in trayChips){
            if(targ.target.id == trayChips[subArr][0]){
                activeChip = -1;
                chipData[trayChips[subArr][2]].setInactive();
            }
        }
    }
}

// Selector for phase 2
const selector = function(targ){
    if(playerActive == null && phase == 2){
        for(subArr in trayChips){
            if(targ.target.id == trayChips[subArr][0] && trayChips[subArr][1] == activePlayer){
                activeChip = trayChips[subArr][2];
                chipData[trayChips[subArr][2]].setActive();
            }
        }
    }
}

// Placer for phase 2
const placer = function(targ){
    console.log('test1');
    if(playerActive == true && phase == 2){
        console.log('test2');
        var boardPosition = targ.target.id[4];
        // Remove chip from tray
        chipData[activeChip].placeChip(boardPosition);

        // Insert chip into board
        
    }
}

// Tic-tac-toe style placement of chips
let trayChips = [];

function initPhaseTwo(){
    for(i in chipData){
        document.getElementById(chipData[i].id).addEventListener('click', selector);
        trayChips.push([chipData[i].id,chipData[i].player,i]);
    }
    for(i in board.slots){
        board.idx.push(`slot${board.slots[i]}`);
    }
    for(i in board.idx){
        document.getElementById(board.idx[i]).addEventListener('click', placer);
    }
    activePlayer = 1;
}


// Allow start button activation
gameControlButton.addEventListener('click', () => { assignPieces(); });