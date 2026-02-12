import { SOUNDS_DATA } from '../data/soundsData.js';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates a quiz question with 4 answer options
 * @param {string} questionType - Type of question (romaji, hiragana, katakana, audio)
 * @param {string} answerType - Type of answer options (romaji, hiragana, katakana, audio)
 * @param {boolean} excludeAudio - Whether to exclude audio (mute mode)
 * @returns {Object} Question object with question, correctAnswer, and options
 */
export function generateQuestion(questionType, answerType, excludeAudio = false) {
  // Filter sounds if audio is excluded
  let availableSounds = excludeAudio ? SOUNDS_DATA : SOUNDS_DATA;

  // Pick a random sound as the correct answer
  const correctSound = availableSounds[Math.floor(Math.random() * availableSounds.length)];

  // Generate 3 wrong options
  const wrongSounds = availableSounds
    .filter(sound => sound.id !== correctSound.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Combine and shuffle all options
  const allOptions = shuffleArray([correctSound, ...wrongSounds]);

  return {
    question: {
      type: questionType,
      value: correctSound[questionType],
      sound: correctSound
    },
    correctAnswer: correctSound,
    options: allOptions.map(sound => ({
      type: answerType,
      value: sound[answerType],
      sound: sound
    }))
  };
}
