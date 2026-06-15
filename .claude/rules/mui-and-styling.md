# MUI v7 與樣式規範

## 核心原則

- **Mobile First**：優先設計手機版（320px–768px），再往上擴充。
- 遵循 **Material Design 3** 指南。
- 樣式引擎使用 MUI v7 預設的 **Emotion**。
- 所有元件需有完整 TypeScript 型別。

## 樣式撰寫

- **一律使用 `sx` prop；禁止 inline style。**
- 需要可重用、較複雜的樣式才用 Emotion `styled`（放在該模組的 `styles.tsx`）。
- 一律透過 **theme 變數** 取色與間距，確保設計一致；善用 `alpha()`、`lighten()`、`darken()`。
- 使用語義化顏色：`primary`、`secondary`、`success`、`warning`、`error`。
- 文字一律用 `<Typography>`，**不要直接用 `<p>`、`<h1>`** 等原生標籤。

## 響應式設計

- 使用 MUI breakpoints：`xs`、`sm`、`md`、`lg`、`xl`。
- 響應式樣式透過 `sx` 設定（如 `sx={{ p: { xs: 1, md: 3 } }}`）。
- **避免寫死 `px`**，改用 `theme.breakpoints` 與 MUI 間距系統。

## 元件骨架範例

```typescript
interface ComponentProps {
  // 明確的 prop 型別定義
}

const Component = ({ ...props }: ComponentProps) => {
  const theme = useTheme();

  // 元件邏輯

  return (
    // TSX 結構
  );
};
```

## 表單

- 表單一律使用 **React Hook Form + Zod**（`@hookform/resolvers`）。
- 共用單字表單為 `src/components/shared/VocabularyForm/`，內含 `vocabularySchema.ts`（Zod schema）
  與 reducer（`vocabularyReducer.ts`、`vocabularyActionCreator.ts`、`vocabularyInitialState.ts`）。
- 驗證規則寫在 Zod schema，並提供即時驗證回饋。
- 使用 MUI 表單元件（`TextField`、`Button`、`Select` 等）。

## 無障礙（A11y）

- 互動元素需有適當的 ARIA 標籤。
- 色彩對比符合 WCAG 2.1。
- 支援鍵盤導航，並提供清楚的焦點指示器。
- 專案已啟用 `eslint-plugin-jsx-a11y`，請勿關閉其警告。

## 動畫與過渡

- 使用 MUI 過渡元件：`Fade`、`Slide`、`Zoom`、`Collapse`。
- 動畫時長遵循 Material Design（約 200ms–300ms），搭配 `cubic-bezier` 緩動函式提升體驗。
