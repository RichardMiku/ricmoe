# Algolia 爬虫配置说明

## 概述

这个配置文件已经针对你的 Docusaurus 网站进行了全面优化，**兼容不支持 JavaScript 渲染的 Algolia 计划**，能够完整抓取所有页面类型，包括：

- 📖 **文档页面** (`/docs/**`)
- 📝 **博客页面** (`/blog/**`) 
- 💭 **Moments 页面** (`/moments/**`)
- 🔗 **Links 页面** (`/links/**`)
- 👤 **About 页面** (`/about/**`)
- 📬 **Feedback 页面** (`/feedback/**`)
- 🏠 **首页** (`/`)
- 🔍 **搜索页面** (`/search`)

## ⚠️ 重要优化 - 稳定的选择器策略

### 避免动态类名
配置已经优化，**完全避免使用动态生成的CSS类名**：

❌ **不使用这些动态类名**：
```css
.categoryStats_BRQA    /* CSS Modules 哈希类名 */
.filters_ddWb          /* 每次构建都会变化 */
.statInfo_xqrR         /* 不稳定的选择器 */
.title_f1Hy            /* 构建时生成的哈希 */
```

✅ **使用稳定的选择器**：
```css
.hero__title           /* Docusaurus 标准类名 */
.card__body           /* 固定的BEM命名 */
.container            /* 稳定的布局类 */
h1, h2, h3            /* 语义化标签 */
```

### CSS Modules 问题说明
- **CSS Modules** 会将类名转换为唯一的哈希值
- **构建时生成**：每次 `npm run build` 都可能产生不同的类名
- **爬虫失效**：使用动态类名的选择器在下次部署后就会失效

## 优化的选择器策略

### 1. 优先级顺序
1. **Docusaurus 标准类名** - `.hero__title`, `.card__body` 等
2. **语义化HTML标签** - `h1`, `p`, `article` 等  
3. **通用布局类** - `.container`, `.row` 等
4. **通用选择器** - 作为最后的后备方案

### 2. 页面特定配置

#### Moments 页面
```javascript
lvl1: [
  ".hero__title",        // Docusaurus 标准类
  "h1",                  // 语义化标签
  "main h1"              // 上下文选择器
],
content: [
  ".card__body p",       // 稳定的卡片内容
  "main p",              // 主要内容区域
  "p"                    // 通用后备
]
```

#### 博客页面
```javascript
lvl1: [
  ".theme-blog-post-paginator__title",  // Docusaurus 博客类
  "article h1",                         // 文章标题
  "h1"                                  // 通用标题
],
content: [
  "article p",          // 文章段落
  ".markdown p",        // Markdown内容
  "p"                   // 通用段落
]
```

### 3. 后备策略
每个内容选择器都包含多层后备：
1. **特定选择器** - 针对特定组件
2. **容器选择器** - 针对内容区域
3. **通用选择器** - 确保不遗漏内容

## 主要改进

### 1. 计划兼容性
- **`renderJavaScript: false`** - 符合你的 Algolia 计划限制
- **依赖服务端渲染** - 配置优化为抓取 Docusaurus SSR 生成的静态 HTML
- **稳定的选择器** - 避免动态生成的类名导致的爬取失败

### 2. 优化的起始点抓取
```javascript
startUrls: [
  "https://www.ric.moe",
  "https://www.ric.moe/docs/intro",
  "https://www.ric.moe/blog",
  "https://www.ric.moe/blog/archive",   // 新增
  "https://www.ric.moe/blog/tags",      // 新增
  "https://www.ric.moe/moments/",
  "https://www.ric.moe/links/",
  "https://www.ric.moe/about/",
  "https://www.ric.moe/feedback/",
  "https://www.ric.moe/search"          // 新增
]
```

### 3. 长期稳定性
- **不依赖构建生成的类名**
- **使用 Docusaurus 标准类名**
- **语义化标签作为后备**
- **确保未来构建兼容性**

## 为什么这样配置有效

### 1. Docusaurus 标准化
- Docusaurus 的核心类名（如 `.hero__title`）是稳定的
- 主题系统确保了标准类名的一致性
- 升级 Docusaurus 版本时这些类名保持不变

### 2. 语义化 HTML
- `h1`, `h2`, `p`, `article` 等标签永远不变
- 提供了最可靠的内容抓取方式
- 即使主题完全更换也能正常工作

### 3. 渐进式降级
- 从最特定到最通用的选择器
- 确保在任何情况下都能抓取到内容
- 对主题修改和升级具有强健性

## 同义词配置

需要在 Algolia Dashboard 中手动配置：

### 在 Dashboard 中添加同义词
1. 登录 Algolia Dashboard
2. 进入索引设置 → Synonyms
3. 添加这些同义词组：
   - `moments,动态,时刻`
   - `links,友链,链接`  
   - `about,关于,介绍`
   - `feedback,反馈,留言`
   - `blog,博客,文章`
   - `docs,文档,说明`

## 配置参数说明

### 爬取设置
- `maxUrls: 1500` - 增加最大URL数量
- `maxDepth: 10` - 最大爬取深度
- `rateLimit: 8` - 请求频率限制
- `schedule: "every 1 day"` - 每日更新
- `renderJavaScript: false` - 禁用 JS 渲染以符合计划

### 安全检查
- `maxLostRecordsPercentage: 20` - 允许20%的记录变更

### 索引优化
- 启用了 `distinct: true` 避免重复内容
- 优化了搜索权重和排序规则
- 增强了高亮显示效果

## 使用步骤

### 1. 设置 API Key
在配置文件末尾设置你的 Algolia Admin API Key：
```javascript
apiKey: "你的_ADMIN_API_KEY",
```

### 2. 验证索引名称
确认 `indexName: "ricmoedocusaurus"` 与你的 Docusaurus 配置中的索引名称一致。

### 3. 上传配置
将此配置文件上传到 Algolia Crawler 管理后台。

### 4. 测试爬取
建议先运行一次测试爬取，检查是否能正确索引所有页面类型。

## 维护和更新

### 长期维护优势
1. **构建独立性** - 不受 CSS Modules 哈希变化影响
2. **主题兼容性** - 兼容不同的 Docusaurus 主题
3. **版本稳定性** - Docusaurus 升级时依然有效
4. **最小维护** - 基本不需要更新选择器

### 监控建议
1. **定期验证** - 确认重要页面被正确索引
2. **内容检查** - 验证搜索结果包含期望的内容
3. **覆盖率监控** - 确保所有页面类型都被抓取

## 故障排除

### 常见问题
1. **某些页面没有被索引**
   - 检查页面是否依赖客户端渲染
   - 确认页面在sitemap中存在
   - 验证选择器是否匹配实际HTML结构

2. **搜索结果不完整**
   - 检查服务端渲染的HTML内容
   - 确认关键信息在静态HTML中可见
   - 考虑添加更多通用选择器

3. **索引更新后内容缺失**
   - 确认没有使用动态生成的类名
   - 检查 Docusaurus 配置是否有重大变更
   - 验证主题更新是否影响了标准类名

---

*配置现在使用完全稳定的选择器，确保长期可靠性和跨构建的一致性。*
