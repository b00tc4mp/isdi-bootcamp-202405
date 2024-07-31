//enum type

enum Roles { Admin = 1, User, Guest }

let user: Roles = Roles.Admin;
console.log(user);

let userRoleName: string = Roles[user];
console.log(userRoleName); 