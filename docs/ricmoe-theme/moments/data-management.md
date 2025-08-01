# 数据管理指南

了解 Moments 系统的数据组织方式和管理策略，让你能够高效地管理和维护时刻内容。

## 📁 文件结构概览

```
data/Moments/
├── index.ts              # 主入口文件，合并所有数据和功能
├── types.ts              # TypeScript 类型定义
├── actions.ts            # 按钮事件处理函数
├── categories.ts         # 分类配置中心（🆕 动态系统核心）
└── shares/               # 分类的 moments 数据
    ├── index.ts          # 动态数据映射（🆕 自动关联）
    ├── blog.ts           # 博客相关时刻
    ├── life.ts           # 生活相关时刻
    ├── tech.ts           # 技术学习相关时刻
    └── test.ts           # 测试用时刻
```

## 🏗️ 数据架构设计

### 1. 分离关注点
- **配置与数据分离**: `categories.ts` 管理分类配置，`shares/` 管理具体内容
- **类型与实现分离**: `types.ts` 定义接口，具体文件实现数据
- **事件与数据分离**: `actions.ts` 统一管理所有事件处理逻辑

### 2. 动态映射系统
```typescript
// shares/index.ts - 自动关联分类与数据
export const CATEGORY_MOMENTS_MAP: Record<string, MomentProps[]> = {
    blog: blogMoments,
    life: lifeMoments,
    tech: techMoments,
    test: testMoments,
    // 新分类会自动添加到这里
};
```

### 3. 类型安全保障
```typescript
// types.ts - 完整的类型定义
export interface MomentProps {
    title: string;
    content: string;
    date: string;
    author: string;
    style: MomentStyle;
    image?: string;
    tags?: string[];
    actions?: MomentAction[];
    className?: string;
}

export type MomentStyle = 'simple' | 'feed' | 'photo-centric' | 'minimal';
```

## 📊 数据组织策略

### 按内容类型分类

| 分类 | 文件 | 用途 | 样式建议 |
|------|------|------|----------|
| **Blog** | `blog.ts` | 博客相关、技术文章 | `simple` / `feed` |
| **Life** | `life.ts` | 生活记录、日常分享 | `feed` / `photo-centric` |
| **Tech** | `tech.ts` | 技术学习、开发笔记 | `simple` / `minimal` |
| **Test** | `test.ts` | 测试内容、实验功能 | 任意样式 |

### 数据组织最佳实践

#### 1. 统一的日期格式
```typescript
// ✅ 推荐：ISO 日期格式
date: "2025-08-01"

// ❌ 避免：不一致的格式
date: "2025/8/1"
date: "Aug 1, 2025"
```

#### 2. 合理的标签使用
```typescript
// ✅ 推荐：简洁明确的标签
tags: ['React', '前端', '学习']

// ❌ 避免：过长或重复的标签
tags: ['React框架学习笔记', 'React', 'react']
```

#### 3. 内容长度控制
```typescript
// ✅ 推荐：适中的内容长度
content: "今天学习了React Hooks的使用方法，特别是useState和useEffect的应用场景..."

// ❌ 避免：过短或过长
content: "学了React" // 太短，信息不足
content: "今天学习了React..." // 几千字的长文
```

## 🔧 数据管理工具

### 1. 验证函数
```typescript
// categories.ts 中的验证函数
const validation = validateCategories();
if (!validation.valid) {
    console.error('缺少数据的分类:', validation.missing);
}
```

### 2. 统计函数
```typescript
import { getCategoryStats, getAllTagsWithStats } from '@site/data/Moments';

// 分类统计
const categoryStats = getCategoryStats();
categoryStats.forEach(cat => {
    console.log(`${cat.name}: ${cat.count}条 (${cat.percentage}%)`);
});

// 标签统计
const tagStats = getAllTagsWithStats();
console.log('最热门的标签:', tagStats.slice(0, 5));
```

### 3. 查询函数
```typescript
import { 
    getMomentsByCategory,
    getMomentsByTag,
    getMomentsByAuthor,
    getMomentsByDateRange,
    sortMomentsByDate
} from '@site/data/Moments';

// 多条件查询
const recentTechMoments = sortMomentsByDate(
    getMomentsByDateRange('2025-07-01', '2025-08-01')
        .filter(moment => getMomentsByTag('技术').includes(moment))
);
```

