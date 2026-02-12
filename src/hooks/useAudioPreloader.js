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

        // Wait for audio metadata to be loaded with timeout
        const loadPromises = Array.from(map.values()).map(audio => {
          return new Promise((resolve) => {
            // Use loadedmetadata instead of canplaythrough for better Safari compatibility
            const onLoad = () => {
              clearTimeout(timeout);
              resolve();
            };

            const onError = (err) => {
              console.warn('Audio load error:', audio.src, err);
              clearTimeout(timeout);
              resolve(); // Resolve anyway to not block the app
            };

            // Timeout after 3 seconds to prevent infinite loading
            const timeout = setTimeout(() => {
              audio.removeEventListener('loadedmetadata', onLoad);
              audio.removeEventListener('error', onError);
              resolve();
            }, 3000);

            audio.addEventListener('loadedmetadata', onLoad, { once: true });
            audio.addEventListener('error', onError, { once: true });

            // Trigger load
            audio.load();
          });
        });

        await Promise.all(loadPromises);

        setAudioMap(map);
        setIsLoading(false);
      } catch (err) {
        console.error('Error preloading audio:', err);
        // Don't set error, just continue with whatever loaded
        setIsLoading(false);
      }
    };

    loadAudio();
  }, []);

  return { audioMap, isLoading, error };
}
