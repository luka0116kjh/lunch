import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, MapPin, Clock, CloudSun, Utensils, History } from 'lucide-react';
import { getRecommendedRecipe } from './services/recipeService';

const WEATHER_CONFIG = {
  API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
  PROXY_URL: import.meta.env.VITE_WEATHER_PROXY_URL,
  LAT: 37.468795,
  LON: 127.040241,
  CITY_NAME: "Seoul"
};

// Remote data handling via recipeService.js

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState('날씨 확인 중...');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // Derive mealType from currentTime
  const hour = currentTime.getHours();
  const mealType = (hour >= 15 || hour < 4) ? '저녁' : '점심';

  const categories = ['전체', '한식', '일식', '양식', '중식', '가벼운 한 끼'];

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let url;
        if (WEATHER_CONFIG.PROXY_URL && !WEATHER_CONFIG.PROXY_URL.includes("YOUR_WORKER")) {
          url = `${WEATHER_CONFIG.PROXY_URL}?lat=${WEATHER_CONFIG.LAT}&lon=${WEATHER_CONFIG.LON}`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_CONFIG.LAT}&lon=${WEATHER_CONFIG.LON}&appid=${WEATHER_CONFIG.API_KEY}&units=metric&lang=kr`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.weather && data.weather[0]) {
          setWeather(data.weather[0].description);
        } else if (data.main) {
          setWeather('맑음');
        }
      } catch (err) {
        console.error("Weather fetch failed:", err);
        setWeather('맑음');
      }
    };
    fetchWeather();

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []); // Only on mount or when weather needs refresh

  const handleRecommend = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const recommended = await getRecommendedRecipe(selectedCategory);

      if (recommended) {
        setResult(recommended);
        setHistory(prev => {
          const newHistory = [recommended, ...prev.filter(h => h.id !== recommended.id)].slice(0, 5);
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Recommendation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMap = (menuName) => {
    window.open(`https://map.naver.com/v5/search/${menuName} 맛집`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex justify-center text-textMain selection:bg-primary selection:text-white">
      <div className="w-full max-w-md bg-transparent p-5 flex flex-col pt-12 pb-20 relative">

        {/* Header Section */}
        <header className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-textSub text-xs font-semibold">
                <span className="flex items-center bg-white premium-shadow px-3.5 py-1.5 rounded-full border border-gray-50">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  {currentTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
                  <span className="mx-2 text-gray-200">|</span>
                  {currentTime.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit', hour12: true })}
                </span>
                <span className="flex items-center bg-white premium-shadow px-3.5 py-1.5 rounded-full border border-gray-50">
                  <CloudSun className="w-3.5 h-3.5 mr-1.5 text-orange-400" />
                  {weather}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              오늘 {mealType}, <br />
              고민하지 마세요.
            </h1>
            <p className="mt-3 text-textSub font-medium">최적의 식사를 추천해드릴게요.</p>
          </motion.div>
        </header>

        {/* Filters */}
        <motion.div
          className="mb-8 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-[15px] font-semibold transition-all duration-200 active:scale-95 ${selectedCategory === cat
                ? 'bg-textMain text-white'
                : 'bg-card text-textSub hover:bg-gray-100 shadow-sm'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* CTA Area */}
        <div className="flex-1 flex flex-col justify-center items-center relative z-10 w-full mb-10">

          <AnimatePresence mode="wait">
            {!isLoading && !result && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex-col items-center flex mt-10"
              >
                <div className="w-40 h-40 bg-card rounded-full shadow-lg flex items-center justify-center mb-8">
                  <Utensils className="w-16 h-16 text-gray-300" />
                </div>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center h-64"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full mb-6"
                />
                <p className="text-[17px] font-bold animate-pulse text-textMain">최고의 메뉴를 고민 중...</p>
              </motion.div>
            )}

            {result && !isLoading && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-card w-full rounded-[24px] premium-shadow overflow-hidden border border-gray-100"
              >
                {result.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.height = '0';
                      }}
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-bold mb-5 tracking-tight">
                      {result.category}
                    </div>
                    <p className="text-textSub text-[15px] font-semibold mb-2">오늘 추천하는 레시피는</p>
                    <h2 className="text-3xl font-extrabold tracking-tight text-textMain mb-4">{result.name}</h2>
                    {result.calories > 0 && (
                      <p className="text-xs text-textSub mb-6">{result.calories} kcal | {result.type}</p>
                    )}

                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button
                        onClick={() => openMap(result.name)}
                        className="bg-[#F2F4F6] hover:bg-gray-200 text-textMain font-bold py-4 rounded-2xl flex items-center justify-center transition-all active:scale-[0.98]"
                      >
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        식당찾기
                      </button>
                      <button
                        onClick={() => window.open(`https://pantry-search.com/search?q=${result.name}`, '_blank')}
                        className="bg-[#F2F4F6] hover:bg-gray-200 text-textMain font-bold py-4 rounded-2xl flex items-center justify-center transition-all active:scale-[0.98]"
                      >
                        <Utensils className="w-4 h-4 mr-2 text-primary" />
                        레시피
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Floating Recommend Button */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-transparent pb-8 max-w-md mx-auto pointer-events-none z-50">
          <button
            onClick={handleRecommend}
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl shadow-[0_8px_24px_rgba(0,100,255,0.3)] hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-70 disabled:scale-100 pointer-events-auto flex justify-center items-center"
          >
            {isLoading ? '탐색 중...' : (
              <>
                추천받기
                {result && <RefreshCw className="w-5 h-5 ml-2" />}
              </>
            )}
          </button>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 pb-16"
          >
            <div className="flex items-center mb-4 text-textMain font-bold px-1">
              <History className="w-5 h-5 mr-2 text-textSub" />
              <h3 className="text-[17px]">최근 추천 메뉴</h3>
            </div>
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2 px-1">
              {history.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="bg-card w-32 shrink-0 rounded-[16px] shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="w-full h-20 bg-[#111111]" />
                  <div className="p-3">
                    <p className="text-xs text-textSub font-medium mb-0.5">{item.category}</p>
                    <p className="font-bold text-[15px]">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
