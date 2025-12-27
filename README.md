# 魔法28天 ✨ 感恩練習應用

基於朗達·拜恩《魔法》一書的28天感恩練習 PWA 應用。

## 功能

- 📅 完整 28 天練習內容
- ✍️ 每日晨間感恩清單（10項）
- 🪨 晚間魔法石練習
- 📖 感恩日記自動記錄
- 📊 進度追蹤
- 📱 可安裝到手機主畫面（PWA）
- 🔒 資料完全存在本地，保護隱私

## 部署到 Vercel

### 方法一：透過 GitHub（推薦）

1. 將此專案上傳到 GitHub
2. 前往 [Vercel](https://vercel.com) 並登入
3. 點擊 **New Project**
4. 選擇你的 GitHub 倉庫
5. 點擊 **Deploy**
6. 完成！你會得到一個 `xxx.vercel.app` 的網址

### 方法二：透過 Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 在專案目錄執行
cd 魔法
vercel

# 按照提示完成部署
```

## 本地測試

```bash
# 使用任何靜態伺服器
npx serve .

# 或使用 Python
python -m http.server 8000
```

然後打開 `http://localhost:8000`

## 安裝到手機

1. 用手機瀏覽器打開部署好的網址
2. **iOS**: 點擊分享按鈕 → 加入主畫面
3. **Android**: 點擊選單 → 安裝應用程式

## 檔案結構

```
魔法/
├── index.html      # 主頁面
├── styles.css      # 樣式
├── app.js          # 應用邏輯
├── practices.js    # 28天練習內容
├── sw.js           # Service Worker（離線支援）
├── manifest.json   # PWA 設定
├── vercel.json     # Vercel 部署設定
└── icons/          # 應用圖標
    ├── icon-192.svg
    └── icon-512.svg
```

## 授權

此應用僅供個人使用。練習內容基於朗達·拜恩《魔法》一書。
