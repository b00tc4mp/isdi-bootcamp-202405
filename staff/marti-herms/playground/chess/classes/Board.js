/**
 *Class Board.
 *
 * @class Board
 */

class Board {
    constructor() {
        this.A1 = { name: 'A1', top: A, left: _1, occupancy: false, piece: undefined };
        this.A3 = { name: 'A3', top: A, left: _3, occupancy: false, piece: undefined };
        this.A2 = { name: 'A2', top: A, left: _2, occupancy: false, piece: undefined };
        this.A4 = { name: 'A4', top: A, left: _4, occupancy: false, piece: undefined };
        this.A5 = { name: 'A5', top: A, left: _5, occupancy: false, piece: undefined };
        this.A6 = { name: 'A6', top: A, left: _6, occupancy: false, piece: undefined };
        this.A7 = { name: 'A7', top: A, left: _7, occupancy: false, piece: undefined };
        this.A8 = { name: 'A8', top: A, left: _8, occupancy: false, piece: undefined };
        this.B1 = { name: 'B1', top: B, left: _1, occupancy: false, piece: undefined };
        this.B2 = { name: 'B2', top: B, left: _2, occupancy: false, piece: undefined };
        this.B3 = { name: 'B3', top: B, left: _3, occupancy: false, piece: undefined };
        this.B4 = { name: 'B4', top: B, left: _4, occupancy: false, piece: undefined };
        this.B5 = { name: 'B5', top: B, left: _5, occupancy: false, piece: undefined };
        this.B6 = { name: 'B6', top: B, left: _6, occupancy: false, piece: undefined };
        this.B7 = { name: 'B7', top: B, left: _7, occupancy: false, piece: undefined };
        this.B8 = { name: 'B8', top: B, left: _8, occupancy: false, piece: undefined };
        this.C1 = { name: 'C1', top: C, left: _1, occupancy: false, piece: undefined };
        this.C2 = { name: 'C2', top: C, left: _2, occupancy: false, piece: undefined };
        this.C3 = { name: 'C3', top: C, left: _3, occupancy: false, piece: undefined };
        this.C4 = { name: 'C4', top: C, left: _4, occupancy: false, piece: undefined };
        this.C5 = { name: 'C5', top: C, left: _5, occupancy: false, piece: undefined };
        this.C6 = { name: 'C6', top: C, left: _6, occupancy: false, piece: undefined };
        this.C7 = { name: 'C7', top: C, left: _7, occupancy: false, piece: undefined };
        this.C8 = { name: 'C8', top: C, left: _8, occupancy: false, piece: undefined };
        this.D1 = { name: 'D1', top: D, left: _1, occupancy: false, piece: undefined };
        this.D2 = { name: 'D2', top: D, left: _2, occupancy: false, piece: undefined };
        this.D3 = { name: 'D3', top: D, left: _3, occupancy: false, piece: undefined };
        this.D4 = { name: 'D4', top: D, left: _4, occupancy: false, piece: undefined };
        this.D5 = { name: 'D5', top: D, left: _5, occupancy: false, piece: undefined };
        this.D6 = { name: 'D6', top: D, left: _6, occupancy: false, piece: undefined };
        this.D7 = { name: 'D7', top: D, left: _7, occupancy: false, piece: undefined };
        this.D8 = { name: 'D8', top: D, left: _8, occupancy: false, piece: undefined };
        this.E1 = { name: 'E1', top: E, left: _1, occupancy: false, piece: undefined };
        this.E2 = { name: 'E2', top: E, left: _2, occupancy: false, piece: undefined };
        this.E3 = { name: 'E3', top: E, left: _3, occupancy: false, piece: undefined };
        this.E4 = { name: 'E4', top: E, left: _4, occupancy: false, piece: undefined };
        this.E5 = { name: 'E5', top: E, left: _5, occupancy: false, piece: undefined };
        this.E6 = { name: 'E6', top: E, left: _6, occupancy: false, piece: undefined };
        this.E7 = { name: 'E7', top: E, left: _7, occupancy: false, piece: undefined };
        this.E8 = { name: 'E8', top: E, left: _8, occupancy: false, piece: undefined };
        this.F1 = { name: 'F1', top: F, left: _1, occupancy: false, piece: undefined };
        this.F2 = { name: 'F2', top: F, left: _2, occupancy: false, piece: undefined };
        this.F3 = { name: 'F3', top: F, left: _3, occupancy: false, piece: undefined };
        this.F4 = { name: 'F4', top: F, left: _4, occupancy: false, piece: undefined };
        this.F5 = { name: 'F5', top: F, left: _5, occupancy: false, piece: undefined };
        this.F6 = { name: 'F6', top: F, left: _6, occupancy: false, piece: undefined };
        this.F7 = { name: 'F7', top: F, left: _7, occupancy: false, piece: undefined };
        this.F8 = { name: 'F8', top: F, left: _8, occupancy: false, piece: undefined };
        this.G1 = { name: 'G1', top: G, left: _1, occupancy: false, piece: undefined };
        this.G2 = { name: 'G2', top: G, left: _2, occupancy: false, piece: undefined };
        this.G3 = { name: 'G3', top: G, left: _3, occupancy: false, piece: undefined };
        this.G4 = { name: 'G4', top: G, left: _4, occupancy: false, piece: undefined };
        this.G5 = { name: 'G5', top: G, left: _5, occupancy: false, piece: undefined };
        this.G6 = { name: 'G6', top: G, left: _6, occupancy: false, piece: undefined };
        this.G7 = { name: 'G7', top: G, left: _7, occupancy: false, piece: undefined };
        this.G8 = { name: 'G8', top: G, left: _8, occupancy: false, piece: undefined };
        this.H1 = { name: 'H1', top: H, left: _1, occupancy: false, piece: undefined };
        this.H2 = { name: 'H2', top: H, left: _2, occupancy: false, piece: undefined };
        this.H3 = { name: 'H3', top: H, left: _3, occupancy: false, piece: undefined };
        this.H4 = { name: 'H4', top: H, left: _4, occupancy: false, piece: undefined };
        this.H5 = { name: 'H5', top: H, left: _5, occupancy: false, piece: undefined };
        this.H6 = { name: 'H6', top: H, left: _6, occupancy: false, piece: undefined };
        this.H7 = { name: 'H7', top: H, left: _7, occupancy: false, piece: undefined };
        this.H8 = { name: 'H8', top: H, left: _8, occupancy: false, piece: undefined };

        for (const key in this) {
            this[key].tile = document.getElementById(this[key].name);
        }
    }

    get tile() {

    }

    updateBoard() {
        for (const key in this) {
            for (let i = 0; i < pieces.length; i++) {
                if (this[key].name === pieces[i].position) {
                    this[key].piece = pieces[i];
                    this[key].occupancy = true;
                }
            }
        }
    }
}