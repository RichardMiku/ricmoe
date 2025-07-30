import React, { ReactNode } from 'react';
import Layout from "@theme/Layout";
import styles from './styles.module.css';
import moments, { MomentProps } from '@site/data/Moments';
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
  const sortedMoments = [...moments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container margin-top--md margin-bottom--lg">
        <div className={styles.masonry}>
            {sortedMoments.map((moment, idx) => <MomentCard key={idx} {...moment} />)}
        </div>
    </div>
    );
}

function MomentCard({ title, content, date, author, location }: MomentProps) : ReactNode {
    return (
        <div className="card shadow--md">
            <div className="card__header">
                <h2>{title}</h2>
            </div>
            <div className="card__body">
                {content}
            </div>
            <div className={`card__footer ${styles.momentCardFooter}`}>
                <small>{date}</small>
                <div className={styles.authorInfo}>
                    <strong>{author}</strong>
                    {location && <><br/><small>{`@ ${location}`}</small></>}
                </div>
            </div>
        </div>
    );
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
                    <div className='row'>
                        <div className="col col--5">
                            <h1 className="hero__title">📷️Moments</h1>
                            <p>💖Record and Share Life Moments.💖</p>
                        </div>
                        <div className='col col--6'>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </motion.div>
            </header>
            <main>
                <MomentsPageContent />
            </main>
        </Layout>
    );
}