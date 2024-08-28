import { h } from 'preact';
import { useState } from 'preact/hooks';

const Quiz = () => {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Lisbon"],
            correctAnswer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Venus", "Mars", "Jupiter"],
            correctAnswer: "Mars"
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (option) => {
        if (option === questions[currentQuestionIndex].correctAnswer) {
            setIsAnswered(true);
            setTimeout(() => {
                setIsAnswered(false);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 1000);
        }
    };

    return (
        <div>
            {currentQuestionIndex < questions.length ? (
                <div>
                    <h2>{questions[currentQuestionIndex].question}</h2>
                    <div>
                        {questions[currentQuestionIndex].options.map(option => (
                            <button 
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
                <h2>Quiz Completed!</h2>
            )}
        </div>
    );
};

export default Quiz;
