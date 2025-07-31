import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { tr } from 'framer-motion/client';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RICMOE',
  tagline: 'main page subtitle',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.ric.moe',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'RICMOE', // Usually your GitHub org/user name.
  projectName: 'ricmoe-docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-hant',
    locales: ['zh-hant'],
  },

  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/jssha@3.2.0/dist/sha1.min.js',
      position: 'head',
    },
    {
      src: 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js',
      position: 'head',
    },
    {
    src: '/js-helper/pure-sign.js',
    position: 'head',
  },
    {
    src: '/js-helper/wx-share.js',
    position: 'head',
  }],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          // lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'RICMOE',
      logo: {
        alt: 'RICMOE Logo',
        src: 'img/apple-touch-icon-100.gif',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'moeSidebar',
          position: 'left',
          label: 'docs',
        },
        {type:'dropdown', to: '/blog', label: 'Blog', position: 'left',
          items: [
            {to: '/blog', label: '文章'},
            {to: '/blog/archive', label: '归档'},
            {to: '/blog/tags', label: '标签'},
          ]
        },
        {to: '/moments', label: 'Moments', position: 'left'},
        {to: '/links', label: 'Links', position: 'right'},
        {
          href: 'https://github.com/RichardMiku',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `
        <div class="row row--no-gutters">
        
        <div class="col">
        <span>🩷 have a nice day! 🩷</span>
        <!--<span><a href="/null">萌ICP备-00001120号</a></span>-->
        </div>

        <div class="col">
        <span>Copyright © 2020 - ${new Date().getFullYear()} RICMOE.</span>
        </div>

        <div class="col">
        <span class="text--italic">powered by&nbsp;</span>
        <!-- Docusaurus图标 -->
        <span
        onclick="window.open('https://docusaurus.io/', '_blank');" >
        <img alt="docusaurus" src="/img/docusaurus.svg" width="32" height="32" 
        style="vertical-align: middle;" />
        <b>Docusaurus</b>
        </span>
        </div>

        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    subtitleConfig: {
      effect: true,
      loop: true,
      source: 0,
      sub: [
        '探索新知！',
        '分享美好！',
        '分享可爱！',
        // '歡迎來到我的網站！',
        // '這是一個 Docusaurus 專案。',
        // '探索更多內容！'
      ],
      startDelay: 500,
      typeSpeed: 80,
      backSpeed: 40,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
