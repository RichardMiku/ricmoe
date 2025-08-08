import React, { ReactNode } from 'react';
import { MomentProps } from '@site/data/Moments';
import styles from '@site/src/pages/moments/styles.module.css';

interface MomentDetailProps {
  moment: MomentProps;
}

function MomentDetail({ moment }: MomentDetailProps): ReactNode {
  const { title, content, date, author, location, style = 'simple', image, actions, avatar, tags } = moment;
  
  return (
    <div className={`${styles.momentDetail} margin-bottom--lg`}>
      <div className={`card shadow--md ${styles[`card-${style}`] || ''}`}>
        {/* 头部信息 */}
        <div className="card__header">
          <div className="avatar">
            {avatar && (
              <img className="avatar__photo avatar__photo--lg" src={avatar} alt={author} />
            )}
            <div className="avatar__intro">
              <div className="avatar__name">{author}</div>
              <small className="avatar__subtitle">
                {date}
                {location && ` • ${location}`}
              </small>
            </div>
          </div>
        </div>

        {/* 图片 */}
        {image && (
          <div className="card__image">
            <img src={image} alt={title} />
          </div>
        )}

        {/* 内容 */}
        <div className="card__body">
          <h2>{title}</h2>
          <div className={styles.momentContent}>
            {typeof content === 'string' ? <p>{content}</p> : content}
          </div>
          
          {/* 标签 */}
          {tags && tags.length > 0 && (
            <div className={`${styles.tags} margin-top--md`}>
              {tags.map((tag, idx) => (
                <span key={idx} className={`badge badge--primary ${styles.tag}`}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 操作按钮 */}
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
    </div>
  );
}

// 确保这个组件不被当作页面组件
export { MomentDetail };
