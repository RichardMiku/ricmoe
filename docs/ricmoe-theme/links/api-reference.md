# API 参考

本文档提供 Links 系统中所有可用函数和变量的完整 API 参考。

## 📦 导入方式

### 一次性导入所有内容
```typescript
import * as Links from '@site/data/Links';
```

### 按需导入
```typescript
import { 
    // 数据
    allLinksData,
    linkCategories,
    linkTags,
    
    // 类型
    LinksProps,
    LinksCategoryProps,
    LinksTagProps,
    
    // 过滤函数
    filterLinksByCategory,
    filterLinksByTag,
    filterLinksBySearch,
    
    // 排序函数
    sortLinksByName,
    sortLinksByDate,
    
    // 统计函数
    getLinksCategoryStats,
    getLinksTagStats,
    getAllUniqueTags,
    getAllUniqueCategories,
    
    // 配置函数
    getCategoryConfig,
    getTagConfig
} from '@site/data/Links';
```

### 分模块导入
```typescript
// 只导入数据
import { allLinksData, friendsLinks } from '@site/data/Links/shares';

// 只导入配置
import { linkCategories, linkTags } from '@site/data/Links/categories';

// 只导入操作函数
import { filterLinksByCategory, sortLinksByName } from '@site/data/Links/actions';
```

## 📊 数据变量

### allLinksData

所有链接数据的汇总数组。

**类型**: `LinksProps[]`

```typescript
const totalLinks = allLinksData.length;
console.log(`总共有 ${totalLinks} 个链接`);

// 获取所有链接名称
const linkNames = allLinksData.map(link => link.name);
```

### linkCategories

所有分类的配置数组。

**类型**: `LinksCategoryProps[]`

```typescript
// 获取所有分类
linkCategories.forEach(category => {
    console.log(`${category.icon} ${category.name}: ${category.description}`);
});

// 查找特定分类
const friendsCategory = linkCategories.find(cat => cat.id === 'friends');
```

### linkTags

所有标签的配置数组。

**类型**: `LinksTagProps[]`

```typescript
// 获取所有标签
const tagIds = linkTags.map(tag => tag.tagId);

// 按颜色分组标签
const tagsByColor = linkTags.reduce((acc, tag) => {
    acc[tag.color] = acc[tag.color] || [];
    acc[tag.color].push(tag);
    return acc;
}, {});
```

### 分类数据

按分类组织的数据变量：

```typescript
import { 
    friendsLinks,    // 朋友链接
    toolsLinks,      // 工具链接
    resourcesLinks,  // 资源链接
    toysLinks        // 趣味项目链接
} from '@site/data/Links/shares';

// 使用示例
console.log(`朋友链接: ${friendsLinks.length} 个`);
console.log(`工具链接: ${toolsLinks.length} 个`);
```

## 🔍 过滤函数

### filterLinksByCategory()

按分类过滤链接。

**签名**: `(links: LinksProps[], selectedCategory: string) => LinksProps[]`

**参数**:
- `links`: 要过滤的链接数组
- `selectedCategory`: 分类ID，使用 `"all"` 返回所有链接

**返回**: 过滤后的链接数组

```typescript
// 获取所有工具类链接
const toolsLinks = filterLinksByCategory(allLinksData, 'tools');

// 获取所有链接（使用 "all"）
const allLinks = filterLinksByCategory(allLinksData, 'all');
```

### filterLinksByTag()

按标签过滤链接。

**签名**: `(links: LinksProps[], selectedTag: string) => LinksProps[]`

**参数**:
- `links`: 要过滤的链接数组
- `selectedTag`: 标签ID，使用 `"all"` 返回所有链接

**返回**: 过滤后的链接数组

```typescript
// 获取所有开发相关链接
const devLinks = filterLinksByTag(allLinksData, 'development');

// 获取所有朋友链接
const friendsTags = filterLinksByTag(allLinksData, 'friends');
```

### filterLinksBySearch()

按搜索词过滤链接。

**签名**: `(links: LinksProps[], searchTerm: string) => LinksProps[]`

**参数**:
- `links`: 要过滤的链接数组
- `searchTerm`: 搜索关键词

**返回**: 过滤后的链接数组

```typescript
// 搜索包含 "GitHub" 的链接
const githubLinks = filterLinksBySearch(allLinksData, 'GitHub');

// 搜索包含 "开发" 的链接
const devRelatedLinks = filterLinksBySearch(allLinksData, '开发');
```

### getLinksByCategory()

获取指定分类的链接（兼容函数）。

**签名**: `(selectedCategory: string, links?: LinksProps[]) => LinksProps[]`

**参数**:
- `selectedCategory`: 分类ID
- `links`: 可选的链接数组，默认使用全部数据

