
import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (nextStepId: string) => void;
  stepNumber: number;
  totalSteps: number;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
      <div 
        className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2.5 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};


const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, stepNumber, totalSteps }) => {
  return (
    <div className="w-full max-w-2xl p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-slide-in-up">
        <ProgressBar current={stepNumber} total={totalSteps} />
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {question.question}
        </h2>
        <div className="grid grid-cols-1 gap-4">
            {question.answers.map((answer, index) => (
            <button
                key={index}
                onClick={() => onAnswer(answer.nextStepId)}
                className="w-full text-left p-4 sm:p-5 rounded-lg text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700
                           hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white 
                           transform hover:-translate-y-1 transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
            >
                {answer.text}
            </button>
            ))}
        </div>
    </div>
  );
};

export default QuestionCard;
