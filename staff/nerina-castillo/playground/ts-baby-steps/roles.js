var Roles;
(function (Roles) {
    Roles[Roles["Admin"] = 1] = "Admin";
    Roles[Roles["User"] = 2] = "User";
})(Roles || (Roles = {}));
var user = Roles.Admin;
// enum Roles { Admin = 1, User, Guest }
// let user: Roles = string = Roles[1]
