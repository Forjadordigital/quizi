import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

const Timer = ({ start, reset, onStop }) => {
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (start) {
            setIsRunning(true);
            startTimeRef.current = Date.now(); // Guarda el tiempo de inicio
        } else {
            setIsRunning(false);
            clearInterval(intervalRef.current);
        }
    }, [start]);

    useEffect(() => {
        if (reset) {
            clearInterval(intervalRef.current);
            setTime({ h: 0, m: 0, s: 0 });
        }
    }, [reset]);

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
        } else {
            clearInterval(intervalRef.current);
            if (startTimeRef.current) {
                const endTime = Date.now();
                const totalTime = endTime - startTimeRef.current;
                onStop(totalTime); // Devuelve el tiempo total en ms
            }
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const formatTime = (unit) => unit < 10 ? `0${unit}` : unit;

    return (
        <div>
            <div id="hms" className="text-9xl text-center font-semibold text-slate-200 mb-6">
                {`${formatTime(time.h)}:${formatTime(time.m)}:${formatTime(time.s)}`}
            </div>
        </div>
    );
};

export default Timer;
