import { useState, useEffect, useRef } from 'preact/hooks';

const Timer = ({ start, reset, onStop }) => {
    const [time, setTime] = useState({ m: 0, s: 0, ms: 0 });
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
            setTime({ m: 0, s: 0, ms: 0 });
        }
    }, [reset]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const now = Date.now();
                const elapsedTime = now - startTimeRef.current;

                const m = Math.floor((elapsedTime / 60000) % 60);
                const s = Math.floor((elapsedTime / 1000) % 60);
                const ms = Math.floor(elapsedTime % 1000);

                setTime({ m, s, ms });
            }, 10); // Intervalo de 10 ms para mejor precisión
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

    const formatTime = (unit, isMs = false) => {
        if (isMs) return unit < 100 ? (unit < 10 ? `00${unit}` : `0${unit}`) : unit;
        return unit < 10 ? `0${unit}` : unit;
    };

    return (
        <div>
            <div id="hms" className="w-full text-6xl text-center font-semibold text-yellow-400 mb-6">
                {`${formatTime(time.m)}:${formatTime(time.s)}:${formatTime(time.ms, true)}`}
            </div>
        </div>
    );
};

export default Timer;
