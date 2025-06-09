# React 日語單字學習應用程式

這是一個使用 React、TypeScript 和 Vite 開發的日語單字學習應用程式。專案採用了最新的前端技術，並遵循了嚴格的編碼標準，旨在提供一個高效、可擴展且易於維護的開發範本。

## ✨ 主要功能 (Features)

-   單字瀏覽與學習
-   單字測驗功能
-   新增與編輯單字
-   響應式設計，支援多種裝置
-   採用 Material Design 3 設計風格

## 🛠️ 技術棧 (Tech Stack)

-   **React 19**
-   **TypeScript**
-   **Vite**
-   **Material-UI (MUI) v7**
-   **React Router Dom**
-   **Emotion** for styling
-   **ESLint** for code linting
-   **Prettier** for code formatting
-   **pnpm** as package manager

## 📂 專案結構 (Project Structure)

專案遵循模組化的頁面架構 (Colocation)，將每個頁面的相關檔案（元件、hooks、常數等）都放在同一個資料夾中，以提高內聚性。

```
src/
├── App.tsx           # 應用程式根組件
├── main.tsx          # 應用程式入口
├── assets/           # 靜態資源 (圖片、字體)
├── components/       # 全域共享元件
├── pages/            # 頁面模組
│   ├── HomePage/
│   ├── StudyPage/
│   ├── QuizPage/
│   ├── NewPage/
│   └── EditPage/
├── router/           # 路由設定
├── types/            # 全域 TypeScript 型別定義
└── ...
```

## 🚀 開發入門 (Getting Started)

### 先決條件 (Prerequisites)

-   **Node.js**: `v20.9.0` 或更高版本 (建議使用 [Volta](https://volta.sh/) 管理)
-   **pnpm**: `v8.15.1` 或更高版本

### 安裝與啟動 (Installation & Setup)

1.  **複製專案至本地**
    ```bash
    git clone <repository-url>
    cd react-japanese-vite
    ```

2.  **安裝依賴套件**
    ```bash
    pnpm install
    ```

3.  **啟動開發伺服器**
    ```bash
    pnpm dev
    ```
    應用程式將會運行在 `http://localhost:5173`。

## 📜 可用腳本 (Available Scripts)

-   `pnpm dev`: 啟動開發伺服器。
-   `pnpm build`: 建置生產環境的程式碼。
-   `pnpm lint`: 執行 ESLint 程式碼檢查。
-   `pnpm preview`: 在本地預覽生產環境的建置結果。

## 📝 編碼規範 (Coding Standards)

本專案遵循詳細的編碼規範，包含命名規則、元件結構、TypeScript 使用、MUI 實踐等。所有開發人員都應遵守這些準則以維持程式碼品質的一致性。
