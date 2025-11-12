
import React, { useState, useEffect } from 'react';
import { Place } from '../types';
import { generateRecommendationSummary } from '../services/geminiService';

interface ResultCardProps {
  place: Place;
  onReset: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" style={{animationDelay: '0.4s'}}></div>
        <span className="text-sm text-gray-500 dark:text-gray-400">AI가 최고의 하루를 계획하는 중...</span>
    </div>
);

const ResultCard: React.FC<ResultCardProps> = ({ place, onReset }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const generatedSummary = await generateRecommendationSummary(place);
        setSummary(generatedSummary);
      } catch (err) {
        setError('요약을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [place]);

  return (
    <div className="w-full max-w-2xl p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-fade-in text-center">
      <h2 className="text-xl font-semibold text-brand-primary dark:text-indigo-400 mb-2">✨ 최종 추천 장소 ✨</h2>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">{place.name}</h1>
      
      <div className="flex justify-center flex-wrap gap-2 mb-6">
        {place.tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-sm font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[80px] flex items-center justify-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            {summary}
          </p>
        )}
      </div>

      <button
        onClick={onReset}
        className="mt-8 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
      >
        다시 시작하기
      </button>
    </div>
  );
};

export default ResultCard;
