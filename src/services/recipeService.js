const API_KEY = import.meta.env.VITE_RECIPE_API_KEY || "";
const BASE_URL = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`;
const PROXY_URL = "https://api.allorigins.win/raw?url=";

/**
 * Category mapping for better matching
 */
const CATEGORY_MAP = {
  '한식': ['한식', '반찬', '국&찌개', '밥'],
  '일식': ['일식'],
  '중식': ['중식'],
  '양식': ['서양식', '양식'],
  '가벼운 한 끼': ['후식', '반찬', '기타']
};

/**
 * Fetch recipes from the API
 * @param {number} start 
 * @param {number} end 
 * @returns {Promise<Array>}
 */
export const fetchRecipes = async (start = 1, end = 100) => {
  try {
    const targetUrl = `${BASE_URL}/${start}/${end}`;
    const response = await fetch(PROXY_URL + encodeURIComponent(targetUrl));
    const data = await response.json();
    
    if (data.COOKRCP01 && data.COOKRCP01.row) {
      return data.COOKRCP01.row.map(item => ({
        id: item.RCP_SEQ,
        name: item.RCP_NM,
        category: item.RCP_PAT2, // e.g., 반찬, 국&찌개, 일식, 중식
        image: item.ATT_FILE_NO_MAIN,
        ingredients: item.RCP_PARTS_DTLS,
        calories: parseFloat(item.INFO_ENG) || 0,
        type: item.RCP_WAY2 // e.g., 끓이기, 굽기
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};

/**
 * Calculate score for a recipe based on certain criteria
 * @param {Object} recipe 
 * @param {string} preferredCategory 
 * @returns {number}
 */
const calculateScore = (recipe, preferredCategory) => {
  let score = Math.random() * 20; // Base random score for variety

  // Category matching bonus
  if (preferredCategory !== '전체') {
    const validCategories = CATEGORY_MAP[preferredCategory] || [preferredCategory];
    if (validCategories.includes(recipe.category)) {
      score += 100; // Strong preference for category match
    }
  }

  // Bonus for having an image (more appealing)
  if (recipe.image) {
    score += 10;
  }

  // Bonus for "real" food (avoiding just ingredients or tiny snacks if possible)
  if (recipe.calories > 100) {
    score += 5;
  }

  return score;
};

/**
 * Get a recommended recipe using the requested structure
 * @param {string} category 
 * @param {Array} excludeIds - List of IDs to exclude to prevent duplicates
 * @returns {Promise<Object|null>}
 */
export const getRecommendedRecipe = async (category = '전체', excludeIds = []) => {
  // 1. API → 여러 개 가져오기 (e.g., 200 items for better diversity)
  const randomStart = Math.floor(Math.random() * 800) + 1;
  const recipes = await fetchRecipes(randomStart, randomStart + 199);

  if (recipes.length === 0) return null;

  // 2. 필터링 (기본 필터링 + 중복 제외)
  let baseFiltered = recipes.filter(r => 
    r.name && 
    r.name.length > 1 && 
    !excludeIds.includes(r.id) // 최근 추천받은 메뉴 제외
  );
  
  // [추천 로직 강화] 선택된 카테고리가 있다면 해당 카테고리만 1차로 필터링
  let targetRecipes = baseFiltered;
  if (category !== '전체') {
    const validCategories = CATEGORY_MAP[category] || [category];
    const categorySpecific = baseFiltered.filter(r => validCategories.includes(r.category));
    
    if (categorySpecific.length > 0) {
      targetRecipes = categorySpecific;
    }
  }

  // 3. 점수 계산
  const scored = targetRecipes.map(recipe => ({
    ...recipe,
    score: calculateScore(recipe, category)
  }));

  // 4. 1개 선택
  scored.sort((a, b) => b.score - a.score);

  return scored[0] || null;
};
