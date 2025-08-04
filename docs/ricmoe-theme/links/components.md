# 组件使用

本文档介绍如何使用 Links 系统中的各种组件和如何创建自定义组件。

## 🧩 内置组件

Links 系统提供了一套完整的 React 组件，位于 `src/pages/links/index.tsx` 中。

### LinkCard 组件

链接卡片组件，用于展示单个链接信息。

**Props**:
```typescript
interface LinkCardProps extends LinksProps {
    // 继承所有 LinksProps 属性
}
```

**使用示例**:
```typescript
import { LinkCard } from '@site/src/pages/links';

function MyLinksDisplay() {
    const linkData = {
        name: "GitHub",
        description: "全球最大的代码托管平台",
        avatarUrl: "https://github.com/favicon.ico",
        url: "https://github.com",
        tags: ["tools", "development"],
        category: "tools",
        addedDate: "2024-01-01",
        status: "active" as const,
        rating: 5
    };
    
    return <LinkCard {...linkData} />;
}
```

**特性**:
- 响应式设计，自动适配不同屏幕尺寸
- 悬停动画效果
- 状态标识（活跃/不活跃/已归档）
- 星级评分显示
- 标签展示
- 分类徽章

### FilterControls 组件

过滤控制组件，提供完整的筛选功能。

**Props**:
```typescript
interface FilterControlsProps {
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
}
```

**使用示例**:
```typescript
function MyFilteredLinks() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    
    const handleReset = () => {
        setSelectedCategory('all');
        setSelectedTag('');
        setSelectedStatus('all');
        setSortBy('date');
        setSortOrder('desc');
    };
    
    return (
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
    );
}
```

### CategoryStats 组件

分类统计组件，展示各分类的统计信息。

**Props**:
```typescript
interface CategoryStatsProps {
    categoryStats: Array<{
        id: string;
        name: string;
        icon: string;
        count: number;
        color: string;
        percentage?: number;
    }>;
    onCategorySelect: (categoryId: string) => void;
}
```

**使用示例**:
```typescript
function MyCategoryStats() {
    const categoryStats = useMemo(() => {
        const stats = getLinksCategoryStats(allLinksData);
        return linkCategories.map(category => ({
            id: category.id,
            name: category.name,
            icon: category.icon,
            count: stats[category.id] || 0,
            color: category.color,
            percentage: Math.round((stats[category.id] || 0) / allLinksData.length * 100)
        }));
    }, []);
    
    return (
        <CategoryStats
            categoryStats={categoryStats}
            onCategorySelect={(id) => console.log('Selected category:', id)}
        />
    );
}
```

### ResultsInfo 组件

结果信息组件，显示当前过滤结果的统计。

**Props**:
```typescript
interface ResultsInfoProps {
    count: number;
    selectedCategory: string;
    selectedTag: string;
    selectedStatus: string;
}
```

### LinksGrid 组件

链接网格组件，用于展示链接列表。

**Props**:
```typescript
interface LinksGridProps {
    links: LinksProps[];
}
```

**使用示例**:
```typescript
function MyLinksGrid() {
    const [filteredLinks, setFilteredLinks] = useState(allLinksData);
    
    return (
        <div>
            <h2>所有链接 ({filteredLinks.length})</h2>
            <LinksGrid links={filteredLinks} />
        </div>
    );
}
```

## 🎨 自定义组件

### 创建简单的链接列表

```typescript
import React from 'react';
import { allLinksData, getCategoryConfig } from '@site/data/Links';

function SimpleLinksLisUt() {
    return (
        <ul>
            {allLinksData.map((link, index) => {
                const categoryConfig = getCategoryConfig(link.category);
                return (
                    <li key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {categoryConfig?.icon} {link.name}
                        </a>
                        <p>{link.description}</p>
                        {link.tags && (
                            <div>
                                标签: {link.tags.join(', ')}
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
```

### 创建分类导航组件

```typescript
import React from 'react';
import { linkCategories, filterLinksByCategory, allLinksData } from '@site/data/Links';

interface CategoryNavProps {
    onCategorySelect: (categoryId: string) => void;
    selectedCategory: string;
}

function CategoryNav({ onCategorySelect, selectedCategory }: CategoryNavProps) {
    return (
        <nav style={{ marginBottom: '2rem' }}>
            <button
                onClick={() => onCategorySelect('all')}
                style={{
                    backgroundColor: selectedCategory === 'all' ? '#007bff' : '#f8f9fa',
                    color: selectedCategory === 'all' ? 'white' : '#333',
                    border: '1px solid #ddd',
                    padding: '8px 16px',
                    margin: '4px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                全部 ({allLinksData.length})
            </button>
            
            {linkCategories.map(category => {
                const count = filterLinksByCategory(allLinksData, category.id).length;
                const isSelected = selectedCategory === category.id;
                
                return (
                    <button
                        key={category.id}
                        onClick={() => onCategorySelect(category.id)}
                        style={{
                            backgroundColor: isSelected ? category.color : '#f8f9fa',
                            color: isSelected ? 'white' : '#333',
                            border: '1px solid #ddd',
                            padding: '8px 16px',
                            margin: '4px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {category.icon} {category.name} ({count})
                    </button>
                );
            })}
        </nav>
    );
}
```

