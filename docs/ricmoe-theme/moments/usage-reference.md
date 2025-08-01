# Moments API 使用参考

这是 Moments 系统的完整 API 参考文档，包含所有可用的函数、接口和配置选项。

## 📦 导入方式

### 基础导入
```typescript
import moments from '@site/data/Moments';
```

### 具名导入
```typescript
import { 
    // 🔄 动态分类系统
    getAllCategoryIds,
    getCategoryConfig,
    getAllCategories,
    getCategoryStats,
    
    // 📊 数据查询函数
    getMomentsByCategory,
    getMomentsByCategoryId,
    getMomentsByTag,
    getMomentsByAuthor,
    getMomentsByDateRange,
    getAllTagsWithStats,
    
    // 🛠️ 工具函数
    sortMomentsByDate,
    
    // 🎯 事件处理
    handleLike,
    handleComment,
    handleShare,
    handleVisitBlog,
    handleLearnMore,
    
    // 📝 类型定义
    MomentProps,
    MomentAction,
    MomentStyle,
    MomentCategory
} from '@site/data/Moments';
```

## 🏗️ 核心接口

### MomentProps
时刻数据的完整接口定义：

```typescript
interface MomentProps {
    title: string;                    // 时刻标题
    content: string;                  // 时刻内容
    date: string;                     // 日期 (YYYY-MM-DD)
    author: string;                   // 作者名称
    style: MomentStyle;               // 卡片样式
    image?: string;                   // 可选图片链接
    tags?: string[];                  // 可选标签数组
    actions?: MomentAction[];         // 可选按钮数组
    className?: string;               // 可选自定义CSS类
}
```

### MomentAction
按钮操作的接口定义：

```typescript
interface MomentAction {
    label: string;                    // 按钮文字
    href?: string;                    // 可选链接地址
    onClick?: () => void;             // 可选点击事件
    variant?: 'primary' | 'secondary' | 'outline'; // 可选按钮样式
}
```

### MomentStyle
支持的卡片样式类型：

```typescript
type MomentStyle = 
    | 'simple'          // 简洁模式
    | 'feed'            // 信息流模式
    | 'photo-centric'   // 图片中心模式
    | 'minimal';        // 极简模式
```

### MomentCategory
分类信息的接口定义：

```typescript
interface MomentCategory {
    id: string;                       // 分类唯一标识
    name: string;                     // 显示名称
    description?: string;             // 可选描述
    color?: string;                   // 可选主题色
    icon?: string;                    // 可选图标
    moments: MomentProps[];           // 该分类的时刻数据
}
```

## 🔄 动态分类系统 API

### getAllCategoryIds()
获取所有分类的 ID 列表。

```typescript
function getAllCategoryIds(): string[]

// 示例
const categoryIds = getAllCategoryIds();
console.log(categoryIds); // ['blog', 'life', 'tech', 'test']
```

### getCategoryConfig(id)
获取特定分类的配置信息。

```typescript
function getCategoryConfig(id: string): CategoryConfig | undefined

// 示例
const blogConfig = getCategoryConfig('blog');
console.log(blogConfig);
// {
//   id: 'blog',
//   name: '博客',
//   description: '博客文章和技术分享',
//   color: '#007bff',
//   icon: '📝'
// }
```

### getAllCategories()
获取所有分类的完整信息。

```typescript
function getAllCategories(): MomentCategory[]

// 示例
const categories = getAllCategories();
categories.forEach(cat => {
    console.log(`${cat.icon} ${cat.name}: ${cat.moments.length}条`);
});
```

### getCategoryStats()
获取分类统计信息。

```typescript
function getCategoryStats(): Array<{
    id: string;
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    count: number;
    percentage: string;
}>

// 示例
const stats = getCategoryStats();
stats.forEach(stat => {
    console.log(`${stat.name}: ${stat.count}条 (${stat.percentage}%)`);
});
```

## 📊 数据查询 API

### getMomentsByCategory(category)
按分类获取时刻数据。

```typescript
function getMomentsByCategory(category: string): MomentProps[]

// 示例
const blogMoments = getMomentsByCategory('blog');
const allMoments = getMomentsByCategory('all'); // 获取所有时刻
```

### getMomentsByCategoryId(categoryId)
按分类 ID 获取时刻数据（动态版本）。

```typescript
function getMomentsByCategoryId(categoryId: string): MomentProps[]

// 示例
const techMoments = getMomentsByCategoryId('tech');
```

### getMomentsByTag(tag)
按标签过滤时刻。

```typescript
function getMomentsByTag(tag: string): MomentProps[]

// 示例
const reactMoments = getMomentsByTag('React');
const learningMoments = getMomentsByTag('学习');
```

### getMomentsByAuthor(author)
按作者过滤时刻。

```typescript
function getMomentsByAuthor(author: string): MomentProps[]

// 示例
const myMoments = getMomentsByAuthor('RicMoe');
```

### getMomentsByDateRange(startDate, endDate)
按日期范围过滤时刻。

```typescript
function getMomentsByDateRange(startDate: string, endDate: string): MomentProps[]

// 示例
const julyMoments = getMomentsByDateRange('2025-07-01', '2025-07-31');
```

### getAllTagsWithStats()
获取所有标签及其统计信息。

```typescript
function getAllTagsWithStats(): Array<{
    tag: string;
    count: number;
}>

// 示例
const tagStats = getAllTagsWithStats();
console.log('最热门的标签:', tagStats.slice(0, 5));
```

