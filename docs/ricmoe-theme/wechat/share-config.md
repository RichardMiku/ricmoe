# 📱 微信分享配置

配置和使用微信网页分享功能，让用户可以轻松分享页面到微信朋友圈和好友。

## 🎯 功能特性

- **自动分享信息**: 自动提取页面标题和描述
- **自定义分享图片**: 使用站点 Logo 作为分享封面
- **双重分享支持**: 支持分享到朋友圈和好友
- **实时 URL**: 自动获取当前页面 URL

## 🔧 配置说明

### 1. JSAPI Ticket 配置

微信分享功能依赖 JSAPI Ticket，请确保已经配置好 [JSAPI Ticket 自动更新](./jsapi-ticket)。

### 2. 分享 JS 文件

分享功能通过 `static/js-helper/wx-share.js` 实现：

```javascript
// 核心配置参数
var jsapi_ticket = 'YOUR_JSAPI_TICKET'; // 从自动更新获取
var share_url = window.location.href.split('#')[0];

var config_data = {
    debug: false,
    appId: 'YOUR_WECHAT_APP_ID',
    timestamp: createTimestamp(),
    nonceStr: createNonceStr(),
    signature: '',
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
};
```

### 3. 分享内容配置

```javascript
// 分享数据配置
wx.ready(function() {
    var shareData = {
        title: share_title,        // 页面标题
        desc: share_description,   // 页面描述
        link: window.location.href.split('#')[0], // 分享链接
        imgUrl: 'https://www.ric.moe/img/logo.png' // 分享图片
    };
    
    // 配置朋友圈分享
    wx.updateTimelineShareData(shareData);
    // 配置好友分享
    wx.updateAppMessageShareData(shareData);
});
```

## 📝 配置步骤

### 步骤 1: 获取微信公众号信息

1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 获取 `AppID` 和 `AppSecret`
3. 在 "设置与开发" > "接口权限" 中获取权限

### 步骤 2: 配置 GitHub Secrets

在 GitHub 仓库设置中添加以下 Secrets：

- `WECHAT_APP_ID`: 微信公众号 AppID
- `WECHAT_APP_SECRET`: 微信公众号 AppSecret

### 步骤 3: 配置域名白名单

在微信公众平台中：

1. 进入 "设置与开发" > "公众号设置" > "功能设置"
2. 在 "JS接口安全域名" 中添加你的域名
3. 下载验证文件并上传到网站根目录

### 步骤 4: 引入分享 JS

在需要分享功能的页面中引入：

```html
<!-- 微信 JS-SDK -->
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<!-- 签名工具 -->
<script src="/js-helper/sha1.min.js"></script>
<script src="/js-helper/pure-sign.js"></script>
<!-- 分享配置 -->
<script src="/js-helper/wx-share.js"></script>
```

## 🎨 自定义配置

### 自定义分享图片

修改 `wx-share.js` 中的 `imgUrl` 参数：

```javascript
var shareData = {
    title: share_title,
    desc: share_description,
    link: window.location.href.split('#')[0],
    imgUrl: 'https://your-domain.com/custom-share-image.png' // 自定义图片
};
```

### 自定义分享内容

```javascript
// 动态设置分享标题
const custom_title = document.querySelector('meta[property="og:title"]')?.content || document.title;

// 动态设置分享描述
const custom_desc = document.querySelector('meta[property="og:description"]')?.content || 
                   document.querySelector('meta[name="description"]')?.content;

var shareData = {
    title: custom_title,
    desc: custom_desc,
    link: window.location.href.split('#')[0],
    imgUrl: 'https://www.ric.moe/img/logo.png'
};
```

## 🐛 故障排除

### 常见问题

**1. 分享无效果**
- 检查域名是否在微信白名单中
- 确认 JSAPI Ticket 是否有效
- 查看浏览器控制台错误信息

**2. 签名错误**
- 检查 AppID 和 AppSecret 是否正确
- 确认时间戳和随机字符串生成正确
- 验证签名算法实现

**3. 分享内容不正确**
- 检查页面 meta 标签设置
- 确认分享图片 URL 可访问
- 验证分享链接格式

### 调试模式

启用调试模式查看详细信息：

```javascript
var config_data = {
    debug: true, // 开启调试模式
    // ... 其他配置
};
```

## 🔗 相关文件

- `static/js-helper/wx-share.js` - 微信分享主配置文件
- `static/js-helper/pure-sign.js` - 签名生成工具
- `static/js-helper/sha1.min.js` - SHA1 加密库
- `WeChatAccess.py` - JSAPI Ticket 获取脚本
- `.github/workflows/update-jsapi-ticket.yml` - 自动更新工作流

## 📚 参考资料

- [微信 JS-SDK 官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
- [JSAPI Ticket 获取文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62)
- [分享接口调用说明](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#111)

---

*需要帮助？查看 [JSAPI Ticket 自动更新](./jsapi-ticket) 或提出 Issue。*
