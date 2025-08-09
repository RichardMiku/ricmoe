// 动态导入所有 moment 分享数据
import { MomentProps } from '../types';
import { getAllCategoryIds, isCategoryExists } from '../categories';

// 导入具体的分类数据
export { blogMoments } from './blog';
export { lifeMoments } from './life';
export { techMoments } from './tech';
export { testMoments } from './test';

// 动态分类数据映射
import { blogMoments } from './blog';
import { lifeMoments } from './life';
import { techMoments } from './tech';
import { testMoments } from './test';

// 创建动态的分类数据映射
export const CATEGORY_MOMENTS_MAP: Record<string, MomentProps[]> = {
    blog: blogMoments,
    life: lifeMoments,
    tech: techMoments,
    test: testMoments
};

// 动态获取分类的 moments 数据
export const getMomentsByCategoryId = (categoryId: string): MomentProps[] => {
    if (!isCategoryExists(categoryId)) {
        console.warn(`Category "${categoryId}" does not exist`);
        return [];
    }
    return CATEGORY_MOMENTS_MAP[categoryId] || [];
};

// 获取所有分类的 moments 数据
export const getAllCategoryMoments = (): Record<string, MomentProps[]> => {
    const result: Record<string, MomentProps[]> = {};
    getAllCategoryIds().forEach(categoryId => {
        result[categoryId] = getMomentsByCategoryId(categoryId);
    });
    return result;
};

// 验证所有分类都有对应的数据
export const validateCategories = (): { valid: boolean; missing: string[] } => {
    const allCategoryIds = getAllCategoryIds();
    const missing = allCategoryIds.filter(id => !CATEGORY_MOMENTS_MAP[id]);
    
    if (missing.length > 0) {
        console.warn('Missing moment data for categories:', missing);
    }
    
    return {
        valid: missing.length === 0,
        missing
    };
};
