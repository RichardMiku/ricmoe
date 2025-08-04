# Links 链接系统

Links 是 RicMoe 主题中的友情链接管理系统，提供了完整的链接分类、标签、过滤和展示功能。

## 📋 目录

- [快速开始](./quick-start.md) - 快速上手使用 Links 系统
- [数据结构](./data-structure.md) - 了解 Links 的数据组织方式
- [API 参考](./api-reference.md) - 完整的 API 文档
- [组件使用](./components.md) - 如何使用 Links 相关组件
- [自定义配置](./configuration.md) - 定制化配置选项
- [最佳实践](./best-practices.md) - 使用建议和最佳实践

## ✨ 特性

### 🗂️ 模块化设计
- **数据分离**: 按分类组织链接数据，便于管理
- **类型安全**: 完整的 TypeScript 类型定义
- **职责单一**: 每个模块负责特定功能

### 🎨 丰富的展示
- **分类展示**: 支持多种分类方式
- **标签系统**: 灵活的标签过滤
- **状态管理**: 链接状态跟踪（活跃/不活跃/已归档）
- **评分系统**: 5星评分展示

### 🔍 强大的过滤
- **分类过滤**: 按链接分类筛选
- **标签过滤**: 按标签筛选内容
- **状态过滤**: 按链接状态筛选
- **搜索功能**: 支持全文搜索
- **多重排序**: 支持按时间、名称等排序

### 📱 响应式设计
- **移动友好**: 完美适配移动设备
- **卡片布局**: 一致的视觉体验
- **动画效果**: 流畅的交互动画

## 🏗️ 架构概览

```
data/Links/
├── index.ts              # 主导出文件
├── types.ts              # 类型定义
├── categories.ts         # 分类和标签配置
├── actions.ts            # 数据操作函数
└── shares/               # 数据文件夹
    ├── index.ts          # 数据汇总
    ├── friends.ts        # 朋友链接
    ├── tools.ts          # 开发工具
    ├── resources.ts      # 学习资源
    └── toys.ts           # 有趣项目
```

## 🚀 快速示例

```typescript
import { 
  allLinksData, 
  linkCategories, 
  filterLinksByCategory,
  sortLinksByName 
} from '@site/data/Links';

// 获取所有工具类链接
const toolsLinks = filterLinksByCategory(allLinksData, 'tools');

// 按名称排序
const sortedLinks = sortLinksByName(toolsLinks, 'asc');

// 获取分类配置
const categories = linkCategories;
```

## 📦 数据类型

### LinksProps
```typescript
type LinksProps = {
    name: string;           // 链接名称
    description: string;    // 链接描述
    avatarUrl: string;      // 头像链接
    url: string;           // 网站链接
    imageUrl?: string;     // 预览图片
    tags?: string[];       // 标签数组
    category: string;      // 分类ID
    addedDate: string;     // 添加日期
    status: 'active' | 'inactive' | 'archived'; // 状态
    rating?: number;       // 评分(1-5)
    author?: string;       // 添加者
};
```

## 🎯 使用场景

1. **友情链接页面** - 展示朋友们的网站和博客
2. **工具导航** - 整理常用的开发工具和服务
3. **资源收藏** - 管理学习资源和参考资料
4. **项目展示** - 展示有趣的项目和创意作品

## 📝 版本信息

- **当前版本**: v2.0.0
- **最后更新**: 2025年8月4日
- **兼容性**: Docusaurus v3.x, React 18+

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进 Links 系统！

---

**下一步**: 阅读 [快速开始](./quick-start.md) 来开始使用 Links 系统。
