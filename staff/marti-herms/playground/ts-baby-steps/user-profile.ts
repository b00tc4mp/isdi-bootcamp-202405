//interface type

type Profile = {
    name: string,
    userProfile: string,
    musicGenre: string,
    location: string,
}

function getUserData(profile: Profile) {
    return `${profile.name} ${profile.userProfile} ${profile.musicGenre} ${profile.location}`;
}

const band: Profile = {
    name: 'Barrenfields',
    userProfile: 'band',
    musicGenre: 'Punk-Rock',
    location: 'Madrid',
}

console.log(getUserData(band))