
import { useState, useEffect, useRef } from 'preact/hooks';

const Timer = ({ start }) => {
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
    const [isRunning, setIsRunning] = useState(start);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    let { h, m, s } = prevTime;
                    s++;
                    if (s > 59) { m++; s = 0; }
                    if (m > 59) { h++; m = 0; }
                    if (h > 24) { h = 0; }
                    return { h, m, s };
                });
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const reset = () => {
        clearInterval(intervalRef.current);
        setTime({ h: 0, m: 0, s: 0 });
        setIsRunning(false);
    };

    const formatTime = (unit) => unit < 10 ? `0${unit}` : unit;

    return (
        <div>
            <div id="hms">
                {`${formatTime(time.h)}:${formatTime(time.m)}:${formatTime(time.s)}`}
            </div>
            <button className="start" onClick={() => setIsRunning(true)}>Start</button>
            <button className="stop" onClick={() => setIsRunning(false)}>Stop</button>
            <button className="reiniciar" onClick={reset}>Reset</button>
        </div>
    );
};

export default Timer;
