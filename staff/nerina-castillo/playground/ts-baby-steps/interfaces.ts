// interface Profile {
//     name: string,
//     userProfile: string,
//     musicGenre: string,
//     location: string,
// }

// function getUserData2(profile: Profile) {
//     return `${profile.name} ${profile.userProfile} ${profile.musicGenre} ${profile.location}`;
// }


// Interface with an optional property
const band: Profile = {
    name: 'Barrenfields',
    userProfile: 'band',
    musicGenre: 'Punk',
    location: 'Madrid',
}

interface Profile {
    name: string,
    userProfile: string,
    musicGenre?: string,
    location: string,
}

function getUserData(profile: Profile) {
    return `${profile.name} ${profile.userProfile} ${profile.location} `;
}