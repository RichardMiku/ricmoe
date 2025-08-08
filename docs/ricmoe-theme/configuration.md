# 主题配置指南

RicMoe 主题提供了丰富的配置选项，让你可以轻松定制网站的外观和功能。本指南将详细介绍所有可用的配置选项。

## 🎨 基础配置

### 网站基本信息

在 `docusaurus.config.ts` 中配置网站的基本信息：

```typescript
const config: Config = {
  title: 'RICMOE',                    // 网站标题
  tagline: 'Explore, Share, and Enjoy!', // 网站标语
  favicon: 'img/favicon.ico',         // 网站图标
  url: 'https://www.ric.moe',        // 网站 URL
  baseUrl: '/',                       // 基础路径
  organizationName: 'RICMOE',         // 组织名称
  projectName: 'ricmoe-docusaurus',   // 项目名称
};
```

### 国际化配置

```typescript
i18n: {
  defaultLocale: 'zh-hant',  // 默认语言
  locales: ['zh-hant'],      // 支持的语言列表
}
```

## 🎯 主题配置

### 导航栏配置

```typescript
navbar: {
  title: 'RICMOE',
  logo: {
    alt: 'RICMOE Logo',
    src: 'img/apple-touch-icon-100.gif',
  },
  items: [
    // 文档链接
    {
      type: 'docSidebar',
      sidebarId: 'moeSidebar',
      position: 'left',
      label: 'docs',
    },
    // 博客下拉菜单
    {
      type: 'dropdown', 
      to: '/blog', 
      label: 'Blog', 
      position: 'left',
      items: [
        {to: '/blog', label: '文章'},
        {to: '/blog/archive', label: '归档'},
        {to: '/blog/tags', label: '标签'},
      ]
    },
    // 其他页面链接
    {to: '/moments', label: 'Moments', position: 'left'},
    {to: '/links', label: 'Links', position: 'right'},
    {
      href: 'https://github.com/RichardMiku',
      label: 'GitHub',
      position: 'right',
    },
  ],
}
```

### 页脚配置

```typescript
footer: {
  style: 'light',
  copyright: `
    <div class="row row--no-gutters">
      <div class="col">
        <span>🩷 have a nice day! 🩷</span>
      </div>
      <div class="col">
        <span>Copyright © 2020 - ${new Date().getFullYear()} RICMOE.</span>
      </div>
      <div class="col">
        <span class="text--italic">powered by&nbsp;</span>
        <span onclick="window.open('https://docusaurus.io/', '_blank');" >
          <img alt="docusaurus" src="/img/docusaurus.svg" width="32" height="32" 
               style="vertical-align: middle;" />
          <b>Docusaurus</b>
        </span>
      </div>
    </div>
  `,
}
```

## 🎪 特色功能配置

### TypeEffect 打字效果配置

RicMoe 主题支持首页打字效果的副标题：

```typescript
subtitleConfig: {
  effect: true,           // 是否启用打字效果
  loop: true,            // 是否循环播放
  source: 0,             // 数据源类型
  sub: [                 // 要显示的文字数组
    '探索新知！',
    '分享美好！',
    '分享可爱！',
  ],
  startDelay: 500,       // 开始延迟 (ms)
  typeSpeed: 80,         // 打字速度 (ms/字符)
  backSpeed: 40,         // 删除速度 (ms/字符)
}
```

### 主题模式配置

```typescript
colorMode: {
  defaultMode: 'light',              // 默认模式
  disableSwitch: false,             // 是否禁用切换开关
  respectPrefersColorScheme: true,  // 是否遵循系统主题
}
```

### 公告栏配置

```typescript
announcementBar: {
  id: 'announcement-bar',
  content: '欢迎来到 RICMOE！Moments卡片上的按钮暂不可用，评论请前往详情页。',
  textColor: '#495263ff',
  isCloseable: false,
}
```

## 🔍 搜索配置

### Algolia 搜索

