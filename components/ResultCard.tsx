
import React from 'react';
import { Place } from '../types';

interface ResultCardProps {
  place: Place;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ place, onReset }) => {
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
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
          {place.summary}
        </p>
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