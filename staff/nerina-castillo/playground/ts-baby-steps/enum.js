// enum Roles { Admin = 1, User }
// let user: Roles = Roles.Admin
var Roles;
(function (Roles) {
    Roles[Roles["Admin"] = 1] = "Admin";
    Roles[Roles["User"] = 2] = "User";
    Roles[Roles["Guest"] = 3] = "Guest";
})(Roles || (Roles = {}));
var user = string = Roles[1];
