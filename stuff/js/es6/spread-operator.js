{
    function add(a, b, c) { return a + b + c }

    const n = [10, 20, 30]

    //console.log(add(n[0], n[1], n[2]))
    console.log(add(...n))
    // VM4561:6 60
}


{
    const o = { name: 'Oswald', age: 30 }

    //const p = { name: o.name, age: o.age }
    const p = { ...o }

    console.log(p)
    // VM4879: 6 { name: 'Oswald', age: 30 }
}


{
    const n = [10, 20, 30]

    //const m = [n[0], n[1], n[2]]
    const m = [...n]

    console.log(m)
    // VM5072:6 (3) [10, 20, 30]
}