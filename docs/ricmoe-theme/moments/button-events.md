# 按钮事件处理指南

在 Moments 组件中，你可以为每个时刻卡片定义各种按钮和对应的事件处理。

## 按钮类型

### 1. 链接按钮 (href)
使用 `href` 属性可以创建导航链接：

```tsx
{
    label: '访问博客',
    href: '/',
    variant: 'primary'
}
```

### 2. 事件按钮 (onClick)
使用 `onClick` 属性可以定义自定义事件处理：

```tsx
{
    label: '点赞',
    variant: 'secondary',
    onClick: () => handleLike("时刻标题")
}
```

## 按钮样式变体

可以使用以下变体来改变按钮外观：
- `primary`: 主要按钮（蓝色）
- `secondary`: 次要按钮（灰色）
- `outline`: 轮廓按钮（透明背景，有边框）

## 预定义的事件处理函数

在 `data/Moments/actions.ts` 中定义了以下预制的事件处理函数：

### `handleLike(momentTitle: string)`
处理点赞事件，显示确认提示。

```typescript
export const handleLike = (momentTitle: string) => {
    console.log(`点赞了时刻: ${momentTitle}`);
    alert(`感谢您对"${momentTitle}"的点赞！`);
};
```

### `handleComment(momentTitle: string)`
处理评论事件，弹出输入框让用户输入评论。

```typescript
export const handleComment = (momentTitle: string) => {
    const comment = prompt(`请为"${momentTitle}"添加评论:`);
    if (comment) {
        console.log(`评论: ${comment}`);
        alert('评论已提交！');
    }
};
```

### `handleShare(momentTitle: string, url?: string)`
处理分享事件，使用 Web Share API 或复制链接到剪贴板。

```typescript
export const handleShare = async (momentTitle: string, url?: string) => {
    const shareData = {
        title: momentTitle,
        text: `分享一个有趣的时刻: ${momentTitle}`,
        url: url || window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log('分享成功');
        } catch (err) {
            console.log('分享取消或失败:', err);
        }
    } else {
        // 降级处理：复制到剪贴板
        navigator.clipboard.writeText(shareData.url).then(() => {
            alert('链接已复制到剪贴板！');
        });
    }
};
```

### `handleVisitBlog()`
导航到博客首页。

### `handleLearnMore()`
导航到文档介绍页面。

## 使用示例

```tsx
import { handleLike, handleComment, handleShare } from '../actions';

const moments: MomentProps[] = [
    {
        title: "我的时刻",
        content: "这是一个示例时刻",
        date: "2025-07-27",
        author: "RicMoe",
        style: 'simple',
        actions: [
            // 链接按钮
            { 
                label: '访问博客', 
                href: '/', 
                variant: 'primary' 
            },
            // 预定义事件按钮
            { 
                label: '点赞', 
                variant: 'secondary',
                onClick: () => handleLike("我的时刻")
            },
            // 评论按钮
            {
                label: '评论',
                variant: 'outline',
                onClick: () => handleComment("我的时刻")
            },
            // 分享按钮
            {
                label: '分享',
                variant: 'outline',
                onClick: () => handleShare("我的时刻")
            },
            // 自定义事件按钮
            {
                label: '自定义操作',
                variant: 'outline',
                onClick: () => {
                    // 自定义逻辑
                    console.log('执行自定义操作');
                    alert('自定义操作完成！');
                }
            }
        ]
    }
];
```

## 高级用法

### 异步事件处理

```tsx
{
    label: '保存',
    variant: 'primary',
    onClick: async () => {
        try {
            // 显示加载状态
            const response = await fetch('/api/save-moment', {
                method: 'POST',
                body: JSON.stringify(momentData)
            });
            
            if (response.ok) {
                alert('保存成功！');
            } else {
                throw new Error('保存失败');
            }
        } catch (error) {
            alert('保存失败，请重试');
            console.error(error);
        }
    }
}
```

### 条件渲染按钮

```tsx
{
    title: "需要登录的功能",
    // ...其他属性
    actions: [
        // 根据用户状态显示不同按钮
        ...(isLoggedIn ? [
            { 
                label: '点赞', 
                onClick: () => handleLike(title) 
            },
            { 
                label: '评论', 
                onClick: () => handleComment(title) 
            }
        ] : [
            { 
                label: '登录后互动', 
                href: '/login',
                variant: 'primary'
            }
        ])
    ]
}
```

### 状态管理

```tsx
import { useState } from 'react';

const [liked, setLiked] = useState(false);
const [likeCount, setLikeCount] = useState(0);

// 在 moment 数据中
{
    label: liked ? '已点赞' : '点赞',
    variant: liked ? 'primary' : 'secondary',
    onClick: () => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
        handleLike(title);
    }
}
```

## 扩展事件处理

你可以在 `data/Moments/actions.ts` 中添加更多的事件处理函数：

```tsx
export const handleCustomAction = (data: any) => {
    // 处理自定义逻辑
    console.log('自定义动作', data);
    
    // 可以发送 API 请求
    // fetch('/api/custom-action', { method: 'POST', body: JSON.stringify(data) });
    
    // 可以更新本地存储
    // localStorage.setItem('custom-data', JSON.stringify(data));
};

export const handleReport = (momentTitle: string) => {
    const reason = prompt(`请说明举报"${momentTitle}"的原因:`);
    if (reason) {
        console.log(`举报内容: ${momentTitle}, 原因: ${reason}`);
        alert('举报已提交，我们会尽快处理');
    }
};
```

## 最佳实践

### 1. 用户反馈
确保每个操作都有适当的用户反馈：

```tsx
{
    label: '删除',
    variant: 'outline',
    onClick: () => {
        if (confirm('确定要删除这个时刻吗？')) {
            // 执行删除操作
            handleDelete(momentId);
            alert('删除成功！');
        }
    }
}
```

### 2. 错误处理
为异步操作添加错误处理：

```tsx
{
    label: '上传',
    onClick: async () => {
        try {
            await uploadFile(file);
            alert('上传成功！');
        } catch (error) {
            alert('上传失败，请重试');
            console.error('Upload error:', error);
        }
    }
}
```

### 3. 节流和防抖
对于频繁触发的操作，建议使用节流或防抖：

```tsx
import { debounce } from 'lodash';

const debouncedSearch = debounce((query) => {
    // 执行搜索
}, 300);

{
    label: '搜索',
    onClick: () => debouncedSearch(searchQuery)
}
```

## 注意事项

1. **链接优先级**: 如果同时定义了 `href` 和 `onClick`，将优先使用 `href`
2. **事件处理**: `onClick` 事件会在用户点击时执行，确保处理可能的异常情况
3. **用户体验**: 为了更好的用户体验，建议为长时间运行的操作提供加载提示
4. **无障碍性**: 确保按钮有清晰的标签，便于屏幕阅读器用户理解
5. **性能考虑**: 避免在 onClick 中定义复杂的内联函数，建议提取为独立函数

---

**下一步**: 查看 [数据管理指南](./data-management) 了解如何组织和管理时刻数据。
