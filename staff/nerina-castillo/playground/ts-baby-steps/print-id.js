function printId(id) {
    if (typeof id === "string") {
        console.log("ID: ".concat(id.toUpperCase()));
    }
    else {
        console.log("ID: ".concat(id));
    }
}
printId(123);
printId("abc123");
