# UI Generator Chat Interface - Figma Plugin

피그마에서 UI Generator와 대화하여 UI를 생성할 수 있는 채팅 인터페이스 플러그인입니다.

## 기술 스택

- **Vite**: 빠른 빌드 도구
- **TypeScript**: 타입 안전성
- **React**: 현대적인 UI 라이브러리
- **Figma Plugin API**: 피그마 플러그인 개발

## 기능

- **실시간 채팅**: UI Generator와 자연어로 대화
- **UI 자동 생성**: 대화 내용을 바탕으로 피그마에 UI 요소 자동 생성
- **대화 기록**: 이전 대화 내용 유지
- **다양한 UI 요소**: 텍스트, 버튼, 입력창, 카드 등 다양한 컴포넌트 생성
- **컨텍스트 인식**: 현재 선택된 피그마 요소 정보를 UI Generator에 전달

## 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash
npm run build
```

### 4. 피그마 플러그인 빌드

```bash
npm run figma:build
```

## 프로젝트 구조

```
figma-chat-interface/
├── src/
│   ├── code.ts              # 피그마 플러그인 메인 코드
│   ├── ui.tsx               # React 채팅 인터페이스
│   ├── ui.html              # HTML 템플릿
│   ├── ui.css               # 스타일시트
│   └── types/
│       └── figma.d.ts       # Figma API 타입 정의
├── dist/                    # 빌드 결과물
├── manifest.json            # 플러그인 설정
├── package.json             # 프로젝트 설정
├── tsconfig.json            # TypeScript 설정
├── tsconfig.node.json       # Node.js TypeScript 설정
├── vite.config.ts           # Vite 설정
└── README.md                # 프로젝트 설명서
```

## 사용 방법

### 1. 플러그인 빌드

```bash
npm run figma:build
```

### 2. 피그마에서 플러그인 임포트

1. 피그마에서 플러그인 메뉴 열기
2. "Development" → "Import plugin from manifest..." 선택
3. `manifest.json` 파일 선택

### 3. 플러그인 실행

- 플러그인을 실행하면 채팅 인터페이스가 열립니다

### 4. UI Generator와 대화

```
사용자: "로그인 폼을 만들어줘"
UI Generator: "로그인 폼을 생성하겠습니다. 이메일과 비밀번호 입력창, 로그인 버튼을 포함한 폼을 만들까요?"

사용자: "네, 그리고 회원가입 링크도 추가해줘"
UI Generator: "알겠습니다. 로그인 폼에 회원가입 링크를 추가하여 생성하겠습니다."
```

### 5. 생성된 UI 확인

- 대화가 완료되면 피그마 캔버스에 UI가 자동으로 생성됩니다
- 생성된 UI는 자동으로 선택되어 편집할 수 있습니다

## 지원하는 UI 요소

- **텍스트**: 제목, 설명, 라벨 등
- **버튼**: 액션 버튼, 제출 버튼 등
- **입력창**: 텍스트 입력, 이메일 입력 등
- **카드**: 정보 카드, 상품 카드 등
- **레이아웃**: 그리드, 스택 등

## API 설정

플러그인은 UI Generator API와 통신합니다. API URL을 설정하려면 `src/code.ts` 파일에서 다음 부분을 수정하세요:

```typescript
const UI_GENERATOR_API_URL = "https://your-ui-generator-api.com/chat";
```

## 개발 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과물 미리보기
- `npm run figma:build`: 피그마 플러그인용 빌드

## 대화 예시

### 로그인 폼 생성

```
사용자: "로그인 폼을 만들어줘"
UI Generator: "로그인 폼을 생성하겠습니다. 이메일과 비밀번호 입력창, 로그인 버튼을 포함한 폼을 만들까요?"
```

### 카드 컴포넌트 생성

```
사용자: "상품 카드를 만들어줘"
UI Generator: "상품 카드를 생성하겠습니다. 이미지, 제목, 가격, 구매 버튼을 포함한 카드를 만들까요?"
```

### 대시보드 생성

```
사용자: "대시보드를 만들어줘"
UI Generator: "대시보드를 생성하겠습니다. 통계 카드, 차트, 최근 활동 목록을 포함한 대시보드를 만들까요?"
```

## 개발 정보

- **Figma API Version**: 1.0.0
- **UI Size**: 400x600px
- **Font**: Inter Regular
- **Network Access**: 모든 도메인 허용 (UI Generator API 통신용)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Framework**: React

## 단축키

- **Enter**: 메시지 전송
- **Shift + Enter**: 줄바꿈

## 문제 해결

### API 연결 오류

- UI Generator API URL이 올바른지 확인
- 네트워크 연결 상태 확인
- API 키가 필요한 경우 설정

### UI 생성 오류

- 피그마 캔버스에 충분한 공간이 있는지 확인
- 선택된 요소가 너무 많은 경우 일부 선택 해제

### 빌드 오류

- `npm install`로 의존성 재설치
- TypeScript 타입 오류 확인
- Vite 설정 확인

## 라이선스

MIT License
