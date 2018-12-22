var Players = {
    playerOne: "X",
    playerTwo: "O"
};

function Board() {
    this.board = new Array(new Array(3), new Array(3), new Array(3));
    this.markSlot = function (slot, mark) {
        this.board[slot[0]][slot[1]] = mark;
    }

    this.slotIsEmpty = function (slot) {
        return this.board[slot[0]][slot[1]] == null;
    }

    this.checkWin = function () {
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2] &&
                this.board[i][0] != null) {
                return [[i, 0], [i, 1], [i, 2]];
            }
        }

        for (var i = 0; i < this.board.length; i++) {
            if (this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i] &&
                this.board[0][i] != null) {
                return [[0, i], [1, i], [2, i]];
            }
        }

        if (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] &&
            this.board[1][1] != null) {
            return [[0, 0], [1, 1], [2, 2]];
        }


        if (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0] &&
            (this.board[1][1] != null)) {
            return [[0, 2], [1, 1], [2, 0]];
        }

        return null;
    }

    this.boardIsFull = function () {
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; i < this.board[i].length; j++) {
                if (this.board[i][j] != null) {
                    return false;
                }
            }
        }

        return true;
    }

    this.reset = function () {
        this.board = new Array(new Array(3), new Array(3), new Array(3));
    }

}

var Board = new Board(),
    gameRunning = true,
    playerTurn;
var allTds = document.getElementsByTagName("td");
for (var td of allTds) {
    addEvent("click", td, TapOnBoard);
}

changeNowPlaying();

function addEvent(event, element, func) {
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, func);
    } else {
        element["on" + event] = func;
    }
}

function changeNowPlaying() {
    playerTurn = (playerTurn == null || playerTurn == Players.playerTwo) ? Players.playerOne : Players.playerTwo;
    document.getElementById("nowPlaying").innerText = playerSignToPlayerNumber(playerTurn);
}

function TapOnBoard(Node) {
    if (gameRunning) {
        var index = convertTdNodeToArrayIndex(Node.target);
        if (Board.slotIsEmpty(index)) {
            markSlot(Node.target, index);
            CheckGameFinished();
            changeNowPlaying();
        } else {
            alert("error.. ");
        }
    }
}

function CheckGameFinished() {
    var winSlots = Board.checkWin();
    if (winSlots) {
        alert(playerSignToPlayerNumber(playerTurn) + " is win!");
        markSlotsThatWin(winSlots);
        gameRunning = false;
    } else {
        if (Board.boardIsFull()) {
            alert("draw!");
            gameRunning = false;
        }
    }
}

function markSlotsThatWin(winSlots) {
    var getAllTds = document.querySelectorAll("table#board tr td");
    for (var i = 0; i < winSlots.length; i++) {
        var getSlot = winSlots[i];
        var tdPosition = (getSlot[0] * 3) + getSlot[1];
        getAllTds[tdPosition].style.backgroundColor = "#2ecc71";
        getAllTds[tdPosition].style.color = "white";
    }
}

function markSlot(uiSlot, slot) {
    Board.markSlot(slot, playerTurn);
    uiSlot.innerText = playerTurn;

}

function playerSignToPlayerNumber(sign) {
    if (sign == Players.playerOne) {
        return "Player 1";
    }

    return "Player 2";
}

function convertTdNodeToArrayIndex(Node) {
    var getAllTds = document.querySelectorAll("table#board tr td");
    var index;
    for (var i = 0; i < getAllTds.length; i++) {
        if (getAllTds[i].isSameNode(Node)) {
            index = i;
        }
    }

    var row = Math.floor(index / 3)
    var col = index % 3;

    return [row, col];
}

function resetGame() {
    Board.reset();
    playerTurn = Players.playerOne;
    document.getElementById("nowPlaying").innerText = playerSignToPlayerNumber(playerTurn);
    resetTable();
}

function resetTable() {
    var getAllTds = document.querySelectorAll("table#board tr td");
    for (var i = 0; i < getAllTds.length; i++) {
        getAllTds[i].innerHTML = "";
    }
}