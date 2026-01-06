/**
 * 共情天賦測驗 - 結果頁面
 * 
 * 設計哲學：深度心理探索風格
 * - 人格原型圖片居中，周圍環繞光暈
 * - 相關特質標籤與描述
 * - 分享與重新測驗選項
 */

import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ARCHETYPES } from "../lib/quiz-data";
import { Share2, RotateCcw } from "lucide-react";

export default function Result() {
  const { archetypeId } = useParams<{ archetypeId: string }>();
  const [, setLocation] = useLocation();

  if (!archetypeId || !ARCHETYPES[archetypeId]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            找不到結果
          </h1>
          <Button onClick={() => setLocation("/")}>返回首頁</Button>
        </div>
      </div>
    );
  }

  const archetype = ARCHETYPES[archetypeId];

  const handleShare = () => {
    const text = `我的共情天賦是「${archetype.name}」！你也來測試一下吧！`;
    if (navigator.share) {
      navigator.share({
        title: "共情天賦測驗",
        text: text,
        url: window.location.href,
      });
    } else {
      // 備選方案：複製到剪貼板
      navigator.clipboard.writeText(
        `${text}\n${window.location.href}`
      );
      alert("已複製到剪貼板！");
    }
  };

  const handleRetake = () => {
    setLocation("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 頂部標題 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-2">
            你的共情天賦
          </h1>
          <p className="text-lg text-slate-600">
            發現你獨特的共情風格與超能力
          </p>
        </div>

        {/* 主要內容卡片 */}
        <div className="psychology-card p-8 md:p-12 mb-8">
          {/* 人格原型圖片與光暈 */}
          <div className="flex justify-center mb-12">
            <div className="relative w-80 h-80">
              {/* 外層光暈 */}
              <div
                className="absolute inset-0 rounded-full opacity-30 blur-3xl animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${archetype.color}40, transparent)`,
                }}
              ></div>

              {/* 中層光暈 */}
              <div
                className="absolute inset-8 rounded-full opacity-20 blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${archetype.color}60, transparent)`,
                }}
              ></div>

              {/* 人格原型圖片 */}
              <img
                src={archetype.imageUrl}
                alt={archetype.name}
                className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
              />
            </div>
          </div>

          {/* 人格原型名稱與標題 */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-2">{archetype.emoji}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
              {archetype.name}
            </h2>
            <p className="text-xl text-slate-600 italic">{archetype.title}</p>
          </div>

          {/* 描述 */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-8 border border-purple-100">
            <p className="text-lg text-slate-800 leading-relaxed">
              {archetype.description}
            </p>
          </div>

          {/* 核心特質 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              核心特質
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {archetype.coreTraits.map((trait, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg px-4 py-3 text-center"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {trait}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 代表書目 */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">代表書目</p>
            <p className="text-lg font-semibold text-slate-900">
              {archetype.book}
            </p>
          </div>

          {/* 簡短描述 */}
          <div className="text-center mb-8">
            <p className="text-lg text-slate-700 italic">
              「{archetype.shortDescription}」
            </p>
          </div>

          {/* 行動按鈕 */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <Share2 size={20} />
              分享結果
            </Button>
            <Button
              onClick={handleRetake}
              className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold transition-all duration-200"
            >
              <RotateCcw size={20} />
              重新測驗
            </Button>
          </div>
        </div>

        {/* 其他人格原型預覽 */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            其他共情人格原型
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(ARCHETYPES).map(([id, other]) => (
              <div
                key={id}
                className={`psychology-card p-4 text-center cursor-pointer transition-all duration-200 ${
                  id === archetypeId
                    ? "ring-2 ring-purple-600"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setLocation(`/result/${id}`)}
              >
                <div className="text-4xl mb-2">{other.emoji}</div>
                <h4 className="font-bold text-slate-900 mb-1">{other.name}</h4>
                <p className="text-xs text-slate-600">{other.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 返回首頁 */}
        <div className="text-center mt-12">
          <Button
            onClick={() => setLocation("/")}
            className="text-slate-600 hover:text-slate-900 transition-colors"
            variant="ghost"
          >
            ← 返回首頁
          </Button>
        </div>
      </div>
    </div>
  );
}
