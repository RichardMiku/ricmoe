import { MomentProps } from '../types';
import { handleLike, handleShare } from '../actions';

// 生活相关的时刻分享
export const lifeMoments: MomentProps[] = [
    // {
    //     title: "美丽的日落",
    //     content: "今天看到了特别美丽的日落，忍不住想要分享给大家。大自然的美总是让人心情愉悦。",
    //     date: "2025-07-26",
    //     author: "ricmoe",
    //     location: "测试地点",
    //     style: 'photo-centric',
    //     image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    //     actions: [
    //         { 
    //             label: '点赞', 
    //             variant: 'outline',
    //             onClick: () => handleLike("美丽的日落")
    //         },
    //         { 
    //             label: '分享', 
    //             variant: 'secondary',
    //             onClick: () => handleShare("美丽的日落")
    //         }
    //     ]
    // },
    {
        title: "Easy Share",
        content: "have a nice day!",
        date: "2025-07-24",
        author: "ricmoe",
        style: 'minimal',
        actions: [
            {
                label: '点赞',
                variant: 'secondary',
                onClick: () => handleLike("简单分享")
            }
        ]
    }
];
