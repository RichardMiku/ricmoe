# 动态分类系统指南

Moments 系统的核心特性之一是完全动态化的分类管理。这意味着添加新分类时，你只需要修改配置文件，UI 会自动适配。

## 🚀 添加新分类的步骤

### 第一步：在分类注册表中添加配置

编辑文件：`data/Moments/categories.ts`

```typescript
export const CATEGORY_REGISTRY: Record<string, Omit<CategoryConfig, 'moments'>> = {
    // 现有分类...
    blog: { /* ... */ },
    life: { /* ... */ },
    tech: { /* ... */ },
    test: { /* ... */ },
    
    // 🆕 添加新分类
    work: {
        id: 'work',
        name: '工作',
        description: '工作相关的时刻分享',
        color: '#dc3545',
        icon: '💼'
    },
    travel: {
        id: 'travel',
        name: '旅行',
        description: '旅行和探索相关的时刻',
        color: '#fd7e14',
        icon: '✈️'
    }
};
```

### 第二步：创建分类数据文件

创建文件：`data/Moments/shares/work.ts`

```typescript
import { MomentProps } from '../types';
import { handleLike, handleShare } from '../actions';

// 工作相关的时刻分享
export const workMoments: MomentProps[] = [
    {
        title: "项目完成",
        content: "今天成功完成了一个重要项目，感觉很有成就感！",
        date: "2025-08-01",
        author: "RicMoe",
        style: 'simple',
        actions: [
            { 
                label: '点赞', 
                variant: 'secondary',
                onClick: () => handleLike("项目完成")
            }
        ],
        tags: ['工作', '项目', '成就']
    }
];
```

### 第三步：在索引文件中添加导入

编辑文件：`data/Moments/shares/index.ts`

```typescript
// 添加新的导入
export { workMoments } from './work';
export { travelMoments } from './travel';

// 更新动态映射
export const CATEGORY_MOMENTS_MAP: Record<string, MomentProps[]> = {
    blog: blogMoments,
    life: lifeMoments,
    tech: techMoments,
    test: testMoments,
    work: workMoments,    // 🆕 新增
    travel: travelMoments // 🆕 新增
};
```

### 就这么简单！

添加完成后，新分类会自动出现在：
- ✅ 分类筛选下拉框
- ✅ 分类统计卡片  
- ✅ 工具函数中
- ✅ 所有相关的UI组件

## 🎯 动态化的优势

### 1. 零代码修改
- 不需要修改任何组件代码
- 不需要更新任何硬编码的枚举
- UI 自动适配新分类

### 2. 类型安全
- TypeScript 会自动推断新的分类类型
- 编译时检查确保数据完整性
- 自动验证分类配置

### 3. 统一管理
- 所有分类配置集中在一个文件
- 数据和UI逻辑完全分离
- 易于维护和扩展

## 📊 分类配置详解

### CategoryConfig 接口

```typescript
interface CategoryConfig {
    id: string;          // 唯一标识符，用于程序识别
    name: string;        // 显示名称，用于UI展示
    description?: string; // 可选描述，显示在统计卡片
    color?: string;      // 可选颜色，用于UI主题色
    icon?: string;       // 可选图标，支持emoji或字符
    moments: MomentProps[]; // 该分类下的时刻数据
}
```

### 推荐的配置规范

1. **id**: 使用小写英文，简洁明了
2. **name**: 使用中文，用户友好
3. **color**: 使用十六进制颜色码
4. **icon**: 推荐使用 emoji 表情符号
5. **description**: 简短描述分类用途

## 🔧 高级功能

### 分类验证

系统会自动验证分类完整性：
```typescript
// 自动运行验证
const validation = validateCategories();
if (!validation.valid) {
    console.error('缺少数据的分类:', validation.missing);
}
```

### 分类统计

获取丰富的分类统计信息：
```typescript
const stats = getCategoryStats();
// 返回每个分类的文章数量、百分比等
```

### 动态查询

```typescript
// 检查分类是否存在
if (isCategoryExists('work')) {
    const workMoments = getMomentsByCategoryId('work');
}

// 获取分类配置
const workConfig = getCategoryConfig('work');
console.log(workConfig?.color); // #dc3545
```

## 🚨 注意事项

1. **唯一性**: 确保分类 ID 在整个系统中唯一
2. **数据完整性**: 每个分类都必须有对应的数据文件
3. **导入导出**: 记得在 `shares/index.ts` 中正确导入和映射
4. **向后兼容**: 删除分类前确保没有其他地方依赖

## 📝 示例：完整的新分类添加流程

假设我们要添加一个"读书"分类：

1. **配置分类**（`categories.ts`）:
```typescript
reading: {
    id: 'reading',
    name: '读书',
    description: '读书心得和书籍推荐',
    color: '#6f42c1',
    icon: '📚'
}
```

2. **创建数据**（`shares/reading.ts`）:
```typescript
export const readingMoments: MomentProps[] = [
    {
        title: "《深入理解计算机系统》读后感",
        content: "这本书让我对计算机底层有了更深的认识...",
        date: "2025-08-01",
        author: "RicMoe",
        style: 'feed',
        tags: ['读书', 'CS', '技术'],
        actions: [
            { label: '查看详情', href: '/blog/csapp-review' }
        ]
    }
];
```

3. **添加映射**（`shares/index.ts`）:
```typescript
export { readingMoments } from './reading';
// 在 CATEGORY_MOMENTS_MAP 中添加
reading: readingMoments,
```

完成后，"读书"分类就会自动出现在所有相关的UI组件中！

---

**下一步**: 查看 [卡片样式指南](./card-styles) 了解如何自定义卡片外观。
