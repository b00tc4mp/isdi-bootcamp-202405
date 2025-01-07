import createEvent from './createEvent'
import createReview from './createReview'
import deleteEvent from './deleteEvent'
import getAllEvents from './getAllEvents'
import getAllFavEvents from './getAllFavEvents'
import getAllUserEvents from './getAllUserEvents'
import getAllPopularEvents from './getAllPopularEvents'
import getUserId from './getUserId'
import getUserName from './getUserName'
import getUsernameUser from './getUsernameUser'
import isUserLoggedIn from './isUserLoggedIn'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import registerUser from './registerUser'
import searchEvent from './searchEvent'
import toggleFavEvent from './toggleFavEvent'
import toggleFollowUser from './toggleFollowUser'
import toggleGoingEvent from './toggleGoingEvent'
import updateEventCaption from './updateEventCaption'
import getAllRecommendedEvents from './getAllRecommendedEvents'
import getAllMapEvents from './getAllMapEvents'
import getAllGoingEvents from './getAllGoingEvents'

const logic = {
    createEvent,
    createReview,
    deleteEvent,
    getAllEvents,
    getAllFavEvents,
    getAllUserEvents,
    getAllMapEvents,
    getAllRecommendedEvents,
    getAllPopularEvents,
    getAllGoingEvents,
    getUserId,
    getUserName,
    getUsernameUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    searchEvent,
    toggleFavEvent,
    toggleFollowUser,
    toggleGoingEvent,
    updateEventCaption
}

export default logic