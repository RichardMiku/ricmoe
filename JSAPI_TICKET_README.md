# 微信JSAPI Ticket自动更新

## 功能说明

本项目包含一个自动化脚本，用于定期更新微信分享功能所需的JSAPI Ticket。

## 文件说明

- `WeChatAccess.py`: 主要脚本，用于获取微信JSAPI Ticket并更新`wx-share.js`文件
- `.github/workflows/update-jsapi-ticket.yml`: GitHub Action工作流，每2小时自动执行一次
- `requirements.txt`: Python依赖包列表

## 配置步骤

### 1. 设置GitHub Secrets

在GitHub仓库的Settings > Secrets and variables > Actions中添加以下secrets:

- `WECHAT_APP_ID`: 你的微信公众号/小程序的AppID
- `WECHAT_APP_SECRET`: 你的微信公众号/小程序的AppSecret

### 2. 工作流说明

GitHub Action会：
1. 每2小时自动运行一次（也可以手动触发）
2. 使用Python脚本获取最新的JSAPI Ticket
3. 更新`static/js-helper/wx-share.js`文件中的ticket值
4. 如果有变化，自动提交到仓库

### 3. 手动运行

你也可以在GitHub仓库的Actions页面手动触发工作流。

## 注意事项

- JSAPI Ticket的有效期为7200秒（2小时），所以设置每2小时更新一次
- 确保你的微信应用已经配置了正确的域名白名单
- GitHub Action使用UTC时间，请根据需要调整执行时间

## 故障排除

如果遇到问题，可以在GitHub Actions的运行日志中查看详细信息。常见问题：

1. **获取token失败**: 检查AppID和AppSecret是否正确
2. **文件更新失败**: 检查文件路径是否正确
3. **提交失败**: 检查GitHub Action的权限设置
