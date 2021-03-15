boardElement = document.getElementById("board");
trayElement = document.getElementById("tray");
headerElement = document.getElementById("header");

// Calc position of header SVG
headerSize = headerElement.getBoundingClientRect();
headerWidth = headerSize.width;
headerHeight = headerSize.height;
headerQuarterWidth = headerWidth * 0.25;
headerQuarterHeight = headerHeight * 0.25;

//Calc tray and board sizes
traySize = trayElement.getBoundingClientRect();
trayWidth = traySize.width;
trayHeight = traySize.height;

box = boardElement.getBoundingClientRect();
width = box.width;
height = box.height;

// Calc positon ref values for board grid
xOffset = width*0.1;
yOffset = height*0.1;
xCenter = width*0.5;
yCenter = height*0.5;
xInset = width - xOffset;
yInset = height - yOffset;
lineHeight = height*0.2;
lineWidth = width*0.2;
circleRadius = (height+width)*0.025;
diagonalOffset = Math.sqrt(circleRadius**2/2);

// Calc position ref values for tray
yCenterTray = trayHeight * 0.5;
circleRadiusTray = Math.min(trayHeight * 0.4, trayWidth / 18);
circleGap = circleRadiusTray / 7;
trayGap = circleRadiusTray * 2 + circleGap;
initialOffsetTray = circleRadiusTray + (trayWidth - (circleRadiusTray * 17)) / 2;

// Create chip data constructor
function Chip(value, player, position, color) {
    this.value = value;
    this.player = player;
    this.position = position;
    this.color = color;
}

header.innerHTML = `
<svg width="${headerWidth}" height="${headerHeight}">
<g id="start" onclick="startGame()">
    <rect x="${headerQuarterWidth}" y="${headerQuarterHeight * 2}" height="${headerQuarterHeight}" width="${headerQuarterWidth * 2}" stroke="red" rx="5" stroke-width="2" fill="transparent" />
</g>
</svg>`;

boardElement.innerHTML = `<svg width="${width}" height=${height}>
    <g id="circle00" style="fill: darkgreen">
        <circle cx="${xOffset}" cy="${yOffset}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle01" style="fill: darkgreen">
        <circle cx="${xCenter}" cy="${yOffset}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle02" style="fill: darkgreen">
        <circle cx="${xInset}" cy="${yOffset}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle10" style="fill: darkgreen">
        <circle cx="${xOffset}" cy="${yCenter}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle11" style="fill: darkgreen">
        <circle cx="${xCenter}" cy="${yCenter}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle12" style="fill: darkgreen">
        <circle cx="${xInset}" cy="${yCenter}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle20" style="fill: darkgreen">
        <circle cx="${xOffset}" cy="${yInset}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle21" style="fill: darkgreen">
        <circle cx="${xCenter}" cy="${yInset}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        </g>
    <g id="circle22" style="fill: darkgreen">
        <circle cx="${xInset}" cy="${yInset}" r="${circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
    </g>
    <g id="lines">
        <line x1="${xOffset}" y1="${yOffset + circleRadius}" x2="${xOffset}" y2="${yCenter - circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xOffset + diagonalOffset}" y1="${yOffset + diagonalOffset}" x2="${xCenter - diagonalOffset}" y2="${yCenter - diagonalOffset}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xOffset + circleRadius}" y1="${yOffset}" x2="${xCenter - circleRadius}" y2="${yOffset}" style="stroke:rgb(30,220,30);stroke-width:2" />

        <line x1="${xCenter}" y1="${yOffset + circleRadius}" x2="${xCenter}" y2="${yCenter - circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xCenter + diagonalOffset}" y1="${yCenter - diagonalOffset}" x2="${xInset - diagonalOffset}" y2="${yOffset + diagonalOffset}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xCenter + circleRadius}" y1="${yOffset}" x2="${xInset - circleRadius}" y2="${yOffset}" style="stroke:rgb(30,220,30);stroke-width:2" />

        <line x1="${xOffset}" y1="${yCenter + circleRadius}" x2="${xOffset}" y2="${yInset - circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xCenter - diagonalOffset}" y1="${yCenter + diagonalOffset}" x2="${xOffset + diagonalOffset}" y2="${yInset - diagonalOffset}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xOffset + circleRadius}" y1="${yCenter}" x2="${xCenter - circleRadius}" y2="${yCenter}" style="stroke:rgb(30,220,30);stroke-width:2" />

        <line x1="${xCenter}" y1="${yCenter + circleRadius}" x2="${xCenter}" y2="${yInset - circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xCenter + diagonalOffset}" y1="${yCenter + diagonalOffset}" x2="${xInset - diagonalOffset}" y2="${yInset - diagonalOffset}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xCenter + circleRadius}" y1="${yCenter}" x2="${xInset - circleRadius}" y2="${yCenter}" style="stroke:rgb(30,220,30);stroke-width:2" />

        <line x1="${xOffset + circleRadius}" y1="${yInset}" x2="${xCenter - circleRadius}" y2="${yInset}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xCenter + circleRadius}" y1="${yInset}" x2="${xInset - circleRadius}" y2="${yInset}" style="stroke:rgb(30,220,30);stroke-width:2" />

        <line x1="${xInset}" y1="${yCenter + circleRadius}" x2="${xInset}" y2="${yInset - circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
        <line x1="${xInset}" y1="${yOffset + circleRadius}" x2="${xInset}" y2="${yCenter - circleRadius}" style="stroke:rgb(30,220,30);stroke-width:2" />
    </g>
    </svg>`;

