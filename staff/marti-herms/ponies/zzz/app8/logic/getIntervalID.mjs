const getIntervalID = () => {
    const intervalID = localStorage.intervalID !== undefined ? JSON.parse(localStorage.intervalID) : [];

    return intervalID;
}

export default getIntervalID;