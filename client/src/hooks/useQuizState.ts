import { useState } from "react";
import { QUIZ_QUESTIONS, calculateResult, ScoringResult } from "../lib/quiz-data";

export function useQuizState() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
  const isQuizComplete = Object.keys(answers).length === QUIZ_QUESTIONS.length;

  const handleAnswer = (answer: boolean) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnimating(false);
      } else {
        // 計算結果
        const calculatedResult = calculateResult(newAnswers);
        setResult(calculatedResult);
        setIsAnimating(false);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setIsAnimating(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setIsAnimating(false);
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    answers,
    result,
    isAnimating,
    progress,
    isQuizComplete,
    handleAnswer,
    handleBack,
    resetQuiz,
  };
}
