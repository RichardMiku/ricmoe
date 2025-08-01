// 时刻页面的按钮事件处理函数

export const handleLike = (momentTitle: string) => {
    console.log(`点赞了: ${momentTitle}`);
    // 这里可以添加点赞逻辑，比如发送 API 请求
    alert(`你点赞了「${momentTitle}」`);
};

export const handleComment = (momentTitle: string) => {
    console.log(`评论了: ${momentTitle}`);
    // 这里可以添加评论逻辑
    const comment = prompt(`对「${momentTitle}」发表评论:`);
    if (comment) {
        alert(`评论成功: ${comment}`);
    }
};

export const handleShare = (momentTitle: string, url?: string) => {
    console.log(`分享了: ${momentTitle}`);
    // 使用 Web Share API 或者复制链接
    if (navigator.share) {
        navigator.share({
            title: momentTitle,
            text: '查看这个精彩的时刻！',
            url: url || window.location.href
        }).catch(console.error);
    } else {
        // 备用方案：复制到剪贴板
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url || window.location.href);
            alert('链接已复制到剪贴板！');
        } else {
            // 更老的浏览器备用方案
            const textArea = document.createElement('textarea');
            textArea.value = url || window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('链接已复制到剪贴板！');
        }
    }
};

// 访问博客
export const handleVisitBlog = () => {
    window.location.href = '/';
};

// 了解更多
export const handleLearnMore = () => {
    window.location.href = '/docs/intro';
};
