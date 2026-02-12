import { useApp } from '../context/AppContext';
import { stopAllSounds } from '../utils/audioManager';

export function MuteToggle() {
  const { state, actions } = useApp();
  const { isMuted } = state;

  const handleToggle = () => {
    stopAllSounds();
    actions.toggleMute();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
      aria-label={isMuted ? '取消静音' : '静音'}
    >
      <span className="text-2xl">
        {isMuted ? '🔇' : '🔊'}
      </span>
    </button>
  );
}
