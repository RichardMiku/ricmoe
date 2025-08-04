import { LinksProps } from './types';

// 过滤功能
export const filterLinksByCategory = (links: LinksProps[], selectedCategory: string) => {
    if (selectedCategory === "all") return links;
    return links.filter(link => link.category === selectedCategory);
};

export const filterLinksByTag = (links: LinksProps[], selectedTag: string) => {
    if (selectedTag === "all") return links;
    return links.filter(link => link.tags?.includes(selectedTag));
};

export const filterLinksBySearch = (links: LinksProps[], searchTerm: string) => {
    if (!searchTerm.trim()) return links;
    const term = searchTerm.toLowerCase();
    return links.filter(link => 
        link.name.toLowerCase().includes(term) ||
        link.description.toLowerCase().includes(term) ||
        link.category.toLowerCase().includes(term) ||
        link.tags?.some(tag => tag.toLowerCase().includes(term))
    );
};

// 兼容函数（为了保持旧的API）
export const getLinksByCategory = (selectedCategory: string, links: LinksProps[] = []) => {
    if (selectedCategory === "all") return links;
    return links.filter(link => link.category === selectedCategory);
};

export const getLinksByTag = (selectedTag: string, links: LinksProps[] = []) => {
    if (selectedTag === "all") return links;
    return links.filter(link => link.tags?.includes(selectedTag));
};

export const getLinksByStatus = (selectedStatus: string, links: LinksProps[] = []) => {
    if (selectedStatus === "all") return links;
    return links.filter(link => link.status === selectedStatus);
};

// 综合过滤函数
export const filterLinks = (
    links: LinksProps[], 
    category: string, 
    tag: string, 
    searchTerm: string
) => {
    let filteredLinks = links;
    
    // 依次应用过滤器
    filteredLinks = filterLinksByCategory(filteredLinks, category);
    filteredLinks = filterLinksByTag(filteredLinks, tag);
    filteredLinks = filterLinksBySearch(filteredLinks, searchTerm);
    
    return filteredLinks;
};

// 排序功能
export const sortLinksByName = (links: LinksProps[], sortOrder: 'asc' | 'desc' = 'asc') => {
    return [...links].sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return sortOrder === 'asc' ? result : -result;
    });
};

export const sortLinksByCategory = (links: LinksProps[], ascending: boolean = true) => {
    return [...links].sort((a, b) => {
        const result = a.category.localeCompare(b.category);
        return ascending ? result : -result;
    });
};

export const sortLinksByDate = (links: LinksProps[], sortOrder: 'asc' | 'desc' = 'desc') => {
    return [...links].sort((a, b) => {
        const dateA = new Date(a.addedDate).getTime();
        const dateB = new Date(b.addedDate).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
};

// 统计功能
export const getLinksCategoryStats = (links: LinksProps[]) => {
    const stats: Record<string, number> = {};
    
    links.forEach(link => {
        stats[link.category] = (stats[link.category] || 0) + 1;
    });
    
    return stats;
};

export const getLinksTagStats = (links: LinksProps[]) => {
    const stats: Record<string, number> = {};
    
    links.forEach(link => {
        link.tags?.forEach(tag => {
            stats[tag] = (stats[tag] || 0) + 1;
        });
    });
    
    return stats;
};

// 兼容函数（为了保持旧的API）
export const getCategoryStats = () => {
    // 这个函数需要从数据源获取链接，所以我们直接返回默认值
    // 实际使用中应该从主数据源调用
    return {};
};

export const getTagStats = () => {
    // 这个函数需要从数据源获取链接，所以我们直接返回默认值  
    // 实际使用中应该从主数据源调用
    return {};
};

// 获取所有唯一标签
export const getAllUniqueTags = (links: LinksProps[]) => {
    const allTags = new Set<string>();
    
    links.forEach(link => {
        link.tags?.forEach(tag => allTags.add(tag));
    });
    
    return Array.from(allTags).sort();
};

// 获取所有唯一分类
export const getAllUniqueCategories = (links: LinksProps[]) => {
    const allCategories = new Set<string>();
    
    links.forEach(link => {
        allCategories.add(link.category);
    });
    
    return Array.from(allCategories).sort();
};

// 随机获取链接
export const getRandomLinks = (links: LinksProps[], count: number) => {
    const shuffled = [...links].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// 获取推荐链接（基于分类）
export const getRecommendedLinks = (links: LinksProps[], currentCategory: string, count: number = 3) => {
    const sameCategory = links.filter(link => link.category === currentCategory);
    return getRandomLinks(sameCategory, count);
};
