function isUserLoggedIn() {
    //if (sessionStorage.username) return true
    //return false

    // return sessionStorage.username ? true : false

    return !!sessionStorage.username
}

export default isUserLoggedIn
