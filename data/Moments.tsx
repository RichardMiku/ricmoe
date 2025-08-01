// 重新导出新的 Moments 结构，保持向后兼容
export { default } from './Moments/index';
export type { MomentProps, MomentCategory } from './Moments/index';

// 导出工具函数
export { 
    sortMomentsByDate,
    getMomentsByCategory,
    getMomentsByTag,
    getMomentsByAuthor,
    getMomentsByDateRange,
    getCategoryStats,
    getAllTagsWithStats
} from './Moments/index';

// 导出分类数据（向后兼容）
export { 
    blogMoments, 
    lifeMoments, 
    techMoments, 
    testMoments 
} from './Moments/index';

// 导出新的动态分类函数
export {
    getAllCategoryIds,
    getCategoryConfig,
    getAllCategories,
    getMomentsByCategoryId,
    getAllCategoryMoments
} from './Moments/index';

// 导出事件处理函数
export { 
    handleLike, 
    handleComment, 
    handleShare, 
    handleVisitBlog, 
    handleLearnMore 
} from './Moments/index';

// 注意：此文件现在仅用于向后兼容
// 新的 moments 数据管理请使用 ./Moments/ 文件夹中的结构 