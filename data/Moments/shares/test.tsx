import { MomentProps } from '../types';

// 测试用的时刻分享
export const testMoments: MomentProps[] = [
    {
        title: "测试不同的按钮事件",
        content: "这里展示了各种按钮事件的使用方式。",
        date: "2025-07-23",
        author: "ricmoe",
        style: 'simple',
        actions: [
            {
                label: '内部链接',
                href: '/about',
                variant: 'primary'
            },
            {
                label: '外部链接',
                href: 'https://docusaurus.io',
                variant: 'secondary'
            },
            {
                label: '自定义事件',
                variant: 'outline',
                onClick: () => {
                    const userInput = prompt('请输入一些内容:');
                    if (userInput) {
                        console.log('用户输入:', userInput);
                        alert(`你输入了: ${userInput}`);
                    }
                }
            }
        ],
        tags: ['测试', '按钮事件', '示例']
    }
];
