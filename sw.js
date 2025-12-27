// Service Worker for 魔法28天 PWA
const CACHE_NAME = 'magic-28-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/practices.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('已開啟快取');
                return cache.addAll(urlsToCache);
            })
            .catch((err) => {
                console.log('快取失敗:', err);
            })
    );
    self.skipWaiting();
});

// 啟動 Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('刪除舊快取:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 攔截請求，優先使用快取
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 如果快取中有，使用快取
                if (response) {
                    return response;
                }
                // 否則從網路獲取
                return fetch(event.request).then((response) => {
                    // 檢查是否為有效的回應
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    // 複製回應並加入快取
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                });
            })
            .catch(() => {
                // 離線時返回離線頁面
                return caches.match('/index.html');
            })
    );
});

// 推播通知處理
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : '是時候做今天的感恩練習了！✨',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'open',
                title: '開始練習'
            },
            {
                action: 'close',
                title: '稍後提醒'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('魔法28天 ✨', options)
    );
});

// 點擊通知時開啟應用
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
