"use strict";
//https://www.typescriptlang.org/docs/handbook/2/objects.html
function getUserInfo(user) {
    return `${user.name} is ${user.age} years old. Admin: ${user.isAdmin}`;
}
const user = {
    name: "Alice",
    age: 30,
    isAdmin: true,
};
console.log(getUserInfo(user));
