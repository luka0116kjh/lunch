# 🍱 Lunch - 오늘 뭐 먹지? (Smart Meal Recommender)

[English](#english) | [한국어](#한국어)

---

<a name="english"></a>
## 🇺🇸 English

### 💡 Overview
**Lunch** is a smart meal recommendation service designed to solve the "What should I eat today?" dilemma with a single click. Inspired by the minimalist and premium design language of Toss, it provides a seamless user experience for choosing your next lunch or dinner.

### ✨ Key Features
- **Instant Recommendation Engine**: Suggests meals from various categories (Korean, Japanese, Chinese, Western, Light Meals) using a curated local database for lightning-fast performance.
- **Dynamic Weather & Time**: Displays current local time and weather (via OpenWeatherMap API) to guide your meal choice (Lunch vs. Dinner).
- **Recent History**: Keeps track of your last 5 recommended meals so you don't forget great suggestions.
- **Instant Search**: Direct links to find nearby restaurants on Naver Maps.
- **Premium UI/UX**: Built with Framer Motion for smooth transitions and a sleek, modern aesthetic.

### 🛠 Tech Stack
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: OpenWeatherMap (Weather API)
- **Local Database**: Optimized JSON-based menu list for zero-latency recommendations.
- **CORS Handling**: Multi-proxy fallback system for reliable weather data access.

### 🚀 Getting Started

#### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

#### Installation
```bash
npm install
```

#### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_WEATHER_API_KEY=your_openweathermap_key
VITE_RECIPE_API_KEY=your_foodsafetykorea_key
```

#### Development
```bash
npm run dev
```

#### Deployment
```bash
npm run deploy
```

---

<a name="한국어"></a>
## 🇰🇷 한국어

### 💡 개요
**Lunch - 오늘 뭐 먹지?**는 "오늘 점심 뭐 먹지?"라는 끝없는 고민을 단 한 번의 클릭으로 해결해주는 스마트 식사 추천 서비스입니다. 토스(Toss) 스타일의 미니멀하고 프리미엄한 디자인 언어를 차용하여, 사용자에게 가장 깔금하고 직관적인 경험을 제공합니다.

### ✨ 주요 기능
- **초고속 추천 엔진**: 외부 API 대기 시간 없이 즉시 한식, 일식, 중식, 양식, 가벼운 한 끼 등 다양한 카테고리의 메뉴를 추천합니다.
- **실시간 날씨 및 시간**: 현재 시간과 날씨 정보(OpenWeatherMap API)를 연동하여, 날씨에 어울리는 식사 타입(점심/저녁)을 자동으로 안내합니다.
- **최근 추천 기록**: 최근에 추천받은 5개의 메뉴를 히스토리 형태로 저장하여 다시 확인할 수 있습니다.
- **즉시 검색**: 추천받은 메뉴를 바탕으로 네이버 지도에서 주변 맛집을 바로 찾을 수 있습니다.
- **프리미엄 UI/UX**: Framer Motion을 활용한 부드러운 애니메이션과 고급스러운 인터페이스를 제공합니다.

### 🛠 기술 스택
- **프레임워크**: React 19 (Vite)
- **스타일링**: Tailwind CSS v4
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **데이터 소스**: OpenWeatherMap API
- **로컬 데이터베이스**: 영양가 있고 인기 있는 메뉴 50여 종을 내부 데이터로 구축하여 딜레이 없는 추천 수행
- **CORS 대응**: 신뢰할 수 있는 날씨 데이터 확보를 위한 멀티 프록시 시스템

### 🚀 시작하기

#### 기본 요구사항
- Node.js (최신 LTS 버전 권장)
- npm 혹은 yarn

#### 설치
```bash
npm install
```

#### 환경 변수 설정
루트 디렉토리에 `.env` 파일을 생성하고 아래 키를 설정하세요:
```env
VITE_WEATHER_API_KEY=발급받은_날씨_API_키
VITE_RECIPE_API_KEY=발급받은_식품안전나라_API_키
```

#### 로컬 실행
```bash
npm run dev
```

#### 배포
```bash
npm run deploy
```

---

## 📝 License
This project is licensed under the MIT License.
