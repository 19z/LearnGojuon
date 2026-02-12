import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ScoreDisplay } from './ScoreDisplay';
import { MuteToggle } from './MuteToggle';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerOptions } from './AnswerOptions';
import { generateQuestion } from '../utils/quizGenerator';
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

export function QuizInterface() {
  const { state, actions } = useApp();
  const { isMuted, currentQuestion } = state;

  useEffect(() => {
    // Generate first question when quiz starts
    if (!currentQuestion) {
      const mode = getRandomQuizMode(isMuted);
      const question = generateQuestion(
        mode.questionType,
        mode.answerType,
        isMuted
      );
      actions.setCurrentQuestion(question);
    }
  }, [currentQuestion, isMuted, actions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 flex flex-col">
      {/* Score and Mute controls */}
      <ScoreDisplay />
      <MuteToggle />

      {/* Question section - 40% height */}
      <div className="flex-[2] flex items-center justify-center pt-20">
        <QuestionDisplay />
      </div>

      {/* Answer section - 60% height */}
      <div className="flex-[3] flex items-center justify-center">
        <AnswerOptions />
      </div>
    </div>
  );
}
