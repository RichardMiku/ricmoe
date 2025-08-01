import React, { ReactNode, useState, useMemo } from 'react';
import Layout from "@theme/Layout";
import styles from './styles.module.css';
import moments, { 
    MomentProps, 
    sortMomentsByDate,
    getMomentsByCategory,
    getMomentsByTag,
    getMomentsByAuthor,
    getMomentsByDateRange,
    getAllCategories,
    getAllCategoryIds,
    getCategoryConfig,
    getMomentsByCategoryId,
    getCategoryStats,
    getAllTagsWithStats
} from '@site/data/Moments';
import { type Variants, motion } from 'framer-motion';

const variants: Variants = {
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.3,
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0, y: 30 },
}

function MomentsPageContent() : ReactNode {
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [dateRange, setDateRange] = useState<{start: string, end: string}>({start: '', end: ''});

  // 动态获取分类统计信息
  const categoryStats = useMemo(() => getCategoryStats(), []);
  
  // 动态获取标签统计信息
  const tagsWithStats = useMemo(() => getAllTagsWithStats(), []);

  // 使用工具函数过滤和排序数据
  const filteredMoments = useMemo(() => {
    let filtered = moments;

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = getMomentsByCategory(selectedCategory);
    }

    // 按标签过滤
    if (selectedTag) {
      filtered = getMomentsByTag(selectedTag);
    }

    // 按日期范围过滤
    if (dateRange.start && dateRange.end) {
      filtered = getMomentsByDateRange(dateRange.start, dateRange.end);
    }

    // 按日期排序
    return sortMomentsByDate(filtered);
  }, [selectedCategory, selectedTag, dateRange]);

  return (
    <div className="container margin-top--md margin-bottom--lg">
      {/* 过滤器控件 */}
      <div className={styles.filters}>
        {/* 动态分类过滤器 */}
        <div className={styles.filterGroup}>
          <label>分类筛选：</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="button button--secondary"
          >
            <option value="all">全部 ({moments.length})</option>
            {categoryStats.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* 动态标签过滤器 */}
        <div className={styles.filterGroup}>
          <label>标签筛选：</label>
          <select 
            value={selectedTag} 
            onChange={(e) => setSelectedTag(e.target.value)}
            className="button button--secondary"
          >
            <option value="">全部标签</option>
            {tagsWithStats.map(({ tag, count }) => (
              <option key={tag} value={tag}>
                {tag} ({count})
              </option>
            ))}
          </select>
        </div>

        {/* 日期范围过滤器 */}
        <div className={styles.filterGroup}>
          <label>日期范围：</label>
          <input 
            type="date" 
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
            className="button button--secondary"
          />
          <span> 至 </span>
          <input 
            type="date" 
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
            className="button button--secondary"
          />
        </div>

        {/* 重置按钮 */}
        <button 
          className="button button--primary"
          onClick={() => {
            setSelectedCategory('all');
            setSelectedTag('');
            setDateRange({start: '', end: ''});
          }}
        >
          重置筛选
        </button>
      </div>

      {/* 分类统计卡片 */}
      {selectedCategory === 'all' && (
        <div className={styles.categoryStats}>
          <h3>分类统计</h3>
          <div className={styles.statsGrid}>
            {categoryStats.map(category => (
              <div 
                key={category.id} 
                className={styles.statCard}
                style={{ borderLeftColor: category.color }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={styles.statIcon}>{category.icon}</div>
                <div className={styles.statInfo}>
                  <h4>{category.name}</h4>
                  <p>{category.count} 个时刻 ({category.percentage}%)</p>
                  <small>{category.description}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 结果统计 */}
      <div className={styles.resultsInfo}>
        <p>
          显示 {filteredMoments.length} 个时刻
          {selectedCategory !== 'all' && (
            <>
              {' '} - 分类: {getCategoryConfig(selectedCategory)?.icon} {getCategoryConfig(selectedCategory)?.name}
            </>
          )}
          {selectedTag && (
            <>
              {' '} - 标签: {selectedTag}
            </>
          )}
        </p>
      </div>

      {/* 时刻卡片列表 */}
      <div className={styles.masonry}>
        {filteredMoments.map((moment, idx) => (
          <motion.div
            key={`${moment.title}-${moment.date}-${idx}`}
            custom={idx}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            <MomentCard {...moment} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MomentCard({ title, content, date, author, location, style = 'simple', image, actions, avatar, tags }: MomentProps) : ReactNode {
    const cardClass = `card shadow--md ${styles[`card-${style}`] || ''}`;
    
    // Render different card styles based on the style prop
    switch (style) {
        case 'photo-centric':
            return (
                <div className={cardClass}>
                    {image && (
                        <div className="card__image">
                            <img src={image} alt={title} />
                        </div>
                    )}
                    <div className="card__body">
                        <h4>{title}</h4>
                        <p>{content}</p>
                        {tags && (
                            <div className={styles.tags}>
                                {tags.map((tag, idx) => (
                                    <span key={idx} className={`badge badge--secondary ${styles.tag}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`card__footer ${styles.momentCardFooter}`}>
                        <small>{date}</small>
                        <div className={styles.authorInfo}>
                            <strong>{author}</strong>
                            {location && <><br/><small>{`@ ${location}`}</small></>}
                        </div>
                    </div>
                    {actions && (
                        <div className="card__footer">
                            <div className={`button-group button-group--block ${styles.cardActions}`}>
                                {actions.map((action, idx) => (
                                    <button 
                                        key={idx}
                                        className={`button button--${action.variant || 'secondary'}`}
                                        onClick={action.onClick}
                                    >
                                        {action.href ? (
                                            <a href={action.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {action.label}
                                            </a>
                                        ) : (
                                            action.label
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );

        case 'feed':
            return (
                <div className={cardClass}>
                    <div className="card__header">
                        <div className="avatar">
                            {avatar && (
                                <img className="avatar__photo" src={avatar} alt={author} />
                            )}
                            <div className="avatar__intro">
                                <div className="avatar__name">{author}</div>
                                {location && (
                                    <small className="avatar__subtitle">@ {location}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    {image && (
                        <div className="card__image">
                            <img src={image} alt={title} />
                        </div>
                    )}
                    <div className="card__body">
                        <h3>{title}</h3>
                        <p>{content}</p>
                        {tags && (
                            <div className={styles.tags}>
                                {tags.map((tag, idx) => (
                                    <span key={idx} className={`badge badge--primary ${styles.tag}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`card__footer ${styles.momentCardFooter}`}>
                        <small>{date}</small>
                    </div>
                    {actions && (
                        <div className="card__footer">
                            <div className="button-group button-group--block">
                                {actions.map((action, idx) => (
                                    <button 
                                        key={idx}
                                        className={`button button--${action.variant || 'secondary'}`}
                                        onClick={action.onClick}
                                    >
                                        {action.href ? (
                                            <a href={action.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {action.label}
                                            </a>
                                        ) : (
                                            action.label
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );

        case 'minimal':
            return (
                <div className={`${cardClass} ${styles.minimalCard}`}>
                    <div className="card__body">
                        <h4>{title}</h4>
                        <p>{content}</p>
                        <div className={styles.minimalFooter}>
                            <small>{date} • {author}</small>
                            {location && <small>@ {location}</small>}
                        </div>
                    </div>
                </div>
            );

        default: // 'simple'
            return (
                <div className={cardClass}>
                    <div className="card__header">
                        <h3>{title}</h3>
                    </div>
                    <div className="card__body">
                        <p>{content}</p>
                        {tags && (
                            <div className={styles.tags}>
                                {tags.map((tag, idx) => (
                                    <span key={idx} className={`badge badge--secondary ${styles.tag}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={`card__footer ${styles.momentCardFooter}`}>
                        <small>{date}</small>
                        <div className={styles.authorInfo}>
                            <strong>{author}</strong>
                            {location && <><br/><small>{`@ ${location}`}</small></>}
                        </div>
                    </div>
                    {actions && (
                        <div className="card__footer">
                            <div className={`button-group button-group--block ${styles.cardActions}`}>
                                {actions.map((action, idx) => (
                                    <button 
                                        key={idx}
                                        className={`button button--${action.variant || 'secondary'}`}
                                        onClick={action.onClick}
                                    >
                                        {action.href ? (
                                            <a href={action.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                {action.label}
                                            </a>
                                        ) : (
                                            action.label
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
    }
}

export default function MomentsPage() : ReactNode {
    return (
        <Layout title="Moments" description="Moments">
            <header className="hero">
                <motion.div className="container"
                    custom={0}
                    variants={variants}
                    initial="hidden"
                    animate="visible">
                        <h1 className="hero__title">📷️Moments（Developing）</h1>
                        <p>💖Record and Share Life Moments.💖（🚧施工中，敬请期待🚧）</p>
                    {/* <div className='row'>
                        <div className="col col--5">
                            <h1 className="hero__title">📷️Moments（Developing）</h1>
                            <p>💖Record and Share Life Moments.💖</p>
                        </div>
                        <div className='col col--6'>
                            <p>&nbsp;</p>
                        </div>
                    </div> */}
                </motion.div>
            </header>
            <main>
                <MomentsPageContent />
            </main>
        </Layout>
    );
}