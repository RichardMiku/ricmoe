import { MomentProps } from './types';
import { getAllCategoryIds, getCategoryConfig, getAllCategories } from './categories';
import { CATEGORY_MOMENTS_MAP, getMomentsByCategoryId, getAllCategoryMoments, validateCategories } from './shares';

// 生成唯一 ID 的函数
const generateMomentId = (moment: MomentProps, index: number): string => {
    // 基于标题、日期和索引生成简单的唯一ID
    const baseString = `${moment.title}-${moment.date}-${index}`;
    return baseString.toLowerCase()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};

// 动态合并所有时刻数据
const getAllMoments = (): MomentProps[] => {
    const allMoments: MomentProps[] = [];
    let globalIndex = 0;
    
    getAllCategoryIds().forEach(categoryId => {
        const categoryMoments = getMomentsByCategoryId(categoryId);
        categoryMoments.forEach(moment => {
            // 如果没有ID，生成一个
            if (!moment.id) {
                moment.id = generateMomentId(moment, globalIndex);
            }
            allMoments.push(moment);
            globalIndex++;
        });
    });
    return allMoments;
};

const moments: MomentProps[] = getAllMoments();

// 导出类型和数据
export type { MomentProps, MomentCategory } from './types';
export { handleLike, handleComment, handleShare, handleVisitBlog, handleLearnMore } from './actions';

// 动态导出分类相关
export { getAllCategoryIds, getCategoryConfig, getAllCategories } from './categories';
export { getMomentsByCategoryId, getAllCategoryMoments } from './shares';

// 为了向后兼容，保留原有的静态导出（使用动态数据）
export const blogMoments = getMomentsByCategoryId('blog');
export const lifeMoments = getMomentsByCategoryId('life');
export const techMoments = getMomentsByCategoryId('tech');
export const testMoments = getMomentsByCategoryId('test');

// 默认导出所有时刻
export default moments;

// 新增：根据 ID 获取特定时刻
export const getMomentById = (id: string): MomentProps | undefined => {
    return moments.find(moment => moment.id === id);
};

// 工具函数：按日期排序时刻
export const sortMomentsByDate = (moments: MomentProps[]) => {
    return [...moments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 重构：动态按分类过滤时刻
export const getMomentsByCategory = (category: string) => {
    if (category === 'all') {
        return moments;
    }
    return getMomentsByCategoryId(category);
};

// 工具函数：按标签过滤时刻
export const getMomentsByTag = (tag: string) => {
    return moments.filter(moment => 
        moment.tags && moment.tags.includes(tag)
    );
};

// 工具函数：按作者过滤时刻
export const getMomentsByAuthor = (author: string) => {
    return moments.filter(moment => moment.author === author);
};

// 工具函数：按时间范围过滤时刻
export const getMomentsByDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return moments.filter(moment => {
        const momentDate = new Date(moment.date);
        return momentDate >= start && momentDate <= end;
    });
};

// 新增：获取分类统计信息
export const getCategoryStats = () => {
    const allCategories = getAllCategories();
    return allCategories.map(category => ({
        ...category,
        count: getMomentsByCategoryId(category.id).length,
        percentage: ((getMomentsByCategoryId(category.id).length / moments.length) * 100).toFixed(1)
    }));
};

// 新增：获取所有标签及其统计
export const getAllTagsWithStats = () => {
    const tagMap = new Map<string, number>();
    moments.forEach(moment => {
        if (moment.tags) {
            moment.tags.forEach(tag => {
                tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
            });
        }
    });
    
    return Array.from(tagMap.entries())
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count);
};

// 验证数据完整性
const validation = validateCategories();
if (!validation.valid) {
    console.error('Moments data validation failed:', validation.missing);
}
