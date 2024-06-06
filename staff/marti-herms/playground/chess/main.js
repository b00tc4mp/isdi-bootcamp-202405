let board = [[A1, A2, A3, A4, A5, A6, A7, A8],
[B1, B2, B3, B4, B5, B6, B7, B8],
[C1, C2, C3, C4, C5, C6, C7, C8],
[D1, D2, D3, D4, D5, D6, D7, D8],
[E1, E2, E3, E4, E5, E6, E7, E8],
[F1, F2, F3, F4, F5, F6, F7, F8],
[G1, G2, G3, G4, G5, G6, G7, G8],
[H1, H2, H3, H4, H5, H6, H7, H8]];

let pieces = [];

pieces.push(new Rook(1, board[0][0], 'black')); //0
pieces.push(new Knight(2, board[0][1], 'black')); //1
pieces.push(new Bishop(3, board[0][2], 'black')); //2
pieces.push(new Queen(4, board[0][3], 'black')); //3
pieces.push(new King(5, board[0][4], 'black')); //4
pieces.push(new Bishop(6, board[0][5], 'black')); //5
pieces.push(new Knight(7, board[0][6], 'black')); //6
pieces.push(new Rook(8, board[0][7], 'black')); //7
pieces.push(new Pawn(9, board[1][0], 'black')); //8
pieces.push(new Pawn(10, board[1][1], 'black')); //9
pieces.push(new Pawn(11, board[1][2], 'black')); //10
pieces.push(new Pawn(12, board[1][3], 'black')); //11
pieces.push(new Pawn(13, board[1][4], 'black')); //12
pieces.push(new Pawn(14, board[1][5], 'black')); //13
pieces.push(new Pawn(15, board[1][6], 'black')); //14
pieces.push(new Pawn(16, board[1][7], 'black')); //15

pieces.push(new Pawn(17, board[6][0], 'white')); //16
pieces.push(new Pawn(18, board[6][1], 'white')); //17
pieces.push(new Pawn(19, board[6][2], 'white')); //18
pieces.push(new Pawn(20, board[6][3], 'white')); //19
pieces.push(new Pawn(21, board[6][4], 'white')); //20
pieces.push(new Pawn(22, board[6][5], 'white')); //21
pieces.push(new Pawn(23, board[6][6], 'white')); //22
pieces.push(new Pawn(24, board[6][7], 'white')); //23
pieces.push(new Rook(25, board[7][0], 'white')); //24
pieces.push(new Knight(26, board[7][1], 'white')); //25
pieces.push(new Bishop(27, board[7][2], 'white')); //26
pieces.push(new Queen(28, board[7][3], 'white')); //27
pieces.push(new King(29, board[7][4], 'white')); //28
pieces.push(new Bishop(30, board[7][5], 'white')); //29
pieces.push(new Knight(31, board[7][6], 'white')); //30
pieces.push(new Rook(32, board[7][7], 'white')); //31



document.onclick = function (event) {
    console.log(event)
    let click = event.target;
    if (click.className === "pawn_black") {
        for (let i = 8; i < 16; i++) {
            if (pieces[i].id === click) {
                pieces[i].advance()
            }

        }
    } else if (click.className === "pawn_white") {
        for (let i = 16; i < 23; i++) {
            if (pieces[i].id === click) {
                pieces[i].advance()
            }

        }
    }
}

// document.onclick = function (event) {
//     //console.log(event)

//     if (event.target == pieces[8].id && pieces[8].moveChecker()) {
//         pieces[8].advance()
//     } else if (event.key === 'ArrowLeft') {
//         x -= TILE;
//     } else if (event.key === 'ArrowDown') {
//         y += TILE;
//     } else if (event.key === 'ArrowUp') {
//         y -= TILE;
//     }

//     pieces[8].id.style.left = pieces[8].left + 'px';
//     pieces[8].id.style.top = pieces[8].top + 'px';
// }