### 创建搜索组件

```typescript
import React, { useState, useMemo } from 'react';
import { allLinksData, filterLinksBySearch } from '@site/data/Links';

function SearchableLinks() {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredLinks = useMemo(() => {
        return filterLinksBySearch(allLinksData, searchTerm);
    }, [searchTerm]);
    
    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="搜索链接..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}
                />
            </div>
            
            <p>找到 {filteredLinks.length} 个结果</p>
            
            <div>
                {filteredLinks.map((link, index) => (
                    <div key={index} style={{ 
                        padding: '1rem', 
                        border: '1px solid #eee', 
                        marginBottom: '1rem',
                        borderRadius: '4px'
                    }}>
                        <h3>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.name}
                            </a>
                        </h3>
                        <p>{link.description}</p>
                        {link.tags && (
                            <div>
                                {link.tags.map(tag => (
                                    <span 
                                        key={tag}
                                        style={{
                                            display: 'inline-block',
                                            backgroundColor: '#e9ecef',
                                            padding: '2px 6px',
                                            margin: '2px',
                                            borderRadius: '3px',
                                            fontSize: '0.8rem'
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
```

### 创建统计仪表板组件

```typescript
import React from 'react';
import { 
    allLinksData, 
    linkCategories, 
    linkTags,
    getLinksCategoryStats,
    getLinksTagStats,
    getAllUniqueTags 
} from '@site/data/Links';

function StatsDashboard() {
    const categoryStats = getLinksCategoryStats(allLinksData);
    const tagStats = getLinksTagStats(allLinksData);
    const uniqueTags = getAllUniqueTags(allLinksData);
    
    const totalLinks = allLinksData.length;
    const activeLinks = allLinksData.filter(link => link.status === 'active').length;
    const averageRating = allLinksData
        .filter(link => link.rating)
        .reduce((sum, link) => sum + (link.rating || 0), 0) / 
        allLinksData.filter(link => link.rating).length;
    
    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
        }}>
            {/* 基本统计 */}
            <div style={{ 
                padding: '1.5rem', 
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
            }}>
                <h3>📊 基本统计</h3>
                <div>总链接数: <strong>{totalLinks}</strong></div>
                <div>活跃链接: <strong>{activeLinks}</strong></div>
                <div>分类数: <strong>{linkCategories.length}</strong></div>
                <div>标签数: <strong>{uniqueTags.length}</strong></div>
                <div>平均评分: <strong>{averageRating.toFixed(1)}⭐</strong></div>
            </div>
            
            {/* 分类统计 */}
            <div style={{ 
                padding: '1.5rem', 
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
            }}>
                <h3>📂 分类分布</h3>
                {Object.entries(categoryStats).map(([categoryId, count]) => {
                    const category = linkCategories.find(cat => cat.id === categoryId);
                    const percentage = Math.round(count / totalLinks * 100);
                    return (
                        <div key={categoryId} style={{ marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{category?.icon} {category?.name}</span>
                                <span><strong>{count}</strong> ({percentage}%)</span>
                            </div>
                            <div style={{ 
                                width: '100%', 
                                height: '4px', 
                                backgroundColor: '#e9ecef',
                                borderRadius: '2px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${percentage}%`,
                                    height: '100%',
                                    backgroundColor: category?.color || '#007bff'
                                }} />
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* 热门标签 */}
            <div style={{ 
                padding: '1.5rem', 
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
            }}>
                <h3>🏷️ 热门标签</h3>
                {Object.entries(tagStats)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([tag, count]) => (
                        <div key={tag} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem'
                        }}>
                            <span>{tag}</span>
                            <strong>{count}</strong>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
```

### 创建最近添加组件

```typescript
import React from 'react';
import { allLinksData, sortLinksByDate } from '@site/data/Links';

