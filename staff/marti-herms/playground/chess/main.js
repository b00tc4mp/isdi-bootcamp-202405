let board = new Board();
board.defaultColor();

let pieces = [];
let removedPieces = [];

pieces[0] = (b_rook1 = new Rook(1, board.A1, 'rook1', 'black'));
pieces[1] = (b_knight1 = new Knight(2, board.A2, 'knight1', 'black'));
pieces[2] = (b_bishop1 = new Bishop(3, board.A3, 'bishop1', 'black'));
pieces[3] = (b_queen = new Queen(4, board.A4, 'queen', 'black'));
pieces[4] = (b_king = new King(5, board.A5, 'king', 'black'));
pieces[5] = (b_bishop2 = new Bishop(6, board.A6, 'bishop2', 'black'));
pieces[6] = (b_knight2 = new Knight(7, board.A7, 'knight2', 'black'));
pieces[7] = (b_rook2 = new Rook(8, board.A8, 'rook2', 'black'));
pieces[8] = (b_pawn1 = new Pawn(9, board.B1, 'pawn1', 'black'));
pieces[9] = (b_pawn2 = new Pawn(10, board.B2, 'pawn2', 'black'));
pieces[10] = (b_pawn3 = new Pawn(11, board.B3, 'pawn3', 'black'));
pieces[11] = (b_pawn4 = new Pawn(12, board.B4, 'pawn4', 'black'));
pieces[12] = (b_pawn5 = new Pawn(13, board.B5, 'pawn5', 'black'));
pieces[13] = (b_pawn6 = new Pawn(14, board.B6, 'pawn6', 'black'));
pieces[14] = (b_pawn7 = new Pawn(15, board.B7, 'pawn7', 'black'));
pieces[15] = (b_pawn8 = new Pawn(16, board.B8, 'pawn8', 'black'));
pieces[16] = (w_pawn1 = new Pawn(17, board.G1, 'pawn9', 'white'));
pieces[17] = (w_pawn2 = new Pawn(18, board.G2, 'pawn10', 'white'));
pieces[18] = (w_pawn3 = new Pawn(19, board.G3, 'pawn11', 'white'));
pieces[19] = (w_pawn4 = new Pawn(20, board.G4, 'pawn12', 'white'));
pieces[20] = (w_pawn5 = new Pawn(21, board.G5, 'pawn13', 'white'));
pieces[21] = (w_pawn6 = new Pawn(22, board.G6, 'pawn14', 'white'));
pieces[22] = (w_pawn7 = new Pawn(23, board.G7, 'pawn15', 'white'));
pieces[23] = (w_pawn8 = new Pawn(24, board.G8, 'pawn16', 'white'));
pieces[24] = (w_rook1 = new Rook(25, board.H1, 'rook1', 'pawn17', 'white'));
pieces[25] = (w_knight1 = new Knight(26, board.H2, 'knight1', 'white'));
pieces[26] = (w_bishop1 = new Bishop(27, board.H3, 'bishop1', 'white'));
pieces[27] = (w_queen = new Queen(28, board.H4, 'queen', 'white'));
pieces[28] = (w_king = new King(29, board.H5, 'king', 'white'));
pieces[29] = (w_bishop2 = new Bishop(30, board.H6, 'bishop2', 'white'));
pieces[30] = (w_knight2 = new Knight(31, board.H7, 'knight2', 'white'));
pieces[31] = (w_rook2 = new Rook(32, board.H8, 'rook2', 'white'));


board.updateBoard();
console.log(board)


document.onclick = function (event) {   //Evalua cada click
    console.log(event)

    let click = event.target;   //guarda el id del elemento clickado

    if (click.classList[0] === "pawn_black" && !board.anyActive()) {
        for (let i = 8; i < 16; i++) {
            if (pieces[i].id === click) {
                pieces[i].active = true;
                pieces[i].disablePieces();
                pieces[i].moveChecker();

            }

        }
    } else if (click.classList[0] === "pawn_white" && !board.anyActive()) {
        for (let i = 16; i < 24; i++) {
            if (pieces[i].id === click) {
                pieces[i].active = true;
                pieces[i].disablePieces();
                pieces[i].moveChecker();
            }

        }
    } else if (click.classList[0] === "rook_black" && !board.anyActive()) {
        if (pieces[0].id === click) {
            //pieces[0].id rook negro hace algo
        } else if (pieces[7].id === click) {
            //pieces[7].id rook negro hace algo
        }
    } else if (click.classList[0] === "rook_white" && !board.anyActive()) {
        if (pieces[24].id === click) {
            //pieces[24].id rook negro hace algo
        } else if (pieces[31].id === click) {
            //pieces[31].id rook negro hace algo
        }
    } else if (click.classList[0] === "knight_black" && !board.anyActive()) {
        if (pieces[1].id === click) {
            //pieces[1].id rook negro hace algo
        } else if (pieces[6].id === click) {
            //pieces[6].id rook negro hace algo
        }
    } else if (click.classList[0] === "knight_white" && !board.anyActive()) {
        if (pieces[25].id === click) {
            //pieces[25].id rook negro hace algo
        } else if (pieces[30].id === click) {
            //pieces[30].id rook negro hace algo
        }
    } else if (click.classList[0] === "bishop_black" && !board.anyActive()) {
        if (pieces[2].id === click) {
            //pieces[2].id rook negro hace algo
        } else if (pieces[5].id === click) {
            //pieces[5].id rook negro hace algo
        }
    } else if (click.classList[0] === "bishop_white" && !board.anyActive()) {
        if (pieces[26].id === click) {
            //pieces[26].id rook negro hace algo
        } else if (pieces[29].id === click) {
            //pieces[29].id rook negro hace algo
        }
    } else if (click.classList[0] === "queen_black" && !board.anyActive()) {
        //pieces[3].id reina negra hace algo
    } else if (click.classList[0] === "queen_white" && !board.anyActive()) {
        //pieces[27].id reina blanca hace algo
    } else if (click.classList[0] === "king_black" && !board.anyActive()) {
        //pieces[4].id rey negro hace algo
    } else if (click.classList[0] === "king_white" && !board.anyActive()) {
        //pieces[28].id rey blanco hace algo
    }
}