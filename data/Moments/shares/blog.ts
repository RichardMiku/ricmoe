import { MomentProps } from '../types';
import { handleLike, handleShare, handleVisitBlog, handleLearnMore } from '../actions';

// 博客相关的时刻分享
export const blogMoments: MomentProps[] = [
    {
        title: "关于博客的更新",
        content: "博客已迁移至 Docusaurus，欢迎访问！这是一个全新的开始，期待与大家分享更多精彩内容。",
        date: "2025-07-27",
        author: "ricmoe",
        style: 'simple',
        actions: [
            { 
                label: '访问博客', 
                variant: 'primary',
                onClick: handleVisitBlog
            },
            { 
                label: '了解更多', 
                variant: 'secondary',
                onClick: handleLearnMore
            }
        ],
        tags: ['博客', '更新', 'Docusaurus']
    }
];
