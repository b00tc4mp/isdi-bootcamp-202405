/**
 *Class Board.
 *
 * @class Board
 */

class Board {
    constructor() {
        this.A1 = { name: 'A1', top: A, left: _1, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('A1') };
        this.A2 = { name: 'A2', top: A, left: _2, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('A2') };
        this.A3 = { name: 'A3', top: A, left: _3, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('A3') };
        this.A4 = { name: 'A4', top: A, left: _4, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('A4') };
        this.A5 = { name: 'A5', top: A, left: _5, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('A5') };
        this.A6 = { name: 'A6', top: A, left: _6, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('A6') };
        this.A7 = { name: 'A7', top: A, left: _7, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('A7') };
        this.A8 = { name: 'A8', top: A, left: _8, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('A8') };
        this.B1 = { name: 'B1', top: B, left: _1, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('B1') };
        this.B2 = { name: 'B2', top: B, left: _2, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('B2') };
        this.B3 = { name: 'B3', top: B, left: _3, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('B3') };
        this.B4 = { name: 'B4', top: B, left: _4, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('B4') };
        this.B5 = { name: 'B5', top: B, left: _5, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('B5') };
        this.B6 = { name: 'B6', top: B, left: _6, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('B6') };
        this.B7 = { name: 'B7', top: B, left: _7, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('B7') };
        this.B8 = { name: 'B8', top: B, left: _8, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('B8') };
        this.C1 = { name: 'C1', top: C, left: _1, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('C1') };
        this.C2 = { name: 'C2', top: C, left: _2, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('C2') };
        this.C3 = { name: 'C3', top: C, left: _3, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('C3') };
        this.C4 = { name: 'C4', top: C, left: _4, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('C4') };
        this.C5 = { name: 'C5', top: C, left: _5, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('C5') };
        this.C6 = { name: 'C6', top: C, left: _6, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('C6') };
        this.C7 = { name: 'C7', top: C, left: _7, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('C7') };
        this.C8 = { name: 'C8', top: C, left: _8, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('C8') };
        this.D1 = { name: 'D1', top: D, left: _1, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('D1') };
        this.D2 = { name: 'D2', top: D, left: _2, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('D2') };
        this.D3 = { name: 'D3', top: D, left: _3, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('D3') };
        this.D4 = { name: 'D4', top: D, left: _4, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('D4') };
        this.D5 = { name: 'D5', top: D, left: _5, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('D5') };
        this.D6 = { name: 'D6', top: D, left: _6, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('D6') };
        this.D7 = { name: 'D7', top: D, left: _7, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('D7') };
        this.D8 = { name: 'D8', top: D, left: _8, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('D8') };
        this.E1 = { name: 'E1', top: E, left: _1, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('E1') };
        this.E2 = { name: 'E2', top: E, left: _2, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('E2') };
        this.E3 = { name: 'E3', top: E, left: _3, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('E3') };
        this.E4 = { name: 'E4', top: E, left: _4, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('E4') };
        this.E5 = { name: 'E5', top: E, left: _5, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('E5') };
        this.E6 = { name: 'E6', top: E, left: _6, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('E6') };
        this.E7 = { name: 'E7', top: E, left: _7, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('E7') };
        this.E8 = { name: 'E8', top: E, left: _8, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('E8') };
        this.F1 = { name: 'F1', top: F, left: _1, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('F1') };
        this.F2 = { name: 'F2', top: F, left: _2, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('F2') };
        this.F3 = { name: 'F3', top: F, left: _3, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('F3') };
        this.F4 = { name: 'F4', top: F, left: _4, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('F4') };
        this.F5 = { name: 'F5', top: F, left: _5, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('F5') };
        this.F6 = { name: 'F6', top: F, left: _6, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('F6') };
        this.F7 = { name: 'F7', top: F, left: _7, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('F7') };
        this.F8 = { name: 'F8', top: F, left: _8, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('F8') };
        this.G1 = { name: 'G1', top: G, left: _1, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('G1') };
        this.G2 = { name: 'G2', top: G, left: _2, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('G2') };
        this.G3 = { name: 'G3', top: G, left: _3, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('G3') };
        this.G4 = { name: 'G4', top: G, left: _4, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('G4') };
        this.G5 = { name: 'G5', top: G, left: _5, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('G5') };
        this.G6 = { name: 'G6', top: G, left: _6, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('G6') };
        this.G7 = { name: 'G7', top: G, left: _7, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('G7') };
        this.G8 = { name: 'G8', top: G, left: _8, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('G8') };
        this.H1 = { name: 'H1', top: H, left: _1, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('H1') };
        this.H2 = { name: 'H2', top: H, left: _2, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('H2') };
        this.H3 = { name: 'H3', top: H, left: _3, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('H3') };
        this.H4 = { name: 'H4', top: H, left: _4, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('H4') };
        this.H5 = { name: 'H5', top: H, left: _5, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('H5') };
        this.H6 = { name: 'H6', top: H, left: _6, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('H6') };
        this.H7 = { name: 'H7', top: H, left: _7, occupancy: false, piece: undefined, colorDefault: 'black', tile: document.getElementById('H7') };
        this.H8 = { name: 'H8', top: H, left: _8, occupancy: false, piece: undefined, colorDefault: 'white', tile: document.getElementById('H8') };
    }

    getTile(top, left) {
        if (top < 0 || left < 0 || top >= 600 || left >= 600) {
            return OUTOFBOUNDS;
        }
        for (const key in this) {
            if (this[key].top === top && this[key].left === left) {
                return this[key].name;
            }
        }
    }

    getTileWithId(id) {
        for (const key in this) {
            if (this[key].tile === id) {
                return this[key].name;
            }
        }
    }

    updateBoard() {
        for (const key in this) {
            for (let i = 0; i < pieces.length; i++) {
                if (!this[key].occupancy && (this[key].name === pieces[i].position)) {
                    this[key].piece = pieces[i];
                    this[key].occupancy = true;
                }
            }
            if (this[key].occupancy && (this[key].name !== this[key].piece.position)) {
                this[key].occupancy = false;
                this[key].piece = undefined;
            }
        }
    }

}

Board.prototype.defaultColor = function () {
    for (const key in this) {
        if (this[key].colorDefault === 'black') {
            this[key].tile.style.backgroundColor = "rgb(50, 50, 50)"
        } else if (this[key].colorDefault === 'white') {
            this[key].tile.style.backgroundColor = "white"
        }
    }
}

Board.prototype.anyActive = function () {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].active === true) {
            return true;
        }
    }
    return false;
}

Board.prototype.getPieceByPosition = function (pos) {
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].position === pos) {
            return pieces[i];
        }
    }
}