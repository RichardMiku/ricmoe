import requests
import os
import re
import sys

def get_access_token():
    appID = os.environ.get('WECHAT_APP_ID')
    appSecret = os.environ.get('WECHAT_APP_SECRET')
    
    if not appID or not appSecret:
        print("错误: 未找到微信应用ID或密钥环境变量")
        sys.exit(1)
    
    # 获取access token的url
    url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={}&secret={}' \
        .format(appID.strip(), appSecret.strip())
    
    try:
        response = requests.get(url, timeout=10).json()
        if 'access_token' not in response:
            print(f"获取access_token失败: {response}")
            sys.exit(1)
        access_token = response.get('access_token')
        print("成功获取access_token")
        return access_token
    except Exception as e:
        print(f"请求access_token时发生错误: {e}")
        sys.exit(1)

def get_jsapi_ticket(access_token):
    # 获取jsapi_ticket的url
    url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={}&type=jsapi' \
        .format(access_token)
    
    try:
        response = requests.get(url, timeout=10).json()
        print(f"jsapi_ticket响应: {response}")
        
        if 'ticket' not in response:
            print(f"获取jsapi_ticket失败: {response}")
            sys.exit(1)
            
        jsapi_ticket = response.get('ticket')
        print("成功获取jsapi_ticket")
        return jsapi_ticket
    except Exception as e:
        print(f"请求jsapi_ticket时发生错误: {e}")
        sys.exit(1)

def update_wx_share_js(jsapi_ticket):
    """更新wx-share.js文件中的jsapi_ticket"""
    wx_share_path = 'static/js-helper/wx-share.js'
    
    try:
        # 读取文件内容
        with open(wx_share_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 使用正则表达式替换jsapi_ticket
        pattern = r"var jsapi_ticket = '[^']*';"
        replacement = f"var jsapi_ticket = '{jsapi_ticket}';"
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content == content:
            print("警告: 未找到要替换的jsapi_ticket行")
            return False
        
        # 写回文件
        with open(wx_share_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"成功更新 {wx_share_path} 中的jsapi_ticket")
        return True
        
    except FileNotFoundError:
        print(f"错误: 未找到文件 {wx_share_path}")
        sys.exit(1)
    except Exception as e:
        print(f"更新文件时发生错误: {e}")
        sys.exit(1)

if __name__ == '__main__':
    print("开始获取微信jsapi_ticket...")
    access_token = get_access_token()
    jsapi_ticket = get_jsapi_ticket(access_token)
    
    if jsapi_ticket:
        print(f"获取到的jsapi_ticket: {jsapi_ticket}")
        update_wx_share_js(jsapi_ticket)
        print("jsapi_ticket更新完成!")
    else:
        print("获取jsapi_ticket失败")
        sys.exit(1)
    