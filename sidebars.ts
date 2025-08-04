import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // 主要文档侧边栏 - 自动生成
  moeSidebar: [
    'intro',
    {
      type: 'category',
      label: '🎨 RicMoe 主题',
      link: {
        type: 'doc',
        id: 'ricmoe-theme/README'
      },
      items: [
        {
          type: 'category',
          label: '🎯 Moments 系统',
          link: {
            type: 'doc',
            id: 'ricmoe-theme/moments/README'
          },
          items: [
            'ricmoe-theme/moments/overview',
            'ricmoe-theme/moments/quick-start',
            'ricmoe-theme/moments/dynamic-categories',
            'ricmoe-theme/moments/card-styles',
            'ricmoe-theme/moments/button-events',
            'ricmoe-theme/moments/data-management',
            'ricmoe-theme/moments/usage-reference'
          ]
        },
        {
          type: 'category',
          label: '🔗 Links 链接系统',
          link: {
            type: 'doc',
            id: 'ricmoe-theme/links/README'
          },
          items: [
            'ricmoe-theme/links/quick-start',
            'ricmoe-theme/links/data-structure',
            'ricmoe-theme/links/api-reference',
            'ricmoe-theme/links/components',
            'ricmoe-theme/links/configuration',
            'ricmoe-theme/links/best-practices'
          ]
        },
        {
          type: 'category',
          label: '💬 微信集成',
          link: {
            type: 'doc',
            id: 'ricmoe-theme/wechat/README'
          },
          items: [
            'ricmoe-theme/wechat/jsapi-ticket',
            'ricmoe-theme/wechat/share-config'
          ]
        },
        {
          type: 'category',
          label: '🧩 组件系统',
          link: {
            type: 'doc',
            id: 'ricmoe-theme/components/README'
          },
          items: [
            'ricmoe-theme/components/overview',
            'ricmoe-theme/components/pages',
            'ricmoe-theme/components/interactive'
          ]
        },
        {
          type: 'category',
          label: '🛠️ 开发指南',
          link: {
            type: 'doc',
            id: 'ricmoe-theme/development/README'
          },
          items: [
            'ricmoe-theme/development/architecture',
            'ricmoe-theme/development/build-config',
            'ricmoe-theme/development/deployment'
          ]
        }
      ]
    }
  ]
};

export default sidebars;
