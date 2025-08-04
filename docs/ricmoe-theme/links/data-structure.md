# 数据结构

本文档详细介绍 Links 系统中的数据组织方式和类型定义。

## 📁 文件结构

```
data/Links/
├── index.ts              # 主导出文件，统一管理所有模块
├── types.ts              # TypeScript 类型定义
├── categories.ts         # 分类和标签配置
├── actions.ts            # 数据操作函数（过滤、排序、统计）
└── shares/               # 数据存储文件夹
    ├── index.ts          # 数据汇总和导出
    ├── friends.ts        # 朋友链接数据
    ├── tools.ts          # 开发工具数据
    ├── resources.ts      # 学习资源数据
    └── toys.ts           # 有趣项目数据
```

## 🏷️ 类型定义

### LinksProps

主要的链接数据类型：

```typescript
export type LinksProps = {
    name: string;           // 链接名称（必填）
    description: string;    // 链接描述（必填）
    avatarUrl: string;      // 头像链接（必填）
    url: string;           // 网站链接（必填）
    imageUrl?: string;     // 预览图片（可选）
    tags?: string[];       // 标签数组（可选）
    category: string;      // 分类ID（必填）
    addedDate: string;     // 添加日期（必填，格式：YYYY-MM-DD）
    status: 'active' | 'inactive' | 'archived'; // 状态（必填）
    rating?: number;       // 评分1-5星（可选）
    author?: string;       // 添加者（可选）
};
```

**字段说明**：

- `name`: 显示在卡片标题的链接名称
- `description`: 链接的详细描述，显示在卡片内容区
- `avatarUrl`: 链接的图标或头像，建议尺寸 100x100px
- `url`: 实际的网站链接，用户点击时跳转的地址
- `imageUrl`: 可选的预览图片，建议尺寸 300x200px
- `tags`: 标签数组，用于分类和过滤
- `category`: 所属分类的ID，必须在 `linkCategories` 中定义
- `addedDate`: 添加日期，用于排序显示
- `status`: 链接状态，影响显示样式和过滤
- `rating`: 1-5星评分，显示为星星图标
- `author`: 添加者标识，用于管理

### LinksTagProps

标签配置类型：

```typescript
export type LinksTagProps = {
    tagId: string;                    // 标签ID（唯一标识）
    tagName: string | ReactNode;      // 标签显示名称
    tagDescription: string | ReactNode; // 标签描述
    color: string;                    // 标签颜色（十六进制）
    icon: string;                     // 标签图标
};
```

**使用示例**：

```typescript
{
    tagId: "development",
    tagName: "💻Development",
    tagDescription: "Development Related",
    color: "#6c5ce7",
    icon: "💻"
}
```

### LinksCategoryProps

分类配置类型：

```typescript
export type LinksCategoryProps = {
    id: string;          // 分类ID（唯一标识）
    name: string;        // 分类显示名称
    description: string; // 分类描述
    icon: string;        // 分类图标
    color: string;       // 分类主题色（十六进制）
};
```

**使用示例**：

```typescript
{
    id: "friends",
    name: "朋友们",
    description: "我的朋友们的网站和博客",
    icon: "👥",
    color: "#ff6b6b"
}
```

## 📂 数据文件组织

### 分类数据文件

每个分类都有独立的数据文件，位于 `shares/` 目录：

```typescript
// data/Links/shares/friends.ts
import { LinksProps } from '../types';

export const friendsLinks: LinksProps[] = [
    {
        name: "小鱼干",
        description: "一个热爱技术的小鱼干，写代码，玩游戏，分享生活。",
        avatarUrl: "https://via.placeholder.com/100",
        url: "https://example-friend1.com",
        imageUrl: "https://via.placeholder.com/300x200",
        tags: ["friends", "development", "gaming"],
        category: "friends",
        addedDate: "2024-01-15",
        status: "active",
        rating: 5,
        author: "ricmoe"
    }
    // 更多链接...
];
```

### 数据汇总文件

`shares/index.ts` 负责汇总所有分类数据：

```typescript
// 导出各分类数据
export { friendsLinks } from './friends';
export { toolsLinks } from './tools';
export { resourcesLinks } from './resources';
export { toysLinks } from './toys';

// 汇总所有链接数据
export const allLinksData: LinksProps[] = [
    ...friendsLinks,
    ...toolsLinks,
    ...resourcesLinks,
    ...toysLinks
];

// 按分类获取数据的工具函数
export const getDataByCategory = (category: string): LinksProps[] => {
    switch (category) {
        case 'friends': return friendsLinks;
        case 'tools': return toolsLinks;
        case 'resources': return resourcesLinks;
        case 'toys': return toysLinks;
        default: return allLinksData;
    }
};

// 分类数据映射
export const categoryDataMap = {
    friends: friendsLinks,
    tools: toolsLinks,
    resources: resourcesLinks,
    toys: toysLinks
} as const;
```

## ⚙️ 配置文件

### 分类和标签配置

`categories.ts` 包含所有分类和标签的配置：

