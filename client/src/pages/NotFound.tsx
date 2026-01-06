import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="text-center max-w-lg mx-4">
        <h1 className="text-7xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          找不到頁面
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          抱歉，你要找的頁面不存在。它可能已被移除或刪除。
        </p>
        <Button
          onClick={handleGoHome}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          返回首頁
        </Button>
      </div>
    </div>
  );
}
