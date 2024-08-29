import { useState } from 'preact/hooks';
import Timer from './Timer.jsx'; // Asumo que ya tienes este componente

function OpcionRespuesta({ texto, esCorrecta, onAnswer }) {
  const [fondo, setFondo] = useState('bg-slate-200'); // Estado para el fondo

  const handleClick = () => {
    if (esCorrecta) {
      setFondo('bg-green-500'); // Cambiar a verde si es correcta
    } else {
      setFondo('bg-red-500'); // Cambiar a rojo si es incorrecta
    }
    // Llamamos a la función proporcionada por el componente padre
    onAnswer(esCorrecta);
  };

  return (
    <button
      className={`py-2 px-4 first:mt-4 mb-4 text-slate-700 font-semibold text-start rounded ${fondo}`} // Aplicamos la clase de fondo dinámica
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
      options: ["Índice de desempleo", "Índice de educación", "Índice de poder adquisitivo", "Índice de desigualdad de la riqueza"],
      correctAnswer: "Índice de desigualdad de la riqueza"
    },
    {
      question: "¿Cuál es el apodo por el que se conoce a la ciudad de Roma?",
      options: ["La ciudad eterna", "La bien amada de Dios", "La ciudad de Pedro", "La cuna de la civilización"],
      correctAnswer: "La ciudad eterna"
    },
    {
      question: "¿Cuál es el nombre del creador de las Leyes de la Robótica?",
      options: ["Pablo Coelho", "Mark Twain", "Victor Hugo", "Isaac Asimov"],
      correctAnswer: "Isaac Asimov"
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  const handleAnswer = (esCorrecta) => {
    if (esCorrecta) {
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
    // Aquí puedes manejar la lógica para respuestas incorrectas si lo deseas
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
            {questions[currentQuestionIndex].options.map((option, index) => (
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
        <div className="text-center text-2xl">
          <h2 className="text-4xl text-center text-pink-500 uppercase font-bold">¡Felicidades lo has completado!</h2>
          <p className="my-3">Total Time: {totalTime} ms</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