**返回**: 指定分类的链接数组

```typescript
// 使用默认数据源
const friendsLinks = getLinksByCategory('friends');

// 使用自定义数据源
const customFriends = getLinksByCategory('friends', myCustomLinks);
```

### getLinksByTag()

获取指定标签的链接（兼容函数）。

**签名**: `(selectedTag: string, links?: LinksProps[]) => LinksProps[]`

### getLinksByStatus()

按状态过滤链接。

**签名**: `(selectedStatus: string, links?: LinksProps[]) => LinksProps[]`

**参数**:
- `selectedStatus`: 状态值 (`'active'` | `'inactive'` | `'archived'` | `'all'`)
- `links`: 可选的链接数组

```typescript
// 获取活跃链接
const activeLinks = getLinksByStatus('active');

// 获取已归档链接
const archivedLinks = getLinksByStatus('archived');
```

## 📈 排序函数

### sortLinksByName()

按名称排序链接。

**签名**: `(links: LinksProps[], sortOrder?: 'asc' | 'desc') => LinksProps[]`

**参数**:
- `links`: 要排序的链接数组
- `sortOrder`: 排序方向，默认 `'asc'`

**返回**: 排序后的新数组（不修改原数组）

```typescript
// 按名称升序排序
const sortedAsc = sortLinksByName(allLinksData, 'asc');

// 按名称降序排序
const sortedDesc = sortLinksByName(allLinksData, 'desc');
```

### sortLinksByDate()

按添加日期排序链接。

**签名**: `(links: LinksProps[], sortOrder?: string) => LinksProps[]`

**参数**:
- `links`: 要排序的链接数组
- `sortOrder`: 排序方向 (`'newest'` | `'oldest'`)，默认 `'newest'`

```typescript
// 最新添加的链接在前
const newestFirst = sortLinksByDate(allLinksData, 'newest');

// 最早添加的链接在前
const oldestFirst = sortLinksByDate(allLinksData, 'oldest');
```

### sortLinksByCategory()

按分类排序链接。

**签名**: `(links: LinksProps[], ascending?: boolean) => LinksProps[]`

**参数**:
- `links`: 要排序的链接数组
- `ascending`: 是否升序，默认 `true`

## 📊 统计函数

### getLinksCategoryStats()

获取分类统计信息。

**签名**: `(links: LinksProps[]) => Record<string, number>`

**参数**:
- `links`: 要统计的链接数组

**返回**: 分类ID到数量的映射对象

```typescript
const stats = getLinksCategoryStats(allLinksData);
// 输出: { "friends": 3, "tools": 4, "resources": 4, "toys": 5 }

// 获取最大分类
const maxCategory = Object.entries(stats)
    .reduce((a, b) => stats[a[0]] > stats[b[0]] ? a : b)[0];
```

### getLinksTagStats()

获取标签统计信息。

**签名**: `(links: LinksProps[]) => Record<string, number>`

```typescript
const tagStats = getLinksTagStats(allLinksData);
// 输出: { "friends": 3, "development": 5, "tools": 4, ... }

// 获取最热门标签
const popularTags = Object.entries(tagStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
```

### getAllUniqueTags()

获取所有唯一标签。

**签名**: `(links: LinksProps[]) => string[]`

**返回**: 排序后的标签数组

```typescript
const uniqueTags = getAllUniqueTags(allLinksData);
// 输出: ["development", "friends", "gaming", "tools", ...]

// 检查是否包含特定标签
const hasGamingTag = uniqueTags.includes('gaming');
```

### getAllUniqueCategories()

获取所有唯一分类。

**签名**: `(links: LinksProps[]) => string[]`

```typescript
const categories = getAllUniqueCategories(allLinksData);
// 输出: ["friends", "resources", "tools", "toys"]
```

## ⚙️ 配置函数

### getCategoryConfig()

获取分类配置信息。

**签名**: `(categoryId: string) => LinksCategoryProps | undefined`

**参数**:
- `categoryId`: 分类ID

**返回**: 分类配置对象或 undefined

```typescript
const friendsConfig = getCategoryConfig('friends');
if (friendsConfig) {
    console.log(friendsConfig.name);    // "朋友们"
    console.log(friendsConfig.icon);    // "👥"
    console.log(friendsConfig.color);   // "#ff6b6b"
}
```

### getTagConfig()

获取标签配置信息。

**签名**: `(tagId: string) => LinksTagProps | undefined`

**参数**:
- `tagId`: 标签ID

**返回**: 标签配置对象或 undefined

```typescript
const devTagConfig = getTagConfig('development');
if (devTagConfig) {
    console.log(devTagConfig.tagName);  // "💻Development"
    console.log(devTagConfig.color);    // "#6c5ce7"
}
```

