# API 参考手册

RicMoe 主题提供的所有组件、工具函数和配置选项的完整 API 参考。

## 📚 目录导航

- [🧩 组件 API](#组件-api)
- [📊 数据结构 API](#数据结构-api)  
- [🔧 工具函数 API](#工具函数-api)
- [⚙️ 配置选项 API](#配置选项-api)
- [🎯 事件处理 API](#事件处理-api)

## 🧩 组件 API {#组件-api}

### TypeEffectSubtitle

打字效果副标题组件。

```typescript
interface TypeEffectSubtitleProps {
  // 配置选项继承自主题配置
  themeConfig: ExtendedThemeConfig;
}

interface SubTitleConfig {
  effect: boolean;        // 是否启用打字效果
  loop: boolean;          // 是否循环播放
  source: number;         // 数据源类型 (0: 配置文件)
  sub?: string[];         // 要显示的文字数组
  startDelay: number;     // 开始延迟 (毫秒)
  typeSpeed: number;      // 打字速度 (毫秒/字符)
  backSpeed: number;      // 删除速度 (毫秒/字符)
}
```

**使用示例**:
```tsx
import TypeEffectSubtitle from '@site/src/components/TypeEffectSubtitle';

<TypeEffectSubtitle themeConfig={themeConfig} />
```

### HomepageFeatures

首页特性展示组件。

```typescript
interface FeatureProps {
  cheader: string | ReactNode;    // 卡片头部内容
  cbody: string | ReactNode;      // 卡片主体内容 
  cfooter: string | ReactNode;    // 卡片底部内容
}

interface HomepageFeaturesProps {
  features: FeatureProps[];       // 特性数据数组
}
```

**使用示例**:
```tsx
import HomepageFeatures from '@site/src/components/HomepageFeatures';

<HomepageFeatures features={featuresData} />
```

### MomentDetail

时刻详情组件。

```typescript
interface MomentDetailProps {
  moment: MomentProps;            // 时刻数据
  onClose?: () => void;           // 关闭回调
  onLike?: (id: string) => void;  // 点赞回调
  onComment?: (id: string, comment: string) => void; // 评论回调
}
```

### WalineComment

评论组件。

```typescript
interface WalineCommentProps {
  path?: string;                  // 评论页面路径
  lang?: string;                  // 语言设置
  dark?: 'auto' | boolean;        // 暗黑模式
  serverURL: string;              // Waline 服务器地址
  requiredMeta?: string[];        // 必填信息
  wordLimit?: [number, number];   // 字数限制
  emoji?: string[];               // 表情包 CDN
}
```

### CloudflareTurnstile

人机验证组件。

```typescript
interface TurnstileProps {
  siteKey: string;                // 站点密钥
  theme?: 'light' | 'dark' | 'auto'; // 主题模式
  size?: 'normal' | 'compact';    // 组件大小
  onVerify?: (token: string) => void; // 验证成功回调
  onError?: (error: string) => void;  // 验证失败回调
}
```

## 📊 数据结构 API {#数据结构-api}

### MomentProps

时刻数据结构。

```typescript
interface MomentProps {
  id?: string;                    // 唯一标识符
  title: string;                  // 标题
  content: string;                // 内容
  date: string;                   // 发布日期 (YYYY-MM-DD)
  author?: string;                // 作者
  tags?: string[];                // 标签数组
  category: string;               // 分类标识
  image?: string;                 // 封面图片
  style?: CardStyle;              // 卡片样式
  buttons?: ButtonProps[];        // 按钮配置
  likes?: number;                 // 点赞数
  comments?: number;              // 评论数
  views?: number;                 // 浏览数
}
```

### LinkProps

链接数据结构。

```typescript
interface LinkProps {
  title: string;                  // 链接标题
  url: string;                    // 链接地址
  description?: string;           // 描述信息
  avatar?: string;                // 头像/图标
  color?: string;                 // 主题色
  tags?: string[];                // 标签数组
  status?: LinkStatus;            // 链接状态
  rating?: number;                // 评分 (1-5)
  category: string;               // 所属分类
  addedDate?: string;             // 添加日期
}

type LinkStatus = 'active' | 'inactive' | 'archived';
```

### ButtonProps

按钮配置结构。

```typescript
interface ButtonProps {
  text: string;                   // 按钮文本
  action: ButtonAction;           // 按钮动作
  style?: ButtonStyle;            // 按钮样式
  disabled?: boolean;             // 是否禁用
  loading?: boolean;              // 是否显示加载状态
}

interface ButtonAction {
  type: 'link' | 'event' | 'share'; // 动作类型
  target?: string;                // 链接目标或事件名称
  data?: Record<string, any>;     // 附加数据
}

type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'ghost';
```

### CategoryConfig

分类配置结构。

```typescript
interface CategoryConfig {
  id: string;                     // 分类标识符
  name: string;                   // 分类名称
  description?: string;           // 分类描述
  color?: string;                 // 主题色
  icon?: string;                  // 图标
  order?: number;                 // 排序权重
  visible?: boolean;              // 是否可见
}
```

## 🔧 工具函数 API {#工具函数-api}

### Moments 工具函数

```typescript
// 按日期排序时刻
function sortMomentsByDate(
  moments: MomentProps[], 
  order: 'asc' | 'desc' = 'desc'
): MomentProps[];

// 按分类获取时刻
function getMomentsByCategory(
  moments: MomentProps[], 
  category: string
): MomentProps[];

// 按标签获取时刻
function getMomentsByTag(
  moments: MomentProps[], 
  tag: string
): MomentProps[];

// 按作者获取时刻
function getMomentsByAuthor(
  moments: MomentProps[], 
  author: string
): MomentProps[];

// 按日期范围获取时刻
function getMomentsByDateRange(
  moments: MomentProps[],
  startDate: string,
  endDate: string
): MomentProps[];

// 获取分类统计
function getCategoryStats(
  moments: MomentProps[]
): Record<string, number>;

// 获取标签统计
function getAllTagsWithStats(
  moments: MomentProps[]
): Array<{tag: string; count: number}>;
```

### Links 工具函数

```typescript
// 按分类获取链接数据
function getDataByCategory(category: string): LinkProps[];

// 获取所有链接数据
function getAllLinksData(): LinkProps[];

// 按状态过滤链接
function filterLinksByStatus(
  links: LinkProps[], 
  status: LinkStatus
): LinkProps[];

// 按评分过滤链接
function filterLinksByRating(
  links: LinkProps[], 
  minRating: number
): LinkProps[];

// 搜索链接
function searchLinks(
  links: LinkProps[], 
  query: string
): LinkProps[];
```

### 分类管理函数

```typescript
// 获取所有分类 ID
function getAllCategoryIds(): string[];

// 获取分类配置
function getCategoryConfig(categoryId: string): CategoryConfig | undefined;

// 获取所有分类配置
function getAllCategories(): CategoryConfig[];

// 按分类 ID 获取时刻
function getMomentsByCategoryId(categoryId: string): MomentProps[];
```

## ⚙️ 配置选项 API {#配置选项-api}

### 主题配置

```typescript
interface ExtendedThemeConfig extends ThemeConfig {
  // TypeEffect 配置
  subtitleConfig?: {
    effect: boolean;
    loop: boolean;
    source: number;
    sub?: string[];
    startDelay: number;
    typeSpeed: number;
    backSpeed: number;
  };
  
  // Algolia 搜索配置
  algolia?: {
    appId: string;
    apiKey: string;
    indexName: string;
    contextualSearch: boolean;
    searchParameters?: Record<string, any>;
    searchPagePath?: string;
  };
  
  // 导航栏配置
  navbar?: {
    title: string;
    logo?: {
      alt: string;
      src: string;
    };
    items: NavbarItem[];
  };
  
  // 页脚配置
  footer?: {
    style: 'light' | 'dark';
    links?: FooterLinkItem[][];
    copyright?: string;
  };
  
  // 公告栏配置
  announcementBar?: {
    id: string;
    content: string;
    backgroundColor?: string;
    textColor?: string;
    isCloseable?: boolean;
  };
}
```

### 站点配置

```typescript
interface SiteConfig {
  title: string;                  // 站点标题
  tagline: string;                // 站点标语
  favicon: string;                // 网站图标
  url: string;                    // 站点 URL
  baseUrl: string;                // 基础路径
  organizationName: string;       // 组织名称
  projectName: string;            // 项目名称
  deploymentBranch?: string;      // 部署分支
  trailingSlash?: boolean;        // 是否添加尾随斜杠
  
  // 国际化配置
  i18n: {
    defaultLocale: string;
    locales: string[];
  };
  
  // 外部脚本
  scripts?: Array<{
    src: string;
    position: 'head' | 'body';
    async?: boolean;
    defer?: boolean;
  }>;
  
  // 元数据
  metadata?: Array<{
    name: string;
    content: string;
  }>;
}
```

## 🎯 事件处理 API {#事件处理-api}

### 按钮事件处理

```typescript
// 处理链接跳转
function handleLinkAction(url: string, target?: string): void;

// 处理分享动作
function handleShareAction(data: ShareData): void;

// 处理自定义事件
function handleCustomEvent(eventName: string, data?: any): void;

interface ShareData {
  title: string;
  description?: string;
  url?: string;
  image?: string;
}
```

### Moments 事件处理

```typescript
// 处理点赞
function handleLike(momentId: string): void;

// 处理评论
function handleComment(momentId: string, comment: string): void;

// 处理分享
function handleShare(momentId: string, platform?: string): void;

// 处理访问博客
function handleVisitBlog(url: string): void;

// 处理了解更多
function handleLearnMore(url: string): void;
```

### 表单事件处理

```typescript
// 处理表单提交
function handleFormSubmit(
  formData: FormData, 
  onSuccess?: () => void,
  onError?: (error: Error) => void
): void;

// 处理文件上传
function handleFileUpload(
  file: File,
  onProgress?: (progress: number) => void,
  onComplete?: (url: string) => void
): void;
```

## 🔍 搜索 API

### Algolia 搜索

```typescript
interface AlgoliaSearchConfig {
  appId: string;
  apiKey: string;
  indexName: string;
  searchParameters?: {
    hitsPerPage?: number;
    attributesToRetrieve?: string[];
    attributesToHighlight?: string[];
    attributesToSnippet?: string[];
  };
}

// 执行搜索
function performSearch(
  query: string,
  config: AlgoliaSearchConfig
): Promise<SearchResult[]>;

interface SearchResult {
  objectID: string;
  title: string;
  content: string;
  url: string;
  hierarchy: Record<string, string>;
}
```

## 🎨 样式 API

### CSS 自定义属性

```css
:root {
  /* 主色调 */
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  
  /* 自定义属性 */
  --ricmoe-card-border-radius: 8px;
  --ricmoe-card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --ricmoe-transition-duration: 0.3s;
  
  /* TypeEffect 相关 */
  --typeeffect-cursor-color: var(--ifm-color-primary);
  --typeeffect-text-color: var(--ifm-color-content);
}
```

### 响应式断点

```css
/* 移动端 */
@media (max-width: 767px) { }

/* 平板端 */
@media (min-width: 768px) and (max-width: 1023px) { }

/* 桌面端 */
@media (min-width: 1024px) { }
```

## 📱 平台特定 API

### 微信 JSAPI

```typescript
interface WeChatConfig {
  appId: string;
  timestamp: number;
  nonceStr: string;
  signature: string;
}

// 配置微信 JSAPI
function configWeChat(config: WeChatConfig): Promise<void>;

// 分享到朋友圈
function shareToTimeline(shareData: WeChatShareData): void;

// 分享给朋友
function shareToFriend(shareData: WeChatShareData): void;

interface WeChatShareData {
  title: string;
  desc?: string;
  link: string;
  imgUrl?: string;
}
```

## 🛠️ 开发工具 API

### 调试工具

```typescript
// 开发环境日志
function devLog(message: string, data?: any): void;

// 性能监控
function performanceMonitor(name: string): {
  start: () => void;
  end: () => void;
};

// 错误边界
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error): ErrorState;
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
}
```

---

这份 API 参考手册涵盖了 RicMoe 主题的所有主要 API。如果你需要更详细的信息或遇到问题，请参考具体的功能文档或提交 Issue。
