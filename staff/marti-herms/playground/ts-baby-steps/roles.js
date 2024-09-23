//enum type
var Roles;
(function (Roles) {
    Roles[Roles["Admin"] = 1] = "Admin";
    Roles[Roles["User"] = 2] = "User";
    Roles[Roles["Guest"] = 3] = "Guest";
})(Roles || (Roles = {}));
var user = Roles.Admin;
console.log(user);
var userRoleName = Roles[user];
console.log(userRoleName);
