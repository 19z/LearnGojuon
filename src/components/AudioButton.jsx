import { playSound } from '../utils/audioManager';

export function AudioButton({ audioElement, onClick, className = '', disabled = false, asDiv = false }) {
  const handleClick = () => {
    if (audioElement && !disabled) {
      playSound(audioElement);
    }
    if (onClick) {
      onClick();
    }
  };

  const Component = asDiv ? 'div' : 'button';

  return (
    <Component
      onClick={handleClick}
      disabled={!asDiv && disabled}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <span className="text-3xl">🔊</span>
    </Component>
  );
}
