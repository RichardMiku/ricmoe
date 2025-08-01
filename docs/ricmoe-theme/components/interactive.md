# 🎯 交互组件使用指南

详细介绍 RicMoe 主题中各种交互组件的功能、配置和使用方法。

## ⌨️ TypeEffectSubtitle 打字效果组件

### 功能概览

实现逐字符显示的动态打字效果，常用于首页副标题或介绍文字。

**位置**: `src/components/TypeEffectSubtitle/`

### 基本使用

```tsx
import TypeEffectSubtitle from '@site/src/components/TypeEffectSubtitle';

<TypeEffectSubtitle
  text="欢迎来到 RicMoe 的个人网站"
  speed={100}
  className="hero-subtitle"
/>
```

### Props 参数

```tsx
interface TypeEffectSubtitleProps {
  text: string;           // 要显示的文本
  speed?: number;         // 打字速度（毫秒）默认 100
  delay?: number;         // 开始延迟（毫秒）默认 0
  className?: string;     // 自定义样式类名
  onComplete?: () => void; // 完成回调函数
}
```

### 高级配置

#### 1. 多行文本支持

```tsx
<TypeEffectSubtitle
  text="第一行文本\n第二行文本\n第三行文本"
  speed={80}
  className="multiline-text"
/>
```

#### 2. 自定义样式

```css
/* styles.module.css */
.typeEffect {
  font-size: 1.5rem;
  color: var(--ifm-color-primary);
  text-align: center;
  min-height: 2em; /* 防止布局跳动 */
}

.typeEffect::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

#### 3. 完成事件处理

```tsx
const handleTypeComplete = () => {
  console.log('打字效果完成');
  // 执行后续动画或操作
};

<TypeEffectSubtitle
  text="动画文本"
  speed={120}
  onComplete={handleTypeComplete}
/>
```

### 实际应用场景

- **首页 Hero 区域**: 副标题动画效果
- **介绍页面**: 个人简介动画展示
- **产品介绍**: 特性说明动画效果

## 🛡️ CloudflareTurnstile 安全验证组件

### 功能概览

集成 Cloudflare Turnstile 人机验证服务，提供无侵入式的安全验证体验。

**位置**: `src/components/CloudflareTurnstile/`

### 基本使用

```tsx
import CloudflareTurnstile from '@site/src/components/CloudflareTurnstile';

<CloudflareTurnstile
  sitekey="your-turnstile-sitekey"
  onVerify={handleVerify}
  onError={handleError}
/>
```

### Props 参数

```tsx
interface CloudflareTurnstileProps {
  sitekey: string;                    // Turnstile Site Key
  onVerify: (token: string) => void;  // 验证成功回调
  onError?: (error: string) => void;  // 验证失败回调
  theme?: 'light' | 'dark' | 'auto';  // 主题模式
  size?: 'normal' | 'compact';        // 组件大小
  language?: string;                  // 显示语言
  tabindex?: number;                  // Tab 索引
}
```

### 配置步骤

#### 1. 获取 Turnstile Site Key

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择你的域名
3. 进入 "安全性" > "Turnstile"
4. 创建新的 Turnstile 站点
5. 获取 Site Key 和 Secret Key

#### 2. 环境配置

在 `.env.local` 中配置：

```env
TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

#### 3. 组件集成

```tsx
import { useState } from 'react';
import CloudflareTurnstile from '@site/src/components/CloudflareTurnstile';

export default function ContactForm() {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyToken, setVerifyToken] = useState('');

  const handleVerify = (token: string) => {
    setVerifyToken(token);
    setIsVerified(true);
    console.log('验证成功，Token:', token);
  };

  const handleError = (error: string) => {
    setIsVerified(false);
    console.error('验证失败:', error);
  };

  const handleSubmit = async (e) => {
    if (!isVerified) {
      alert('请完成安全验证');
      return;
    }
    
    // 提交表单逻辑
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // 表单数据
        turnstileToken: verifyToken
      })
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      
      <CloudflareTurnstile
        sitekey={process.env.TURNSTILE_SITE_KEY}
        onVerify={handleVerify}
        onError={handleError}
        theme="auto"
        size="normal"
      />
      
      <button type="submit" disabled={!isVerified}>
        提交
      </button>
    </form>
  );
}
```

### 服务端验证

#### Node.js 验证示例

```javascript
// api/verify-turnstile.js
export default async function handler(req, res) {
  const { token } = req.body;
  
  const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: req.ip // 可选
    })
  });
  
  const result = await verifyResponse.json();
  
  if (result.success) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ 
      success: false, 
      errors: result['error-codes'] 
    });
  }
}
```

### 高级配置

#### 1. 自定义主题

```tsx
<CloudflareTurnstile
  sitekey="your-sitekey"
  theme="dark" // 强制深色主题
  onVerify={handleVerify}
/>
```

#### 2. 紧凑模式

```tsx
<CloudflareTurnstile
  sitekey="your-sitekey"
  size="compact" // 紧凑显示
  onVerify={handleVerify}
/>
```

