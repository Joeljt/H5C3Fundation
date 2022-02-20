### 请求报文
行       POST /s?wd=输入的搜索内容 HTTP/1.1
头       Host: baidu.com
        Cookie: name=guigu
        Content-type: application/x-www-form-urlencoded
        User-Agent: Chrome 83
空行
体       username=admin&password=admin

### 响应报文
行       HTTP/1.1 200 OK
头       Content-type: text/html;charset=utf-8
         Content-length: 2048
        Content-encoding: gzip
空行
体       返回内容
