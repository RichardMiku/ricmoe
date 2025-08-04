# 自定义配置

本文档介绍如何自定义 Links 系统的各种配置选项。

## 🎨 样式配置

### CSS 变量

Links 系统支持通过 CSS 变量进行主题定制。在你的 `custom.css` 中添加：

```css
:root {
  /* 链接卡片配置 */
  --links-card-height: 320px;
  --links-card-border-radius: 8px;
  --links-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --links-card-hover-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  
  /* 分类徽章配置 */
  --links-badge-border-radius: 12px;
  --links-badge-padding: 4px 8px;
  --links-badge-font-size: 0.75rem;
  
  /* 过滤器配置 */
  --links-filter-gap: 1rem;
  --links-filter-button-padding: 8px 16px;
  --links-filter-button-border-radius: 4px;
  
  /* 网格配置 */
  --links-grid-gap: 1.5rem;
  --links-grid-min-width: 300px;
  
  /* 颜色配置 */
  --links-primary-color: #007bff;
  --links-success-color: #28a745;
  --links-warning-color: #ffc107;
  --links-danger-color: #dc3545;
  --links-text-muted: #6c757d;
  --links-border-color: #e9ecef;
  --links-background-light: #f8f9fa;
}
```

### 自定义样式类

你可以通过修改 `src/pages/links/styles.module.css` 来自定义样式：

```css
/* 自定义链接卡片样式 */
.linkCard {
  height: var(--links-card-height);
  border-radius: var(--links-card-border-radius);
  box-shadow: var(--links-card-shadow);
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
}

.linkCard:hover {
  box-shadow: var(--links-card-hover-shadow);
  transform: translateY(-4px);
}

/* 自定义分类徽章 */
.categoryBadge {
  border-radius: var(--links-badge-border-radius);
  padding: var(--links-badge-padding);
  font-size: var(--links-badge-font-size);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 自定义标签样式 */
.tags span {
  background: linear-gradient(45deg, #e9ecef, #f8f9fa);
  border: 1px solid #dee2e6;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* 自定义状态徽章 */
.statusBadge {
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-active {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-inactive {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-archived {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}
```

### 响应式断点配置

```css
/* 移动设备优先的响应式设计 */
.linksContainer {
  padding: 1rem;
}

.linksGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--links-grid-gap);
}

/* 平板设备 */
@media (min-width: 768px) {
  .linksContainer {
    padding: 2rem;
  }
  
  .linksGrid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}

/* 桌面设备 */
@media (min-width: 1024px) {
  .linksGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 大屏设备 */
@media (min-width: 1200px) {
  .linksGrid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## ⚙️ 数据配置

### 分类配置

在 `data/Links/categories.ts` 中自定义分类：

```typescript
export const linkCategories: LinksCategoryProps[] = [
  {
    id: "friends",
    name: "朋友们",
    description: "我的朋友们的网站和博客",
    icon: "👥",
    color: "#ff6b6b"
  },
  {
    id: "tools",
    name: "开发工具",
    description: "实用的开发工具和服务",
    icon: "🛠️",
    color: "#4ecdc4"
  },
  // 添加更多分类...
  {
    id: "entertainment",
    name: "娱乐休闲",
    description: "娱乐和休闲相关的网站",
    icon: "🎮",
    color: "#9b59b6"
  }
];
```

**分类配置选项**:
- `id`: 唯一标识符，用于数据关联
- `name`: 显示名称
- `description`: 分类描述
- `icon`: 图标（建议使用 Emoji）
- `color`: 主题色（十六进制颜色值）

### 标签配置

```typescript
export const linkTags: LinksTagProps[] = [
  {
    tagId: "frontend",
    tagName: "🎨Frontend",
    tagDescription: "前端开发相关",
    color: "#e74c3c",
    icon: "🎨"
  },
  {
    tagId: "backend",
    tagName: "⚙️Backend",
    tagDescription: "后端开发相关",
    color: "#3498db",
    icon: "⚙️"
  },
  {
    tagId: "ai",
    tagName: "🤖AI/ML",
    tagDescription: "人工智能和机器学习",
    color: "#9b59b6",
    icon: "🤖"
  }
];
```

### 默认排序配置

```typescript
// data/Links/config.ts
export const defaultConfig = {
  // 默认排序方式
  defaultSortBy: 'date' as 'date' | 'name',
  defaultSortOrder: 'desc' as 'asc' | 'desc',
  
  // 默认过滤设置
  defaultCategory: 'all',
  defaultStatus: 'all',
  
  // 分页配置
  itemsPerPage: 12,
  enablePagination: false,
  
  // 搜索配置
  enableSearch: true,
  searchPlaceholder: '搜索链接...',
  
  // 显示配置
  showStats: true,
  showFilters: true,
  showCategoryStats: true,
  
  // 动画配置
  enableAnimations: true,
  animationDuration: 0.3,
  
  // 卡片配置
  cardHeight: 320,
  showRatings: true,
  showTags: true,
  showAddedDate: true,
  showAuthor: false
};
```

## 🔧 功能配置

### 启用/禁用功能

```typescript
// src/pages/links/config.ts
export interface LinksPageConfig {
  // 功能开关
  features: {
    search: boolean;
    categoryFilter: boolean;
    tagFilter: boolean;
    statusFilter: boolean;
    sorting: boolean;
    statistics: boolean;
    animations: boolean;
  };
  
