# Yehfolio · Thomas Yeh

個人網站，呈現軟體開發經驗、AI 開發流程實務與作品案例。
線上網址：[portfolio.yehnext.com](https://portfolio.yehnext.com/)

## 開發與建置

使用 Next.js 15 App Router、React 19、TypeScript，採靜態匯出。

```sh
npm install
npm run dev
npm run build
```

`npm run build` 執行型別與 ESLint 檢查，將網站輸出至 `out/`。
正式版預覽請用靜態伺服器服務 `out/`；此匯出模式不使用 `next start`。

## 網站與內容

版面依照 Claude Design 畫布「Yeh Folio — Summer Redesign」製作：桌機 1440、平板 1024、手機 390 三種畫板，依螢幕寬度選用對應畫板並等比縮放（`src/components/layout/Artboard.tsx`）。

- `src/app/`：首頁（含入口轉場）、`about/`、`work/` 作品頁與 `work/[slug]/` 九個作品詳情頁、404、網站圖示。每頁的樣式放在同目錄的 CSS Module。
- `src/components/`：共用元件，例如導覽與選單、頁尾、聯絡區、按鈕、手寫標題、換頁轉場、風鈴影片與聲音（`chime/`）、入口轉場（`entry/`）、作品篩選（`work/`）、截圖輪播（`project/`）與看大圖（`zoom/`）。
- `src/data/`：作品、經歷、技能與網站資訊（型別在 `types.ts`）。
- `src/lib/`：讀取作品資料與圖片尺寸的小工具。

分類使用 **Commercial Projects / Personal Projects**。Eventa、TalentMatch 是團隊自主專案，其餘為商業開發。

## 素材與檔案管理

- `public/images/art/`：插圖、葉子、光影、簽名等版面圖片。
- `public/images/covers/{slug}.webp`：作品封面。
- `public/images/screens/`：作品截圖，`{name}-large.webp` 是「看大圖」用的大圖。
- `public/images/social-card.jpg`：分享預覽圖。
- `public/media/wind-chime.webm`：風鈴影片原檔，不裁切、不重新編碼；Safari 無法播放透明 VP9，改用由原檔轉出的 `wind-chime.avif`（畫面）與 `wind-chime.m4a`（聲音）。
- `src/app/icon.png`、`favicon.ico`、`apple-icon.png`：網站圖示（葉・T 記號）。

`out/` 是靜態匯出結果；`.next/` 是正式建置資料，`.next-dev/` 是開發快取，兩者分開避免同時執行時互相覆蓋。

## 部署

部署設定在 `.github/workflows/deploy.yml`。本機改版與建置不會自動發布。

網站內容與作品素材為個人作品集用途，未經同意請勿另作商業使用。
