import { useApp } from '../context/AppContext';

export function ScoreDisplay() {
  const { state } = useApp();
  const { score } = state;

  return (
    <div className="fixed top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <span className="text-success-600">正确 {score.correct}</span>
        <span className="text-gray-400">/</span>
        <span className="text-error-600">错误 {score.incorrect}</span>
      </div>
    </div>
  );
}
