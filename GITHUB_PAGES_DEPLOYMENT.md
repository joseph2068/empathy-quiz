# 共情天賦測驗 - GitHub Pages 部署指南

## 概述

本指南將幫助你使用 GitHub Pages 部署共情天賦測驗網站。GitHub Pages 提供免費的靜態網站託管服務，完全適合這個前端應用。

---

## 部署步驟

### 第一步：準備構建文件

1. **在本地構建項目**（如果尚未構建）：
   ```bash
   cd empathy_quiz
   pnpm install
   pnpm build
   ```

2. **確認構建輸出**：
   - 構建文件應該在 `dist/` 目錄中
   - 包含 `index.html` 和所有資源文件

### 第二步：配置 GitHub Pages

#### 方法 A：使用 GitHub Web 界面（推薦新手）

1. **打開你的倉庫**：
   - 訪問 https://github.com/joseph2068/empathy-quiz

2. **進入 Settings**：
   - 點擊倉庫頁面上方的 **Settings** 標籤

3. **找到 Pages 設置**：
   - 在左側導航欄中，找到 **Pages**（通常在 "Code and automation" 部分）

4. **配置部署源**：
   - **Source**: 選擇 "Deploy from a branch"
   - **Branch**: 選擇 `main`
   - **Folder**: 選擇 `/ (root)`
   - 點擊 **Save**

5. **等待部署**：
   - GitHub 會自動構建並部署你的網站
   - 部署通常需要 1-5 分鐘
   - 你會看到一條綠色的成功消息，包含你的網站 URL

#### 方法 B：使用 GitHub Actions（自動化構建）

1. **創建工作流文件**：
   - 在倉庫根目錄創建 `.github/workflows/deploy.yml`

2. **添加以下內容**：
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'pnpm'
         
         - name: Install pnpm
           run: npm install -g pnpm
         
         - name: Install dependencies
           run: pnpm install
         
         - name: Build
           run: pnpm build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **提交並推送**：
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Pages deployment workflow"
   git push github main
   ```

4. **監控部署**：
   - 進入 **Actions** 標籤查看構建進度
   - 部署完成後，你的網站將自動發佈

---

## 部署後的網站 URL

根據你的 GitHub 用戶名和倉庫名，你的網站 URL 將是：

```
https://joseph2068.github.io/empathy-quiz/
```

**注意**：
- 首次部署可能需要 5-10 分鐘才能生效
- 如果 URL 無法訪問，請檢查 Settings → Pages 中的部署狀態
- 確保 `dist/index.html` 存在於構建輸出中

---

## 常見問題

### Q1：部署後網站顯示 404 錯誤

**解決方案**：
1. 檢查 `vite.config.ts` 中的 `base` 配置
2. 確保設置為 `/empathy-quiz/`（如果使用子路徑）
3. 重新構建並推送

### Q2：資源文件（CSS、JS）無法加載

**解決方案**：
1. 檢查瀏覽器開發者工具的 Network 標籤
2. 確認資源 URL 是否正確
3. 清除瀏覽器緩存並重新加載

### Q3：路由無法正常工作

**解決方案**：
1. GitHub Pages 不支持客戶端路由的直接訪問
2. 需要在 `public/` 目錄中添加 `404.html` 文件
3. 內容應與 `index.html` 相同，以支持 SPA 路由

**添加 404.html**：
```bash
cp client/public/index.html client/public/404.html
```

### Q4：如何更新已部署的網站

**步驟**：
1. 在本地修改代碼
2. 提交並推送到 GitHub：
   ```bash
   git add .
   git commit -m "Update content"
   git push github main
   ```
3. GitHub Pages 會自動重新構建和部署（通常在 1-5 分鐘內）

---

## 性能優化建議

1. **啟用 Gzip 壓縮**：GitHub Pages 自動啟用
2. **使用 CDN**：考慮使用 Cloudflare 免費 CDN
3. **優化圖片**：確保所有圖片已壓縮
4. **啟用緩存**：GitHub Pages 自動設置適當的緩存頭

---

## 安全性建議

1. **HTTPS**：GitHub Pages 自動提供 HTTPS
2. **隱私**：確保不在代碼中提交敏感信息
3. **依賴更新**：定期更新 npm 依賴

---

## 下一步

- 監控網站性能和用戶反饋
- 定期更新內容和功能
- 考慮添加分析工具（如 Google Analytics）
- 推廣你的測驗網站

---

## 支持

如有任何問題，請參考：
- [GitHub Pages 官方文檔](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
