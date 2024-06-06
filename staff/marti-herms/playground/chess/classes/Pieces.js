class Pieces {
    constructor() {
        initialize();
    }
}

Pieces.prototype.initialize = function () {
    let pawn1 = new Pawn(9, board[1][0], 'black');
    let pawn2 = new Pawn(10, board[1][1], 'black');
    let pawn3 = new Pawn(11, board[1][2], 'black');
    let pawn4 = new Pawn(12, board[1][3], 'black');
    let pawn5 = new Pawn(13, board[1][4], 'black');
    let pawn6 = new Pawn(14, board[1][5], 'black');
    let pawn7 = new Pawn(15, board[1][6], 'black');
    let pawn8 = new Pawn(16, board[1][7], 'black');
    let pawn9 = new Pawn(17, board[6][0], 'white');
    let pawn10 = new Pawn(18, board[6][1], 'white');
    let pawn11 = new Pawn(19, board[6][2], 'white');
    let pawn12 = new Pawn(20, board[6][3], 'white');
    let pawn13 = new Pawn(21, board[6][4], 'white');
    let pawn14 = new Pawn(22, board[6][5], 'white');
    let pawn15 = new Pawn(23, board[6][6], 'white');
    let pawn16 = new Pawn(24, board[6][7], 'white');

    let rook1 = new Rook(1, board[0][0], 'black');
    let rook2 = new Rook(8, board[0][7], 'black');
    let rook3 = new Rook(25, board[7][0], 'white');
    let rook4 = new Rook(32, board[7][7], 'white');

    let knight1 = new Knight(2, board[0][1], 'black');
    let knight2 = new Knight(7, board[0][6], 'black');
    let knight3 = new Knight(26, board[7][1], 'white');
    let knight4 = new Knight(31, board[7][6], 'white');

    let bishop1 = new Bishop(3, board[0][2], 'black');
    let bishop2 = new Bishop(6, board[0][5], 'black');
    let bishop3 = new Bishop(27, board[7][2], 'white');
    let bishop4 = new Bishop(30, board[7][5], 'white');

    let queen1 = new Queen(4, board[0][3], 'black');
    let king1 = new King(5, board[0][4], 'black');
    let queen2 = new Queen(28, board[7][3], 'white');
    let king2 = new King(29, board[7][4], 'white');
}