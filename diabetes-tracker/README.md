# 당뇨 수첩 (Diabetes Tracker PWA)

남편 혈당 관리용 웹앱. 공복/식후 혈당 입력 → 예상 당화혈색소 자동 계산.

## 📱 폰에 설치하기 (PWA)

1. 폰 브라우저로 배포 URL 접속
2. **iOS Safari**: 공유 → "홈 화면에 추가"
3. **Android Chrome**: 메뉴(점 3개) → "홈 화면에 추가" 또는 자동 팝업
4. 홈 화면 아이콘으로 앱처럼 실행 (전체화면 + 오프라인 작동)

## 🚀 GitHub Pages 배포 (5분)

```bash
# 1. GitHub 새 저장소 만들기 (이름: diabetes-tracker)

# 2. 로컬에서 git 초기화
cd diabetes-tracker
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/[본인아이디]/diabetes-tracker.git
git push -u origin main

# 3. GitHub 저장소 → Settings → Pages
#    Source: Deploy from a branch
#    Branch: main / (root) 선택 후 Save

# 4. 1-2분 후 https://[본인아이디].github.io/diabetes-tracker/ 접속
```

## 📁 파일 구조

```
diabetes-tracker/
├── index.html          메인 앱 (UI + 로직)
├── manifest.json       PWA 메타정보
├── service-worker.js   오프라인 캐싱
├── icon-192.png        앱 아이콘 (작은)
└── icon-512.png        앱 아이콘 (큰)
```

## 🔧 로컬 테스트

PWA는 file:// 로 안 되고 http(s)로 띄워야 service worker 작동.

```bash
# Python 있으면
python3 -m http.server 8000

# Node 있으면
npx serve

# → http://localhost:8000 접속
```

## 💾 데이터 저장

- 브라우저 `localStorage`에 저장 (서버 X)
- 같은 폰/브라우저에서만 보임
- 브라우저 데이터 삭제 시 기록도 사라짐
- 계정 동기화 없음 (1인 사용 전제)

## 🧮 당화혈색소(HbA1c) 추정 공식

ADAG 공식 사용:
```
HbA1c (%) = (평균 혈당 mg/dL + 46.7) / 28.7
```

⚠️ 추정치이며 실제 검사와 차이날 수 있음.

## 📝 향후 추가 가능

- [ ] CSV 내보내기 (병원 진료 시 보여주기용)
- [ ] 약 복용 기록
- [ ] 측정 알림 (아침/식후)
- [ ] 다크모드
- [ ] 메모 기능
