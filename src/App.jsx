import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { QuizInterface } from './components/QuizInterface';
import { useAudioPreloader } from './hooks/useAudioPreloader';

function AppContent() {
  const { state, actions } = useApp();
  const { audioMap, isLoading, error } = useAudioPreloader();

  useEffect(() => {
    if (!isLoading && audioMap.size > 0) {
      actions.setAudioMap(audioMap);
    }
  }, [isLoading, audioMap]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🎵</div>
          <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-accent-600">
            加载中...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100">
        <div className="text-center space-y-4 p-8">
          <div className="text-6xl">⚠️</div>
          <p className="text-2xl font-semibold text-error-600">
            音频加载失败
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-500 text-white rounded-2xl shadow-lg hover:bg-primary-600 transition-all"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return <QuizInterface />;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
