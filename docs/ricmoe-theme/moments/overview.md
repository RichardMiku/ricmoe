# Moments 系统概述

## 🎯 什么是 Moments？

Moments 是 RicMoe 主题中的时刻分享系统，用于展示个人生活、学习、工作等各种时刻的动态内容。它支持多种卡片样式、动态分类管理和丰富的交互功能。

## ✨ 核心特性

### 🔄 动态分类系统
- **中央化配置**: 通过 `categories.ts` 统一管理所有分类
- **自动统计**: 自动计算每个分类的文章数量和占比
- **灵活扩展**: 添加新分类只需修改配置文件

### 🎨 多样化卡片样式
基于 Infima CSS 框架，支持四种预设样式：
- **简洁模式** (`simple`): 简约干净的设计
- **信息流模式** (`feed`): 类似社交媒体的布局
- **图片中心模式** (`photo-centric`): 突出图片展示
- **最小模式** (`minimal`): 极简设计风格

### 🎯 智能交互系统
- **按钮事件**: 支持链接跳转和自定义事件
- **社交功能**: 点赞、评论、分享等交互
- **统计追踪**: 自动记录用户行为数据

### 📊 数据管理
- **类型安全**: 完整的 TypeScript 类型定义
- **模块化**: 按分类组织数据文件
- **工具函数**: 丰富的数据查询和过滤功能

## 🏗️ 系统架构

```
data/Moments/
├── categories.ts         # 分类配置中心
├── types.ts             # TypeScript 类型定义
├── actions.ts           # 事件处理函数
├── index.ts             # 主入口文件
└── shares/              # 分类数据文件
    ├── index.ts         # 动态数据映射
    ├── blog.ts          # 博客分类
    ├── life.ts          # 生活分类
    ├── tech.ts          # 技术分类
    └── test.ts          # 测试分类
```

## 🚀 快速使用

### 基础导入
```typescript
import moments, { 
    getCategoryStats,
    getAllTagsWithStats,
    getMomentsByCategory 
} from '@site/data/Moments';
```

### 获取数据
```typescript
// 获取所有时刻
const allMoments = moments;

// 获取特定分类
const blogMoments = getMomentsByCategory('blog');

// 获取分类统计
const stats = getCategoryStats();

// 获取标签统计
const tags = getAllTagsWithStats();
```

## 📈 数据流程

1. **分类配置** → `categories.ts` 定义分类元信息
2. **数据创建** → `shares/*.ts` 存储具体内容
3. **动态映射** → `shares/index.ts` 自动关联数据
4. **统一导出** → `index.ts` 提供完整API
5. **UI渲染** → 页面组件消费数据

## 🎨 设计理念

- **简约至上**: 界面简洁，突出内容本身
- **响应式设计**: 适配各种屏幕尺寸
- **性能优化**: 懒加载和智能缓存
- **用户体验**: 流畅的动画和交互反馈

## 🔧 扩展性

系统设计充分考虑了扩展性：

- **新分类**: 只需添加配置和数据文件
- **新样式**: 基于 CSS 变量系统易于定制
- **新功能**: 模块化架构便于功能扩展
- **新交互**: 事件系统支持自定义处理逻辑

## 📱 移动端适配

- 响应式布局自动适配手机屏幕
- 触摸友好的交互设计
- 优化的加载性能
- 原生应用般的用户体验

---

**下一步**: 查看 [快速开始指南](./quick-start) 了解如何使用 Moments 系统。
