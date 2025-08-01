# 卡片样式指南

Moments 系统基于 Infima CSS 框架提供了四种精美的卡片样式，每种样式都有其独特的使用场景和视觉效果。

## 🎨 四种预设样式

### 1. Simple 简洁模式
```tsx
{
    style: 'simple'
}
```

**特点:**
- 清爽简洁的设计
- 适合纯文本内容
- 统一的间距和排版
- 适合展示日常记录

**效果预览:**
```
┌─────────────────────────────┐
│ 📝 今日学习笔记              │
│                             │
│ 今天学习了React的基础概念... │
│                             │
│ 🏷️ React 学习 前端          │
│ 👤 RicMoe  📅 2025-08-01   │
│                             │
│ [访问详情] [点赞]           │
└─────────────────────────────┘
```

### 2. Feed 信息流模式
```tsx
{
    style: 'feed'
}
```

**特点:**
- 类似社交媒体的布局
- 支持头像和用户信息展示
- 适合互动性强的内容
- 现代化的视觉效果

**效果预览:**
```
┌─────────────────────────────┐
│ 👤 RicMoe                   │
│    2025-08-01 · 技术分享    │
│                             │
│ 🚀 完成了新项目的部署        │
│                             │
│ 经过几天的努力，终于将新的... │
│                             │
│ #项目 #部署 #成就           │
│                             │
│ 👍 12  💬 3  📤 分享       │
└─────────────────────────────┘
```

### 3. Photo-centric 图片中心模式
```tsx
{
    style: 'photo-centric'
}
```

**特点:**
- 突出图片显示
- 适合有图片的时刻
- 图片优先的布局设计
- 视觉冲击力强

**效果预览:**
```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │      [主要图片]         │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ 📸 美丽的日落               │
│ 今天拍到了绝美的日落...     │
│                             │
│ 📅 2025-08-01  👤 RicMoe  │
└─────────────────────────────┘
```

### 4. Minimal 最小模式
```tsx
{
    style: 'minimal'
}
```

**特点:**
- 极简设计风格
- 减少视觉干扰
- 突出文字内容
- 适合专注阅读

**效果预览:**
```
┌─────────────────────────────┐
│                             │
│ 今日思考                    │
│                             │
│ 关于代码质量的一些思考...   │
│                             │
│ — RicMoe, 2025-08-01       │
│                             │
└─────────────────────────────┘
```

## 🎨 自定义样式

### CSS 变量系统

每种样式都使用 CSS 变量，可以轻松自定义：

```css
:root {
  /* Simple 样式变量 */
  --moment-simple-bg: #ffffff;
  --moment-simple-border: #e9ecef;
  --moment-simple-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  /* Feed 样式变量 */
  --moment-feed-bg: #f8f9fa;
  --moment-feed-accent: #007bff;
  --moment-feed-hover: #0056b3;
  
  /* Photo-centric 样式变量 */
  --moment-photo-overlay: rgba(0,0,0,0.5);
  --moment-photo-text: #ffffff;
  
  /* Minimal 样式变量 */
  --moment-minimal-text: #495057;
  --moment-minimal-meta: #6c757d;
}
```

### 暗色主题适配

所有样式都支持暗色主题：

```css
[data-theme='dark'] {
  --moment-simple-bg: #2d3748;
  --moment-simple-border: #4a5568;
  --moment-simple-text: #e2e8f0;
  
  --moment-feed-bg: #1a202c;
  --moment-feed-accent: #4299e1;
  
  --moment-minimal-text: #e2e8f0;
  --moment-minimal-meta: #a0aec0;
}
```

## 🎯 样式选择指南

### 根据内容类型选择

