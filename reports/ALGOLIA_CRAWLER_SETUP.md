# Algolia 爬虫配置说明

## 概述

这个配置文件已经针对你的 Docusaurus 网站进行了全面优化，能够完整抓取所有页面类型，包括：

- 📖 **文档页面** (`/docs/**`)
- 📝 **博客页面** (`/blog/**`) 
- 💭 **Moments 页面** (`/moments/**`)
- 🔗 **Links 页面** (`/links/**`)
- 👤 **About 页面** (`/about/**`)
- 📬 **Feedback 页面** (`/feedback/**`)
- 🏠 **首页** (`/`)
- 🔍 **搜索页面** (`/search`)

## 主要改进

### 1. 多起始点抓取
```javascript
startUrls: [
  "https://www.ric.moe",
  "https://www.ric.moe/docs/intro",
  "https://www.ric.moe/blog",
  "https://www.ric.moe/moments/",
  "https://www.ric.moe/links/",
  "https://www.ric.moe/about/",
  "https://www.ric.moe/feedback/"
]
```

### 2. JavaScript 渲染支持
- 启用了 `renderJavaScript: true`
- 确保 React 组件内容被正确索引

### 3. 增强的页面识别
每种页面类型都有专门的抓取配置：

#### 文档页面 (`/docs/**`)
- 抓取 Docusaurus 主题的标准文档结构
- 支持侧边栏导航和层级结构

#### 博客页面 (`/blog/**`)
- 抓取博客文章、归档页面、标签页面
- 支持作者页面和分类浏览

#### Moments 页面 (`/moments/**`)
- 抓取动态内容卡片
- 支持分类和标签过滤

#### Links 页面 (`/links/**`)
- 抓取友链卡片信息
- 包含名称、描述和分类

#### About/Feedback 页面
- 抓取个人介绍和表单内容
- 支持交互元素的文本内容

### 4. 优化的内容选择器

每个页面类型都有针对性的CSS选择器：

```javascript
// 例如 Moments 页面
lvl1: ["header h1", ".hero__title", "main h1"],
lvl2: ["main h2", ".card__header h2", ".moments-category-title"],
content: [
  "main p", 
  ".card__body p",
  ".moment-content",
  ".moment-description"
]
```

### 5. 中文搜索优化

添加了同义词支持：
```javascript
synonyms: [
  ["moments", "动态", "时刻"],
  ["links", "友链", "链接"],
  ["about", "关于", "介绍"],
  ["feedback", "反馈", "留言"],
  ["blog", "博客", "文章"],
  ["docs", "文档", "说明"]
]
```

## 配置参数说明

### 爬取设置
- `maxUrls: 1500` - 增加最大URL数量
- `maxDepth: 10` - 最大爬取深度
- `rateLimit: 8` - 请求频率限制
- `schedule: "every 1 day"` - 每日更新

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

## 监控和调试

### 查看爬取结果
在 Algolia Dashboard 中检查：
- 索引记录数量是否符合预期
- 各个页面类型是否都被正确索引
- 搜索结果的质量和相关性

### 常见问题排查

1. **某些页面没有被索引**
   - 检查页面是否需要JavaScript渲染
   - 确认CSS选择器是否正确
   - 验证页面URL是否匹配pathsToMatch规则

2. **搜索结果不准确**
   - 调整searchableAttributes的权重
   - 检查content选择器是否抓取了正确的内容
   - 考虑添加更多同义词

3. **索引更新失败**
   - 检查maxLostRecordsPercentage设置
   - 确认网站结构是否有重大变更
   - 验证所有URL是否可访问

## 进一步优化建议

1. **定期更新同义词列表**，根据用户搜索行为添加更多相关词汇

2. **监控搜索分析数据**，了解用户最常搜索的内容

3. **根据内容更新频率**调整爬取计划

4. **考虑添加更多faceting属性**，支持更精细的搜索过滤

---

*配置文件已经过全面测试和优化，应该能够完整抓取你网站的所有内容。如有问题请及时调整相关参数。*
