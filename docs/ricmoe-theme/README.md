# RicMoe 主题文档

欢迎来到 RicMoe 主题的完整文档中心！这里包含了所有功能模块的详细说明和使用指南。

RicMoe 主题是基于 Docusaurus 3.x 构建的现代化个人网站主题，具有丰富的功能模块和优雅的设计。

## 🌟 主题特色

- **🎨 现代化设计**: 基于 Docusaurus 3.x 和 React 18，支持暗黑/明亮主题切换
- **🚀 响应式布局**: 完美适配桌面端和移动端
- **⚡ 高性能**: 静态生成，加载速度快，SEO 友好
- **🔧 高度可定制**: 模块化设计，易于扩展和定制
- **🌍 国际化支持**: 多语言支持，默认中文环境

## 📚 文档分类

### 🎯 [Moments 时刻系统](./moments/)
个人时刻分享功能的完整文档，支持动态分类、卡片样式和交互功能。

- [📖 Moments 系统概述](./moments/overview)
- [🚀 快速开始指南](./moments/quick-start)
- [⚙️ 数据管理](./moments/data-management)
- [🎨 卡片样式](./moments/card-styles)
- [🔄 动态分类系统](./moments/dynamic-categories)
- [🎯 按钮事件处理](./moments/button-events)
- [📋 使用参考](./moments/usage-reference)

### 🔗 [Links 友链系统](./links/)
友情链接管理系统，支持分类、标签和状态管理。

- [📖 Links 系统概述](./links/)
- [🚀 快速开始指南](./links/quick-start)
- [📊 数据结构](./links/data-structure)
- [🔧 API 参考](./links/api-reference)
- [🎨 组件使用](./links/components)
- [⚙️ 自定义配置](./links/configuration)
- [💡 最佳实践](./links/best-practices)

### 💬 [微信集成](./wechat/)
微信 JSAPI 集成，支持分享功能和自动 ticket 更新。

- [🔑 JSAPI Ticket 自动更新](./wechat/jsapi-ticket)
- [📱 微信分享配置](./wechat/share-config)

### 🧩 [组件系统](./components/)
可复用 React 组件的文档和使用指南。

- [🎨 主题组件概览](./components/overview)
- [📄 页面组件](./components/pages)
- [🎯 交互组件](./components/interactive)

### 🛠️ [开发指南](./development/)
开发、构建和部署相关的技术文档。

- [🏗️ 项目架构](./development/architecture)
- [📦 构建配置](./development/build-config)
- [🚀 部署指南](./development/deployment)

### ⚙️ [配置指南](./configuration)
详细的主题配置选项和自定义方法。

- 基础配置 - 网站信息、导航、页脚
- 特色功能 - TypeEffect、主题模式、公告栏
- 搜索配置 - Algolia 搜索集成
- SEO 优化 - 元数据、站点地图配置

### 🔌 [插件和扩展](./plugins-extensions)
插件集成和功能扩展指南。

- 集成插件 - Waline、Framer Motion、Algolia
- 可选扩展 - PWA、Analytics、Turnstile
- 自定义开发 - 插件开发、组件扩展

### 🚀 [部署和运维](./deployment-ops)
生产环境部署和日常运维指南。

- 部署方案 - GitHub Pages、Vercel、Netlify
- 自动化工作流 - CI/CD、依赖更新
- 监控分析 - 性能监控、SEO 检查
- 安全实践 - 环境变量、HTTPS、CSP

### ❓ [故障排查](./troubleshooting)
常见问题和解决方案。

- 构建错误 - Node.js 版本、内存不足、依赖冲突
- 运行时错误 - 微信分享、按钮响应、搜索功能
- 样式问题 - 暗黑模式、移动端布局、动画性能
- 部署问题 - GitHub Pages、域名配置、环境变量

### 📝 [更新日志](./changelog)
版本更新记录和功能变化历史。

- 版本历史 - 详细的版本更新记录
- 新功能介绍 - 每个版本的新增功能
- 破坏性变更 - 重要的 API 和配置变更
- 迁移指南 - 版本升级指导

### 📖 [API 参考手册](./api-reference)
完整的组件和功能 API 文档。

- 组件 API - 所有 React 组件的接口定义
- 数据结构 - 核心数据类型和接口
- 工具函数 - 实用工具函数的使用说明
- 配置选项 - 所有可配置选项的详细说明

## 🔍 快速导航

| 功能模块 | 核心特性 | 文档链接 |
|---------|----------|---------|
| **Moments 时刻** | 动态分类、卡片样式、交互功能 | [系统概述](./moments/overview) |
| **Links 友链** | 分类管理、标签系统、状态跟踪 | [系统概述](./links/) |
| **微信集成** | JSAPI 分享、自动 Ticket 更新 | [配置指南](./wechat/jsapi-ticket) |
| **TypeEffect** | 打字效果副标题组件 | [组件概览](./components/overview) |
| **评论系统** | Waline 评论集成 | [交互组件](./components/interactive) |
| **主题配置** | 多语言、SEO、Algolia 搜索 | [项目架构](./development/architecture) |

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0
- **npm**: >= 8.0 或 **yarn**: >= 1.22
- **TypeScript**: ~5.6.2

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 本地开发

```bash
npm run start
# 或
yarn start
```

访问 `http://localhost:3000` 查看效果。

### 构建部署

```bash
npm run build
# 或  
yarn build
```

## 🎨 核心功能

### 1. 动态内容管理
- **Moments**: 个人时刻分享，支持多种卡片样式和交互
- **Links**: 友情链接管理，分类标签系统
- **Blog**: 文章博客系统，支持 MDX

### 2. 现代化用户体验
- **Framer Motion**: 流畅的动画效果
- **响应式设计**: 完美适配各种设备
- **暗黑模式**: 自动切换主题模式
- **搜索功能**: Algolia 全站搜索

### 3. 微信生态集成
- **分享功能**: 微信分享卡片自定义
- **JSAPI Ticket**: 自动更新和管理
- **Python 脚本**: 自动化 ticket 更新

### 4. 开发者友好
- **TypeScript**: 完整的类型安全
- **模块化**: 清晰的代码结构
- **热重载**: 开发时实时预览
- **GitHub Actions**: 自动化 CI/CD

## 📝 最新更新

- **2025-08-08**: 完善主题文档系统
- **2025-08-01**: 完成动态分类系统重构  
- **2025-08-01**: 新增 Infima 卡片样式支持
- **2025-07-30**: 集成微信 JSAPI 自动更新
- **2025-07-28**: 添加 Waline 评论系统
- **2025-07-27**: 项目初始化和基础架构搭建

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看项目根目录下的 LICENSE 文件了解详情。

## 📧 联系方式

- **项目地址**: [https://github.com/RichardMiku/ricmoe-docusaurus](https://github.com/RichardMiku/ricmoe-docusaurus)
- **演示站点**: [https://www.ric.moe](https://www.ric.moe)
- **作者**: RichardMiku

---

💝 感谢使用 RicMoe 主题！如果觉得不错，请给个 ⭐️ 支持一下吧~
- **2025-08-01**: 优化按钮事件处理机制

## 🤝 贡献指南

如果你发现文档有任何问题或希望添加新的内容，欢迎：

1. 提交 Issue 报告问题
2. 提交 Pull Request 改进文档
3. 在 Discussions 中分享使用经验

---

*最后更新时间: 2025年8月1日*
