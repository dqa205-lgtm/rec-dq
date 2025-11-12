
import React, { useState, useMemo } from 'react';
import { PLACES, QUESTIONS } from './constants';
import { Place } from './types';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState<string | null>('step1');
  const [finalPlace, setFinalPlace] = useState<Place | null>(null);
  const [history, setHistory] = useState<string[]>(['step1']);

  const currentQuestion = useMemo(() => {
    if (!currentStepId) return null;
    return QUESTIONS[currentStepId];
  }, [currentStepId]);

  const handleAnswer = (nextStepId: string) => {
    const isPlace = PLACES.some(p => p.id === nextStepId);
    if (isPlace) {
      const place = PLACES.find(p => p.id === nextStepId);
      if (place) {
        setFinalPlace(place);
        setCurrentStepId(null);
      }
    } else {
      setCurrentStepId(nextStepId);
      setHistory(prev => [...prev, nextStepId]);
    }
  };

  const handleReset = () => {
    setFinalPlace(null);
    setCurrentStepId('step1');
    setHistory(['step1']);
  };
  
  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousStepId = newHistory[newHistory.length - 1];
      setCurrentStepId(previousStepId);
      setHistory(newHistory);
    }
  }

  const getStepInfo = () => {
      const questionPath = ['step1', 'step2a', 'step3a'];
      const maxSteps = questionPath.every(step => Object.keys(QUESTIONS).includes(step)) ? 4 : 3;

      const pathA = ['step1', 'step2a', 'step3a', 'result'];
      const pathB = ['step1', 'step2a', 'result'];
      const pathC = ['step1', 'step2b', 'result'];
      const pathD = ['step1', 'step2b', 'step3b', 'step4', 'result'];
      const pathE = ['step1', 'step2b', 'step3b', 'result'];

      let currentPath = [];
      if (history.includes('step3a')) currentPath = pathA;
      else if (history[history.length -1] === 'step2a' && !finalPlace) currentPath = pathB;
      else if (history[history.length -1] === 'step2b' && !finalPlace) currentPath = pathC;
      else if (history.includes('step4')) currentPath = pathD;
      else if (history.includes('step3b')) currentPath = pathE;
      else currentPath = ['step1'];
      
      const stepNumber = currentStepId ? history.length : history.length + 1;
      const totalSteps = finalPlace ? stepNumber : (currentPath.length || 3);
      
      return {stepNumber, totalSteps};
  }

  const { stepNumber, totalSteps } = getStepInfo();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
       <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        {currentStepId && history.length > 1 && (
            <button 
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
                ← Back
            </button>
        )}
        <div className="flex-grow"></div>
      </header>
      
      <main className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-2 animate-fade-in">
          모임 장소 선택기
        </h1>
        <p className="text-lg text-slate-400 mb-10 text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
          몇 가지 질문으로 완벽한 모임 장소를 찾아보세요.
        </p>

        {finalPlace ? (
          <ResultCard place={finalPlace} onReset={handleReset} />
        ) : currentQuestion ? (
          <QuestionCard 
            question={currentQuestion} 
            onAnswer={handleAnswer} 
            stepNumber={stepNumber}
            totalSteps={totalSteps}
          />
        ) : (
          <div className="text-center">
            <p className="text-slate-400">시작하려면 새로고침 해주세요.</p>
          </div>
        )}
      </main>
      
      <footer className="absolute bottom-4 text-center text-slate-500 text-sm">
        <p>Powered by React, Tailwind CSS, and Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
