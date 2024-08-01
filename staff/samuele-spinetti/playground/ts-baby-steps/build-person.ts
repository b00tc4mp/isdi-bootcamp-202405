//https://www.typescriptlang.org/docs/handbook/2/objects.html

// type User = {
//     name: string,
//     age: number,
//     isAdmin: boolean
// }

interface User {
    name: string,
    age: number,
    isAdmin: boolean
}

function getUserInfo(user: User): string {
    return `${user.name} is ${user.age} years old. Admin: ${user.isAdmin}`
}

const user: User = {
    name: "Alice",
    age: 30,
    isAdmin: true,
};

console.log(getUserInfo(user))