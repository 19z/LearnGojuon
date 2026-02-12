import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AudioButton } from './AudioButton';
import { generateQuestion } from '../utils/quizGenerator';
import { playSound } from '../utils/audioManager';
import { QUIZ_TYPES } from '../data/soundsData';

function getRandomQuizMode(isMuted) {
  const availableTypes = Object.values(QUIZ_TYPES).filter(type => {
    if (isMuted && type === QUIZ_TYPES.AUDIO) {
      return false;
    }
    return true;
  });

  // Randomly pick 2 different types
  const shuffled = [...availableTypes].sort(() => Math.random() - 0.5);
  return {
    questionType: shuffled[0],
    answerType: shuffled[1]
  };
}

export function AnswerOptions() {
  const { state, actions } = useApp();
  const { currentQuestion, audioMap, isMuted, showCorrectAnswer, isAnswered } = state;
  const [selectedOption, setSelectedOption] = useState(null);

  if (!currentQuestion) return null;

  const handleOptionClick = (option) => {
    if (isAnswered) return; // Prevent multiple clicks

    // For audio options: first click selects, second click (or Submit button) submits
    if (option.type === 'audio') {
      if (selectedOption?.sound.id === option.sound.id) {
        // Already selected - clicking again submits
        submitAnswer(option);
      } else {
        // First click - just select (AudioButton will handle playing)
        setSelectedOption(option);
      }
    } else {
      // For non-audio options: immediate submit (current behavior)
      setSelectedOption(option);
      submitAnswer(option);
    }
  };

  const submitAnswer = (option) => {
    const isCorrect = option.sound.id === currentQuestion.correctAnswer.id;
    actions.answerQuestion(isCorrect);

    if (isCorrect) {
      actions.incrementScore('correct');

      // Play correct answer audio if not muted
      if (!isMuted && option.sound.audio) {
        const audioElement = audioMap.get(option.sound.id);
        if (audioElement) {
          playSound(audioElement);
        }
      }

      // Immediately load next question after a short delay
      setTimeout(() => {
        loadNextQuestion();
      }, 500);
    } else {
      actions.incrementScore('incorrect');

      // Play correct answer audio if not muted
      if (!isMuted && currentQuestion.correctAnswer.audio) {
        const audioElement = audioMap.get(currentQuestion.correctAnswer.id);
        if (audioElement) {
          playSound(audioElement);
        }
      }
    }
  };

  const loadNextQuestion = () => {
    const mode = getRandomQuizMode(isMuted);
    const newQuestion = generateQuestion(
      mode.questionType,
      mode.answerType,
      isMuted
    );
    actions.setCurrentQuestion(newQuestion);
    setSelectedOption(null);
    actions.nextQuestion();
  };

  const getOptionClassName = (option) => {
    let baseClass = 'w-full aspect-square rounded-2xl shadow-lg transition-all duration-200 font-bold text-2xl md:text-3xl flex items-center justify-center ';

    if (isAnswered) {
      if (option.sound.id === currentQuestion.correctAnswer.id) {
        // Correct answer - always show green
        baseClass += 'bg-gradient-to-br from-success-500 to-success-600 text-white scale-105';
      } else if (selectedOption?.sound.id === option.sound.id) {
        // Wrong selected answer - show red
        baseClass += 'bg-gradient-to-br from-error-500 to-error-600 text-white';
      } else {
        // Other options - dimmed
        baseClass += 'bg-gray-200 text-gray-500 cursor-not-allowed';
      }
    } else {
      // Not answered yet
      if (selectedOption?.sound.id === option.sound.id) {
        // Selected but not submitted - show highlighted state
        baseClass += 'bg-gradient-to-br from-accent-500 to-accent-600 text-white scale-105 ring-4 ring-accent-300 cursor-pointer';
      } else {
        // Normal state
        baseClass += 'bg-gradient-to-br from-primary-400 to-accent-400 text-white hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95';
      }
    }
    if (option.type != 'audio'){
      baseClass += ' p-8';
    }

    return baseClass;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 pb-4">
      <div className="w-full max-w-2xl">
        {/* Answer options grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={getOptionClassName(option)}
            >
              {option.type === 'audio' ? (
                <AudioButton
                  audioElement={audioMap.get(option.sound.id)}
                  className="w-full p-8 h-full flex items-center justify-center"
                  disabled={isAnswered}
                  asDiv={true}
                />
              ) : (
                <span>{option.value}</span>
              )}
            </button>
          ))}
        </div>

        {/* Submit button for audio options */}
        {!isAnswered && selectedOption && selectedOption.type === 'audio' && (
          <div className="text-center mb-6 animate-fade-in">
            <button
              onClick={() => submitAnswer(selectedOption)}
              className="bg-gradient-to-br from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200 text-xl font-semibold"
            >
              提交
            </button>
          </div>
        )}

        {/* Show correct answer and next button when wrong */}
        {showCorrectAnswer && (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
              <p className="text-xl font-semibold text-gray-700 mb-2">正确答案：</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-success-500 to-success-600">
                {currentQuestion.options[0].type === 'audio'
                  ? currentQuestion.correctAnswer[currentQuestion.question.type]
                  : currentQuestion.correctAnswer[currentQuestion.options[0].type]}
              </p>
            </div>
            <button
              onClick={loadNextQuestion}
              className="bg-gradient-to-br from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200 text-xl font-semibold"
            >
              下一题
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
