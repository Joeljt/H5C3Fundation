### 实体
实体其实就是 HTML 的转义，格式为 &xxx;

常用的特殊字符转义有：
- "  `&quot;` quote
- & `&amp;` ampersand
- < `&lt;` little than
- `>` `&gt;` greater than
- 非换行空格 `&nbsp;` non breaking space

其他实体可以在用到的时候再去查。



### meta 标签

meta 标签用来设置网页的元数据，用来表述其他标签表述不了的数据，比如针对搜索引擎和更新频度的描述和关键词。必须有开始标签而闭合标签可以省略。

> https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta

- 设置字符集

  ```html
  <meta chartset="utf-8" />
  ```

- 设置网站关键字

  ```html
  <meta name="Keywords" content="网上购物,居家,母婴,美妆,个护,食品,生鲜,京东"/>
  ```

- 设置网站简介

  ```html
  <meta name="description" content="京东JD.COM-专业的综合网上购物商城。"/>
  ```

- http-equiv

  可选值有 content-security-policy、content-type、default-style、x-ua-compatible、refresh，以下为设置为 refresh 的配置：

  - 如果 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content) 只包含一个正整数，则为重新载入页面的时间间隔(秒)；
  - 如果 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta#attr-content) 包含一个正整数，并且后面跟着字符串 '`;url=`' 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)

  ```html
  <!-- Redirect page after 3 seconds -->
  <meta http-equiv="refresh" content="3;url=https://www.mozilla.org">
  ```

  
