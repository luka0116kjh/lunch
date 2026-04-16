const API_KEY = import.meta.env.VITE_RECIPE_API_KEY || "adb9e4ca0f9e498e8238";
const BASE_URL = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`;

// We will try multiple fallback proxies if one fails
const PROXY_LIST = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://thingproxy.freeboard.io/fetch/"
];

const CATEGORY_MAP = {
  '한식': ['한식', '반찬', '국&찌개', '밥'],
  '일식': ['일식'],
  '중식': ['중식'],
  '양식': ['서양식', '양식'],
  '가벼운 한 끼': ['후식', '반찬', '기타']
};

/**
 * Fallback data in case all API/Proxy attempts fail
 */
const FALLBACK_RECIPES = [
  { id: "1", name: "김치볶음밥", category: "밥", manual: "김치와 밥을 맛있게 볶습니다." },
  { id: "2", name: "된장찌개", category: "국&찌개", manual: "된장을 풀고 채소를 넣어 끓입니다." },
  { id: "3", name: "불고기", category: "한식", manual: "고기를 양념에 재워 구워냅니다." },
  { id: "4", name: "초밥", category: "일식", manual: "신선한 생선을 밥 위에 올립니다." },
  { id: "5", name: "파스타", category: "양식", manual: "면을 삶고 소스에 버무립니다." }
];

export const fetchRecipes = async (start = 1, end = 50) => {
  const targetUrl = `${BASE_URL}/${start}/${end}`;
  
  for (const proxy of PROXY_LIST) {
    try {
      console.log(`Trying proxy: ${proxy}`);
      const response = await fetch(`${proxy}${encodeURIComponent(targetUrl)}`);
      if (!response.ok) continue;
      
      const data = await response.json();
      if (data.COOKRCP01 && data.COOKRCP01.row) {
        return data.COOKRCP01.row.map(item => ({
          id: item.RCP_SEQ,
          name: item.RCP_NM,
          category: item.RCP_PAT2,
          image: item.ATT_FILE_NO_MAIN,
          ingredients: item.RCP_PARTS_DTLS,
          manual: item.RCP_NM,
          calories: item.INFO_ENG
        }));
      }
    } catch (e) {
      console.warn(`Proxy ${proxy} failed:`, e);
    }
  }
  
  console.error("All proxies failed, using fallback data.");
  return FALLBACK_RECIPES;
};

const calculateScore = (recipe, targetCategory) => {
  let score = Math.random() * 10;
  if (targetCategory !== '전체') {
    const validCategories = CATEGORY_MAP[targetCategory] || [targetCategory];
    if (validCategories.includes(recipe.category)) {
      score += 50;
    }
  }
  return score;
};

export const getRecommendedRecipe = async (category = '전체', excludeIds = []) => {
  try {
    const randomStart = Math.floor(Math.random() * 500) + 1;
    const recipes = await fetchRecipes(randomStart, randomStart + 49);

    if (!recipes || recipes.length === 0) return FALLBACK_RECIPES[0];

    const baseFiltered = recipes.filter(r => 
      r.name && r.name.length > 1 && !excludeIds.includes(r.id)
    );
    
    let targetRecipes = baseFiltered.length > 0 ? baseFiltered : recipes;
    
    if (category !== '전체') {
      const validCategories = CATEGORY_MAP[category] || [category];
      const categorySpecific = baseFiltered.filter(r => validCategories.includes(r.category));
      if (categorySpecific.length > 0) {
        targetRecipes = categorySpecific;
      }
    }

    const scored = targetRecipes.map(recipe => ({
      ...recipe,
      score: calculateScore(recipe, category)
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored[0] || FALLBACK_RECIPES[0];
  } catch (err) {
    console.error("Critical error in recommendation:", err);
    return FALLBACK_RECIPES[0];
  }
};
