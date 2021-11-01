# Gatsby-remark-shiki

[![npm](https://badgen.net/npm/v/@enpitsulin/gatsby-remark-shiki)](https://www.npmjs.com/package/@enpitsulin/gatsby-remark-shiki)

**WIP**

A syntax highlighting plugin for [Gatsby](https://www.gatsbyjs.org/) that uses [shiki](https://github.com/shikijs/shiki)

# Getting started

Install the package

```shell
npm install @enpitsulin/gatsby-remark-shiki
// or use yarn
yarn add @enpitsulin/gatsby-remark-shiki
```

Add to your `gatsby-config.ts`

```javascript
{
  // ...
  plugins:[
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `@enpitsulin/gatsby-remark-shiki`,
        }
      ]
    }
  ]
}
```

Then you can write code in your markdown file like this:

````
```javascript
function funName() {
  console.log("this is a code snippet");
}
```
````

# Options

You can configuration the plugin option

# Multi Theme Support

You can change code highlight style by change theme option.

```javascript
{
  theme: "nord";
}
```

You can preview some of these themes on [https://vscodethemes.com/](https://vscodethemes.com/)

## Theming with theme file

To Do

## Theming with CSS variables

First change theme option to `css-variables`,than create css which define these CSS variables file and require it in your `gatsby-browser.js`, e.g.

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
require("path/to/shiki-variables.css");
```

# Language Alias

This lets you set up language aliases. For example, settings below will let you use the language `superscript` which will highlight using the bash highlighter

```javascript
{
  aliases: {
    superscript: "javascript";
  }
}
```

# Todo

- [ ] Plugin Options
  - [x] Multi-theme support
  - [x] Use shiki theme `css-variables` to custom theme
- [ ] Render LaTeX
- [ ] Display line numbers
- [ ] Diff highlighting
- [ ] Code copy
- [ ] Maybe more...

# Options

> To do

# Contributing

> To do

# License

MIT © [enpitsuLin](https://github.com/enpitsuLin)
