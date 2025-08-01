# 微信集成文档

这里是微信相关功能的文档集合，包括 JSAPI Ticket 自动更新和微信分享配置。

## 📱 功能概览

### JSAPI Ticket 自动更新
- 自动获取和更新微信 JSAPI Ticket
- GitHub Actions 自动化流程
- 支持多种微信接口调用

### 微信分享配置
- 网页分享到微信功能
- 自定义分享内容和图片
- 支持朋友圈和好友分享

## 📚 文档导航

- [🔑 JSAPI Ticket 自动更新](./jsapi-ticket) - 配置和使用 JSAPI Ticket 自动更新功能
- [📱 微信分享配置](./share-config) - 配置微信分享功能

## 🚀 快速开始

1. **配置 GitHub Secrets**: 设置微信 App ID 和 App Secret
2. **启用自动更新**: GitHub Actions 会每 2 小时自动更新 Ticket
3. **配置分享功能**: 在页面中引入微信分享 JS

## 🔧 相关文件

- `WeChatAccess.py` - Python 脚本，用于获取 JSAPI Ticket
- `static/js-helper/wx-share.js` - 微信分享 JS 文件
- `.github/workflows/update-jsapi-ticket.yml` - GitHub Actions 工作流
- `requirements.txt` - Python 依赖

---

*需要帮助？查看具体的功能文档或提出 Issue。*
