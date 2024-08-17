import registerUser from './registerUser.js'
import loginUser from './loginUser.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import getUserName from './getUserName.js'
import getUserId from './getUserId.js'
import createEvent from './createEvent.js'
import logoutUser from './logoutUser.js'
import getAllEvents from './getAllEvents.js'
import deleteEvent from './deleteEvent.js'
import toggleLikeEvents from './toggleLikeEvents.js'
import getAllLikeEvents from './getAllLikeEvents.js'
import toggleAttendanceEvent from './toggleAttendanceEvent.js'
import getAllAttendanceEvent from './getAllAttendanceEvents.js'
import searchEvents from './searchEvents.js'

const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    getUserName,
    getUserId,
    createEvent,
    logoutUser,
    getAllEvents,
    deleteEvent,
    toggleLikeEvents,
    getAllLikeEvents,
    toggleAttendanceEvent,
    getAllAttendanceEvent,
    searchEvents

}

export default logic