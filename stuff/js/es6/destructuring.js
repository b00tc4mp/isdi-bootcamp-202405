const home = {
    kitchen: {
        fridge: ['🍅', '🧅', '🥛', '🥚', '🥩', '🧀'],
        pantry: ['🍚', '🍝', '🥔']
    },
    room: {
        closet: ['👟', '🩲', '👕', '🎈', '💎']
    },
    toilette: {
        bath: ['🧼', '🧴', '🧽']
    }
}

const { kitchen: { fridge: [, , milk, , meat, cheese] }, room: { closet: [shoe, , tshirt, baloon, diamond] }, toilette: { bath: [, shampoo, sponge] } } = home

console.log(milk, meat, cheese, shoe, tshirt, baloon, diamond, shampoo, sponge)
// VM2380:16 🥛 🥩 🧀 👟 👕 🎈 💎 🧴 🧽