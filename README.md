# H5_Open_App

H5手机端网页内打开APP

# 使用协议
Android 使用 Scheme方式跳转app （app://test）
IOS 9 以上使用通用链接（Universal Links）9以下直接跳转下载页
# 打开方式
链接打开方式通过 iframe 打开Scheme 内置定时器判断是否安装
# 支持扩展
支持通过类型跳转app内不同页面（如：app://test/userdetail?id=1）代码封装到jumpObj对象内