import { useState, useEffect } from 'preact/hooks';
import Timer from './Timer.jsx';
import TiempoFormato from './TiempoFormato.jsx';

function OpcionRespuesta({ texto, esCorrecta, onAnswer }) {
  const [fondo, setFondo] = useState('bg-slate-200');

  const handleClick = () => {
    setFondo(esCorrecta ? 'bg-green-500' : 'bg-red-500');
    onAnswer(esCorrecta);
  };

  return (
    <button
      className={`py-2 px-4 first:mt-4 mb-4 text-slate-700 text-xl font-semibold text-start shadow-lg rounded ${fondo}`}
      onClick={handleClick}
    >
      {texto}
    </button>
  );
}

const Quiz = () => {
  const questions = [
    {
      question: "¿Cuál es el índice Gini?",
      options: [
        "A - Índice de desempleo",
        "B - Índice de educación",
        "C - Índice de poder adquisitivo",
        "D - Índice de desigualdad de la riqueza",
      ],
      correctAnswer: "D - Índice de desigualdad de la riqueza",
    },
    {
      question: "¿Cuál es el apodo por el que se conoce a la ciudad de Roma?",
      options: [
        "A - La ciudad eterna",
        "B - La bien amada de Dios",
        "C - La ciudad de Pedro",
        "D - La cuna de la civilización",
      ],
      correctAnswer: "A - La ciudad eterna",
    },
    {
      question: "¿Cuál es el nombre del creador de las Leyes de la Robótica?",
      options: [
        "A - Pablo Coelho",
        "B - Mark Twain",
        "C - Victor Hugo",
        "D - Isaac Asimov",
      ],
      correctAnswer: "D - Isaac Asimov",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [resultsSent, setResultsSent] = useState(false);

  const handleAnswer = (esCorrecta) => {
    if (esCorrecta) {
      setIsAnswered(true);
      setTimeout(() => {
        setIsAnswered(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setStartTimer(false);
          setQuizCompleted(true);
        }
      }, 1000);
    }
  };

  const handleTimerStop = (time) => {
    console.log(`Total time captured: ${time} ms`);
    setTotalTime(time);
  };

  useEffect(() => {
    if (quizCompleted && !resultsSent && totalTime > 0) {
      enviarResultados(totalTime);
    }
  }, [quizCompleted, totalTime]);

  const enviarResultados = async (time) => {
    if (resultsSent) return;
    setResultsSent(true);

    const apodo = localStorage.getItem('apodo');
    if (apodo) {
      try {
        const response = await fetch(`/api/actualizaciones?apodo=${apodo}&tiempo=${time}`, {
          method: 'GET',
        });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        setShowFinalTime(true);
      } catch (error) {
        console.error('Error al enviar los resultados:', error);
      }
    } else {
      console.error('No se encontró el apodo en localStorage');
    }
  };

  return (
    <div class="w-full flex flex-col justify-center">
      {!showFinalTime && (
        <Timer start={startTimer} reset={false} onStop={handleTimerStop} />
      )}
      {!quizCompleted ? (
        <div className="w-full mt-10 p-4">
          <h2 className="text-3xl bg-slate-200 py-5 px-4 rounded-lg shadow-lg">
            {questions[currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col">
            {questions[currentQuestionIndex].options.map((option) => (
              <OpcionRespuesta
                key={option}
                texto={option}
                esCorrecta={option === questions[currentQuestionIndex].correctAnswer}
                onAnswer={handleAnswer}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-2xl flex flex-col justify-center items-center w-full">
          <TiempoFormato milisegundos={totalTime} />
          <h2 className="text-4xl text-center text-pink-500 uppercase font-bold">
            ¡Felicidades lo has completado!
          </h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
