# 快速开始指南

欢迎使用 Moments 时刻分享系统！这个指南将帮助你在 5 分钟内了解如何使用和配置 Moments。

## 🚀 第一步：了解基本概念

### 什么是 Moment？
一个 Moment 是一个时刻记录，包含：
- **标题** - 简短描述
- **内容** - 详细内容
- **日期** - 记录时间
- **作者** - 创建者
- **样式** - 显示风格
- **标签** - 分类标签
- **按钮** - 交互功能

### 基本结构
```typescript
interface MomentProps {
    title: string;
    content: string;
    date: string;
    author: string;
    style: 'simple' | 'feed' | 'photo-centric' | 'minimal';
    tags?: string[];
    actions?: Array<{
        label: string;
        href?: string;
        onClick?: () => void;
        variant?: 'primary' | 'secondary' | 'outline';
    }>;
}
```

## 📝 第二步：创建你的第一个 Moment

### 1. 选择合适的分类文件
根据内容类型选择文件：
- `data/Moments/shares/blog.ts` - 博客相关
- `data/Moments/shares/life.ts` - 生活记录
- `data/Moments/shares/tech.ts` - 技术学习
- `data/Moments/shares/test.ts` - 测试内容

### 2. 添加新的时刻
```typescript
// 例如在 data/Moments/shares/life.ts 中添加
export const lifeMoments: MomentProps[] = [
    // 现有的时刻...
    
    // 🆕 添加你的新时刻
    {
        title: "今天的早餐",
        content: "自己做了一份营养丰富的早餐，包括全麦面包、煎蛋和牛奶。感觉一天都充满了活力！",
        date: "2025-08-01",
        author: "你的名字",
        style: 'simple',
        tags: ['早餐', '生活', '健康'],
        actions: [
            { 
                label: '点赞', 
                variant: 'secondary',
                onClick: () => alert('谢谢点赞！')
            }
        ]
    }
];
```

### 3. 保存并查看效果
保存文件后，Docusaurus 会自动重新加载，你可以在 `/moments` 页面看到新的时刻。

## 🎨 第三步：尝试不同的样式

让我们为同一个内容尝试不同的样式：

### Simple 样式
```typescript
{
    title: "学习笔记",
    content: "今天学习了 React Hooks 的使用方法...",
    style: 'simple', // 简洁清晰
    // ...
}
```

### Feed 样式
```typescript
{
    title: "学习笔记",
    content: "今天学习了 React Hooks 的使用方法...",
    style: 'feed', // 社交媒体风格
    // ...
}
```

### 查看效果差异
访问 `/moments` 页面，切换不同的分类，观察样式的区别。

## 🎯 第四步：添加交互功能

### 基础按钮
```typescript
actions: [
    // 链接按钮
    { 
        label: '查看详情', 
        href: '/blog/my-post',
        variant: 'primary'
    },
    // 事件按钮
    { 
        label: '点赞', 
        variant: 'secondary',
        onClick: () => console.log('已点赞')
    }
]
```

### 使用预定义函数
```typescript
import { handleLike, handleShare } from '../actions';

actions: [
    { 
        label: '点赞', 
        onClick: () => handleLike("我的时刻")
    },
    { 
        label: '分享', 
        onClick: () => handleShare("我的时刻")
    }
]
```

## 🔄 第五步：创建新的分类

如果现有分类不满足需求，可以创建新的分类：

### 1. 在配置中添加分类
编辑 `data/Moments/categories.ts`：
```typescript
export const CATEGORY_REGISTRY = {
    // 现有分类...
    
    // 🆕 新增分类
    reading: {
        id: 'reading',
        name: '读书',
        description: '读书心得和书籍推荐',
        color: '#6f42c1',
        icon: '📚'
    }
};
```

### 2. 创建数据文件
创建 `data/Moments/shares/reading.ts`：
```typescript
import { MomentProps } from '../types';

export const readingMoments: MomentProps[] = [
    {
        title: "《深入理解计算机系统》",
        content: "这本书让我对计算机底层有了更深的认识...",
        date: "2025-08-01",
        author: "RicMoe",
        style: 'simple',
        tags: ['读书', '计算机', '学习']
    }
];
```

### 3. 添加到索引
编辑 `data/Moments/shares/index.ts`：
```typescript
export { readingMoments } from './reading';

export const CATEGORY_MOMENTS_MAP = {
    // 现有映射...
    reading: readingMoments, // 🆕 添加新映射
};
```

## 📊 第六步：查看统计信息

系统会自动计算统计信息：

```typescript
import { getCategoryStats, getAllTagsWithStats } from '@site/data/Moments';

// 获取分类统计
const categoryStats = getCategoryStats();
console.log(categoryStats);
// 输出: [{ id: 'blog', name: '博客', count: 5, percentage: '25.0' }, ...]

// 获取标签统计
const tagStats = getAllTagsWithStats();
console.log(tagStats);
// 输出: [{ tag: 'React', count: 3 }, { tag: '学习', count: 2 }, ...]
```

## 🎉 完成！

恭喜你！现在你已经掌握了 Moments 系统的基础使用方法：

✅ **创建时刻** - 在对应分类文件中添加内容  
✅ **选择样式** - 根据内容类型选择合适样式  
✅ **添加交互** - 使用按钮提供用户交互  
✅ **创建分类** - 根据需要扩展新的分类  
✅ **查看统计** - 了解内容分布情况  

## 🔍 下一步学习

### 深入了解
- [系统概述](./overview) - 全面了解 Moments 系统
- [动态分类系统](./dynamic-categories) - 深入了解分类管理
- [卡片样式](./card-styles) - 掌握样式定制技巧
- [按钮事件](./button-events) - 学习高级交互功能

### 实际应用
- [数据管理](./data-management) - 了解数据组织方式
- [使用参考](./usage-reference) - 查阅完整 API 文档

## ❓ 常见问题

**Q: 新添加的时刻没有显示？**  
A: 检查文件保存是否成功，Docusaurus 开发服务器是否重新加载。

**Q: 按钮点击没有反应？**  
A: 确保 onClick 函数语法正确，检查浏览器控制台是否有错误。

**Q: 新分类没有出现在筛选器中？**  
A: 确保完成了三个步骤：配置注册、创建数据文件、添加索引映射。

**Q: 样式显示不正常？**  
A: 检查 style 属性是否为有效值：'simple'、'feed'、'photo-centric'、'minimal'。

---

**需要帮助？** 查看详细的 [使用参考文档](./usage-reference) 或提出 Issue。