### getAllCategoryIds()

获取所有分类ID。

**签名**: `() => string[]`

```typescript
const categoryIds = getAllCategoryIds();
// 输出: ["friends", "tools", "resources", "toys"]
```

### getAllCategories()

获取所有分类配置。

**签名**: `() => LinksCategoryProps[]`

```typescript
const allCategories = getAllCategories();
// 等同于 linkCategories
```

## 🔧 工具函数

### filterLinks()

综合过滤函数，支持多种过滤条件。

**签名**: `(links: LinksProps[], category: string, tag: string, searchTerm: string) => LinksProps[]`

**参数**:
- `links`: 要过滤的链接数组
- `category`: 分类过滤条件
- `tag`: 标签过滤条件
- `searchTerm`: 搜索关键词

```typescript
// 同时应用多个过滤条件
const filtered = filterLinks(
    allLinksData,
    'tools',           // 只看工具类
    'development',     // 只看开发标签
    'VS Code'          // 搜索 VS Code
);
```

### getRandomLinks()

随机获取指定数量的链接。

**签名**: `(links: LinksProps[], count: number) => LinksProps[]`

```typescript
// 随机获取3个链接
const randomLinks = getRandomLinks(allLinksData, 3);
```

### getRecommendedLinks()

获取推荐链接（基于分类）。

**签名**: `(links: LinksProps[], currentCategory: string, count?: number) => LinksProps[]`

```typescript
// 获取工具类的推荐链接
const recommended = getRecommendedLinks(allLinksData, 'tools', 5);
```

## 🔗 数据访问函数

### getDataByCategory()

按分类获取原始数据。

**签名**: `(category: string) => LinksProps[]`

```typescript
// 直接获取朋友链接的原始数据
const friends = getDataByCategory('friends');

// 获取所有数据
const all = getDataByCategory('any-other-value');
```

### categoryDataMap

分类数据的映射常量。

**类型**: `Record<string, LinksProps[]>`

```typescript
// 直接访问分类数据
const toolsData = categoryDataMap.tools;
const friendsData = categoryDataMap.friends;

// 获取所有分类键
const categoryKeys = Object.keys(categoryDataMap);
```

## 📝 使用示例

### 完整的搜索和过滤实现

```typescript
import { 
    allLinksData,
    filterLinksByCategory,
    filterLinksByTag,
    filterLinksBySearch,
    sortLinksByName,
    sortLinksByDate
} from '@site/data/Links';

function useLinksFilter() {
    const [category, setCategory] = useState('all');
    const [tag, setTag] = useState('');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    
    const filteredLinks = useMemo(() => {
        let result = allLinksData;
        
        // 应用过滤器
        result = filterLinksByCategory(result, category);
        if (tag) result = filterLinksByTag(result, tag);
        if (search) result = filterLinksBySearch(result, search);
        
        // 应用排序
        if (sortBy === 'name') {
            result = sortLinksByName(result, sortOrder);
        } else {
            result = sortLinksByDate(result, sortOrder === 'desc' ? 'newest' : 'oldest');
        }
        
        return result;
    }, [category, tag, search, sortBy, sortOrder]);
    
    return {
        filteredLinks,
        category, setCategory,
        tag, setTag,
        search, setSearch,
        sortBy, setSortBy,
        sortOrder, setSortOrder
    };
}
```

### 统计仪表板

```typescript
import { 
    allLinksData,
    linkCategories,
    linkTags,
    getLinksCategoryStats,
    getLinksTagStats,
    getAllUniqueTags
} from '@site/data/Links';

function LinksDashboard() {
    const categoryStats = getLinksCategoryStats(allLinksData);
    const tagStats = getLinksTagStats(allLinksData);
    const uniqueTags = getAllUniqueTags(allLinksData);
    
    const totalLinks = allLinksData.length;
    const totalCategories = linkCategories.length;
    const totalTags = uniqueTags.length;
    
    return (
        <div>
            <h2>链接统计</h2>
            <p>总链接数: {totalLinks}</p>
            <p>分类数: {totalCategories}</p>
            <p>标签数: {totalTags}</p>
            
            <h3>分类分布</h3>
            {Object.entries(categoryStats).map(([cat, count]) => (
                <div key={cat}>
                    {cat}: {count} ({Math.round(count / totalLinks * 100)}%)
                </div>
            ))}
        </div>
    );
}
```

## ⚠️ 注意事项

1. **不可变性**: 所有排序和过滤函数都返回新数组，不会修改原数组
2. **类型安全**: 使用 TypeScript 时，确保导入正确的类型定义
3. **性能考虑**: 大数据量时考虑使用 `useMemo` 缓存计算结果
4. **错误处理**: 访问配置时检查返回值是否为 undefined
