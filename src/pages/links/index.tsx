import React, { ReactNode, useState, useMemo } from 'react';
import Layout from "@theme/Layout";
import { Variants, motion } from "framer-motion";
import { 
    allLinksData as links, 
    LinksProps, 
    linkTags, 
    linkCategories,
    getLinksByCategory,
    getLinksByTag,
    getLinksByStatus,
    sortLinksByDate,
    sortLinksByName,
    getCategoryStats,
    getTagStats,
    getCategoryConfig,
    getTagConfig
} from "@site/data/Links/index";
import styles from "./styles.module.css";
import clsx from "clsx";

const variants: Variants = {
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 100,
            duration: 0.3,
            delay: i * 0.1,
        },
    }),
    hidden: { opacity: 0, y: 30 },
}

function LinkCard({ name, description, avatarUrl, url, imageUrl, tags, category, addedDate, status, rating }: LinksProps): ReactNode {
    const categoryConfig = getCategoryConfig(category);
    
    return (
        <div className={clsx(styles.linkCard, "card shadow--md")}>
            <div className="card__header">
                <div className="avatar">
                    <img
                        className="avatar__photo"
                        src={avatarUrl}
                        alt={`${name} avatar`}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/img/docusaurus.png';
                        }}
                    />
                    <div className="avatar__intro">
                        <div className="avatar__name">{name}</div>
                        <small className="avatar__subtitle">
                            {description}
                        </small>
                    </div>
                </div>
                {categoryConfig && (
                    <div 
                        className={styles.categoryBadge}
                        style={{ backgroundColor: categoryConfig.color }}
                    >
                        {categoryConfig.icon}
                    </div>
                )}
            </div>
            
            <div className="card__body">
                {tags && tags.length > 0 && (
                    <div className={styles.tags}>
                        {tags.map((tag, idx) => {
                            const tagConfig = getTagConfig(tag);
                            return (
                                <span 
                                    key={idx} 
                                    className={`badge badge--secondary ${styles.tag}`}
                                    style={{ 
                                        backgroundColor: tagConfig?.color || 'var(--ifm-color-secondary)',
                                        color: 'white'
                                    }}
                                >
                                    {tagConfig?.icon} {tag}
                                </span>
                            );
                        })}
                    </div>
                )}
                
                <div className={styles.linkMeta}>
                    <small>添加于: {addedDate}</small>
                    <span className={clsx(styles.statusBadge, styles[`status-${status}`])}>
                        {status === 'active' ? '✅ 活跃' : status === 'inactive' ? '❌ 不活跃' : '📦 已归档'}
                    </span>
                </div>
                
                {rating && (
                    <div className={styles.rating}>
                        {'⭐'.repeat(rating)}
                    </div>
                )}
            </div>
            
            <div className="card__footer">
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button button--primary button--block"
                >
                    访问网站 🔗
                </a>
            </div>
        </div>
    );
}

