function randomQuery() {
    const querys = ['LGBTQI+', 'lgbtqi+', 'gay', 'lesbian', 'homosexual', 'LGBTQ health', 'queer', 'gay pride']

    const query = querys[Math.floor(Math.random() * querys.length)]

    return query

}

export default randomQuery