#### 3. 多语言支持

```tsx
<CloudflareTurnstile
  sitekey="your-sitekey"
  language="zh-CN" // 中文显示
  onVerify={handleVerify}
/>
```

### 错误处理

```tsx
const handleError = (error: string) => {
  switch (error) {
    case 'network-error':
      showNotification('网络连接错误，请检查网络');
      break;
    case 'invalid-sitekey':
      console.error('Turnstile Site Key 无效');
      break;
    case 'timeout-or-duplicate':
      showNotification('验证超时，请重新验证');
      break;
    default:
      showNotification('验证失败，请重试');
  }
};
```

## 🏠 HomepageFeatures 首页特性组件

### 功能概览

展示网站核心特性的卡片式组件，支持图标、标题和描述的组合展示。

**位置**: `src/components/HomepageFeatures/`

### 基本使用

组件自动读取 `data/Features.tsx` 中的特性数据：

```tsx
// data/Features.tsx
export interface FeatureItem {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
}

export const FeatureList: FeatureItem[] = [
  {
    title: '易于使用',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus 从一开始就被设计为易于安装和使用，
        让您的网站快速启动并运行。
      </>
    ),
  },
  // 更多特性...
];
```

### 自定义特性

#### 1. 添加新特性

```tsx
// data/Features.tsx
export const FeatureList: FeatureItem[] = [
  // 现有特性...
  {
    title: '高性能',
    Svg: require('@site/static/img/performance-icon.svg').default,
    description: (
      <>
        采用现代前端技术栈，提供极致的页面加载速度和用户体验。
        支持 SSR 和静态生成，SEO 友好。
      </>
    ),
  },
];
```

#### 2. 自定义图标

```tsx
// 使用自定义 React 组件作为图标
const CustomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);

export const FeatureList: FeatureItem[] = [
  {
    title: '自定义特性',
    Svg: CustomIcon,
    description: <>特性描述</>
  }
];
```

#### 3. 自定义样式

```css
/* src/components/HomepageFeatures/styles.module.css */
.features {
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
}

.featureSvg {
  height: 200px;
  width: 200px;
  color: var(--ifm-color-primary);
}

.featureTitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.featureDescription {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--ifm-color-secondary-darkest);
}
```

### 响应式布局

组件自动适配不同屏幕尺寸：

- **桌面端**: 三列网格布局
- **平板端**: 两列网格布局  
- **移动端**: 单列垂直布局

## 🎨 组件样式定制

### 1. CSS Variables 系统

所有交互组件都支持 CSS 变量定制：

```css
:root {
  --component-primary-color: #007acc;
  --component-secondary-color: #f0f0f0;
  --component-border-radius: 8px;
  --component-transition: all 0.3s ease;
}
```

### 2. 主题适配

组件自动适配 Docusaurus 的主题系统：

```css
[data-theme='dark'] .component {
  --component-bg: var(--ifm-background-color);
  --component-text: var(--ifm-font-color-base);
}

[data-theme='light'] .component {
  --component-bg: #ffffff;
  --component-text: #1c1e21;
}
```

### 3. 响应式设计

```css
@media (max-width: 768px) {
  .component {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .component {
    font-size: 1.1rem;
    padding: 1rem;
  }
}
```

## 🚀 性能优化

### 1. 组件懒加载

```tsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 2. 记忆化优化

```tsx
import { memo, useMemo, useCallback } from 'react';

const OptimizedComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      formatted: formatData(item)
    }));
  }, [data]);

  const handleClick = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.formatted}
        </button>
      ))}
    </div>
  );
});
```

### 3. 事件处理优化

```tsx
// 使用事件委托减少事件监听器
const handleContainerClick = useCallback((e) => {
  const target = e.target as HTMLElement;
  const button = target.closest('[data-action]');
  
  if (button) {
    const action = button.getAttribute('data-action');
    handleAction(action);
  }
}, [handleAction]);

return (
  <div onClick={handleContainerClick}>
    <button data-action="like">点赞</button>
    <button data-action="share">分享</button>
    <button data-action="comment">评论</button>
  </div>
);
```

## 🔧 开发和调试

### 1. 开发模式

```tsx
const DEBUG = process.env.NODE_ENV === 'development';

function DebugInfo({ data }) {
  if (!DEBUG) return null;
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 0, 
      right: 0, 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '1rem' 
    }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### 2. 错误边界

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>组件加载失败</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <YourComponent />
</ErrorBoundary>
```

### 3. 测试工具

```tsx
// 测试工具函数
export const testUtils = {
  simulateClick: (element) => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  },
  
  waitForAnimation: (duration = 300) => {
    return new Promise(resolve => setTimeout(resolve, duration));
  },
  
  getComputedStyles: (element) => {
    return window.getComputedStyle(element);
  }
};
```

## 🔗 相关文档

- [🎨 主题组件概览](./overview)
- [📄 页面组件详细文档](./pages)
- [⏰ Moments 系统文档](../moments)

---

*想要创建自定义交互组件？查看开发指南了解最佳实践！*
