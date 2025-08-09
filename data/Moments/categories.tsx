import { MomentProps } from './types';

// 分类配置接口
export interface CategoryConfig {
    id: string;
    name: string;
    description?: string;
    color?: string;
    icon?: string;
    moments: MomentProps[];
}

// 分类注册表 - 新增分类只需要在这里添加
export const CATEGORY_REGISTRY: Record<string, Omit<CategoryConfig, 'moments'>> = {
    blog: {
        id: 'blog',
        name: '博客',
        description: '博客相关的时刻分享',
        color: '#007acc',
        icon: '📝'
    },
    life: {
        id: 'life',
        name: '生活',
        description: '生活相关的时刻分享',
        color: '#28a745',
        icon: '🌱'
    },
    tech: {
        id: 'tech',
        name: '技术',
        description: '技术学习相关的时刻分享',
        color: '#ffc107',
        icon: '💻'
    },
    test: {
        id: 'test',
        name: '测试',
        description: '测试用的时刻分享',
        color: '#6c757d',
        icon: '🧪'
    }
};

// 动态获取所有分类ID
export const getAllCategoryIds = (): string[] => {
    return Object.keys(CATEGORY_REGISTRY);
};

// 动态获取分类配置
export const getCategoryConfig = (categoryId: string): Omit<CategoryConfig, 'moments'> | undefined => {
    return CATEGORY_REGISTRY[categoryId];
};

// 检查分类是否存在
export const isCategoryExists = (categoryId: string): boolean => {
    return categoryId in CATEGORY_REGISTRY;
};

// 获取所有分类的基本信息
export const getAllCategories = (): Omit<CategoryConfig, 'moments'>[] => {
    return Object.values(CATEGORY_REGISTRY);
};
