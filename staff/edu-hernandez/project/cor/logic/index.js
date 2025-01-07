import getAllEvents from './getAllEvents.js'
import getUserName from './getUserName.js'
import registerUser from './registerUser.js'
import createEvent from './createEvent.js'
import createReview from './createReview.js'
import deleteEvent from './deleteEvent.js'
import toggleFavEvent from './toggleUserEvent.js'
import toggleGoingEvent from './toggleGoingEvent.js'
import authenticateUser from './authenticateUser.js'
import searchEvent from './searchEvent.js'
import getAllFavEvents from './getAllFavEvents.js'
import updateEventCaption from './updateEventCaption.js'
import getAllRecommendedEvents from './getAllRecommendedEvents.js'
import getAllPopularEvents from './getAllPopularEvents.js'
import getAllMapEvents from './getAllMapEvents.js'
import getAllGoingEvents from './getAllGoingEvents.js'
import getUsernameUser from './getUsernameUser.js'

const logic = {
    authenticateUser,
    createEvent,
    createReview,
    deleteEvent,
    getAllFavEvents,
    getAllMapEvents,
    getAllEvents,
    getAllGoingEvents,
    getAllPopularEvents,
    getUserName,
    getUsernameUser,
    registerUser,
    toggleFavEvent,
    toggleGoingEvent,
    updateEventCaption,
    searchEvent,
    createReview,
    getAllRecommendedEvents,
}

export default logic