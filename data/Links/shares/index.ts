export { friendsLinks } from './friends';
export { toolsLinks } from './tools';
export { resourcesLinks } from './resources';
export { toysLinks } from './toys';

import { friendsLinks } from './friends';
import { toolsLinks } from './tools';
import { resourcesLinks } from './resources';
import { toysLinks } from './toys';
import { LinksProps } from '../types';

// 汇总所有链接数据
export const allLinksData: LinksProps[] = [
    ...friendsLinks,
    ...toolsLinks,
    ...resourcesLinks,
    ...toysLinks
];

// 按分类获取链接数据
export const getDataByCategory = (category: string): LinksProps[] => {
    switch (category) {
        case 'friends':
            return friendsLinks;
        case 'tools':
            return toolsLinks;
        case 'resources':
            return resourcesLinks;
        case 'toys':
            return toysLinks;
        default:
            return allLinksData;
    }
};

// 导出分类映射
export const categoryDataMap = {
    friends: friendsLinks,
    tools: toolsLinks,
    resources: resourcesLinks,
    toys: toysLinks
} as const;
