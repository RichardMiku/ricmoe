import { MomentProps } from '../types';
import { handleLike, handleComment, handleShare } from '../actions';

// 技术学习相关的时刻分享
export const techMoments: MomentProps[] = [
    {
        title: "学习新技术",
        content: "最近在学习 React 和 TypeScript，感觉收获很多。编程真的是一个不断学习的过程。",
        date: "2025-07-25",
        author: "ricmoe",
        style: 'feed',
        avatar: "/img/logo.png",
        actions: [
            { 
                label: '点赞', 
                variant: 'secondary',
                onClick: () => handleLike("学习新技术")
            },
            { 
                label: '评论', 
                variant: 'secondary',
                onClick: () => handleComment("学习新技术")
            },
            { 
                label: '分享', 
                variant: 'secondary',
                onClick: () => handleShare("学习新技术")
            }
        ],
        tags: ['学习', '技术', 'React', 'TypeScript']
    }
];
