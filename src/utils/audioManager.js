let currentAudio = null;

/**
 * Plays an audio element
 * @param {HTMLAudioElement} audioElement - The audio element to play
 */
export function playSound(audioElement) {
  if (!audioElement) return;

  // Stop any currently playing audio
  stopAllSounds();

  // Play the new audio
  currentAudio = audioElement;
  audioElement.currentTime = 0;
  audioElement.play().catch(err => {
    console.error('Error playing audio:', err);
  });
}

/**
 * Stops all currently playing audio
 */
export function stopAllSounds() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

/**
 * Creates an audio element from a URL
 * @param {string} url - The audio file URL
 * @returns {HTMLAudioElement}
 */
export function createAudioElement(url) {
  const audio = new Audio(url);
  audio.preload = 'auto';
  return audio;
}
