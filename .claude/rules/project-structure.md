# 專案結構與頁面模組化

## 入口與設定檔

- 應用入口：`src/main.tsx`
- 根元件：`src/App.tsx`
- HTML 模板：`index.html`
- 路由：`src/router/index.tsx`
- 共用型別：`src/types/index.ts`
- Vite 設定：`vite.config.ts`（含別名 `@` → `./src`）
- TypeScript：`tsconfig.json`、`tsconfig.node.json`
- ESLint：`.eslintrc.cjs`、`.eslintignore`
- Prettier：`.prettierrc`

## 原始碼結構

```
src/
├── main.tsx              # 入口
├── App.tsx               # 根元件
├── router/               # 路由設定
├── types/                # 共用型別（VocabularyState）
├── assets/               # 靜態資源（如日文字元資料）
├── components/
│   └── shared/           # 跨頁面共用元件
│       ├── PageLayout/
│       ├── VocabularyForm/
│       ├── ConfirmDialog/
│       └── SuccessAlert/
└── pages/                # 各頁面模組
    ├── HomePage/
    ├── StudyPage/
    ├── QuizPage/
    ├── NewPage/
    ├── EditPage/
    └── AboutPage/
```

## 頁面模組化架構（Colocation）

每個頁面是自包含模組，**頁面專屬** 的元件、hook、常數、型別都放在該頁資料夾內，不外洩到全域：

```
pages/PageName/
├── index.tsx          # Router 用的 default export（薄薄一層）
├── PageName.tsx       # 主頁面元件（邏輯較重時拆出）
├── components/        # 該頁專用元件
│   └── hooks/         # 與該元件耦合的 hook
├── hooks/             # 該頁專用 hook（如 usePageLogic.ts）
├── constants/         # 該頁專用常數與資料（data.ts）
├── types/             # 該頁專用型別
└── styles.tsx         # Emotion styled component（如有）
```

判斷放哪裡：

- 只有單一頁面用到 → 放進該頁模組。
- 兩個以上頁面共用 → 上提到 `src/components/shared/`（元件）或 `src/types/index.ts`（型別）。

## 檔案與資料夾命名

- 元件檔與資料夾：**PascalCase**（如 `UserCard.tsx`、`HomePage/`）。
- hook：以 `use` 開頭的 **camelCase**（如 `usePageLogic.ts`）。
- 一般工具／設定檔：**kebab-case**。
- 頁面專屬元件放在對應頁面資料夾內，不要散落到全域。

## 路徑別名

- 一律用 `@/` 引用 `src/` 下的模組（設定於 `vite.config.ts` 與 ESLint import resolver）。
- 避免出現 `../../../` 的深層相對路徑。
