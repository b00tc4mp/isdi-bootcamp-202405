let board = new Board();

let pieces = [];

pieces.push(b_rook1 = new Rook(1, board.A1, 'rook1', 'black')); //0
pieces.push(b_knight1 = new Knight(2, board.A2, 'knight1', 'black')); //1
pieces.push(b_bishop1 = new Bishop(3, board.A3, 'bishop1', 'black')); //2
pieces.push(b_queen = new Queen(4, board.A4, 'queen', 'black')); //3
pieces.push(b_king = new King(5, board.A5, 'king', 'black')); //4
pieces.push(b_bishop2 = new Bishop(6, board.A6, 'bishop2', 'black')); //5
pieces.push(b_knight2 = new Knight(7, board.A7, 'knight2', 'black')); //6
pieces.push(b_rook2 = new Rook(8, board.A8, 'rook2', 'black')); //7
pieces.push(b_pawn1 = new Pawn(9, board.B1, 'pawn1', 'black')); //8
pieces.push(b_pawn2 = new Pawn(10, board.B2, 'pawn2', 'black')); //9
pieces.push(b_pawn3 = new Pawn(11, board.B3, 'pawn3', 'black')); //10
pieces.push(b_pawn4 = new Pawn(12, board.B4, 'pawn4', 'black')); //11
pieces.push(b_pawn5 = new Pawn(13, board.B5, 'pawn5', 'black')); //12
pieces.push(b_pawn6 = new Pawn(14, board.B6, 'pawn6', 'black')); //13
pieces.push(b_pawn7 = new Pawn(15, board.B7, 'pawn7', 'black')); //14
pieces.push(b_pawn8 = new Pawn(16, board.B8, 'pawn8', 'black')); //15

pieces.push(w_pawn1 = new Pawn(17, board.G1, 'pawn9', 'white')); //16
pieces.push(w_pawn2 = new Pawn(18, board.G2, 'pawn10', 'white')); //17
pieces.push(w_pawn3 = new Pawn(19, board.G3, 'pawn11', 'white')); //18
pieces.push(w_pawn4 = new Pawn(20, board.G4, 'pawn12', 'white')); //19
pieces.push(w_pawn5 = new Pawn(21, board.G5, 'pawn13', 'white')); //20
pieces.push(w_pawn6 = new Pawn(22, board.G6, 'pawn14', 'white')); //21
pieces.push(w_pawn7 = new Pawn(23, board.G7, 'pawn15', 'white')); //22
pieces.push(w_pawn8 = new Pawn(24, board.G8, 'pawn16', 'white')); //23
pieces.push(w_rook1 = new Rook(25, board.H1, 'rook1', 'pawn17', 'white')); //24
pieces.push(w_knight1 = new Knight(26, board.H2, 'knight1', 'white')); //25
pieces.push(w_bishop1 = new Bishop(27, board.H3, 'bishop1', 'white')); //26
pieces.push(w_queen = new Queen(28, board.H4, 'queen', 'white')); //27
pieces.push(w_king = new King(29, board.H5, 'king', 'white')); //28
pieces.push(w_bishop2 = new Bishop(30, board.H6, 'bishop2', 'white')); //29
pieces.push(w_knight2 = new Knight(31, board.H7, 'knight2', 'white')); //30
pieces.push(w_rook2 = new Rook(32, board.H8, 'rook2', 'white')); //31



board.updateBoard();
console.log(board)


document.onclick = function (event) {   //Evalua cada click
    console.log(event)

    let click = event.target;   //guarda el id del elemento clickado

    if (click.className === "pawn_black") {
        for (let i = 8; i < 16; i++) {
            if (pieces[i].id === click) {
                pieces[i].moveChecker();

            }

        }
    } else if (click.className === "pawn_white") {
        for (let i = 16; i < 24; i++) {
            if (pieces[i].id === click) {
                pieces[i].moveChecker();
            }

        }
    } else if (click.className === "rook_black") {
        if (pieces[0].id === click) {
            //pieces[0].id rook negro hace algo
        } else if (pieces[7].id === click) {
            //pieces[7].id rook negro hace algo
        }
    } else if (click.className === "rook_white") {
        if (pieces[24].id === click) {
            //pieces[24].id rook negro hace algo
        } else if (pieces[31].id === click) {
            //pieces[31].id rook negro hace algo
        }
    } else if (click.className === "knight_black") {
        if (pieces[1].id === click) {
            //pieces[1].id rook negro hace algo
        } else if (pieces[6].id === click) {
            //pieces[6].id rook negro hace algo
        }
    } else if (click.className === "knight_white") {
        if (pieces[25].id === click) {
            //pieces[25].id rook negro hace algo
        } else if (pieces[30].id === click) {
            //pieces[30].id rook negro hace algo
        }
    } else if (click.className === "bishop_black") {
        if (pieces[2].id === click) {
            //pieces[2].id rook negro hace algo
        } else if (pieces[5].id === click) {
            //pieces[5].id rook negro hace algo
        }
    } else if (click.className === "bishop_white") {
        if (pieces[26].id === click) {
            //pieces[26].id rook negro hace algo
        } else if (pieces[29].id === click) {
            //pieces[29].id rook negro hace algo
        }
    } else if (click.className === "queen_black") {
        //pieces[3].id reina negra hace algo
    } else if (click.className === "queen_white") {
        //pieces[27].id reina blanca hace algo
    } else if (click.className === "king_black") {
        //pieces[4].id rey negro hace algo
    } else if (click.className === "king_white") {
        //pieces[28].id rey blanco hace algo
    }
}