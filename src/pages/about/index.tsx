import React from 'react';
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './index.module.css';
import { type Variants, motion } from 'framer-motion';
import { style } from 'framer-motion/client';

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

function AboutHeader() : ReactNode {
  return (
    <div className="container">
      <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className={clsx("col col--6")}>
            <h1 className={clsx('hero__title',styles.aboutPageText)}>About Page</h1>
        </div>
      </div>
    </div>
    );
}

function AboutBody() : ReactNode {
  return (
    <div className='container'>
        <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <motion.div 
                className="col col--4"
                custom={0}
                variants={variants}
                initial="hidden"
                animate="visible"
                >
                <div className={clsx("card shadow--md", styles.aboutMeCard)}>
                    <div className="card__header">
                        <h2>关于我</h2>
                    </div>
                    <div className="card__body">
                        <div className="AboutMe margin-horiz--none">
                            <div className="title-1">你好，很高兴认识你👋</div>
                            <div className="title-2 text--bold" style={{ fontSize: '2rem', marginTop: '-0.4rem', marginBottom: '-0.4rem' }}>我是 Richard Miku</div>
                            <div className="title-3">学生、设计师、开发者</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
    );
}

export default function About(): ReactNode {
  return (
    <Layout
      title="About Us"
      description="Learn more about our team and mission."
    >
      <header className={clsx(styles.aboutBanner)}>
        <AboutHeader />
      </header>
      <main>
        <AboutBody />
      </main>
    </Layout>
  );
}