function FilterControls({ 
    selectedCategory, 
    setSelectedCategory, 
    selectedTag, 
    setSelectedTag, 
    selectedStatus, 
    setSelectedStatus, 
    sortBy, 
    setSortBy, 
    sortOrder, 
    setSortOrder,
    categoryStats,
    tagStats,
    onReset 
}: {
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedTag: string;
    setSelectedTag: (value: string) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
    sortBy: 'date' | 'name';
    setSortBy: (value: 'date' | 'name') => void;
    sortOrder: 'asc' | 'desc';
    setSortOrder: (value: 'asc' | 'desc') => void;
    categoryStats: any[];
    tagStats: any[];
    onReset: () => void;
}): ReactNode {
    return (
        <div className={styles.filters}>
            <div className={styles.filterGroup}>
                <label>分类筛选：</label>
                <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="button button--secondary"
                >
                    <option value="all">全部 ({links.length})</option>
                    {categoryStats.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.icon} {category.name} ({category.count})
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label>标签筛选：</label>
                <select 
                    value={selectedTag} 
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="button button--secondary"
                >
                    <option value="">全部标签</option>
                    {tagStats.map(({ tag, count }) => {
                        const tagConfig = getTagConfig(tag);
                        return (
                            <option key={tag} value={tag}>
                                {tagConfig?.icon} {tag} ({count})
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label>状态筛选：</label>
                <select 
                    value={selectedStatus} 
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="button button--secondary"
                >
                    <option value="all">全部状态</option>
                    <option value="active">✅ 活跃</option>
                    <option value="inactive">❌ 不活跃</option>
                    <option value="archived">📦 已归档</option>
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label>排序方式：</label>
                <select 
                    value={`${sortBy}-${sortOrder}`} 
                    onChange={(e) => {
                        const [newSortBy, newSortOrder] = e.target.value.split('-') as ['date' | 'name', 'asc' | 'desc'];
                        setSortBy(newSortBy);
                        setSortOrder(newSortOrder);
                    }}
                    className="button button--secondary"
                >
                    <option value="date-desc">📅 最新添加</option>
                    <option value="date-asc">📅 最早添加</option>
                    <option value="name-asc">🔤 名称 A-Z</option>
                    <option value="name-desc">🔤 名称 Z-A</option>
                </select>
            </div>

            <button 
                className="button button--primary"
                onClick={onReset}
            >
                重置筛选
            </button>
        </div>
    );
}

function CategoryStats({ 
    categoryStats, 
    selectedCategory, 
    onCategorySelect 
}: {
    categoryStats: any[];
    selectedCategory: string;
    onCategorySelect: (categoryId: string) => void;
}): ReactNode {
    if (selectedCategory !== 'all') return null;

    return (
        <div className={styles.categoryStats}>
            <h3>分类统计</h3>
            <div className={styles.statsGrid}>
                {categoryStats.map(category => (
                    <div 
                        key={category.id} 
                        className={styles.statCard}
                        style={{ borderLeftColor: category.color }}
                        onClick={() => onCategorySelect(category.id)}
                    >
                        <div 
                            className={styles.statIcon}
                            style={{ backgroundColor: category.color + '20' }}
                        >
                            {category.icon}
                        </div>
                        <div className={styles.statInfo}>
                            <h4>{category.name}</h4>
                            <p>{category.count} 个链接 ({category.percentage}%)</p>
                            <small>{category.description}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ResultsInfo({ 
    count, 
    selectedCategory, 
    selectedTag, 
    selectedStatus 
}: {
    count: number;
    selectedCategory: string;
    selectedTag: string;
    selectedStatus: string;
}): ReactNode {
    return (
        <div className={styles.resultsInfo}>
            <p>
                显示 {count} 个链接
                {selectedCategory !== 'all' && (
                    <>
                        {' '} - 分类: {getCategoryConfig(selectedCategory)?.icon} {getCategoryConfig(selectedCategory)?.name}
                    </>
                )}
                {selectedTag && (
                    <>
                        {' '} - 标签: {getTagConfig(selectedTag)?.icon} {selectedTag}
                    </>
                )}
                {selectedStatus !== 'all' && (
                    <>
                        {' '} - 状态: {selectedStatus === 'active' ? '✅ 活跃' : selectedStatus === 'inactive' ? '❌ 不活跃' : '📦 已归档'}
                    </>
                )}
            </p>
        </div>
    );
}

function LinksGrid({ links }: { links: LinksProps[] }): ReactNode {
    if (links.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>🔍 没有找到匹配的链接</h3>
                <p>尝试调整筛选条件或重置筛选</p>
            </div>
        );
    }

    return (
        <div className="row">
            {links.map((link, idx) => (
                <div key={`${link.name}-${link.url}-${idx}`} className="col col--4 margin-bottom--lg">
                    <motion.div
                        custom={idx}
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                    >
                        <LinkCard {...link} />
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

function LinksPageContent(): ReactNode {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // 计算统计数据
    const categoryStats = useMemo(() => {
        const stats: Record<string, number> = {};
        links.forEach(link => {
            stats[link.category] = (stats[link.category] || 0) + 1;
        });
        
        return linkCategories.map(category => ({
            id: category.id,
            name: category.name,
            icon: category.icon,
            count: stats[category.id] || 0,
            color: category.color
        }));
    }, []);

    const tagStats = useMemo(() => {
        const stats: Record<string, number> = {};
        links.forEach(link => {
            link.tags?.forEach(tag => {
                stats[tag] = (stats[tag] || 0) + 1;
            });
        });
        
        return linkTags.map(tag => ({
            id: tag.tagId,
            name: tag.tagName,
            icon: tag.icon,
            count: stats[tag.tagId] || 0,
            color: tag.color
        }));
    }, []);

    const filteredAndSortedLinks = useMemo(() => {
        let filtered = links;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(link => link.category === selectedCategory);
        }

        if (selectedTag) {
            filtered = filtered.filter(link => link.tags?.includes(selectedTag));
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(link => link.status === selectedStatus);
        }

        if (sortBy === 'date') {
            return sortLinksByDate(filtered, sortOrder);
        } else {
            return sortLinksByName(filtered, sortOrder);
        }
    }, [selectedCategory, selectedTag, selectedStatus, sortBy, sortOrder]);

    const handleReset = () => {
        setSelectedCategory('all');
        setSelectedTag('');
        setSelectedStatus('all');
        setSortBy('date');
        setSortOrder('desc');
    };

    return (
        <main>
            <div className="container margin-top--md margin-bottom--lg">
                <FilterControls
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    categoryStats={categoryStats}
                    tagStats={tagStats}
                    onReset={handleReset}
                />

                <CategoryStats
                    categoryStats={categoryStats}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />

                <ResultsInfo
                    count={filteredAndSortedLinks.length}
                    selectedCategory={selectedCategory}
                    selectedTag={selectedTag}
                    selectedStatus={selectedStatus}
                />

                <LinksGrid links={filteredAndSortedLinks} />
            </div>
        </main>
    );
}

function LinksPageHeader(): ReactNode {
    return (
        <header className="hero">
            <motion.div 
                className="container text--center"
                custom={0}
                variants={variants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="hero__title">🔗Links</h1>
                <p className="hero__subtitle">
                    Friends, Useful Tools and Premium Resources 💫
                </p>
                <div className={styles.heroStats}>
                    <div className={styles.heroStat}>
                        <strong>{links.length}</strong>
                        <span>总链接数</span>
                    </div>
                    <div className={styles.heroStat}>
                        <strong>{linkCategories.length}</strong>
                        <span>分类数</span>
                    </div>
                    <div className={styles.heroStat}>
                        <strong>{linkTags.length}</strong>
                        <span>标签数</span>
                    </div>
                </div>
            </motion.div>
        </header>
    );
}

export default function LinksPage(): ReactNode {
    return (
        <Layout title="Links" description="Friends, Useful Tools and Premium Resources 💫">
            <LinksPageHeader />
            <LinksPageContent />
        </Layout>
    );
}