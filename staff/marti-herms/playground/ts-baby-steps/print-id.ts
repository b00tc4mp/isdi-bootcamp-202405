//union type

function printId(id: number | string) {
    if (typeof id === "string") {
        console.log(`ID: ${id.toUpperCase()}`);
    } else {
        console.log(`ID: ${id}`);
    }
}

printId(123);
printId("abc123");   