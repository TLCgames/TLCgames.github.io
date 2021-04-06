boardElement = document.getElementById("board");
trayElement = document.getElementById("tray");
gameControlButton = document.getElementById("gameControl");

trayChipArr = trayElement.getElementsByTagName("div");
boardChipArr = boardElement.getElementsByTagName("div");

infoPanel = document.getElementById('info');
phasePanel = document.getElementById('phase');

const adjacency = {0 : [1,3], 1 : [0,2], 2 : [1,5], 3 : [0,6], 5 : [2,8], 6 : [3,7], 7 : [6,8], 8 : [5,7]}
const threes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]];
const colors = ["var(--neutral)", "var(--player1)", "var(--player2)"];
const bgColors = ["var(--bgEmpty)", "var(--bgPlayer1)", "var(--bgPlayer2)"];
let returner = function(targ){ returnChip(targ.target.id) };

// Global vars
// activePlayer tracks which player's turn it is
let activePlayer = null;
// playerActive tracks whether active player has a chip selected but not yet moved/placed
let playerActive = null;
let startingPlayer = 1;
let score = [0,0];
let phase = 0;
let bonus = 0;
let returnTracker = [];
let activeChip = -1;
let chipData = [];
let lastSelected = -1;
let trayChips = [];
let boardChips = {};
// lastMove records the last chip value and last position of that chip so it isn't moved back
let lastMove = [0,0];
// Create chip data constructor

function newRound(){
    // Reset global vars except score
    activePlayer = null;
    playerActive = null;
    phase = 0;
    bonus = 0;
    returnTracker = [];
    activeChip = -1;
    chipData = [];
    lastSelected = -1;
    trayChips = [];
    boardChips = {};
    lastMove = [0,0];
    // Toggle starting player
    startingPlayer = 3 - startingPlayer;
    // Reset board html
    document.getElementById('board').innerHTML = `<div id="slot0"></div>    <div id="slot1"></div>    <div id="slot2"></div>    <div id="slot3"></div>    <div id="slot4"></div>    <div id="slot5"></div>    <div id="slot6"></div>    <div id="slot7"></div>    <div id="slot8"></div>`;
    var newSlots = document.getElementById('board').children;
    [...newSlots].forEach(function(slot){
        slot.style.background = bgColors[0];
    })
    // Re-initialize game
    assignPieces();
}

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
            playerActive = true;
        }
    }
    setInactive() {
        if(this.active == true) {
            this.active = false;
            var thisElement = document.getElementById(this.id);
            thisElement.style.color = "var(--unselect)";
            playerActive = null;
        }
    }
    placeChip(boardPosition) {
        if(this.active == true){
            // Record previous chip info as lastMove before updating position
            lastMove = [this.value, this.position];
            this.setInactive();
            this.position = boardPosition;
            // Remove chip from tray/board
            var thisElement = document.getElementById(this.id);
            thisElement.style.background = bgColors[0];
            thisElement.innerHTML = '';
            // Add chip to board and update html id of chip
            this.id = board.idx[boardPosition];
            board.placeChip(this.value,this.player,boardPosition);
            // Test for point earned after move in phase 3 (true/false)
            if(phase == 3){
                board.testPoint(boardPosition);
            }
            board.testWin();
            console.log(bonus);
            // After point is added, update html with turn info if nobody won
            if(activePlayer < 3){
                // If a bonus move was earned and it isn't their 3rd move in a row
                if(bonus < 3 && bonus > 0){
                    infoPanel.innerHTML = `Player ${activePlayer} scored a point and earned a bonus move!`;
                    gameControlButton.addEventListener('click', passBonus);
                    gameControlButton.innerHTML = `Pass Turn`;
                    this.setInactive();
                }
                // If no bonus move is available
                else{
                    activePlayer = 3 - activePlayer;
                    bonus = 0;
                    infoPanel.innerHTML = `Player ${activePlayer}'s turn.`;
                }
            }
        }
    }
}

