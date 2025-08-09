import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RICMOE',
  tagline: 'Explore, Share, and Enjoy!',
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
      src: '/js-helper/sha1.min.js',
      position: 'head',
    },
    {
      src: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
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
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: [
            // 只忽略真正不需要的页面
            '/search',  // 搜索页面通常不需要索引
          ],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            
            // 为不同类型的页面设置不同的优先级和更新频率
            return items.map((item) => {
              // 为不同类型的页面设置不同的优先级和更新频率
              if (item.url === '/') {
                // 首页最高优先级
                return {
                  ...item,
                  priority: 1.0,
                  changefreq: 'daily' as const
                };
              } else if (item.url.includes('/docs/')) {
                // 文档页面高优先级
                return {
                  ...item,
                  priority: 0.9,
                  changefreq: 'weekly' as const
                };
              } else if (item.url.includes('/blog/')) {
                // 博客页面高优先级，但归档和标签页面稍低
                if (item.url.includes('/blog/archive') || item.url.includes('/blog/tags') || item.url.includes('/blog/authors')) {
                  return {
                    ...item,
                    priority: 0.6,
                    changefreq: 'weekly' as const
                  };
                } else {
                  return {
                    ...item,
                    priority: 0.8,
                    changefreq: 'weekly' as const
                  };
                }
              } else if (item.url.includes('/moments')) {
                // Moments页面中等优先级
                return {
                  ...item,
                  priority: 0.7,
                  changefreq: 'weekly' as const
                };
              } else if (item.url.includes('/links')) {
                // Links页面中等优先级
                return {
                  ...item,
                  priority: 0.6,
                  changefreq: 'monthly' as const
                };
              } else if (item.url.includes('/about') || item.url.includes('/feedback')) {
                // 关于和反馈页面较低优先级
                return {
                  ...item,
                  priority: 0.5,
                  changefreq: 'monthly' as const
                };
              }
              
              // 其他页面使用默认设置
              return item;
            });
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    announcementBar: {
      id: 'announcement-bar',
      content: '欢迎来到 RICMOE！Moments卡片上的按钮暂不可用，评论请前往详情页。',
      // backgroundColor: '#fafbfc', // Defaults to `#fafbfc`
      textColor: '#495263ff', // Defaults to `#091E42`
      isCloseable: false, // Defaults to `true`
    },
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {name: 'keywords', content: 'RICMOE, Docusaurus, documentation'},
      {name: 'author', content: 'RICMOE Team'},
      {name: 'algolia-site-verification', content: '7406413BDF2D33E2'},
    ],
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
    algolia: {
      // The application ID provided by Algolia
      appId: 'LJBRFP5Y8O',

      // Public API key: it is safe to commit it
      apiKey: 'cc8a99e7336291f8b0e652ece1556280',

      indexName: 'ricmoedocusaurus',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
