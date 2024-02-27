import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // 容器內的服務監聽所有網卡地址，使其能夠通過容器外部的地址訪問
    strictPort: true, // 確保 Vite 開發伺服器在指定的端口運行，如果該端口已被占用，則直接終止服務
    port: 5173, // 指定 Vite 開發伺服器的端口為 5173，這是 Vite 的默認端口
  },
});
