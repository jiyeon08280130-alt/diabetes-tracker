// 당뇨 수첩 Service Worker
// 버전 올릴 때마다 캐시 새로 만들어짐 (수정 후 v2, v3... 으로 변경)
const CACHE_NAME = 'diabetes-tracker-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 설치 시: 자산 캐싱하고 즉시 활성화 대기 안함
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // 새 SW 즉시 활성화
});

// 활성화 시: 오래된 캐시 모두 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim()) // 즉시 모든 탭 제어
  );
});

// fetch: 네트워크 우선, 실패하면 캐시 (앱 업데이트 잘 됨 + 오프라인도 작동)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // 같은 출처가 아니면 그냥 통과 (폰트 등)
  if (new URL(event.request.url).origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 네트워크 성공: 캐시 업데이트 후 반환
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // 네트워크 실패(오프라인): 캐시에서 꺼내옴
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // navigate인데 캐시도 없으면 index 반환
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
