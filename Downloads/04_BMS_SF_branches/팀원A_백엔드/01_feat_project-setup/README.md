# BMS Smart Factory — 품질 검사 대시보드

에버넥스 스마트 팩토리 BMS(Battery Management System) 품질 검사용 로컬 프로토타입입니다.

- **Frontend**: Vue 3 + Vite + Pinia + Vue Router + Tailwind CSS
- **Backend**: Node.js + Express + better-sqlite3 (zero-config 로컬 SQLite)
- **LLM**: LM Studio 로컬 서버 프록시 (OpenAI 호환)

## 빠른 시작

```bash
# 1) 백엔드
cd backend && cp .env.example .env && npm install && npm run dev
# 2) 프론트엔드 (새 터미널)
cd frontend && cp .env.example .env && npm install && npm run dev
# 3) 접속
open http://localhost:5173
```

자세한 내용은 `docs/RUN_GUIDE.md`, 테스트 계정은 `docs/ACCOUNTS.md` 참고.

## 구조

```
04_BMS_SF/
├── backend/    Express API + 시뮬레이션 엔진 + LLM 프록시
├── frontend/   Vue 3 SPA
├── sql/        MySQL DDL / Seed (프로덕션 이관용)
├── docs/       ACCOUNTS, RUN_GUIDE
└── image/      챗봇 캐릭터 아이콘
```