| 内容类型 | 推荐样式 | 原因 |
|----------|----------|------|
| 纯文本记录 | `simple` | 简洁清晰，便于阅读 |
| 社交分享 | `feed` | 互动感强，符合社媒习惯 |
| 图片展示 | `photo-centric` | 突出视觉效果 |
| 深度思考 | `minimal` | 减少干扰，专注内容 |
| 技术笔记 | `simple` | 结构清晰，便于扫读 |
| 生活分享 | `feed` | 轻松活泼的氛围 |

### 根据使用场景选择

**博客首页展示:**
```tsx
// 混合使用不同样式增加视觉层次
const moments = [
    { style: 'feed', title: "今日分享" },
    { style: 'simple', title: "技术笔记" },
    { style: 'photo-centric', title: "图片展示" },
    { style: 'minimal', title: "思考记录" }
];
```

**分类页面展示:**
```tsx
// 统一样式保持一致性
const techMoments = [
    { style: 'simple', category: 'tech' },
    { style: 'simple', category: 'tech' },
    { style: 'simple', category: 'tech' }
];
```

## 🔧 高级自定义

### 动态样式切换

```tsx
import { useState } from 'react';

const [currentStyle, setCurrentStyle] = useState<MomentStyle>('simple');

const styleOptions = [
    { value: 'simple', label: '简洁' },
    { value: 'feed', label: '信息流' },
    { value: 'photo-centric', label: '图片中心' },
    { value: 'minimal', label: '极简' }
];

// 在组件中使用
<select 
    value={currentStyle} 
    onChange={(e) => setCurrentStyle(e.target.value as MomentStyle)}
>
    {styleOptions.map(option => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
    ))}
</select>
```

### 条件样式应用

```tsx
const getMomentStyle = (moment: MomentProps): MomentStyle => {
    // 有图片时使用图片中心模式
    if (moment.image) {
        return 'photo-centric';
    }
    
    // 长文本使用简洁模式
    if (moment.content.length > 200) {
        return 'simple';
    }
    
    // 有很多互动时使用信息流模式
    if (moment.actions && moment.actions.length > 2) {
        return 'feed';
    }
    
    // 默认使用极简模式
    return 'minimal';
};
```

### 自定义 CSS 类

```tsx
// 为特定时刻添加自定义样式
{
    title: "特殊样式的时刻",
    content: "这个时刻有特殊的样式",
    style: 'simple',
    className: 'custom-moment-style'
}
```

```css
/* 自定义样式 */
.custom-moment-style {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
}

.custom-moment-style .moment-title {
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
```

## 📱 响应式设计

所有样式都完全响应式：

```css
/* 移动端适配 */
@media (max-width: 768px) {
    .moment-card {
        margin: 10px;
        padding: 15px;
    }
    
    .moment-photo-centric .moment-image {
        height: 200px; /* 移动端减小图片高度 */
    }
    
    .moment-feed .moment-actions {
        flex-direction: column; /* 移动端按钮垂直排列 */
        gap: 8px;
    }
}
```

## 🎨 主题定制

### 品牌色彩定制

```css
:root {
    /* 定义品牌主色调 */
    --brand-primary: #6366f1;
    --brand-secondary: #8b5cf6;
    --brand-accent: #06b6d4;
    
    /* 应用到样式中 */
    --moment-feed-accent: var(--brand-primary);
    --moment-simple-border: var(--brand-accent);
}
```

### 字体定制

```css
.moment-card {
    font-family: 'Inter', -apple-system, system-ui, sans-serif;
}

.moment-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
}

.moment-minimal {
    font-family: 'Crimson Text', serif;
    line-height: 1.8;
}
```

## 最佳实践

1. **保持一致性**: 在同一页面或分类中使用统一的样式
2. **考虑内容**: 根据内容类型选择最合适的样式
3. **测试响应式**: 确保在不同设备上都有好的显示效果
4. **性能优化**: 避免过度的自定义样式影响加载速度
5. **用户体验**: 确保样式不会影响内容的可读性

---

**下一步**: 查看 [使用参考](./usage-reference) 了解完整的 API 文档。
