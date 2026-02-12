import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

// Action types
const ACTIONS = {
  SET_QUIZ_MODE: 'SET_QUIZ_MODE',
  TOGGLE_MUTE: 'TOGGLE_MUTE',
  INCREMENT_SCORE: 'INCREMENT_SCORE',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
  RESET_QUIZ: 'RESET_QUIZ',
  SET_AUDIO_MAP: 'SET_AUDIO_MAP'
};

// Initial state
const initialState = {
  quizMode: null, // { questionType, answerType }
  isMuted: false,
  score: { correct: 0, incorrect: 0 },
  currentQuestion: null,
  showCorrectAnswer: false,
  isAnswered: false,
  audioMap: new Map()
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_QUIZ_MODE:
      return {
        ...state,
        quizMode: action.payload,
        score: { correct: 0, incorrect: 0 }
      };

    case ACTIONS.TOGGLE_MUTE:
      return {
        ...state,
        isMuted: !state.isMuted,
        // Reset current question to generate a new one without audio
        currentQuestion: null,
        showCorrectAnswer: false,
        isAnswered: false
      };

    case ACTIONS.INCREMENT_SCORE:
      return {
        ...state,
        score: {
          ...state.score,
          [action.payload]: state.score[action.payload] + 1
        }
      };

    case ACTIONS.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
        showCorrectAnswer: false,
        isAnswered: false
      };

    case ACTIONS.ANSWER_QUESTION:
      return {
        ...state,
        isAnswered: true,
        showCorrectAnswer: !action.payload.isCorrect
      };

    case ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        showCorrectAnswer: false,
        isAnswered: false
      };

    case ACTIONS.RESET_QUIZ:
      return {
        ...state,
        quizMode: null,
        score: { correct: 0, incorrect: 0 },
        currentQuestion: null,
        showCorrectAnswer: false,
        isAnswered: false
      };

    case ACTIONS.SET_AUDIO_MAP:
      return {
        ...state,
        audioMap: action.payload
      };

    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    state,
    dispatch,
    actions: {
      setQuizMode: (questionType, answerType) =>
        dispatch({ type: ACTIONS.SET_QUIZ_MODE, payload: { questionType, answerType } }),

      toggleMute: () =>
        dispatch({ type: ACTIONS.TOGGLE_MUTE }),

      incrementScore: (type) =>
        dispatch({ type: ACTIONS.INCREMENT_SCORE, payload: type }),

      setCurrentQuestion: (question) =>
        dispatch({ type: ACTIONS.SET_CURRENT_QUESTION, payload: question }),

      answerQuestion: (isCorrect) =>
        dispatch({ type: ACTIONS.ANSWER_QUESTION, payload: { isCorrect } }),

      nextQuestion: () =>
        dispatch({ type: ACTIONS.NEXT_QUESTION }),

      resetQuiz: () =>
        dispatch({ type: ACTIONS.RESET_QUIZ }),

      setAudioMap: (audioMap) =>
        dispatch({ type: ACTIONS.SET_AUDIO_MAP, payload: audioMap })
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
