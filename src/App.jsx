import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, MapPin, Clock, CloudSun, Utensils, History } from 'lucide-react';
import { format } from 'date-fns';

// ------------------- MOCK DATA -------------------
const MENU_DB = [
  { id: 1, name: '김치찌개', category: '한식', weather: ['비', '흐림', '맑음'], type: ['점심', '저녁'], image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: '돈까스', category: '일식', weather: ['맑음', '흐림'], type: ['점심', '저녁'], image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: '짜장면', category: '중식', weather: ['비', '흐림', '맑음'], type: ['점심', '저녁'], image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: '초밥', category: '일식', weather: ['맑음'], type: ['점심', '저녁'], image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: '제육볶음', category: '한식', weather: ['맑음', '흐림'], type: ['점심', '저녁'], image: 'https://images.unsplash.com/photo-1628191295246-88022b7a4253?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: '햄버거', category: '양식', weather: ['맑음', '흐림'], type: ['점심'], image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop' },
  { id: 7, name: '파스타', category: '양식', weather: ['맑음', '흐림', '비'], type: ['점심', '저녁'], image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop' },
  { id: 8, name: '마라탕', category: '중식', weather: ['비', '흐림'], type: ['점심', '저녁'], image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop' },
  { id: 9, name: '국밥', category: '한식', weather: ['비', '흐림', '눈'], type: ['점심', '저녁'], image: 'https://plus.unsplash.com/premium_photo-1661600135892-06900f0aa125?q=80&w=800&auto=format&fit=crop' },
  { id: 10, name: '치킨', category: '야식', weather: ['맑음', '비', '흐림'], type: ['저녁'], image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop' },
];

const WEATHER_MOCK = ['맑음', '흐림', '비'];

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mealType, setMealType] = useState('점심'); // '점심' | '저녁'
  const [weather] = useState(WEATHER_MOCK[Math.floor(Math.random() * WEATHER_MOCK.length)]);
  
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '한식', '중식', '일식', '양식'];

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    const hour = currentTime.getHours();
    if (hour >= 15 || hour < 4) {
      setMealType('저녁');
    } else {
      setMealType('점심');
    }
    return () => clearInterval(timer);
  }, [currentTime]);

  const handleRecommend = () => {
    setIsLoading(true);
    setResult(null);

    // 긴장감을 주기 위한 최소 딜레이 (애니메이션과 함께)
    setTimeout(() => {
      let availableMenus = MENU_DB.filter(menu => menu.type.includes(mealType));
      
      if (selectedCategory !== '전체') {
        availableMenus = availableMenus.filter(menu => menu.category === selectedCategory);
      }

      // 날씨에 맞는 메뉴에 약간의 가중치 부여 (간단 구현을 위해 완전히 랜덤)
      if (availableMenus.length === 0) {
        availableMenus = MENU_DB.filter(menu => menu.type.includes(mealType)); // fallback
      }

      const randomMenu = availableMenus[Math.floor(Math.random() * availableMenus.length)];
      
      setResult(randomMenu);
      setHistory(prev => {
        const newHistory = [randomMenu, ...prev.filter(h => h.id !== randomMenu.id)].slice(0, 5);
        return newHistory;
      });
      setIsLoading(false);
    }, 1200); // 1.2초의 긴장감
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
            <div className="flex items-center space-x-2 text-textSub text-sm font-medium mb-3">
              <span className="flex items-center bg-card shadow-sm px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 mr-1.5" />
                {format(currentTime, 'a h:mm')}
              </span>
              <span className="flex items-center bg-card shadow-sm px-3 py-1.5 rounded-full">
                <CloudSun className="w-4 h-4 mr-1.5" />
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
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-card w-full rounded-[24px] shadow-sm overflow-hidden"
              >
                <div className="h-48 w-full bg-gray-200 relative">
                  <img 
                    src={result.image} 
                    alt={result.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-textMain shadow-sm">
                    {result.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-textSub text-sm font-semibold mb-1">추천된 {mealType} 메뉴는</p>
                      <h2 className="text-3xl font-extrabold tracking-tight">{result.name}</h2>
                    </div>
                  </div>
                  <button 
                    onClick={() => openMap(result.name)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-textMain font-bold py-4 rounded-xl flex items-center justify-center transition-colors active:scale-[0.98] mt-2"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
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
                  className="bg-card w-32 shrink-0 rounded-[16px] shadow-sm overflow-hidden border border-gray-100"
                >
                  <img src={item.image} alt={item.name} className="w-full h-20 object-cover" />
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
