### 标准 HTML 文档结构

一个标准的 HTML 文档结构由几个部分组成：

- 文档类型声明

  使用 **<>** 声明于文档的顶部，严格意义上讲并不属于 HTML 文档，只是用来告知浏览器当前网页使用的 HTML 规格，一般用 html 指代 html5：

  ```html
  <!DOCTYPE html>
  ```

- html/head/body 标签

  html 作为网页的根标签是必不可少的，其中包含 head 标签与 body 标签，共同组成 HTML 的基本骨架。

  - html

    可以为 html 标签设置语言属性，用来告知浏览器当前网页的语言。比如谷歌浏览器会为目标语言为英文的网页自动弹出翻译选项。

  - head

    head 标签内部的数据主要是提供给浏览器或搜索引擎使用的，比如用 title 标签声明网页的标题、用 meta 标签声明网页的字符集或视口等
  
  - body
  
    网页主体区域

一个基本完整的 HTML 文档骨架示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>This is an English website</title>
  </head>
  <body>
    <h1>
      This is a h1 tag
    </h1>
  </body>
</html>
```



  

