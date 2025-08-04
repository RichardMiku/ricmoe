# 快速开始

本指南将帮助你快速上手 Links 系统，学会如何添加和管理链接数据。

## 📋 前置要求

- 已安装 Docusaurus v3.x
- 熟悉 TypeScript 基础语法
- 了解 React 组件概念

## 🚀 第一步：了解数据结构

Links 系统将数据按分类组织在 `data/Links/shares/` 目录中：

```typescript
// data/Links/shares/friends.ts
import { LinksProps } from '../types';

export const friendsLinks: LinksProps[] = [
    {
        name: "小鱼干",
        description: "一个热爱技术的小鱼干，写代码，玩游戏，分享生活。",
        avatarUrl: "https://example.com/avatar.jpg",
        url: "https://example-friend.com",
        tags: ["friends", "development", "gaming"],
        category: "friends",
        addedDate: "2024-01-15",
        status: "active",
        rating: 5,
        author: "ricmoe"
    }
];
```

## 🔧 第二步：添加新链接

### 方法一：在现有分类中添加

在对应的分类文件中添加新链接：

```typescript
// data/Links/shares/tools.ts
export const toolsLinks: LinksProps[] = [
    // 现有链接...
    {
        name: "新工具",
        description: "这是一个很棒的新工具",
        avatarUrl: "https://example.com/tool-avatar.jpg",
        url: "https://new-tool.com",
        tags: ["tools", "productivity"],
        category: "tools",
        addedDate: "2025-08-04",
        status: "active",
        rating: 4
    }
];
```

### 方法二：创建新分类

1. **创建新的数据文件**：

```typescript
// data/Links/shares/games.ts
import { LinksProps } from '../types';

export const gamesLinks: LinksProps[] = [
    {
        name: "Steam",
        description: "全球最大的数字游戏平台",
        avatarUrl: "https://store.steampowered.com/favicon.ico",
        url: "https://store.steampowered.com/",
        tags: ["games", "platform"],
        category: "games",
        addedDate: "2025-08-04",
        status: "active",
        rating: 5
    }
];
```

2. **更新分类配置**：

```typescript
// data/Links/categories.ts
export const linkCategories: LinksCategoryProps[] = [
    // 现有分类...
    {
        id: "games",
        name: "游戏娱乐",
        description: "游戏平台和娱乐网站",
        icon: "🎮",
        color: "#e74c3c"
    }
];
```

3. **更新数据汇总**：

```typescript
// data/Links/shares/index.ts
export { gamesLinks } from './games';

import { gamesLinks } from './games';

export const allLinksData: LinksProps[] = [
    // 现有数据...
    ...gamesLinks
];

export const getDataByCategory = (category: string): LinksProps[] => {
    switch (category) {
        // 现有分类...
        case 'games':
            return gamesLinks;
        default:
            return allLinksData;
    }
};

export const categoryDataMap = {
    // 现有映射...
    games: gamesLinks
} as const;
```

## 🏷️ 第三步：配置标签

在 `data/Links/categories.ts` 中添加新标签：

```typescript
export const linkTags: LinksTagProps[] = [
    // 现有标签...
    {
        tagId: "gaming",
        tagName: "🎮Gaming",
        tagDescription: "Gaming Related",
        color: "#e74c3c",
        icon: "🎮"
    }
];
```

## 📖 第四步：在页面中使用

### 基础使用

```typescript
import { allLinksData, linkCategories } from '@site/data/Links';

function MyLinksPage() {
    return (
        <div>
            <h1>总共有 {allLinksData.length} 个链接</h1>
            <p>分为 {linkCategories.length} 个分类</p>
        </div>
    );
}
```

### 过滤和搜索

```typescript
import { 
    allLinksData, 
    filterLinksByCategory,
    filterLinksByTag,
    sortLinksByName 
} from '@site/data/Links';

function FilteredLinks() {
    // 获取工具类链接
    const toolsLinks = filterLinksByCategory(allLinksData, 'tools');
    
    // 获取带有特定标签的链接
    const devLinks = filterLinksByTag(allLinksData, 'development');
    
    // 按名称排序
    const sortedLinks = sortLinksByName(toolsLinks, 'asc');
    
    return (
        <div>
            <h2>工具类链接 ({toolsLinks.length})</h2>
            <h2>开发相关链接 ({devLinks.length})</h2>
        </div>
    );
}
```

## 📊 第五步：获取统计信息

```typescript
import { 
    allLinksData,
    getLinksCategoryStats,
    getLinksTagStats,
    getAllUniqueCategories,
    getAllUniqueTags
} from '@site/data/Links';

function LinksStats() {
    const categoryStats = getLinksCategoryStats(allLinksData);
    const tagStats = getLinksTagStats(allLinksData);
    const categories = getAllUniqueCategories(allLinksData);
    const tags = getAllUniqueTags(allLinksData);
    
    return (
        <div>
            <p>分类统计: {JSON.stringify(categoryStats)}</p>
            <p>标签统计: {JSON.stringify(tagStats)}</p>
            <p>所有分类: {categories.join(', ')}</p>
            <p>所有标签: {tags.join(', ')}</p>
        </div>
    );
}
```

## 🎨 第六步：自定义样式

Links 系统使用 CSS Modules，你可以在 `src/pages/links/styles.module.css` 中自定义样式：

```css
.linkCard {
    height: 320px;
    transition: transform 0.2s ease;
}

.linkCard:hover {
    transform: translateY(-4px);
}

.categoryBadge {
    border-radius: 12px;
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 600;
}
```

## ✅ 验证配置

启动开发服务器验证配置：

```bash
npm start
```

访问 `http://localhost:3000/links` 查看效果。

## 🐛 常见问题

### 1. 导入错误
```typescript
// ❌ 错误
import { links } from '@site/data/Links.tsx';

// ✅ 正确
import { allLinksData } from '@site/data/Links';
```

### 2. 类型错误
确保新添加的链接数据符合 `LinksProps` 类型定义。

### 3. 分类不显示
检查是否在 `linkCategories` 中配置了对应的分类信息。

## 📚 下一步

- 阅读 [数据结构文档](./data-structure.md) 了解详细的数据组织
- 查看 [API 参考](./api-reference.md) 学习所有可用函数
- 学习 [组件使用](./components.md) 来自定义界面
