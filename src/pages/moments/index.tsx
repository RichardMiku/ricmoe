import React, { ReactNode, useState, useMemo, useEffect } from 'react';
import Layout from "@theme/Layout";
import Head from '@docusaurus/Head';
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
import CommentsSection from '@site/src/components/CommentsSection';
import { MomentDetail } from '@site/src/components/MomentDetail';

// 获取查询参数的工具函数
const getQueryParam = (param: string): string | null => {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    return null;
};

// 临时的 getMomentById 函数，直到导出问题解决
const getMomentById = (id: string): MomentProps | undefined => {
    return moments.find(moment => moment.id === id);
};

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
  // 获取查询参数中的 moment ID
  const [momentId, setMomentId] = useState<string | null>(null);
  
  // 原有的列表视图状态管理 - 必须在条件语句之前
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
  
  useEffect(() => {
    // 初始化时读取URL参数
    const updateMomentId = () => {
      const id = getQueryParam('id');
      setMomentId(id);
    };
    
    updateMomentId();
    
    // 监听浏览器前进/后退按钮事件
    const handlePopState = () => {
      updateMomentId();
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 如果有 momentId，显示单个时刻的详情页
  if (momentId) {
    const moment = getMomentById(momentId);
    
    if (!moment) {
      return (
        <div className="container margin-top--md margin-bottom--lg">
          <div className="alert alert--danger">
            <h4>时刻未找到</h4>
            <p>抱歉，无法找到ID为 "{momentId}" 的时刻。</p>
            <button 
              className="button button--primary"
              onClick={() => {
                window.history.pushState({}, '', '/moments');
                setMomentId(null);
              }}
            >
              返回时刻列表
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="container margin-top--md margin-bottom--lg">
        {/* 返回按钮 */}
        <div className={styles.backButton}>
          <button 
            className="button button--secondary"
            onClick={() => {
              window.history.pushState({}, '', '/moments');
              setMomentId(null);
            }}
          >
            ← 返回时刻列表
          </button>
        </div>

        {/* 时刻详情 */}
        <MomentDetail moment={moment} />

        {/* 分享操作 */}
        <div className={styles.shareActions}>
          <button 
            className="button button--outline button--secondary"
            onClick={() => {
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({
                  title: moment.title,
                  text: typeof moment.content === 'string' ? moment.content : moment.title,
                  url: url,
                });
              } else {
                navigator.clipboard.writeText(url);
                alert('链接已复制到剪贴板！');
              }
            }}
          >
            📤 分享
          </button>
          <button 
            className="button button--outline button--secondary"
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('链接已复制到剪贴板！');
            }}
          >
            🔗 复制链接
          </button>
        </div>

        {/* 评论区 */}
        <CommentsSection 
          path={`/moments?id=${momentId}`} // 请替换为你的 Waline 服务器地址
        />
      </div>
    );
  }

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
            key={`${moment.id || moment.title}-${moment.date}-${idx}`}
            custom={idx}
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            <MomentCard {...moment} onViewDetail={(id) => {
              window.history.pushState({}, '', `/moments?id=${id}`);
              setMomentId(id);
            }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MomentCard({ id, title, content, date, author, location, style = 'simple', image, actions, avatar, tags, onViewDetail }: MomentProps & { onViewDetail?: (id: string) => void }) : ReactNode {
    const cardClass = `card shadow--md ${styles[`card-${style}`] || ''}`;
    
    // 处理查看详情的点击事件
    const handleViewDetail = () => {
        if (id && onViewDetail) {
            onViewDetail(id);
        }
    };
    
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
                        <div className={styles.dateAndDetails}>
                            <small>{date}</small>
                            {id && (
                                <span 
                                    className={styles.viewDetailText}
                                    onClick={handleViewDetail}
                                >
                                    查看详情
                                </span>
                            )}
                        </div>
                        <div className={styles.authorInfo}>
                            <strong>{author}</strong>
                            {location && <><br/><small>{`@ ${location}`}</small></>}
                        </div>
                    </div>
                    {/* 原有的 actions（如果有的话） */}
                    {actions && actions.length > 0 && (
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
                        <div className={styles.dateAndDetails}>
                            <small>{date}</small>
                            {id && (
                                <span 
                                    className={styles.viewDetailText}
                                    onClick={handleViewDetail}
                                >
                                    查看详情
                                </span>
                            )}
                        </div>
                    </div>
                    {/* 原有的 actions（如果有的话） */}
                    {actions && actions.length > 0 && (
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
                            <div className={styles.dateAndDetails}>
                                <small>{date} • {author}</small>
                                {id && (
                                    <span 
                                        className={styles.viewDetailText}
                                        onClick={handleViewDetail}
                                    >
                                        查看详情
                                    </span>
                                )}
                            </div>
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
                        <div className={styles.dateAndDetails}>
                            <small>{date}</small>
                            {id && (
                                <span 
                                    className={styles.viewDetailText}
                                    onClick={handleViewDetail}
                                >
                                    查看详情
                                </span>
                            )}
                        </div>
                        <div className={styles.authorInfo}>
                            <strong>{author}</strong>
                            {location && <><br/><small>{`@ ${location}`}</small></>}
                        </div>
                    </div>
                    {/* 原有的 actions（如果有的话） */}
                    {actions && actions.length > 0 && (
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
    // 调试：在控制台输出 moments 数据以检查 ID 生成情况
    React.useEffect(() => {
        // console.log('Moments data with IDs:', moments);
        // console.log('First moment:', moments[0]);
    }, []);
    
    // 获取 URL 中的 moment ID 用于 SEO
    const [currentMoment, setCurrentMoment] = React.useState<MomentProps | null>(null);
    
    React.useEffect(() => {
        // 检查 URL 参数
        const urlParams = new URLSearchParams(window.location.search);
        const momentId = urlParams.get('id');
        
        if (momentId) {
            const moment = getMomentById(momentId);
            setCurrentMoment(moment || null);
        } else {
            setCurrentMoment(null);
        }
        
        // 监听 URL 变化
        const handlePopState = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const momentId = urlParams.get('id');
            
            if (momentId) {
                const moment = getMomentById(momentId);
                setCurrentMoment(moment || null);
            } else {
                setCurrentMoment(null);
            }
        };
        
        window.addEventListener('popstate', handlePopState);
        
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    
    // 动态设置页面的 title 和 description
    const pageTitle = currentMoment ? `${currentMoment.title} - Moments` : "Moments";
    const pageDescription = currentMoment 
        ? (typeof currentMoment.content === 'string' 
            ? currentMoment.content.substring(0, 160) + (currentMoment.content.length > 160 ? '...' : '')
            : `${currentMoment.title} - ${currentMoment.date}`)
        : "💖Record and Share Life Moments.💖";
    
    // 为详情页面添加更多 meta 标签
    const additionalMetadata = currentMoment ? [
        {
            name: 'author',
            content: currentMoment.author
        },
        {
            name: 'publish_date', 
            content: currentMoment.date
        },
        {
            property: 'og:title',
            content: currentMoment.title
        },
        {
            property: 'og:description',
            content: typeof currentMoment.content === 'string' 
                ? currentMoment.content.substring(0, 200) 
                : currentMoment.title
        },
        {
            property: 'og:type',
            content: 'article'
        },
        {
            property: 'og:url',
            content: typeof window !== 'undefined' ? window.location.href : ''
        },
        ...(currentMoment.image ? [{
            property: 'og:image',
            content: currentMoment.image
        }] : []),
        {
            name: 'twitter:card',
            content: currentMoment.image ? 'summary_large_image' : 'summary'
        },
        {
            name: 'twitter:title',
            content: currentMoment.title
        },
        {
            name: 'twitter:description',
            content: typeof currentMoment.content === 'string' 
                ? currentMoment.content.substring(0, 200) 
                : currentMoment.title
        },
        ...(currentMoment.image ? [{
            name: 'twitter:image',
            content: currentMoment.image
        }] : [])
    ] : [];
    
    return (
        <Layout 
            title={pageTitle} 
            description={pageDescription}
            wrapperClassName={currentMoment ? 'moment-detail-page' : 'moments-list-page'}
        >
            {/* 添加额外的 meta 标签 */}
            <Head>
                {additionalMetadata.map((meta, index) => (
                    <meta key={index} {...meta} />
                ))}
                {currentMoment && (
                    <>
                        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
                        <meta name="robots" content="index,follow" />
                        <meta name="googlebot" content="index,follow" />
                        
                        {/* 添加结构化数据 (JSON-LD) */}
                        <script type="application/ld+json">
                            {JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "BlogPosting",
                                "headline": currentMoment.title,
                                "description": typeof currentMoment.content === 'string' 
                                    ? currentMoment.content 
                                    : currentMoment.title,
                                "author": {
                                    "@type": "Person",
                                    "name": currentMoment.author
                                },
                                "datePublished": currentMoment.date,
                                "dateModified": currentMoment.date,
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "RICMOE",
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://www.ric.moe/img/logo.png"
                                    }
                                },
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": typeof window !== 'undefined' ? window.location.href : ''
                                },
                                ...(currentMoment.image && {
                                    "image": currentMoment.image
                                }),
                                ...(currentMoment.tags && {
                                    "keywords": currentMoment.tags.join(", ")
                                })
                            })}
                        </script>
                    </>
                )}
            </Head>
            <header className="hero">
                <motion.div className="container"
                    custom={0}
                    variants={variants}
                    initial="hidden"
                    animate="visible">
                        <h1 className="hero__title">📷️Moments</h1>
                        <p>💖Record and Share Life Moments.💖</p>
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