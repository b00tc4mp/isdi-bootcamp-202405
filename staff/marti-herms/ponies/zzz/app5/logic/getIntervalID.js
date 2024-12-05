{
    const getIntervalID = () => {
        const intervalID = localStorage.intervalID !== undefined ? JSON.parse(localStorage.intervalID) : [];

        return intervalID;
    }

    logic.getIntervalID = getIntervalID;
}