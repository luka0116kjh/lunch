import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, MapPin, Clock, CloudSun, Utensils, History } from 'lucide-react';

const WEATHER_CONFIG = {
  API_KEY: "1",
  PROXY_URL: "https://YOUR_WORKER_SUBDOMAIN.workers.dev/weather",
  LAT: 37.380,
  LON: 126.803,
  CITY_NAME: "Siheung"
};

const rawData = {
  '한식': ['김치찌개', '된장찌개', '제육볶음', '비빔밥', '불고기', '육개장', '수육국밥', '쌈밥', '부대찌개', '닭갈비'],
  '일식': ['초밥', '돈카츠', '규동(소고기덮밥)', '사케동(연어덮밥)', '라멘', '우동', '소바', '가츠동', '텐동'],
  '양식': ['마르게리따 피자', '까르보나라', '알리오올리오', '치즈버거', '스테이크', '샐러드 파스타', '리조또'],
  '중식': ['짜장면', '짬뽕', '볶음밥', '탕수육', '마라탕', '꿔바로우', '마파두부', '토마토 달걀 볶음'],
  '가벼운 한 끼': ['떡볶이', '모둠 튀김', '샌드위치', '샐러드', '에그 드랍', '컵밥', '닭강정', '쌀국수']
};

const MENU_DB = [];
let idCounter = 1;
for (const [category, menus] of Object.entries(rawData)) {
  for (const name of menus) {
    MENU_DB.push({
      id: idCounter++,
      name,
      category,
      type: ['점심', '저녁']
    });
  }
}

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState('날씨 확인 중...');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Derive mealType from currentTime
  const hour = currentTime.getHours();
  const mealType = (hour >= 15 || hour < 4) ? '저녁' : '점심';

  const categories = ['전체', '한식', '일식', '양식', '중식', '가벼운 한 끼'];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (WEATHER_CONFIG.PROXY_URL && !WEATHER_CONFIG.PROXY_URL.includes("YOUR_WORKER")) {
          const res = await fetch(`${WEATHER_CONFIG.PROXY_URL}?lat=${WEATHER_CONFIG.LAT}&lon=${WEATHER_CONFIG.LON}`);
          const data = await res.json();
          setWeather(data.weather?.[0]?.description || '맑음');
        } else {
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
  }, []);

  const handleRecommend = () => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      let availableMenus = MENU_DB.filter(menu => menu.type.includes(mealType));
      
      if (selectedCategory !== '전체') {
        availableMenus = availableMenus.filter(menu => menu.category === selectedCategory);
      }

      if (availableMenus.length === 0) {
        availableMenus = MENU_DB.filter(menu => menu.type.includes(mealType));
      }

      const randomMenu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
      
      setResult(randomMenu);
      setHistory(prev => {
        const newHistory = [randomMenu, ...prev.filter(h => h.id !== randomMenu.id)].slice(0, 5);
        return newHistory;
      });
      setIsLoading(false);
    }, 1200);
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
            <div className="flex items-center space-x-2 text-textSub text-xs font-semibold mb-4">
              <span className="flex items-center bg-white premium-shadow px-3.5 py-1.5 rounded-full border border-gray-50">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                {currentTime.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
              <span className="flex items-center bg-white premium-shadow px-3.5 py-1.5 rounded-full border border-gray-50">
                <CloudSun className="w-3.5 h-3.5 mr-1.5 text-orange-400" />
                {weather}
              </span>
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
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-[15px] font-semibold transition-all duration-200 active:scale-95 ${
                selectedCategory === cat 
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
                className="bg-card w-full rounded-[24px] premium-shadow overflow-hidden border border-gray-100 p-8"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-bold mb-5 tracking-tight">
                    {result.category}
                  </div>
                  <p className="text-textSub text-[15px] font-semibold mb-2">오늘 추천하는 {mealType} 메뉴는</p>
                  <h2 className="text-4xl font-extrabold tracking-tight text-textMain mb-8">{result.name}</h2>
                  
                  <button 
                    onClick={() => openMap(result.name)}
                    className="w-full bg-[#F2F4F6] hover:bg-gray-200 text-textMain font-bold py-4 rounded-2xl flex items-center justify-center transition-all active:scale-[0.98]"
                  >
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    근처 맛집 보기
                  </button>
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
                  className="bg-card shrink-0 px-5 py-4 rounded-[20px] shadow-sm border border-gray-100 min-w-[140px]"
                >
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">{item.category}</p>
                  <p className="font-bold text-[15px] text-textMain truncate">{item.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