trayElement.innerHTML = `<svg width="${trayWidth}" height=${trayHeight}>
        <g id="chip0" style="fill: darkgreen">
        <circle cx="${initialOffsetTray}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
        <g id="chip1" style="fill: darkgreen">
        <circle cx="${initialOffsetTray + trayGap}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
        <g id="chip2" style="fill: darkgreen">
        <circle cx="${initialOffsetTray + trayGap * 2}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
        <g id="chip3" style="fill: darkgreen">
        <circle cx="${initialOffsetTray + trayGap * 3}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
        <g id="chip4" style="fill: darkgreen">
        <circle cx="${initialOffsetTray + trayGap * 4}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
        <g id="chip5" style="fill: darkgreen">
        <circle cx="${initialOffsetTray + trayGap * 5}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
        <g id="chip6" style="fill: darkgreen">
        <circle cx="${initialOffsetTray + trayGap * 6}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
        <g id="chip7" style="fill: darkgreen">
        <circle cx="${initialOffsetTray + trayGap * 7}" cy="${yCenterTray}" r="${circleRadiusTray}" style="stroke:rgb(30,120,30);stroke-width:1" />
        </g>
    </svg>`;

function startGame() {
    assignPieces();
    
}


// Game data
var chipValues = [1,2,3,4,5,6,7,8,9];
var trayChips = [0,1,2,3,4,5,6,7];
var playerInitialAssignment = [1,1,1,1,2,2,2,2];
var playerColorArray = ["rgb(0,0,139)","darkred"];
var chipData = [];

// Array of tray chip HTML elements
var traySVG0 = document.getElementById("chip0");
var traySVG1 = document.getElementById("chip1");
var traySVG2 = document.getElementById("chip2");
var traySVG3 = document.getElementById("chip3");
var traySVG4 = document.getElementById("chip4");
var traySVG5 = document.getElementById("chip5");
var traySVG6 = document.getElementById("chip6");
var traySVG7 = document.getElementById("chip7");
var traySVGArray = [traySVG0,traySVG1,traySVG2,traySVG3,traySVG4,traySVG5,traySVG6,traySVG7];

// First step of startGame - distribute 4 chips to each player
function assignPieces() {
    for(i = 0; i < trayChips.length; i++) {
        chipKey = Math.floor(Math.random() * (chipValues.length));
        playerColor = playerColorArray[playerInitialAssignment[i]-1];

        chipData[i] = new Chip(chipValues[chipKey],
                        playerInitialAssignment[i], i+1, playerColor);

        chipValues.splice(chipKey, 1);

        traySVGArray[i].style.fill = playerColor;


        
        console.log(`${chipKey}`)
        console.log(chipData[i]);
    };
}