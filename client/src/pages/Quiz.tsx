/**
 * 共情天賦測驗 - 測驗頁面
 * 
 * 設計哲學：深度心理探索風格
 * - 每題一張卡片，垂直滑動
 * - 左側問題文本，右側視覺隱喻
 * - 波紋動畫、光暈效果
 * - 流暢的過渡與交互
 */

import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUIZ_QUESTIONS } from "../lib/quiz-data";
import { useQuizState } from "../hooks/useQuizState";

export default function Quiz() {
  const [, setLocation] = useLocation();
  const {
    currentQuestion,
    currentQuestionIndex,
    answers,
    result,
    isAnimating,
    progress,
    handleAnswer,
    handleBack,
  } = useQuizState();

  // 當結果計算完成時，導航到結果頁面
  if (result) {
    setLocation(`/result/${result.primaryArchetype}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 頂部進度條 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-slate-600">
              {currentQuestion.categoryLabel}
            </h2>
            <span className="text-sm text-slate-500">
              {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* 主要卡片 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 左側：問題文本 */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="psychology-card p-8">
              <h3 className="text-2xl md:text-3xl mb-6 text-slate-900 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {currentQuestion.hint && (
                <p className="text-sm text-slate-500 italic mb-6">
                  💡 {currentQuestion.hint}
                </p>
              )}

              {/* 答案按鈕 */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={() => handleAnswer(true)}
                  disabled={isAnimating}
                  className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  是的
                </Button>
                <Button
                  onClick={() => handleAnswer(false)}
                  disabled={isAnimating}
                  className="flex-1 py-6 text-lg font-semibold bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg transition-all duration-200"
                >
                  不是
                </Button>
              </div>

              {/* 返回按鈕 */}
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="mt-6 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  ← 上一題
                </button>
              )}
            </div>
          </div>

          {/* 右側：視覺隱喻 */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-64 h-64">
              {/* 背景波紋 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 opacity-50 blur-2xl"></div>

              {/* 中央光點 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-300 to-indigo-300 opacity-30 blur-xl animate-pulse"></div>
              </div>

              {/* 問題編號 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-600 opacity-20">
                    {currentQuestionIndex + 1}
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    {currentQuestion.categoryLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 進度指示器 */}
        <div className="mt-12 flex justify-center gap-2">
          {QUIZ_QUESTIONS.map((_, index: number) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index < currentQuestionIndex
                  ? "w-8 bg-purple-600"
                  : index === currentQuestionIndex
                    ? "w-8 bg-purple-400"
                    : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
