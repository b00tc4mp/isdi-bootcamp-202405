const isUserLoggedIn =() => {
    return !!sessionStorage.username
}

export default isUserLoggedIn