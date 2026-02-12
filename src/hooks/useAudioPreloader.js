import { useState, useEffect } from 'react';
import { SOUNDS_DATA } from '../data/soundsData.js';
import { createAudioElement } from '../utils/audioManager.js';

/**
 * Hook to preload all audio files
 * @returns {Object} { audioMap, isLoading, error }
 */
export function useAudioPreloader() {
  const [audioMap, setAudioMap] = useState(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const map = new Map();

        // Create audio elements for all sounds
        SOUNDS_DATA.forEach(sound => {
          const audio = createAudioElement(sound.audio);
          map.set(sound.id, audio);
        });

        // Wait for all audio to be loaded
        const loadPromises = Array.from(map.values()).map(audio => {
          return new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
            audio.addEventListener('error', reject, { once: true });
          });
        });

        await Promise.all(loadPromises);

        setAudioMap(map);
        setIsLoading(false);
      } catch (err) {
        console.error('Error preloading audio:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    loadAudio();
  }, []);

  return { audioMap, isLoading, error };
}
