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
import searchEvents from './searchEvents.js'
import getEvent from './getEvent.js'
import updateEvent from './updateEvent.js'

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
    getAllAttendanceEvents,
    searchEvents,
    getEvent,
    updateEvent
}

export default logic