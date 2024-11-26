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

## 화면 구성

### 메뉴 구성 (사이드 바)

- 홈 (사이트 로고)

- 로그인 / 프로필
    - 로그인(X) : 로그인
        - 로그인
        - 회원가입

    - 로그인(O) : 프로필
        - 로그 아웃 (로그인 O)
        - 개인 설정 (개인 정보 변경, ...)

- 데이터베이스
  - 투자자
    (내부 화면 탭 : 메뉴 바에는 표시 X)
        - 전체 기업
        - 관심 기업
  - 스타트업
    (내부 화면 탭 : 메뉴 바에는 표시 X)
        - 전체 기업
        - 관심 기업

- 개인 딜 (여러가지 분류의 딜) (동적)
  - 딜 1 : AI 스타트업
  - 딜 2 : K-pop 투자자
  - ...

- 설정  (사이트 설정)
- 도움말 (사이트 소개)

- 모드 전환 (다크 모드)


### 메인 화면 구성

## API / 테이블 구조
1. 로그인 
`api/login -> api/member/{memberId}`
2. 딜 (딜추가, 속성추가 있는 화면 현재 deal 0개)
`api/member/{memberId}/deals`
3. 딜 추가모달
`api/member/{memberId}/adddeals`
4. 추가된 딜 누르면
`api/member/{memberId}/deals/{dealId}`
5. 속성추가모달
`api/member/{memberId}/deals/addattributes`
6. 노트
`api/member/{memberId}/deals/{dealId}/note`
7. 노트추가모달
`api/member/{memberId}/deals/{dealId}/note/{noteId}`