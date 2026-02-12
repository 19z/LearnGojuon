import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AudioButton } from './AudioButton';
import { playSound } from '../utils/audioManager';

export function QuestionDisplay() {
  const { state } = useApp();
  const { currentQuestion, audioMap, isMuted } = state;

  useEffect(() => {
    // Auto-play audio if question type is audio
    if (currentQuestion?.question.type === 'audio' && !isMuted) {
      const audioElement = audioMap.get(currentQuestion.question.sound.id);
      if (audioElement) {
        // Small delay to ensure component is mounted
        setTimeout(() => {
          playSound(audioElement);
        }, 100);
      }
    }
  }, [currentQuestion, audioMap, isMuted]);

  if (!currentQuestion) return null;

  const { question } = currentQuestion;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        {question.type === 'audio' ? (
          <AudioButton
            audioElement={audioMap.get(question.sound.id)}
            className="bg-gradient-to-br from-primary-500 to-accent-500 text-white px-12 py-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-200"
          />
        ) : (
          <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-accent-600 leading-normal py-4">
            {question.value}
          </div>
        )}
      </div>
    </div>
  );
}