```typescript
// 分类配置
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
    }
    // 更多分类...
];

// 标签配置
export const linkTags: LinksTagProps[] = [
    {
        tagId: "friends",
        tagName: "🪶Friends",
        tagDescription: "Links of Friends",
        color: "#ff6b6b",
        icon: "👥"
    },
    {
        tagId: "tools",
        tagName: "🛠️Tools",
        tagDescription: "Development Tools",
        color: "#4ecdc4",
        icon: "🛠️"
    }
    // 更多标签...
];
```

### 工具函数

配置文件还提供了便捷的工具函数：

```typescript
// 获取所有分类ID
export const getAllCategoryIds = (): string[] => {
    return linkCategories.map(category => category.id);
};

// 获取分类配置
export const getCategoryConfig = (categoryId: string) => {
    return linkCategories.find(category => category.id === categoryId);
};

// 获取标签配置
export const getTagConfig = (tagId: string) => {
    return linkTags.find(tag => tag.tagId === tagId);
};
```

## 🔧 操作函数

`actions.ts` 提供了丰富的数据操作函数：

### 过滤函数

```typescript
// 按分类过滤
export const filterLinksByCategory = (links: LinksProps[], selectedCategory: string) => {
    if (selectedCategory === "all") return links;
    return links.filter(link => link.category === selectedCategory);
};

// 按标签过滤
export const filterLinksByTag = (links: LinksProps[], selectedTag: string) => {
    if (selectedTag === "all") return links;
    return links.filter(link => link.tags?.includes(selectedTag));
};

// 按状态过滤
export const getLinksByStatus = (selectedStatus: string, links: LinksProps[] = []) => {
    if (selectedStatus === "all") return links;
    return links.filter(link => link.status === selectedStatus);
};

// 搜索过滤
export const filterLinksBySearch = (links: LinksProps[], searchTerm: string) => {
    if (!searchTerm.trim()) return links;
    const term = searchTerm.toLowerCase();
    return links.filter(link => 
        link.name.toLowerCase().includes(term) ||
        link.description.toLowerCase().includes(term) ||
        link.category.toLowerCase().includes(term) ||
        link.tags?.some(tag => tag.toLowerCase().includes(term))
    );
};
```

### 排序函数

```typescript
// 按名称排序
export const sortLinksByName = (links: LinksProps[], sortOrder: 'asc' | 'desc' = 'asc') => {
    return [...links].sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return sortOrder === 'asc' ? result : -result;
    });
};

// 按日期排序
export const sortLinksByDate = (links: LinksProps[], sortOrder: string = 'newest') => {
    return [...links].sort((a, b) => {
        const dateA = new Date(a.addedDate).getTime();
        const dateB = new Date(b.addedDate).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
};
```

### 统计函数

```typescript
// 分类统计
export const getLinksCategoryStats = (links: LinksProps[]) => {
    const stats: Record<string, number> = {};
    links.forEach(link => {
        stats[link.category] = (stats[link.category] || 0) + 1;
    });
    return stats;
};

// 标签统计
export const getLinksTagStats = (links: LinksProps[]) => {
    const stats: Record<string, number> = {};
    links.forEach(link => {
        link.tags?.forEach(tag => {
            stats[tag] = (stats[tag] || 0) + 1;
        });
    });
    return stats;
};

// 获取唯一标签
export const getAllUniqueTags = (links: LinksProps[]) => {
    const allTags = new Set<string>();
    links.forEach(link => {
        link.tags?.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
};
```

## 📤 导出结构

主 `index.ts` 文件统一导出所有模块：

```typescript
// 导出所有类型定义
export * from './types';

// 导出分类和标签配置
export * from './categories';

// 导出操作函数
export * from './actions';

// 导出所有数据
export * from './shares';

// 提供便捷的默认导出
import { allLinksData } from './shares';
import { linkCategories, linkTags } from './categories';

export const Links = {
    data: allLinksData,
    categories: linkCategories,
    tags: linkTags
} as const;

export default Links;
```

## 🎯 最佳实践

1. **数据一致性**: 确保 `category` 字段的值在 `linkCategories` 中有对应配置
2. **标签规范**: 使用一致的标签命名规范，避免重复和拼写错误
3. **图片资源**: 头像和预览图片建议使用 CDN 或相对路径
4. **日期格式**: 统一使用 YYYY-MM-DD 格式的日期
5. **状态管理**: 定期检查和更新链接状态

## 📝 扩展示例

添加新分类的完整流程：

1. **创建数据文件**:
```typescript
// data/Links/shares/news.ts
export const newsLinks: LinksProps[] = [
    // 新闻网站数据...
];
```

2. **更新分类配置**:
```typescript
// data/Links/categories.ts
{
    id: "news",
    name: "新闻资讯",
    description: "技术新闻和资讯网站",
    icon: "📰",
    color: "#3498db"
}
```

3. **更新数据汇总**:
```typescript
// data/Links/shares/index.ts
export { newsLinks } from './news';
// 更新 allLinksData 和 getDataByCategory
```

这样就完成了新分类的添加，系统会自动识别并在界面中显示。
