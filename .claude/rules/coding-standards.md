# 編碼規範（TypeScript + React）

適用於 `*.ts`、`*.tsx`、`*.js`、`*.jsx`。

## TypeScript

- 採用嚴格模式（對齊 `@tsconfig/strictest` 的精神），避免 `any`。
- 所有元件、hook、函式都要有明確型別。
- 優先使用 `interface` 定義物件型別；需要聯合／交集型別時才用 `type`。
- 共用型別集中於 `src/types/index.ts`，以 `@/types` 引用。
- 將 magic number 抽成具名常數（如 `const MAX_RETRY = 3;`）。

## React 元件

- 一律使用函式元件 + arrow function。
- 善用 React 19 的最新特性與最佳實踐。
- 命名：元件用 **PascalCase**（`UserCard`）；hook 用 **camelCase 並以 `use` 開頭**（`useFetchData`）。
- 一個元件聚焦 **單一職責**；複雜 UI 用分層子元件封裝（如 `ProfileForm` / `ProfileFormField`）。

## 元件檔案內結構順序

1. `import`
2. `type` / `interface`
3. `constant`
4. `hook`（含自訂 hook 呼叫）
5. UI render（JSX）
6. `export`

## 命名規則

- 命名具語意，能描述用途；避免縮寫（業界慣例如 `API`、`URL` 除外）。
- 事件處理函式以 `handle` 開頭（`handleSubmit`、`handleClick`）。
- 布林值以 `is` / `has` / `can` 開頭（`isLoading`、`hasError`、`canSubmit`）。

## 函式與邏輯

- 每個函式只做一件事，長度盡量控制在約 30 行內（含註解與空行）。
- 邏輯較重時，抽成 helper 函式或自訂 hook。
- 用 **early return** 簡化流程，避免巢狀判斷超過 3 層。

## Import 順序

由 `@trivago/prettier-plugin-sort-imports` 自動排序，撰寫時也應遵循：

1. React、MUI 等核心庫
2. 第三方套件（如 `zod`、`react-hook-form`）
3. `@/` 內部模組
4. 相對路徑模組（`./`、`../`）
5. 型別 import 放最後（`import type { VocabularyState } from '@/types';`）

## 常數

- 與元件強耦合的常數放在該模組的 `constants/`。
- 跨模組共用的常數再上提。
