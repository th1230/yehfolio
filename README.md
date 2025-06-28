# Yeh Portfolio - 前端工程師個人作品集

這是一個展示三年前端開發經驗的個人作品集網站，使用 Next.js 14 和 TypeScript 開發。

## 關於我

我是一位擁有三年工作經驗的前端工程師，畢業於淡江大學。主要專精於 Angular 開發，同時具備 React、Vue 等多框架經驗和全端開發能力。

### 主要技能

- **前端框架**: Angular (主要)、React/Next.js、Vue/Nuxt.js
- **程式語言**: TypeScript、JavaScript、HTML/CSS
- **後端技術**: Node.js、Express、MongoDB、PostgreSQL
- **開發工具**: Git、Docker、CI/CD、GitHub Actions

### 專案經驗

#### 工作專案
- **數位遊牧平台**: 完整前後台開發，Lighthouse 95% 分數，SEO 優化
- **內部中轉系統**: Angular + RxJS，自動 refresh 功能
- **金融系統**: 期信申報平台、基金觀測站，多頁面通用列印功能

#### Side Projects
- **AI 票務平台**: Next.js + Node.js + PostgreSQL，Docker 部署
- **才藝媒合網站**: Angular + Node.js + MongoDB，WebSocket 即時通訊

#### 協作專案
- **客製化 GPT 平台**: Nuxt.js + Vue，OpenAI API 整合
- **LINE LIFF 管理系統**: Next.js + React，LINE 整合開發

## 技術棧

### 前端
- **Framework**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Language**: TypeScript

### 部署
- **Platform**: Vercel (推薦)
- **Build**: Next.js 靜態生成

## 功能特色

### 🎨 現代化設計
- 響應式設計，支援桌面與行動裝置
- 深色模式支援
- 流暢的動畫效果

### 🚀 效能優化
- Next.js 14 App Router
- 靜態生成 (SSG)
- 圖片優化
- 程式碼分割

### 💼 專業內容
- 詳細的技能展示
- 完整的工作經驗
- 實際專案案例
- 技術能力評估

### 🔧 開發體驗
- TypeScript 型別安全
- ESLint 程式碼品質
- 模組化組件設計
- 易於維護的程式碼結構

## 開始使用

### 安裝依賴
```bash
npm install
```

### 開發環境
```bash
npm run dev
```

### 建置專案
```bash
npm run build
```

### 啟動生產環境
```bash
npm start
```

## 專案結構

```
src/
├── app/                 # Next.js 14 App Router
│   ├── globals.css     # 全域樣式
│   ├── layout.tsx      # 根佈局
│   └── page.tsx        # 首頁
├── components/         # React 組件
│   ├── About.tsx       # 關於我
│   ├── Contact.tsx     # 聯絡資訊
│   ├── Experience.tsx  # 工作經驗
│   ├── Footer.tsx      # 頁尾
│   ├── Hero.tsx        # 首頁橫幅
│   ├── Navigation.tsx  # 導航列
│   ├── Projects.tsx    # 專案展示
│   └── Skills.tsx      # 技能展示
└── public/             # 靜態資源
```

## 自訂指南

### 更新個人資訊
1. 修改 `src/components/About.tsx` 中的個人介紹
2. 更新 `src/components/Skills.tsx` 中的技能資料
3. 調整 `src/components/Experience.tsx` 中的工作經驗
4. 更新 `src/components/Projects.tsx` 中的專案資料

### 樣式自訂
- 在 `tailwind.config.js` 中修改主題配色
- 調整 `src/app/globals.css` 中的全域樣式

### 添加新組件
1. 在 `src/components/` 中創建新組件
2. 在 `src/app/page.tsx` 中匯入並使用
3. 如需導航，在 `src/components/Navigation.tsx` 中添加連結

## 部署建議

### Vercel 部署
1. 將專案推送到 GitHub
2. 在 Vercel 中連接 GitHub 倉庫
3. 自動部署完成

### 其他平台
- **Netlify**: 支援 Next.js 部署
- **GitHub Pages**: 需要配置靜態匯出
- **自架伺服器**: 使用 Docker 容器化部署

## 聯絡方式

如有任何問題或合作機會，歡迎透過以下方式聯絡：

- **Email**: [your-email@example.com]
- **LinkedIn**: [您的 LinkedIn 連結]
- **GitHub**: [您的 GitHub 連結]

## 授權

此專案僅供個人作品集使用，請勿用於商業用途。
