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

Then you can write code in your mark down file like this:

> ```javascript
> function funName() {
>   console.log("this is a code snippet");
> }
> ```

# Todo

- [ ] Plugin Options
  - [ ] Multi-theme support
  - [ ] Use shiki theme `css-variables` to custom theme
  - [ ] ...
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