  // 显示选项
  display: {
    showRatings: boolean;
    showTags: boolean;
    showAddedDate: boolean;
    showAuthor: boolean;
    showDescription: boolean;
    showPreviewImage: boolean;
  };
  
  // 布局选项
  layout: {
    itemsPerRow: {
      mobile: number;
      tablet: number;
      desktop: number;
      wide: number;
    };
    cardHeight: number;
    gap: number;
  };
}

export const defaultLinksConfig: LinksPageConfig = {
  features: {
    search: true,
    categoryFilter: true,
    tagFilter: true,
    statusFilter: true,
    sorting: true,
    statistics: true,
    animations: true
  },
  display: {
    showRatings: true,
    showTags: true,
    showAddedDate: true,
    showAuthor: false,
    showDescription: true,
    showPreviewImage: false
  },
  layout: {
    itemsPerRow: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      wide: 4
    },
    cardHeight: 320,
    gap: 24
  }
};
```

### 自定义过滤器

```typescript
// data/Links/customFilters.ts
export interface CustomFilter {
  id: string;
  name: string;
  filter: (links: LinksProps[]) => LinksProps[];
  icon?: string;
  color?: string;
}

export const customFilters: CustomFilter[] = [
  {
    id: 'highRated',
    name: '高评分',
    filter: (links) => links.filter(link => (link.rating || 0) >= 4),
    icon: '⭐',
    color: '#ffc107'
  },
  {
    id: 'recent',
    name: '最近添加',
    filter: (links) => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return links.filter(link => new Date(link.addedDate) > thirtyDaysAgo);
    },
    icon: '🆕',
    color: '#28a745'
  },
  {
    id: 'featured',
    name: '精选',
    filter: (links) => links.filter(link => link.tags?.includes('featured')),
    icon: '✨',
    color: '#17a2b8'
  }
];
```

### 自定义排序选项

```typescript
// data/Links/customSorting.ts
export interface SortOption {
  id: string;
  name: string;
  sorter: (links: LinksProps[]) => LinksProps[];
  icon?: string;
}

export const customSortOptions: SortOption[] = [
  {
    id: 'rating-desc',
    name: '评分最高',
    sorter: (links) => [...links].sort((a, b) => (b.rating || 0) - (a.rating || 0)),
    icon: '⭐'
  },
  {
    id: 'name-asc',
    name: '名称 A-Z',
    sorter: (links) => [...links].sort((a, b) => a.name.localeCompare(b.name)),
    icon: '🔤'
  },
  {
    id: 'category-asc',
    name: '按分类',
    sorter: (links) => [...links].sort((a, b) => a.category.localeCompare(b.category)),
    icon: '📂'
  },
  {
    id: 'random',
    name: '随机排序',
    sorter: (links) => [...links].sort(() => Math.random() - 0.5),
    icon: '🎲'
  }
];
```

## 🎭 主题配置

### 深色模式支持

```css
/* 深色模式样式 */
[data-theme='dark'] {
  --links-card-background: #2d3748;
  --links-card-border: #4a5568;
  --links-text-primary: #f7fafc;
  --links-text-secondary: #a0aec0;
  --links-badge-background: #4a5568;
  --links-hover-background: #3d4852;
}

[data-theme='dark'] .linkCard {
  background-color: var(--links-card-background);
  border-color: var(--links-card-border);
  color: var(--links-text-primary);
}

[data-theme='dark'] .linkCard:hover {
  background-color: var(--links-hover-background);
}

[data-theme='dark'] .categoryBadge {
  background-color: var(--links-badge-background);
  color: var(--links-text-primary);
}
```

### 自定义主题色板

```typescript
// data/Links/themes.ts
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
  };
}

