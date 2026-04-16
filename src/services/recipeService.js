const MENU_DATA = {
  '한식': [
    { id: 'kr1', name: '김치찌개', category: '한식' },
    { id: 'kr2', name: '된장찌개', category: '한식' },
    { id: 'kr3', name: '불고기', category: '한식' },
    { id: 'kr4', name: '비빔밥', category: '한식' },
    { id: 'kr5', name: '제육볶음', category: '한식' },
    { id: 'kr6', name: '육개장', category: '한식' },
    { id: 'kr7', name: '순두부찌개', category: '한식' },
    { id: 'kr8', name: '물냉면', category: '한식' },
    { id: 'kr9', name: '삼겹살', category: '한식' },
    { id: 'kr10', name: '보쌈', category: '한식' },
    { id: 'kr11', name: '칼국수', category: '한식' },
    { id: 'kr12', name: '수제비', category: '한식' },
    { id: 'kr13', name: '콩나물국밥', category: '한식' },
    { id: 'kr14', name: '감자탕', category: '한식' },
    { id: 'kr15', name: '갈비탕', category: '한식' },
    { id: 'kr16', name: '닭갈비', category: '한식' },
    { id: 'kr17', name: '비빔냉면', category: '한식' },
    { id: 'kr18', name: '설렁탕', category: '한식' },
    { id: 'kr19', name: '곰탕', category: '한식' },
    { id: 'kr20', name: '순대국', category: '한식' },
    { id: 'kr21', name: '떡볶이', category: '한식' },
    { id: 'kr22', name: '찜닭', category: '한식' },
    { id: 'kr23', name: '아구찜', category: '한식' },
    { id: 'kr24', name: '김치찜', category: '한식' },
    { id: 'kr25', name: '해물파전', category: '한식' }
  ],
  '일식': [
    { id: 'jp1', name: '돈카츠', category: '일식' },
    { id: 'jp2', name: '초밥', category: '일식' },
    { id: 'jp3', name: '돈코츠 라멘', category: '일식' },
    { id: 'jp4', name: '우동', category: '일식' },
    { id: 'jp5', name: '규동', category: '일식' },
    { id: 'jp6', name: '메밀 소바', category: '일식' },
    { id: 'jp7', name: '사케동', category: '일식' },
    { id: 'jp8', name: '텐동', category: '일식' },
    { id: 'jp9', name: '가츠동', category: '일식' },
    { id: 'jp10', name: '오코노미야키', category: '일식' },
    { id: 'jp11', name: '타코야끼', category: '일식' },
    { id: 'jp12', name: '야키소바', category: '일식' },
    { id: 'jp13', name: '에비동', category: '일식' },
    { id: 'jp14', name: '카츠카레', category: '일식' },
    { id: 'jp15', name: '냉소바', category: '일식' },
    { id: 'jp16', name: '지라시스시', category: '일식' },
    { id: 'jp17', name: '미소라멘', category: '일식' },
    { id: 'jp18', name: '시오라멘', category: '일식' },
    { id: 'jp19', name: '스키야키', category: '일식' },
    { id: 'jp20', name: '낫또밥', category: '일식' }
  ],
  '중식': [
    { id: 'cn1', name: '짜장면', category: '중식' },
    { id: 'cn2', name: '짬뽕', category: '중식' },
    { id: 'cn3', name: '탕수육', category: '중식' },
    { id: 'cn4', name: '마라탕', category: '중식' },
    { id: 'cn5', name: '강정 풍미 볶음밥', category: '중식' },
    { id: 'cn6', name: '마파두부', category: '중식' },
    { id: 'cn7', name: '울면', category: '중식' },
    { id: 'cn8', name: '유린기', category: '중식' },
    { id: 'cn9', name: '꿔바로우', category: '중식' },
    { id: 'cn10', name: '잡채밥', category: '중식' },
    { id: 'cn11', name: '양장피', category: '중식' },
    { id: 'cn12', name: '팔보채', category: '중식' },
    { id: 'cn13', name: '고추잡채', category: '중식' },
    { id: 'cn14', name: '짬뽕밥', category: '중식' },
    { id: 'cn15', name: '마라샹궈', category: '중식' }
  ],
  '양식': [
    { id: 'ws1', name: '알리오 올리오', category: '양식' },
    { id: 'ws2', name: '필레 미뇽 스테이크', category: '양식' },
    { id: 'ws3', name: '고르곤졸라 피자', category: '양식' },
    { id: 'ws4', name: '치즈 버거', category: '양식' },
    { id: 'ws5', name: '까르보나라', category: '양식' },
    { id: 'ws6', name: '리조또', category: '양식' },
    { id: 'ws7', name: '에그 베네딕트', category: '양식' },
    { id: 'ws8', name: '로제 파스타', category: '양식' },
    { id: 'ws9', name: '라자냐', category: '양식' },
    { id: 'ws10', name: '함박 스테이크', category: '양식' },
    { id: 'ws11', name: '해산물 토마토 파스타', category: '양식' },
    { id: 'ws12', name: '봉골레 파스타', category: '양식' },
    { id: 'ws13', name: '바질 페스토 파스타', category: '양식' },
    { id: 'ws14', name: '티본 스테이크', category: '양식' },
    { id: 'ws15', name: '쉬림프 스캠피', category: '양식' },
    { id: 'ws16', name: '맥앤치즈', category: '양식' },
    { id: 'ws17', name: '버섯 뇨끼', category: '양식' },
    { id: 'ws18', name: '시저 샐러드', category: '양식' },
    { id: 'ws19', name: '치킨 퀘사디아', category: '양식' },
    { id: 'ws20', name: '비프 스튜', category: '양식' }
  ],
  '가벼운 한 끼': [
    { id: 'lt1', name: '닭가슴살 샐러드', category: '가벼운 한 끼' },
    { id: 'lt2', name: '클럽 샌드위치', category: '가벼운 한 끼' },
    { id: 'lt3', name: '참치 마요 김밥', category: '가벼운 한 끼' },
    { id: 'lt4', name: '연어 포케', category: '가벼운 한 끼' },
    { id: 'lt5', name: '요거트 그릭 볼', category: '가벼운 한 끼' },
    { id: 'lt6', name: '베트남 월남쌈', category: '가벼운 한 끼' },
    { id: 'lt7', name: '바나나 팬케이크', category: '가벼운 한 끼' },
    { id: 'lt8', name: '곤약 젤리 국수', category: '가벼운 한 끼' },
    { id: 'lt9', name: '소고기 샐러드', category: '가벼운 한 끼' },
    { id: 'lt10', name: '아보카도 토스트', category: '가벼운 한 끼' },
    { id: 'lt11', name: '단호박 죽', category: '가벼운 한 끼' },
    { id: 'lt12', name: '훈제오리 샐러드', category: '가벼운 한 끼' },
    { id: 'lt13', name: '치킨 텐더 랩', category: '가벼운 한 끼' },
    { id: 'lt14', name: '두부 면 볶음', category: '가벼운 한 끼' },
    { id: 'lt15', name: '리코타 치즈 샐러드', category: '가벼운 한 끼' },
    { id: 'lt16', name: '오트밀 볼', category: '가벼운 한 끼' },
    { id: 'lt17', name: '크림치즈 베이글', category: '가벼운 한 끼' },
    { id: 'lt18', name: '그래놀라 요거트', category: '가벼운 한 끼' },
    { id: 'lt19', name: '구운 계란과 두유', category: '가벼운 한 끼' },
    { id: 'lt20', name: '사과와 견과류', category: '가벼운 한 끼' }
  ]
};

export const getRecommendedRecipe = async (category = '전체', excludeIds = []) => {

  await new Promise(resolve => setTimeout(resolve, 600));

  let pool = [];
  if (category === '전체') {
    pool = Object.values(MENU_DATA).flat();
  } else {
    pool = MENU_DATA[category] || [];
  }

  const filteredPool = pool.filter(item => !excludeIds.includes(item.id));
  const finalPool = filteredPool.length > 0 ? filteredPool : pool;

  if (finalPool.length === 0) return { id: '0', name: '아무거나!', category: '기타' };

  const randomIndex = Math.floor(Math.random() * finalPool.length);
  return finalPool[randomIndex];
};
