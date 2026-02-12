import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUIZ_TYPES, QUIZ_TYPE_LABELS } from '../data/soundsData';

export function QuizModeSelector() {
  const { state, actions } = useApp();
  const { isMuted } = state;
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const availableTypes = Object.values(QUIZ_TYPES).filter(type => {
    // Exclude audio if muted
    if (isMuted && type === QUIZ_TYPES.AUDIO) {
      return false;
    }
    return true;
  });

  const handleTypeClick = (type) => {
    if (!selectedQuestion) {
      setSelectedQuestion(type);
    } else if (!selectedAnswer && type !== selectedQuestion) {
      setSelectedAnswer(type);
      // Start quiz
      actions.setQuizMode(type, selectedQuestion);
    }
  };

  const handleReset = () => {
    setSelectedQuestion(null);
    setSelectedAnswer(null);
  };

  const getButtonClassName = (type) => {
    let baseClass = 'px-8 py-6 rounded-2xl shadow-lg transition-all duration-200 text-2xl font-bold ';

    if (selectedQuestion === type) {
      baseClass += 'bg-gradient-to-br from-primary-500 to-primary-600 text-white scale-105 ring-4 ring-primary-300';
    } else if (selectedAnswer === type) {
      baseClass += 'bg-gradient-to-br from-accent-500 to-accent-600 text-white scale-105 ring-4 ring-accent-300';
    } else if (selectedQuestion && type === selectedQuestion) {
      baseClass += 'bg-gray-300 text-gray-500 cursor-not-allowed';
    } else {
      baseClass += 'bg-gradient-to-br from-primary-400 to-accent-400 text-white hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95';
    }

    return baseClass;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100">
      <div className="max-w-2xl w-full space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-accent-600">
            日语五十音学习
          </h1>
          <p className="text-xl text-gray-600">
            {!selectedQuestion ? '选择题目类型' : '选择答案类型'}
          </p>
        </div>

        {/* Type selection buttons */}
        <div className="grid grid-cols-2 gap-4">
          {availableTypes.map(type => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              disabled={selectedQuestion === type}
              className={getButtonClassName(type)}
            >
              {QUIZ_TYPE_LABELS[type]}
            </button>
          ))}
        </div>

        {/* Reset button */}
        {selectedQuestion && (
          <div className="text-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl bg-white text-gray-700 shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
            >
              重新选择
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center text-gray-500 text-sm">
          <p>选择两种不同的类型进行练习</p>
        </div>
      </div>
    </div>
  );
}
