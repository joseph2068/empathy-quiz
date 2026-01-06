/**
 * 共情天賦測驗 - 首頁
 * 
 * 設計哲學：深度心理探索風格
 * - 大型人格原型圖片展示
 * - 引人入勝的介紹文案
 * - 8 種人格原型預覽
 * - 清晰的行動呼籲
 */

import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ARCHETYPES } from "../lib/quiz-data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* 英雄區域 */}
      <section className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          {/* 主標題 */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            發現你的
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              共情天賦
            </span>
          </h1>

          {/* 副標題 */}
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            每個人都擁有獨特的共情方式。透過這個測驗，你將發現自己的共情風格、超能力，以及如何更好地與他人連結。
          </p>

          {/* 簡介段落 */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12 border border-slate-100">
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              共情不只是感受他人的情緒，更是一種深刻的理解與連結的能力。有人透過直覺感知，有人透過觀察分析，有人提供穩定的陪伴，有人激勵他人成長。
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              這個測驗基於心理學研究，將幫助你識別自己的共情原型，並理解你獨特的優勢與挑戰。
            </p>
          </div>

          {/* 主要行動按鈕 */}
          <Button
            onClick={() => setLocation("/quiz")}
            className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 hover:shadow-xl hover:scale-105 flex items-center gap-2 mx-auto"
          >
            開始測驗
            <ArrowRight size={24} />
          </Button>

          {/* 測驗信息 */}
          <p className="text-sm text-slate-500 mt-6">
            ⏱️ 約 5-7 分鐘 • 📊 20 道題目 • 🎯 8 種人格原型
          </p>
        </div>
      </section>

      {/* 人格原型預覽區域 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4">
            8 種共情人格原型
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            每個人都是獨特的，你的共情方式也是。探索這 8 種原型，找到屬於你的那一個。
          </p>

          {/* 人格原型網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(ARCHETYPES).map(([id, archetype]) => (
              <div
                key={id}
                className="psychology-card overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105"
                onClick={() => setLocation(`/result/${id}`)}
              >
                {/* 圖片容器 */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={archetype.imageUrl}
                    alt={archetype.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* 內容 */}
                <div className="p-4">
                  <div className="text-3xl mb-2">{archetype.emoji}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {archetype.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {archetype.title}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {archetype.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特色區域 */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-12">
            為什麼要了解你的共情風格？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 特色 1 */}
            <div className="psychology-card p-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                自我認識
              </h3>
              <p className="text-slate-600">
                了解你獨特的共情方式與優勢，認識真實的自己。
              </p>
            </div>

            {/* 特色 2 */}
            <div className="psychology-card p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                改善人際關係
              </h3>
              <p className="text-slate-600">
                學會用適合自己的方式與他人連結，建立更深的關係。
              </p>
            </div>

            {/* 特色 3 */}
            <div className="psychology-card p-8">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                發揮潛能
              </h3>
              <p className="text-slate-600">
                認識自己的挑戰，學會如何保護自己並發揮最大的影響力。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 最後的行動呼籲 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            準備好了嗎？
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            花 5-7 分鐘時間，發現你獨特的共情天賦。
          </p>
          <Button
            onClick={() => setLocation("/quiz")}
            className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            開始測驗
            <ArrowRight size={24} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 共情天賦測驗 • 基於心理學研究的共情人格分析
          </p>
        </div>
      </footer>
    </div>
  );
}