## 📈 扩展性设计

### 1. 添加新分类
只需要三个步骤：
1. 在 `categories.ts` 中添加配置
2. 创建对应的数据文件
3. 在 `shares/index.ts` 中添加映射

### 2. 添加新字段
```typescript
// 在 types.ts 中扩展接口
export interface MomentProps {
    // 现有字段...
    
    // 🆕 新增字段
    priority?: 'high' | 'medium' | 'low';
    readingTime?: number;
    mood?: string;
}
```

### 3. 添加新功能
```typescript
// 在 index.ts 中添加新的工具函数
export const getMomentsByPriority = (priority: string) => {
    return moments.filter(moment => moment.priority === priority);
};

export const getAverageReadingTime = () => {
    const total = moments.reduce((sum, moment) => sum + (moment.readingTime || 0), 0);
    return Math.round(total / moments.length);
};
```

## 🛠️ 维护策略

### 1. 定期清理
```typescript
// 检查无效数据
const checkDataIntegrity = () => {
    const issues = [];
    
    moments.forEach((moment, index) => {
        // 检查必填字段
        if (!moment.title || !moment.content) {
            issues.push(`时刻 ${index}: 缺少必填字段`);
        }
        
        // 检查日期格式
        if (!/^\d{4}-\d{2}-\d{2}$/.test(moment.date)) {
            issues.push(`时刻 ${index}: 日期格式不正确`);
        }
        
        // 检查样式值
        const validStyles = ['simple', 'feed', 'photo-centric', 'minimal'];
        if (!validStyles.includes(moment.style)) {
            issues.push(`时刻 ${index}: 样式值无效`);
        }
    });
    
    return issues;
};
```

### 2. 性能优化
```typescript
// 懒加载大量数据
const loadMomentsByCategory = async (category: string) => {
    // 动态导入，减少初始加载时间
    const { [category + 'Moments']: moments } = await import(`./shares/${category}`);
    return moments;
};

// 缓存计算结果
let cachedStats: any = null;
export const getCategoryStats = () => {
    if (!cachedStats) {
        cachedStats = calculateStats();
    }
    return cachedStats;
};
```

### 3. 数据备份
建议定期备份重要数据：
```bash
# 创建数据备份
cp -r data/Moments data/Moments.backup.$(date +%Y%m%d)

# 或者使用 Git 标签
git tag -a data-backup-$(date +%Y%m%d) -m "Data backup $(date +%Y-%m-%d)"
```

## 📋 数据质量检查清单

### 内容质量
- [ ] 标题简洁明确（建议 50 字以内）
- [ ] 内容有价值且完整（建议 50-500 字）
- [ ] 日期格式正确（YYYY-MM-DD）
- [ ] 作者信息准确
- [ ] 标签相关且不重复（建议 3-5 个）

### 技术质量
- [ ] 样式值有效
- [ ] 按钮事件正常工作
- [ ] 图片链接有效（如果有）
- [ ] 类型定义符合接口

### 用户体验
- [ ] 内容对用户有用
- [ ] 交互功能符合预期
- [ ] 视觉效果协调
- [ ] 加载性能良好

## 🔍 调试技巧

### 1. 开发时调试
```typescript
// 在 index.ts 中添加调试信息
console.log('Moments 数据统计:', {
    total: moments.length,
    categories: getAllCategoryIds(),
    tags: getAllTagsWithStats().length
});

// 检查特定分类
const debugCategory = (categoryId: string) => {
    const moments = getMomentsByCategoryId(categoryId);
    console.log(`${categoryId} 分类:`, {
        count: moments.length,
        firstMoment: moments[0]?.title,
        lastMoment: moments[moments.length - 1]?.title
    });
};
```

### 2. 生产环境监控
```typescript
// 添加错误边界
export const safeGetMoments = (category?: string) => {
    try {
        return category ? getMomentsByCategory(category) : moments;
    } catch (error) {
        console.error('获取时刻数据失败:', error);
        return [];
    }
};
```

---

**下一步**: 查看 [使用参考](./usage-reference) 了解完整的 API 文档。