export const themes: Record<string, Theme> = {
  default: {
    name: '默认主题',
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      light: '#f8f9fa',
      dark: '#343a40'
    }
  },
  ocean: {
    name: '海洋主题',
    colors: {
      primary: '#0077be',
      secondary: '#4a90a4',
      success: '#2ecc71',
      danger: '#e74c3c',
      warning: '#f39c12',
      info: '#3498db',
      light: '#ecf0f1',
      dark: '#2c3e50'
    }
  },
  sunset: {
    name: '日落主题',
    colors: {
      primary: '#ff6b6b',
      secondary: '#ee5a24',
      success: '#26de81',
      danger: '#fc5c65',
      warning: '#fed330',
      info: '#45aaf2',
      light: '#f8f9fa',
      dark: '#2f3542'
    }
  }
};
```

## 📊 数据验证配置

### 链接数据验证

```typescript
// data/Links/validation.ts
export interface ValidationRule<T> {
  field: keyof T;
  validator: (value: any) => boolean;
  message: string;
}

export const linkValidationRules: ValidationRule<LinksProps>[] = [
  {
    field: 'name',
    validator: (value) => typeof value === 'string' && value.length > 0,
    message: '链接名称不能为空'
  },
  {
    field: 'url',
    validator: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: '请提供有效的URL'
  },
  {
    field: 'category',
    validator: (value) => linkCategories.some(cat => cat.id === value),
    message: '请选择有效的分类'
  },
  {
    field: 'rating',
    validator: (value) => value === undefined || (value >= 1 && value <= 5),
    message: '评分必须在1-5星之间'
  },
  {
    field: 'status',
    validator: (value) => ['active', 'inactive', 'archived'].includes(value),
    message: '状态值无效'
  }
];

export function validateLink(link: LinksProps): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const rule of linkValidationRules) {
    const value = link[rule.field];
    if (!rule.validator(value)) {
      errors.push(rule.message);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

## 🔌 插件配置

### 自定义插件接口

```typescript
// data/Links/plugins.ts
export interface LinksPlugin {
  name: string;
  version: string;
  initialize: (config: any) => void;
  beforeRender?: (links: LinksProps[]) => LinksProps[];
  afterRender?: (element: HTMLElement) => void;
  customFilters?: CustomFilter[];
  customSorters?: SortOption[];
}

// 示例插件：SEO 优化
export const seoPlugin: LinksPlugin = {
  name: 'SEO优化插件',
  version: '1.0.0',
  initialize: (config) => {
    console.log('SEO插件已初始化', config);
  },
  beforeRender: (links) => {
    // 添加 SEO 相关的元数据
    return links.map(link => ({
      ...link,
      seoTitle: `${link.name} - 优质链接推荐`,
      seoDescription: link.description.slice(0, 160)
    }));
  },
  afterRender: (element) => {
    // 添加结构化数据
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "友情链接",
      "description": "精选的友情链接和实用工具"
    });
    document.head.appendChild(script);
  }
};
```

## 📱 PWA 配置

### 离线支持配置

```typescript
// data/Links/pwa.ts
export const pwaConfig = {
  // 缓存配置
  cache: {
    name: 'links-cache-v1',
    resources: [
      '/links',
      '/static/img/logo.svg',
      // 添加需要缓存的资源
    ]
  },
  
  // 离线回退页面
  offlineFallback: '/offline',
  
  // 更新检查间隔（毫秒）
  updateCheckInterval: 60000,
  
  // 数据同步配置
  sync: {
    enabled: true,
    interval: 300000, // 5分钟
    onSync: async () => {
      // 同步链接数据的逻辑
      console.log('同步链接数据...');
    }
  }
};
```

## 🔐 安全配置

### URL 安全验证

```typescript
// data/Links/security.ts
export const securityConfig = {
  // 允许的域名模式
  allowedDomains: [
    'https://*.github.com',
    'https://*.microsoft.com',
    'https://*.google.com',
    // 更多域名模式...
  ],
  
  // 禁止的域名
  blockedDomains: [
    'example-malicious.com',
    // 恶意域名列表...
  ],
  
  // URL 验证规则
  urlValidation: {
    requireHttps: false,
    maxLength: 2000,
    allowedProtocols: ['http:', 'https:']
  }
};

export function isUrlSafe(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // 检查协议
    if (!securityConfig.urlValidation.allowedProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    // 检查长度
    if (url.length > securityConfig.urlValidation.maxLength) {
      return false;
    }
    
    // 检查黑名单
    if (securityConfig.blockedDomains.some(domain => urlObj.hostname.includes(domain))) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}
```

通过这些配置选项，你可以完全自定义 Links 系统的外观、行为和功能，使其完美适应你的项目需求。
