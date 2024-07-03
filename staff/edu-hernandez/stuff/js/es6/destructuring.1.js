{
    const fridge = { tomato: 1, onion: 2, milk: 1, egg: 11, tofu: 3, soya: 4 }

    const { tomato, onion, tofu, soya } = fridge

    console.log(tomato, onion, tofu, soya)
}

{
    const fridge = [1, 2, 1, 11, 3, 4]

    const [tomato, onion, , , tofu, soya] = fridge

    console.log(tomato, onion, tofu, soya)
}

{
    const fridge = [1, 2, 1, 11, 3, 4]

    const { 0: tomato, 1: onion, 4: tofu, 5: soya } = fridge

    console.log(tomato, onion, tofu, soya)
}

// VM1953: 6 1 2 3 4
// VM1953: 14 1 2 3 4
// VM1953: 22 1 2 3 4