function RecentLinks({ count = 5 }: { count?: number }) {
    const recentLinks = sortLinksByDate(allLinksData, 'newest').slice(0, count);
    
    return (
        <div style={{ 
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
        }}>
            <h3>🆕 最近添加</h3>
            {recentLinks.map((link, index) => (
                <div key={index} style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: index < recentLinks.length - 1 ? '1px solid #e9ecef' : 'none'
                }}>
                    <img 
                        src={link.avatarUrl} 
                        alt={link.name}
                        style={{ 
                            width: '32px', 
                            height: '32px', 
                            borderRadius: '50%',
                            marginRight: '0.75rem'
                        }}
                    />
                    <div style={{ flex: 1 }}>
                        <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                                textDecoration: 'none',
                                fontWeight: '500',
                                color: '#007bff'
                            }}
                        >
                            {link.name}
                        </a>
                        <div style={{ 
                            fontSize: '0.8rem',
                            color: '#6c757d'
                        }}>
                            {link.addedDate}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
```

## 🎛️ Hook 使用

### 创建自定义 Hook

```typescript
import { useState, useMemo } from 'react';
import { 
    allLinksData,
    filterLinksByCategory,
    filterLinksByTag,
    filterLinksBySearch,
    sortLinksByName,
    sortLinksByDate,
    LinksProps
} from '@site/data/Links';

export function useLinksFilter() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    
    const filteredLinks = useMemo(() => {
        let result: LinksProps[] = allLinksData;
        
        // 应用过滤器
        if (selectedCategory !== 'all') {
            result = filterLinksByCategory(result, selectedCategory);
        }
        
        if (selectedTag) {
            result = filterLinksByTag(result, selectedTag);
        }
        
        if (searchTerm) {
            result = filterLinksBySearch(result, searchTerm);
        }
        
        // 应用排序
        if (sortBy === 'name') {
            result = sortLinksByName(result, sortOrder);
        } else {
            result = sortLinksByDate(result, sortOrder === 'desc' ? 'newest' : 'oldest');
        }
        
        return result;
    }, [selectedCategory, selectedTag, searchTerm, sortBy, sortOrder]);
    
    const resetFilters = () => {
        setSelectedCategory('all');
        setSelectedTag('');
        setSearchTerm('');
        setSortBy('date');
        setSortOrder('desc');
    };
    
    return {
        // 数据
        filteredLinks,
        
        // 过滤状态
        selectedCategory,
        selectedTag,
        searchTerm,
        sortBy,
        sortOrder,
        
        // 控制函数
        setSelectedCategory,
        setSelectedTag,
        setSearchTerm,
        setSortBy,
        setSortOrder,
        resetFilters,
        
        // 统计信息
        totalCount: allLinksData.length,
        filteredCount: filteredLinks.length
    };
}
```

### 使用自定义 Hook

```typescript
import React from 'react';
import { useLinksFilter } from './hooks/useLinksFilter';

function FilterableLinksPage() {
    const {
        filteredLinks,
        selectedCategory,
        selectedTag,
        searchTerm,
        setSelectedCategory,
        setSelectedTag,
        setSearchTerm,
        resetFilters,
        totalCount,
        filteredCount
    } = useLinksFilter();
    
    return (
        <div>
            <h1>链接管理</h1>
            
            {/* 搜索框 */}
            <input
                type="text"
                placeholder="搜索链接..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* 分类选择 */}
            <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="all">全部分类</option>
                {/* 添加分类选项 */}
            </select>
            
            {/* 重置按钮 */}
            <button onClick={resetFilters}>重置筛选</button>
            
            {/* 结果信息 */}
            <p>显示 {filteredCount} / {totalCount} 个链接</p>
            
            {/* 链接列表 */}
            <div>
                {filteredLinks.map((link, index) => (
                    <div key={index}>
                        <h3>{link.name}</h3>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            访问网站
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

## 📱 响应式组件

### 创建响应式卡片网格

```typescript
import React from 'react';
import { LinksProps } from '@site/data/Links';

interface ResponsiveLinksGridProps {
    links: LinksProps[];
    cardMinWidth?: number;
    gap?: number;
}

function ResponsiveLinksGrid({ 
    links, 
    cardMinWidth = 300, 
    gap = 16 
}: ResponsiveLinksGridProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${cardMinWidth}px, 1fr))`,
            gap: `${gap}px`,
            padding: `${gap}px 0`
        }}>
            {links.map((link, index) => (
                <div 
                    key={index}
                    style={{
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                    }}
                >
                    {/* 卡片内容 */}
                    <div style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <img 
                                src={link.avatarUrl} 
                                alt={link.name}
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%',
                                    marginRight: '0.75rem'
                                }}
                            />
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{link.name}</h3>
                        </div>
                        
                        <p style={{ 
                            margin: '0 0 1rem 0',
                            color: '#6c757d',
                            fontSize: '0.9rem',
                            lineHeight: '1.4'
                        }}>
                            {link.description}
                        </p>
                        
                        {link.tags && (
                            <div style={{ marginBottom: '1rem' }}>
                                {link.tags.map(tag => (
                                    <span 
                                        key={tag}
                                        style={{
                                            display: 'inline-block',
                                            backgroundColor: '#e9ecef',
                                            color: '#495057',
                                            padding: '2px 6px',
                                            margin: '2px 4px 2px 0',
                                            borderRadius: '3px',
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-block',
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#0056b3';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#007bff';
                            }}
                        >
                            访问网站 →
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
```

## 🔧 最佳实践

1. **性能优化**: 使用 `useMemo` 缓存计算结果
2. **类型安全**: 为所有组件定义明确的 TypeScript 接口
3. **可访问性**: 添加适当的 ARIA 属性和键盘导航支持
4. **响应式设计**: 使用 CSS Grid 或 Flexbox 确保在不同设备上的良好体验
5. **错误处理**: 处理数据缺失和网络错误的情况
6. **SEO 友好**: 使用语义化的 HTML 结构

组件系统为你提供了灵活的构建基础，你可以根据具体需求进行定制和扩展。
