# CRM System (Frontend by React)

## 작업 폴더 구조
```
src/
├── App.js              # 진입점 파일
├── api/                # API 호출
├── components/         # 공통 UI 컴포넌트
├── pages/              # 각 기능별 페이지 컴포넌트
│   ├── Main.js             # 메인 화면
│   ├── Login.js            # 로그인 화면
│   ├── Membership.js       # 회원 가입 화면
│   ├── WriteNote.js        # 노트 화면
│   ├── Attribute.js        # 속성 추가 화면
├── routes/             # 라우터 관련 파일
│   └── Router.js           # 모든 라우팅 처리
├── styles/             # 스타일 파일 (CSS, SCSS 등)
├── img/                # 이미지 요소 (img, png, svg 등)
└── index.js            # ReactDOM.render() 호출
```

## 주요 라이브러리 목록
```
"ag-grid-react": "^32.3.3"      # 데이터 테이블 생성 시 사용 (본 프로젝트의 동적 속성 핵심 라이브러리)
"axios": "^1.7.7"               # API 호출에 주로 사용, HTTP 요청을 위한 클라이언트
"react-router-dom": "^6.28.0"   # React에서 라우팅(페이지 간 이동)을 처리하기 위한 라이브러리
```