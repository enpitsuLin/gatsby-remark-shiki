# gatsby-remark-shiki

[![npm](https://badgen.net/npm/v/@enpitsulin/gatsby-remark-shiki)](https://www.npmjs.com/package/@enpitsulin/gatsby-remark-shiki)

将 [Gatsby](https://www.gatsbyjs.org/) 的插件`gatsby-transform-remark`渲染出的的代码块使用[shiki](https://github.com/shikijs/shiki)高亮代码的插件

中文|[English](./README.md)

# 起步

安装`@enpitsulin/gatsby-remark-shiki`包

```shell
npm install @enpitsulin/gatsby-remark-shiki
// or use yarn
yarn add @enpitsulin/gatsby-remark-shiki
```

然后增加配置到你的 `gatsby-config.js`

```javascript
{
  // ...
  plugins:[
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `@enpitsulin/gatsby-remark-shiki`,
      ]
    }
  ]
}
// or
{
  // ...
  plugins:[
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `@enpitsulin/gatsby-remark-shiki`,
          options: {/* here for custom option */}
        }
      ]
    }
  ]
}
```

然后在 markdown 文件中如下标记你代码块的语言

````
```javascript
function funName() {
  console.log("this is a code snippet");
}
```
````

# 选项

可以配置插件选项来更换主题或者顶一个一个语言的别名。

# 多主题支持

可以通过选项来切换一些内置的 shiki 高亮主题，比如

```javascript
{
  theme: "one-dark-pro"; //默认为 'nord';
}
```

可以在[https://vscodethemes.com/](https://vscodethemes.com/)预览其渲染效果

## 使用单独的文件配置主题

To Do

## 使用 css 变量配置主题

首先将主题选项设置为`css-variables`,然后新建一个 css 文件来定义所需的 css 变量，然后将其通过`gatsby-browser.js`引入你的项目,e.g.

```css
/* shiki-variables */
:root {
  --shiki-color-text: #eeeeee;
  --shiki-color-background: #333333;
  --shiki-token-constant: #660000;
  --shiki-token-string: #770000;
  --shiki-token-comment: #880000;
  --shiki-token-keyword: #990000;
  --shiki-token-parameter: #aa0000;
  --shiki-token-function: #bb0000;
  --shiki-token-string-expression: #cc0000;
  --shiki-token-punctuation: #dd0000;
  --shiki-token-link: #ee0000;
}
```

```javascript
// gatsby-browser.js
require("path/to/shiki-variables.css");
```

# 语言别名

可以通过选项配置一个语言的别名，比如如下配置能够让你使用类似`superscript`的方式获得`javascript`的高亮效果

```javascript
{
  aliases: {
    superscript: "javascript";
  }
}
```

# 贡献代码

> To do

# 开源协议

MIT © [enpitsuLin](https://github.com/enpitsuLin)
