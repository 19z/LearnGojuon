import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ScoreDisplay } from './ScoreDisplay';
import { MuteToggle } from './MuteToggle';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerOptions } from './AnswerOptions';
import { generateQuestion } from '../utils/quizGenerator';
import { QUIZ_TYPES } from '../data/soundsData';

function getRandomQuizMode(isMuted, isFirstQuestion = false) {
  const availableTypes = Object.values(QUIZ_TYPES).filter(type => {
    if (isMuted && type === QUIZ_TYPES.AUDIO) {
      return false;
    }
    return true;
  });

  // For first question, exclude audio as question type to avoid Safari autoplay restrictions
  const questionTypes = isFirstQuestion
    ? availableTypes.filter(type => type !== QUIZ_TYPES.AUDIO)
    : availableTypes;

  // Randomly pick question type
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  // Pick answer type (different from question type)
  const answerTypes = availableTypes.filter(type => type !== questionType);
  const answerType = answerTypes[Math.floor(Math.random() * answerTypes.length)];

  return {
    questionType,
    answerType
  };
}

export function QuizInterface() {
  const { state, actions } = useApp();
  const { isMuted, currentQuestion } = state;

  useEffect(() => {
    // Generate first question when quiz starts
    if (!currentQuestion) {
      const mode = getRandomQuizMode(isMuted, true); // isFirstQuestion = true
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