```typescript
algolia: {
  appId: 'LJBRFP5Y8O',                    // Algolia App ID
  apiKey: 'cc8a99e7336291f8b0e652ece1556280', // API Key
  indexName: 'ricmoedocusaurus',          // 索引名称
  contextualSearch: true,                 // 上下文搜索
  searchParameters: {},                   // 搜索参数
  searchPagePath: 'search',               // 搜索页面路径
}
```

## 📱 外部脚本配置

### 微信 JSAPI 集成

```typescript
scripts: [
  {
    src: '/js-helper/sha1.min.js',
    position: 'head',
  },
  {
    src: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
    position: 'head',
  },
  {
    src: '/js-helper/pure-sign.js',
    position: 'head',
  },
  {
    src: '/js-helper/wx-share.js',
    position: 'head',
  }
]
```

## 🗺️ SEO 和站点地图

### 元数据配置

```typescript
metadata: [
  {name: 'keywords', content: 'RICMOE, Docusaurus, documentation'},
  {name: 'author', content: 'RICMOE Team'},
  {name: 'algolia-site-verification', content: '7406413BDF2D33E2'},
]
```

### 站点地图配置

```typescript
sitemap: {
  lastmod: 'date',
  changefreq: 'weekly',
  priority: 0.5,
  ignorePatterns: ['/search'],
  filename: 'sitemap.xml',
  createSitemapItems: async (params) => {
    // 动态生成 sitemap 项目
    const {defaultCreateSitemapItems, ...rest} = params;
    const items = await defaultCreateSitemapItems(rest);
    
    // 添加自定义页面到 sitemap
    // ...自定义逻辑
    
    return items;
  },
}
```

## 📝 博客配置

```typescript
blog: {
  showReadingTime: true,    // 显示阅读时间
  feedOptions: {            // RSS 配置
    type: ['rss', 'atom'],
    xslt: true,
  },
  onInlineTags: 'warn',     // 标签警告
  onInlineAuthors: 'warn',   // 作者警告
  onUntruncatedBlogPosts: 'warn', // 摘要警告
}
```

## 📚 文档配置

```typescript
docs: {
  sidebarPath: './sidebars.ts', // 侧边栏配置文件
  // 其他文档相关配置
}
```

## 🎨 自定义样式

### CSS 变量

在 `src/css/custom.css` 中定义自定义 CSS 变量：

```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
```

## 🔧 高级配置

### Future Flags

启用 Docusaurus 的未来特性：

```typescript
future: {
  v4: true, // 启用 v4 兼容性改进
}
```

### Webpack 自定义

如需自定义 Webpack 配置，可以在 `docusaurus.config.ts` 中添加：

```typescript
plugins: [
  () => ({
    configureWebpack: (config) => {
      // 自定义 webpack 配置
      return config;
    },
  }),
]
```

## 📋 配置检查清单

在部署前，请确保以下配置项已正确设置：

- [ ] 网站标题和标语
- [ ] 网站 URL 和基础路径
- [ ] Favicon 和 Logo
- [ ] 导航栏菜单
- [ ] 页脚信息
- [ ] SEO 元数据
- [ ] Algolia 搜索配置
- [ ] 微信分享配置（如需要）
- [ ] 主题色彩配置
- [ ] 国际化设置

## 🚀 部署配置

### GitHub Pages

对于 GitHub Pages 部署：

```typescript
organizationName: 'your-github-username',
projectName: 'your-repo-name',
deploymentBranch: 'gh-pages', // 部署分支
trailingSlash: false,         // 是否添加尾随斜杠
```

### 自定义域名

如果使用自定义域名，在 `static` 目录下添加 `CNAME` 文件：

```
www.yourdomain.com
```

---

通过合理配置这些选项，你可以打造出符合个人或团队需求的定制化网站。如果在配置过程中遇到问题，可以参考 Docusaurus 官方文档或查看项目的示例配置。