## 🛠️ 工具函数 API

### sortMomentsByDate(moments)
按日期排序时刻（最新在前）。

```typescript
function sortMomentsByDate(moments: MomentProps[]): MomentProps[]

// 示例
const sortedMoments = sortMomentsByDate(moments);
```

## 🎯 事件处理 API

### handleLike(momentTitle)
处理点赞事件。

```typescript
function handleLike(momentTitle: string): void

// 示例
handleLike("我的第一个时刻");
```

### handleComment(momentTitle)
处理评论事件。

```typescript
function handleComment(momentTitle: string): void

// 示例
handleComment("技术分享");
```

### handleShare(momentTitle, url?)
处理分享事件。

```typescript
function handleShare(momentTitle: string, url?: string): Promise<void>

// 示例
handleShare("精彩时刻", "https://ricmoe.com/moments");
```

### handleVisitBlog()
导航到博客首页。

```typescript
function handleVisitBlog(): void

// 示例
handleVisitBlog();
```

### handleLearnMore()
导航到文档页面。

```typescript
function handleLearnMore(): void

// 示例
handleLearnMore();
```

## 💡 使用示例

### 基础使用
```typescript
import moments, { getMomentsByCategory, getCategoryStats } from '@site/data/Moments';

// 获取所有时刻
console.log('总时刻数:', moments.length);

// 获取特定分类
const blogPosts = getMomentsByCategory('blog');
console.log('博客时刻:', blogPosts.length);

// 获取统计信息
const stats = getCategoryStats();
stats.forEach(stat => {
    console.log(`${stat.name}: ${stat.count}条`);
});
```

### 高级查询
```typescript
import { 
    getMomentsByTag,
    getMomentsByDateRange,
    sortMomentsByDate,
    getAllTagsWithStats
} from '@site/data/Moments';

// 复合查询：获取最近一个月的技术相关时刻
const recentTechMoments = sortMomentsByDate(
    getMomentsByDateRange('2025-07-01', '2025-08-01')
        .filter(moment => 
            moment.tags?.some(tag => 
                ['技术', 'React', '前端'].includes(tag)
            )
        )
);

// 标签分析
const topTags = getAllTagsWithStats().slice(0, 10);
console.log('热门标签:', topTags);
```

### 动态UI构建
```typescript
import { getAllCategories, getCategoryStats } from '@site/data/Moments';

// 构建分类选择器
const CategorySelector = () => {
    const categories = getAllCategories();
    const stats = getCategoryStats();
    
    return (
        <select>
            <option value="all">全部</option>
            {categories.map(category => {
                const stat = stats.find(s => s.id === category.id);
                return (
                    <option key={category.id} value={category.id}>
                        {category.icon} {category.name} ({stat?.count})
                    </option>
                );
            })}
        </select>
    );
};
```

### 事件处理集成
```typescript
import { handleLike, handleShare } from '@site/data/Moments';

const MomentCard = ({ moment }: { moment: MomentProps }) => {
    return (
        <div className="moment-card">
            <h3>{moment.title}</h3>
            <p>{moment.content}</p>
            
            <div className="actions">
                <button onClick={() => handleLike(moment.title)}>
                    点赞
                </button>
                <button onClick={() => handleShare(moment.title)}>
                    分享
                </button>
            </div>
        </div>
    );
};
```

## 🔍 类型检查和验证

### 类型守卫
```typescript
// 检查是否为有效的 MomentProps
function isMomentProps(obj: any): obj is MomentProps {
    return typeof obj === 'object' &&
           typeof obj.title === 'string' &&
           typeof obj.content === 'string' &&
           typeof obj.date === 'string' &&
           typeof obj.author === 'string' &&
           ['simple', 'feed', 'photo-centric', 'minimal'].includes(obj.style);
}

// 验证日期格式
function isValidDate(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date));
}
```

### 运行时验证
```typescript
import { validateCategories } from '@site/data/Moments/shares';

// 验证数据完整性
const validation = validateCategories();
if (!validation.valid) {
    console.error('数据验证失败:', validation.missing);
}
```

## 📈 性能优化建议

### 1. 懒加载
```typescript
// 大数据集的懒加载
const loadCategoryData = async (categoryId: string) => {
    const { default: data } = await import(`./shares/${categoryId}`);
    return data;
};
```

### 2. 缓存
```typescript
// 缓存计算结果
let cachedStats: ReturnType<typeof getCategoryStats> | null = null;

export const getCachedCategoryStats = () => {
    if (!cachedStats) {
        cachedStats = getCategoryStats();
    }
    return cachedStats;
};
```

### 3. 分页
```typescript
// 分页处理大量数据
function paginateMoments(moments: MomentProps[], page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
        data: moments.slice(start, end),
        total: moments.length,
        page,
        pageSize,
        totalPages: Math.ceil(moments.length / pageSize)
    };
}
```

## 🚨 注意事项

1. **日期格式**: 必须使用 YYYY-MM-DD 格式
2. **样式值**: 必须是预定义的四种样式之一
3. **异步操作**: 分享功能是异步的，需要适当的错误处理
4. **类型安全**: 建议使用 TypeScript 以获得更好的类型检查
5. **性能考虑**: 大量数据时考虑分页和懒加载

---

**相关文档**:
- [快速开始](./quick-start) - 新手入门指南
- [数据管理](./data-management) - 数据组织和管理
- [卡片样式](./card-styles) - 样式定制指南
- [按钮事件](./button-events) - 事件处理详解
