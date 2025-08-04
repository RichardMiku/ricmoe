import type {ReactNode} from 'react';
import { type Variants, motion } from 'framer-motion';

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Head from '@docusaurus/Head';

import styles from './index.module.css';
import TypeEffectSubtitle from '../components/TypeEffectSubtitle';
import { useThemeConfig } from '@docusaurus/theme-common';

// Extend the Docusaurus ThemeConfig type to include our custom subtitleConfig
interface ExtendedThemeConfig {
  subtitleConfig?: {
    effect: boolean;
    loop: boolean;
    source: number;
    sub?: string[];
    startDelay: number;
    typeSpeed: number;
    backSpeed: number;
  };
}

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

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const themeConfig = useThemeConfig() as ExtendedThemeConfig;
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <motion.div 
            className="col col--6"
            custom={0}
            variants={variants}
            initial="hidden"
            animate="visible"
            >
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">
              <TypeEffectSubtitle themeConfig={ themeConfig } />
            </p>
            {/* <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Docusaurus Tutorial - 5min ⏱️
              </Link>
            </div> */}
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
