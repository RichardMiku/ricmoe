# Moments 按钮事件使用指南

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

在 `src/utils/momentActions.ts` 中定义了以下预制的事件处理函数：

### `handleLike(momentTitle: string)`
处理点赞事件，显示确认提示。

### `handleComment(momentTitle: string)`
处理评论事件，弹出输入框让用户输入评论。

### `handleShare(momentTitle: string, url?: string)`
处理分享事件，使用 Web Share API 或复制链接到剪贴板。

### `handleVisitBlog()`
导航到博客首页。

### `handleLearnMore()`
导航到文档介绍页面。

## 使用示例

```tsx
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

## 扩展事件处理

你可以在 `src/utils/momentActions.ts` 中添加更多的事件处理函数：

```tsx
export const handleCustomAction = (data: any) => {
    // 处理自定义逻辑
    console.log('自定义动作', data);
    
    // 可以发送 API 请求
    // fetch('/api/custom-action', { method: 'POST', body: JSON.stringify(data) });
    
    // 可以更新 UI 状态
    // setState(newState);
};
```

## 注意事项

1. **链接优先级**: 如果同时定义了 `href` 和 `onClick`，将优先使用 `href`
2. **事件处理**: `onClick` 事件会在用户点击时执行，确保处理可能的异常情况
3. **用户体验**: 为了更好的用户体验，建议为长时间运行的操作提供加载提示
4. **无障碍性**: 确保按钮有清晰的标签，便于屏幕阅读器用户理解