class Board{
    constructor(){
        this.slots = [0,1,2,3,4,5,6,7,8];
        this.values = [0,0,0,0,0,0,0,0,0];
        this.player = [0,0,0,0,0,0,0,0,0];
        this.idx = [];
    }
    placeChip(val,pl,pos){
        // Update new board data and UI
        this.values[pos] = val;
        this.player[pos] = pl;
        var thisElement = document.getElementById(this.idx[pos]);
        thisElement.style.background = bgColors[pl];
        thisElement.innerHTML = val;
    }
    testWin(){
        // Check horizontals and verticals
        var winner = 0;
        for(var i=0; i < 3; i++){
            if(this.player[i*3] != 0 && this.player[i*3] == this.player[i*3+1] && this.player[i*3+1] == this.player[i*3+2]){
                winner = this.player[i*3];
            }
            if(this.player[i] != 0 && this.player[i] == this.player[i+3] && this.player[i+3] == this.player[i+6]){
                winner = this.player[i];
            }
        }
        // Check diagonals if center is filled
        if(this.player[4] != 0){
            for(var i=0; i < 2; i++){
                if(this.player[i*2] == this.player[4] && this.player[4] == this.player[8 - i*2]){
                    winner = this.player[4];
                }
            }
        }
        if(winner != 0){
            win(winner);
        }
    }
    validMove(slot){
        if(this.values[slot] == 0){
            // Check if it's a repeat move
            console.log([chipData[activeChip].value,slot]);
            console.log(lastMove);
            if(chipData[activeChip].value == lastMove[0] && slot == lastMove[1]){
                return false;
            }
            // Check for adjacency
            else if(chipData[activeChip].position == 4 || slot == 4 || adjacency[chipData[activeChip].position].includes(parseInt(slot))){
                return true;
            }
        }
        return false;
    }
    testPoint(slot){
        // Variables for point combos
        var even = [ 2, 4, 6, 8 ];
        var odd = [ 1, 3, 5, 7, 9 ];
        var factor6 = [ 1, 2, 3, 6 ];
        var factor8 = [ 1, 2, 4, 8 ];
        var factor9 = [ 1, 3, 9 ];
        var multiple3 = [ 3, 6, 9 ];
        var perfectsquare = [ 1, 4, 9 ];
        var prime = [ 2, 3, 5, 7 ];
        var groups = [even,odd,factor6,factor8,factor9,multiple3,perfectsquare,prime];
        var pointEarned = false;
        // Check which sets of 3-in-a-row slots contain slot that was moved to
        var toCheck = [];
        threes.forEach(function(three){
            if(three.includes(slot)){
                toCheck.push(three);
            }
        })
        // For sets containing the new move, check if all 3 are player controlled
        toCheck.forEach(function(set){
            var valMap = set.map(pos => this.values[pos]).sort();
            // If all 3 are player controlled, check for a match
            if(valMap.includes(0) == false){
                if(valMap[0] + valMap[1] == valMap[2]){
                    pointEarned = true;
                }
                groups.forEach(function(testArr){
                    if(valMap.every(value => testArr.includes(value))){
                        pointEarned = true;
                    }
                })
            }
        }, this)

        // If no point was found, reset bonus counter
        if(!pointEarned){
            bonus = 0;
            console.log(bonus);
            console.log('no point earned')
            return false;
        }
        // Else, increment bonus counter and update score data and html
        else{
            bonus += 1;
            console.log(bonus);
            console.log('point earned');
            score[activePlayer-1] += 1;
            document.getElementById(activePlayer).innerHTML = score[activePlayer-1];
            return true;
        }
    }
}


// Initialize game by distributing pieces
const assignPieces = function(){
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
    // Remove start game event listener
    gameControlButton.removeEventListener('click', assignPieces);
    // Add event listeners for each player to return 1 of their chips
    for(var j=0; j < 8; j++){
        document.getElementById(chipData[j].id).addEventListener('click', returner);
    }
    activePlayer = startingPlayer;
    phasePanel.innerHTML = `Phase 1: Each player returns one of their four chips.`;
    infoPanel.innerHTML = `Player ${activePlayer}'s turn to return a chip.`;
}


function returnChip(id){
    // Change active player and update UI
    activePlayer = 3 - activePlayer;
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
        phase = 2;
        initPhaseTwo();
    }
    else{
        infoPanel.innerHTML = `Player ${activePlayer}'s turn to return a chip.`;
    }
}

