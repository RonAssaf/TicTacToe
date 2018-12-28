const winBackgroundColor = "#2ecc71";
const winTextColor = "white";
const defaultBackgroundColor = "white";
const defaultTextColor = "black";
const tableDOMSelector = "table#board";

var Board = new Board(WinGameInform, DrawGameInform),
    gameRunning = true,
    playerTurn;
let tableBoard = document.querySelector(tableDOMSelector);
var allTds = tableBoard.querySelectorAll("tr td");

allTds.forEach(function (td) {
    addEvent("click", td, TapOnBoard);
});

startGame();

function WinGameInform() {
    alert(playerTurn.name + " is win!");
}

function DrawGameInform() {
    alert("Draw!");
}

function InitializeAllTds() {

}
function startGame() {
    InitializeAllTds
    changePlayerTurn();
}

function addEvent(event, element, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, func);
    } else {
        element["on" + event] = func;
    }
}

function changePlayerTurn() {
    playerTurn = (playerTurn == null || playerTurn === Players.playerTwo) ? Players.playerOne : Players.playerTwo;
    setPlayerName(playerTurn.name);
}

function TapOnBoard(Node) {
    if (gameRunning) {
        let index = convertTdNodeToArrayIndex(Node.target);
        if (Board.slotIsEmpty(index)) {
            markSlot(Node.target, index);
            CheckGameFinished();
            if (gameRunning) {
                changePlayerTurn();
            }
        }
    }
}

function CheckGameFinished() {
    let winSlots = Board.checkWin();
    if (winSlots) {
        markSlotsThatWin(winSlots);
        setTimeout(function () {
            Board.winGame()
        }, 0);
        gameRunning = false;
    } else {
        if (Board.boardIsFull()) {
            Board.drawGame();
            gameRunning = false;
        }
    }
}

function markSlotsThatWin(winSlots) {
    for (let i = 0; i < winSlots.length; i++) {
        let getSlot = winSlots[i];
        let tdPosition = (getSlot[0] * 3) + getSlot[1];

        allTds[tdPosition].style.backgroundColor = winBackgroundColor;
        allTds[tdPosition].style.color = winTextColor;
    }
}

function markSlot(uiSlot, slot) {
    Board.markSlot(slot, playerTurn.sign);
    uiSlot.innerText = playerTurn.sign;
}

function convertTdNodeToArrayIndex(Node) {
    let index;
    for (let i = 0; (i < allTds.length) || (index == null); i++) {
        if (allTds[i].isSameNode(Node)) {
            index = i;
        }
    }

    let row = Math.floor(index / 3);
    let col = index % 3;

    return [row, col];
}

function setPlayerName(name) {
    document.getElementById("nowPlaying").innerText = name;
}

function resetGame() {
    Board.reset();
    playerTurn = Players.playerOne;
    setPlayerName(playerTurn.name);
    resetTable();
    gameRunning = true;
}

function resetTable() {
    allTds.forEach(function (td) {
        td.innerHTML = "";
        td.style.backgroundColor = defaultBackgroundColor;
        td.style.color = defaultTextColor;
    });
}