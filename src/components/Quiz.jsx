import { useState } from 'preact/hooks';
import Timer from './Timer.jsx';

const Quiz = () => {
    const questions = [
        {
            question: "¿Cuál es el índice Gini?",
            options: ["Índice de desempleo", "Índice de educación", "Índice de poder adquisitivo", "Índice de desigualdad de la riquesa"],
            correctAnswer: "Índice de desigualdad de la riquesa"
        },
        {
            question: "¿Cúal es el apodo por el que se conoce a la ciudad de Roma?",
            options: ["La ciudad eterna", "La bien amada de Dios", "La ciudad de Pedro", "La cuna de la civilización"],
            correctAnswer: "La ciudad eterna"
        },
        {
            question: "¿Cúal es el nombre del creador de las Leyes de la Robótica?",
            options: ["Pablo Coelho", "Mark Twain", "Victor Hugo", "Isaac Asimov"],
            correctAnswer: "Isaac Asimov"
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [startTimer, setStartTimer] = useState(true);
    const [totalTime, setTotalTime] = useState(0);

    const handleAnswer = (option) => {
        if (option === questions[currentQuestionIndex].correctAnswer) {
            setIsAnswered(true);
            setTimeout(() => {
                setIsAnswered(false);
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    setStartTimer(false); // Detiene el cronómetro
                    setQuizCompleted(true); // Marca el quiz como completado
                }
            }, 1000);
        }
    };

    const handleTimerStop = (time) => {
        setTotalTime(time);
        console.log(`Total time: ${time} ms`);
    };

    return (
        <div class="flex flex-col justify-center">
            <Timer start={startTimer} reset={false} onStop={handleTimerStop} />
            {!quizCompleted ? (
                <div>
                    <h2 className="text-4xl">{questions[currentQuestionIndex].question}</h2>
                    <div className="flex flex-col">
                        {questions[currentQuestionIndex].options.map(option => (
                            <button className="text-start text-slate-800 font-semibold text-2xl bg-gray-200 hover:bg-gray-300 border-s-2 border-slate-800 shadow-2xl shadow-gray-800 first:mt-6 mb-6 py-3 px-6 w-full rounded-lg" 
                                key={option} 
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-2xl">
                    <h2 className="text-4xl text-center text-pink-500 uppercase font-bold">¡Felicidades lo has completado!</h2>
                    <p className="my-3">Total Time: {totalTime} ms</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
