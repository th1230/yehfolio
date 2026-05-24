# Yehfolio - Thomas Yeh Portfolio

> 線上展示：[https://portfolio.yehnext.com/](https://portfolio.yehnext.com/)

這是一個以 Next.js App Router 建置的個人作品集，內容聚焦在前端工程經驗、專案案例、職涯階段與聯絡方式。現行版本採用「Cyber Portfolio Interface」風格，透過 BIOS 啟動畫面、分頁式面板、Canvas 背景、音訊視覺化與靜態匯出部署，呈現個人作品集作為一個可互動的前端介面。

## 技術棧

- Framework：Next.js 15 App Router
- UI Runtime：React 19
- Language：TypeScript
- Styling：Tailwind CSS 4
- Icons：React Icons
- Analytics：`@next/third-parties/google`
- Deployment：Next.js static export，輸出至 `out/`

## 專案特色

- 單頁式作品集介面，包含 Profile、Experience、Projects、Contact 四個主要面板
- BIOS boot screen 作為進入作品集的互動入口
- Canvas network background 與自訂 cursor，支援 `prefers-reduced-motion`
- 背景音訊播放、音量偏好保存與 waveform visualizer
- 專案案例以資料檔集中管理，並支援分類篩選、截圖瀏覽與 case study thread
- 靜態輸出設定，適合部署到 GitHub Pages / 靜態主機 / CDN

## 開始使用

### 安裝依賴

```bash
npm install
```

### 開發環境

```bash
npm run dev
```

開發伺服器預設會啟動 Next.js dev server。

### 建置靜態輸出

```bash
npm run build
```

目前 `next.config.ts` 使用 `output: 'export'`，建置後會輸出靜態檔案到 `out/`。

> 注意：此專案是靜態匯出架構，production 驗證應服務 `out/` 目錄，而不是依賴 `next start`。

### 程式碼檢查

```bash
npm run lint
npx tsc --noEmit
```

## 專案結構

```text
src/
├── app/
│   ├── globals.css          # Tailwind 4 theme、全域樣式與動畫
│   ├── layout.tsx           # metadata、JSON-LD、GA、ErrorBoundary
│   ├── not-found.tsx
│   └── page.tsx             # 首頁入口
├── components/
│   ├── ErrorBoundary.tsx
│   └── CyberPortfolio/
│       ├── index.tsx        # 作品集主殼，管理面板、音訊與互動狀態
│       ├── BiosBooter.tsx
│       ├── ProfilePanel.tsx
│       ├── ExperiencePanel.tsx
│       ├── ProjectsPanel.tsx
│       ├── ContactPanel.tsx
│       ├── NetworkCanvas.tsx
│       ├── constants.ts
│       ├── types.ts
│       └── utils.ts
├── data/
│   └── portfolio.ts         # 專案案例與職涯資料
└── lib/
    └── audioPreferences.ts  # 背景音訊偏好讀寫
```

靜態資源放在 `public/`：

```text
public/
├── audio/background.mp3
├── images/projects/
├── images/skills/
└── CNAME
```

## 主要資料來源

作品集內容主要集中在：

- `src/data/portfolio.ts`：專案案例、case study、技術棧、職涯階段
- `src/components/CyberPortfolio/constants.ts`：面板設定與預設音訊路徑
- `src/app/layout.tsx`：SEO metadata、Open Graph、Twitter card、JSON-LD

若要更新履歷內容，優先修改 `src/data/portfolio.ts`。若要調整網站標題、描述、分享預覽或結構化資料，修改 `src/app/layout.tsx`。

## 常用腳本

| 指令                   | 用途                       |
| ---------------------- | -------------------------- |
| `npm run dev`          | 啟動開發環境               |
| `npm run build`        | 建置 production 靜態輸出   |
| `npm run lint`         | 執行 ESLint                |
| `npm run lint:fix`     | 自動修正可修正的 lint 問題 |
| `npm run format`       | 格式化 `src/`              |
| `npm run format:check` | 檢查 `src/` 格式           |

## 部署

目前 GitHub Actions 會在 push 到 `main` 時執行：

1. Checkout
2. Setup Node.js
3. `npm install`
4. `npm run build`
5. 將 `out/` 發布到 `deploy` branch

部署設定位於 `.github/workflows/deploy.yml`。

## 維護建議

- 大型互動效果盡量保持在 `CyberPortfolio` client component 內，靜態內容優先放在 `src/data/portfolio.ts`
- 新增專案截圖時，放入 `public/images/projects/`，並於 `PROJECTS` 對應項目的 `images` 欄位加入路徑
- 新增音訊資源時，放入 `public/audio/`，並更新 `AUDIO_SOURCE`
- 修改 SEO 或社群分享資訊時，同步檢查 `metadataBase`、Open Graph image 與 JSON-LD

## 授權

此專案為個人作品集用途，內容與素材請勿未經同意用於商業用途。
