function generateId() {
    const date = new Date().getTime().toString();
    const rdmNum = (Math.random()).toString().slice(2);
    const id = (+(rdmNum + date) / 1000000000000).toString(36);
    return id
}