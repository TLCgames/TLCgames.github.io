let playArea = document.getElementById('playArea');
let tray = document.getElementById('tray');
let board = document.getElementById('board');

document.addEventListener('DOMContentLoaded', function() {
    adjustLayout();
}, false);

function adjustLayout() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    board = document.getElementById('board');
    setTimeout(function(){
        if (windowWidth / windowHeight > 1) {
            playArea.classList.add("row");
            tray.classList.add("col-4");
            board.classList.add("col-8");
        }
        else {
            playArea.classList.remove("row");
            tray.classList.remove("col-4");
            board.classList.remove("col-8");
        }
    }, 100);
}

window.addEventListener('resize', adjustLayout);
