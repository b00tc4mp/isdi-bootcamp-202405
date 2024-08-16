import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import createEvent from './createEvent.js'
import getAllEvents from './getAllEvents.js'
import deleteEvent from './deleteEvent.js'
import toggleLikeEvent from './toggleLikeEvent.js'
import getAllLikeEvents from './getAllLikeEvents.js'
import toggleAttendanceEvent from './toggleAttendanceEvent.js'
import getAllAttendanceEvents from './getAllAttendanceEvents.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    createEvent,
    getAllEvents,
    deleteEvent,
    toggleLikeEvent,
    getAllLikeEvents,
    toggleAttendanceEvent,
    getAllAttendanceEvents
}

export default logic