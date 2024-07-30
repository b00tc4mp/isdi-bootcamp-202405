// interface Profile {
//     name: string,
//     userProfile: string,
//     musicGenre: string,
//     location: string,
//     password: string
// }
// function getUserData2(profile: Profile) {
//     return `${profile.name} ${profile.userProfile} ${profile.musicGenre} ${profile.location} ${profile.password}`;
// }
// console.log(getUserData2)
var band = {
    name: 'Barrenfields',
    userProfile: 'band',
    musicGenre: 'Punk',
    location: 'Madrid',
    password: 'barrenfields1'
};
function getUserData(profile) {
    return "".concat(profile.name, " ").concat(profile.userProfile, " ").concat(profile.location, " ").concat(profile.password);
}
console.log(getUserData);
