// 导出所有类型定义
export * from './types';

// 导出分类和标签配置
export * from './categories';

// 导出操作函数
export * from './actions';

// 导入所有数据
import { 
    allLinksData, 
    getDataByCategory, 
    categoryDataMap,
    friendsLinks,
    toolsLinks,
    resourcesLinks,
    toysLinks 
} from './shares';

import { linkCategories, linkTags } from './categories';

// 明确导出所有数据
export { 
    allLinksData, 
    getDataByCategory, 
    categoryDataMap,
    friendsLinks,
    toolsLinks,
    resourcesLinks,
    toysLinks 
};

// 提供便捷的默认导出
export const Links = {
    data: allLinksData,
    categories: linkCategories,
    tags: linkTags
} as const;

export default Links;
