import { LinksCategoryProps, LinksTagProps } from './types';

export const linkCategories: LinksCategoryProps[] = [
    {
        id: "friends",
        name: "朋友们",
        description: "我的朋友们的网站和博客",
        icon: "👥",
        color: "#ff6b6b"
    },
    {
        id: "tools",
        name: "开发工具",
        description: "实用的开发工具和服务",
        icon: "🛠️",
        color: "#4ecdc4"
    },
    {
        id: "resources",
        name: "学习资源",
        description: "优质的学习和参考资料",
        icon: "📚",
        color: "#45b7d1"
    },
    {
        id: "toys",
        name: "有趣项目",
        description: "有趣的小项目和创意作品",
        icon: "🎮",
        color: "#96ceb4"
    }
];

export const linkTags: LinksTagProps[] = [
    {
        tagId: "friends",
        tagName: "🪶Friends",
        tagDescription: "Links of Friends",
        color: "#ff6b6b",
        icon: "👥"
    },
    {
        tagId: "tools",
        tagName: "🛠️Tools",
        tagDescription: "Development Tools",
        color: "#4ecdc4",
        icon: "🛠️"
    },
    {
        tagId: "toys",
        tagName: "🎮Toys",
        tagDescription: "Fun Projects",
        color: "#96ceb4",
        icon: "🎮"
    },
    {
        tagId: "documentation",
        tagName: "📖Documentation",
        tagDescription: "Documentation and Guides",
        color: "#feca57",
        icon: "📖"
    },
    {
        tagId: "learning",
        tagName: "🎓Learning",
        tagDescription: "Learning Resources",
        color: "#45b7d1",
        icon: "🎓"
    },
    {
        tagId: "development",
        tagName: "💻Development",
        tagDescription: "Development Related",
        color: "#6c5ce7",
        icon: "💻"
    },
    {
        tagId: "countdown",
        tagName: "⏰Countdown",
        tagDescription: "Countdown Related",
        color: "#a55eea",
        icon: "⏰"
    },
    {
        tagId: "editor",
        tagName: "✏️Editor",
        tagDescription: "Code Editors",
        color: "#26de81",
        icon: "✏️"
    }
];

// 工具函数：获取所有分类ID
export const getAllCategoryIds = (): string[] => {
    return linkCategories.map(category => category.id);
};

// 工具函数：获取所有分类
export const getAllCategories = () => {
    return linkCategories;
};

// 工具函数：获取分类配置
export const getCategoryConfig = (categoryId: string) => {
    return linkCategories.find(category => category.id === categoryId);
};

// 工具函数：获取标签配置
export const getTagConfig = (tagId: string) => {
    return linkTags.find(tag => tag.tagId === tagId);
};
