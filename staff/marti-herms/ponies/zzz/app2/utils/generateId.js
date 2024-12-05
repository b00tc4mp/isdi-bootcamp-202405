function generateId() {
    var date = new Date().getTime().toString();
    var rdmNum = (Math.random()).toString().slice(2);
    var id = (+(rdmNum + date) / 1000000000000).toString(36);
    return id
}