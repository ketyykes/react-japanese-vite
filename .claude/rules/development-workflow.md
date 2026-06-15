# 開發工作流程

## 環境

- **Node.js**：20.9.0（由 Volta 管理）
- **套件管理器**：**pnpm** 8.15.1（請勿混用 npm／yarn）
- **開發伺服器**：Vite Dev Server（預設 port 5173）

## 常用指令

```bash
pnpm dev        # 開發模式（HMR）
pnpm build      # 型別檢查（tsc）+ Vite 建置
pnpm lint       # ESLint 檢查
pnpm preview    # 預覽建置結果
pnpm deploy     # 建置並以 gh-pages 部署到 GitHub Pages
```

## 程式碼品質

- **ESLint**（`.eslintrc.cjs`、`.eslintignore`）
  - 涵蓋 TypeScript、React、React Hooks、JSX a11y、import。
  - `pnpm lint` 設定 `--max-warnings 0`，**任何警告都會讓檢查失敗**，請保持零警告。
- **Prettier**（`.prettierrc`）
  - 透過 `@trivago/prettier-plugin-sort-imports` 自動排序 import。
- 完成修改後，請執行 `pnpm lint`，並確認 `pnpm build` 的 `tsc` 型別檢查通過。

## Vite

- 支援 HMR（Hot Module Replacement）。
- 路徑別名 `@` → `./src`（見 `vite.config.ts`）。

## 建置與部署

- 建置輸出至 `dist/`。
- 部署目標為 **GitHub Pages**：`https://ketyykes.github.io/react-japanese-vite/`。
- 因部署於子路徑，路由 `basename` 設為 `/react-japanese-vite`，新增資源／路由時請留意此前綴。
- 確認日文字體在生產環境正確載入。

## Git

- 參考 `.gitignore` 了解忽略項目。
- 遵循一般 Git Flow / GitHub Flow。
- **未經明確要求，不要自動 commit。**
