# Encode and Decode Demo
这是一个加密计算器微信小程序，可实现AES、移位密码加密与MD5、SHA1校验。

## 算法实现
* AES、MD5、SHA1代码来源于<https://github.com/brix/crypto-js>

* [移位密码](https://github.com/QQ-777777/wxapp/blob/main/encode-and-decode-demo/utils/caesarcipher.js)使用词频解密，首先获得每个字母的出现概率（来自Algoritmy网站），然后遍历所有可能的结果，根据字母概率计算每个结果的信息熵，信息熵最小的即为解密结果。

## 运行环境
IDE：微信开发者工具

基础调试库版本：2.16.0

## 小程序截图
![主页截图](https://github.com/QQ-777777/wxapp/blob/main/encode-and-decode-demo/imgs/indexPage.jpg "主页")
![内容截图1](https://github.com/QQ-777777/wxapp/blob/main/encode-and-decode-demo/imgs/calculate1.jpg "内容截图1")
![内容截图2](https://github.com/QQ-777777/wxapp/blob/main/encode-and-decode-demo/imgs/calculate2.jpg "内容截图2")
![作者页面截图](https://github.com/QQ-777777/wxapp/blob/main/encode-and-decode-demo/imgs/aboutPage.jpg "作者页面")

