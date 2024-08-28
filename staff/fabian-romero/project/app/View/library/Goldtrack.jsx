export default function Goldtrack({ startDate, endDate }) {
    console.debug('Goldtrack -> call')

    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    const totalDuration = end - start
    const elapsedDuration = now - start
    const progress = Math.min(100, (elapsedDuration / totalDuration) * 100)

    return (
        <div className="bg-cyan-100 rounded h-5 w-full relative overflow-hidden">
            <div
                className="bg-yellow-300 h-full transition-width duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-800 text-xs">
                {Math.round(progress)}%
            </div>
        </div>
    );
};