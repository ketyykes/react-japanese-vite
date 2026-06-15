# 專案總覽與領域知識

## 這是什麼

一個日語單字學習應用程式。使用者可新增、瀏覽、編輯單字，並透過測驗複習，
依「熟悉程度」管理學習進度。

## 技術棧

| 類別 | 技術 |
| --- | --- |
| UI 框架 | React 19.1（函式元件 + Hooks） |
| 語言 | TypeScript 5（嚴格模式） |
| 建置工具 | Vite 6 |
| UI 元件庫 | Material UI v7（`@mui/material`、`@mui/icons-material`） |
| 樣式引擎 | Emotion（MUI v7 預設） |
| 路由 | React Router DOM v7（`createBrowserRouter`） |
| 表單 | React Hook Form 7 + Zod（`@hookform/resolvers`） |
| 部署 | GitHub Pages（`gh-pages`） |

## 核心資料模型

定義於 `src/types/index.ts`，是整個應用的核心狀態：

```typescript
type VocabularyState = {
  chinese: string;   // 中文釋義
  kanji: string;     // 日文漢字
  roma: string;      // 羅馬字
  notation: string;  // 備忘錄 / 備註
  familiar: 'red' | 'yellow' | 'green' | 'orange'; // 熟悉程度
  id: string;        // 唯一識別碼
};
```

### 熟悉程度色彩系統（`familiar`）

- 🔴 `red`：不熟悉，需重點學習
- 🟡 `yellow`：稍微熟悉，需複習
- 🟠 `orange`：中等熟悉
- 🟢 `green`：已熟悉掌握

## 頁面與路由

路由設定於 `src/router/index.tsx`，使用 `createBrowserRouter`。所有頁面採 `lazy` + `Suspense`
懶載入，並設定 `basename: '/react-japanese-vite'`（對應 GitHub Pages 子路徑）。

| 路由 | 頁面 | 用途 |
| --- | --- | --- |
| `/` | HomePage | 首頁／單字總覽 |
| `/study` | StudyPage | 學習模式 |
| `/quiz` | QuizPage | 測驗模式 |
| `/new` | NewPage | 新增單字 |
| `/edit/:id` | EditPage | 編輯指定單字 |
| `/about` | AboutPage | 關於頁 |

新增頁面時：於 `src/pages/` 建立模組 → 用 `lazy(() => import('@/pages/Xxx/Xxx'))` 註冊
→ 以相同的 `<Suspense fallback={...}>` 包裹。

## 資料持久化

- 單字資料以 **`localStorage`** 儲存（見 `src/pages/QuizPage/hooks/useVocabularyStorage.ts`、
  `src/pages/EditPage/hooks/useEditVocabulary.ts` 等）。
- `localStorage` 的讀寫請收斂在 hook 內，元件不直接操作。
- 存取前需處理「資料不存在」與「JSON parse 失敗」的情況。

## 日文處理注意事項

1. 正確處理漢字、平假名、片假名的顯示與輸入。
2. 留意不同輸入法（IME）的相容性。
3. 確保日文字體在開發與生產環境皆正確載入。
4. 學習進度統計以 `familiar` 熟悉程度為基礎。
