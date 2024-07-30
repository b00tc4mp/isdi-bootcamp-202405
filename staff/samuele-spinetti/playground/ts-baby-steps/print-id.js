"use strict";
// Function with a union type parameter
function printId(id) {
    console.log(`ID: ${id}`);
}
printId(101);
printId("abc-123");
//void is used where there is no data. For example, if a function does not return any value then you can specify void as return type.
