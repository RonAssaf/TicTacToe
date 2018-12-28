function Board(WinGameInform, DrawGameInform) {
    let board = [new Array(3), new Array(3), new Array(3)];

    this.slotIsEmpty = (slot) => board[slot[0]][slot[1]] == null;
    this.winGame = WinGameInform;
    this.drawGame = DrawGameInform;

    this.markSlot = function (slot, mark) {
        board[slot[0]][slot[1]] = mark;
    };

    this.checkWin = () => checkVertical() || checkHorizontal() || checkSlant();

    this.boardIsFull = function() {
        return board.flat(Infinity).filter((t) => t != null).length === 9;
    };

    this.reset = function () {
        board = [new Array(3), new Array(3), new Array(3)];
    };

    function checkVertical() {
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] &&
                board[i][0] != null) {
                return [[i, 0], [i, 1], [i, 2]];
            }
        }
    }

    function checkHorizontal() {
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] &&
                board[0][i] != null) {
                return [[0, i], [1, i], [2, i]];
            }
        }
    }

    function checkSlant() {
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] &&
            board[1][1] != null) {
            return [[0, 0], [1, 1], [2, 2]];
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] &&
            (board[1][1] != null)) {
            return [[0, 2], [1, 1], [2, 0]];
        }
    }
}