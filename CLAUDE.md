# react-japanese-vite — 專案規則

日語單字學習應用程式（React 19 + TypeScript + Vite + MUI v7）。
本檔為 Claude Code 的專案指引入口，詳細規範拆分於 `.claude/rules/` 並於下方匯入。

> 這些規則由原 `.cursor/rules/*.mdc` 轉換、整併、去重而來，並對照實際程式碼校正。

## 規則模組

@.claude/rules/project-overview.md
@.claude/rules/project-structure.md
@.claude/rules/coding-standards.md
@.claude/rules/mui-and-styling.md
@.claude/rules/development-workflow.md

## 快速摘要（最常違反的鐵則）

- 套件管理器一律使用 **pnpm**（Node 20.9.0，由 Volta 管理），勿混用 npm／yarn。
- 樣式只用 **MUI `sx`**；禁止 inline style，文字一律用 `<Typography>`。
- 路徑別名 **`@/` → `src/`**；import 依固定順序排列，型別 import 放最後。
- 每個頁面是獨立模組（Colocation）：頁面專用的 component／hook／constant／type 都放在該頁資料夾內。
- 共用資料模型 `VocabularyState` 定義於 `src/types/index.ts`，資料以 **localStorage** 持久化。
- 完成修改後務必 `pnpm lint`（`--max-warnings 0`，零容忍）並確認 `pnpm build` 的 `tsc` 型別檢查通過。
