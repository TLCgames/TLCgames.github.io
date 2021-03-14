boardElement = document.getElementById("board");

box = boardElement.getBoundingClientRect();
width = box.width;
height = box.height;

xOffset = width*0.1;
yOffset = height*0.1;
xCenter = width*0.5;
yCenter = height*0.5;
xInset = width - xOffset;
yInset = height - yOffset;
lineHeight = height*0.2;
lineWidth = width*0.2;
circleRadius = width*0.05;
diagonalOffset = Math.sqrt(circleRadius**2/2);

boardElement.innerHTML = `<svg width="${box.width}" height=${box.height}>
    <g id="circle00">
        <circle cx="${xOffset}" cy="${yOffset}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle01">
        <circle cx="${xCenter}" cy="${yOffset}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle02">
        <circle cx="${xInset}" cy="${yOffset}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle10">
        <circle cx="${xOffset}" cy="${yCenter}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle11">
        <circle cx="${xCenter}" cy="${yCenter}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle12">
        <circle cx="${xInset}" cy="${yCenter}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle20">
        <circle cx="${xOffset}" cy="${yInset}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle21">
        <circle cx="${xCenter}" cy="${yInset}" r="${circleRadius}" fill="darkgreen" />
        </g>
    <g id="circle22">
        <circle cx="${xInset}" cy="${yInset}" r="${circleRadius}" fill="darkgreen" />
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