// Deselector for phase 2
const deselector = function(targ){
    for(subArr in trayChips){
        if(targ.target.id == trayChips[subArr][0]){
            activeChip = -1;
            chipData[trayChips[subArr][2]].setInactive();
        }
    }
}
// Selector for phase 2
const selector = function(targ){
    if(playerActive == null){
        for(subArr in trayChips){
            if(targ.target.id == trayChips[subArr][0] && trayChips[subArr][1] == activePlayer){
                document.getElementById(targ.target.id).addEventListener('click', deselector);
                activeChip = trayChips[subArr][2];
                chipData[trayChips[subArr][2]].setActive();
                trayChips.splice(subArr, 1);
                return;
            }
        }
    }
}
// Placer for phase 2
const placer = function(targ){
    if(playerActive == true){
        var boardPosition = parseInt(targ.target.id[4]);
        // Remove chip from tray and add to board
        document.getElementById(targ.target.id).removeEventListener('click', placer);
        chipData[activeChip].placeChip(boardPosition);
        if(trayChips.length == 0){
            initPhaseThree();
        }
    }
}

// Mover for phase 3
const mover = function(targ){
    var boardPosition = parseInt(targ.target.id[4]);
    // If clicked slot is not empty
    if(board.player[boardPosition] != 0){
        for(_chip in chipData){
        // Find the clicked chip
            if(chipData[_chip].id == targ.target.id){
        // Test if the clicked chip is active player's
                if(chipData[_chip].player == activePlayer){
        // If it is, deselect last selected chip and select target
                    if(lastSelected >= 0){
                        chipData[lastSelected].setInactive();
                    }
                    if(chipData[_chip].active == false){
                        chipData[_chip].setActive();
                        activeChip = _chip;
                    }
                    lastSelected = _chip;
                    return;
                }
            }
        }
    }
    else {
    // If the slot is empty, check if last chip selected is active
        if(chipData[lastSelected].active){
            // If it is, check for valid move
            if(board.validMove(boardPosition)){
                // Before updating new data, update the chip's previous slot data
                board.values[chipData[activeChip].position] = 0;
                board.player[chipData[activeChip].position] = 0;
                boardChips[chipData[activeChip].id] = 0;
                boardChips[targ.target.id] = activePlayer;
                // placeChip passes to testForPoint
                chipData[activeChip].placeChip(boardPosition);
            }
        }
    }
}

// Tic-tac-toe style placement of chips

function initPhaseTwo(){
    phasePanel.innerHTML = `Phase 2: Place chips on the board, trying to get 3 in a row.`;
    infoPanel.innerHTML = `Player ${activePlayer}'s turn to place a chip!`;
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
}

function initPhaseThree(){
    phase = 3;
    phasePanel.innerHTML = `Phase 3: Move chips to form relations.`;
    // Create array of [html id[4],player] for board chips and add selector event listeners
    // Add mover event listeners for all board slots
    for(i in board.idx){
        // Add mover selectors and remove old listeners
        document.getElementById(board.idx[i]).addEventListener('click', mover);
        document.getElementById(board.idx[i]).removeEventListener('click', placer);
        boardChips[board.idx[i]] = board.player[i];
    }
}

function win(player){
    console.log('test');
    score[player-1] += 3;
    if(phase == 2){
        infoPanel.innerHTML = `Player ${player} won by matching 3 in a row!`;
        activePlayer = player + 2;
    }
    if(phase == 3){
        infoPanel.innerHTML = `Player ${player} ended the round by matching 3 in a row!`;
        activePlayer = player + 2;
    }
    document.getElementById(player).innerHTML = score[player-1];
    gameControlButton.addEventListener('click', newRound);
    gameControlButton.innerHTML = `New Round`;
    phasePanel.innerHTML = `Phase 0: Start a new round.`;
}

// Pass bonus move
function passBonus(){
    // If a chip is currently selected
    if(playerActive){
        chipData[lastSelected].setInactive();
    }
    gameControlButton.innerHTML = `Good Luck`;
    gameControlButton.removeEventListener(`click`, passBonus);
    activePlayer = 3 - activePlayer;
    bonus = 0;
    infoPanel.innerHTML = `Player ${activePlayer}'s turn.`;
}

// Allow start button activation
gameControlButton.addEventListener('click', assignPieces);