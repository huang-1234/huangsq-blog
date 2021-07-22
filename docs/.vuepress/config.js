// 配置
const { sidebar } = require('./config/sidebar');
const { nav } = require('./config/nav');

const config = {
  base: '/',
  dest: 'dist',
  title: 'H先森',
  // description: '往前端架构、向全栈开发',
  description: 'From FE Arch、To Full Stack',
  theme: 'reco',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    //引用脚本与样式
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
/*     // 引入jquery
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"
    }],
    // 引入鼠标点击脚本
    ["script", {
      "language": "javascript",
      "type": "text/javascript",
      "src": "/JS/MouseClickEffect.js"
    }] */
  ],
  themeConfig: {
    //为reco新增加
    subSidebar: 'auto',
    authorAvatar: '/me.jpg',
    logo: '/me.jpg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    sidebarDepth: 2,
    noFoundPageByTencent: false,
    author: 'huangsq',
    /*     // 博客配置
        blogConfig: {
          category: {
            location: 6,     // 在导航栏菜单中所占的位置，默认2
            text: 'Category' // 默认文案 “分类”
          },
          tag: {
            location: 6,     // 在导航栏菜单中所占的位置，默认3
            text: 'Tag'      // 默认文案 “标签”
          },
          socialLinks: [     // 信息栏展示社交信息
            { icon: 'reco-github', link: 'https://github.com/huang-1234' },
            { icon: 'reco-npm', link: 'https://www.npmjs.com' }
          ]
        }, */
    // 密钥
    // keyPage: {
    //   keys: ['32位的 md5 加密密文'], // 1.3.0 版本后需要设置为密文
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
    // 当前 locale 的 algolia docsearch 选项
    // 原始的config
    editLinks: false,
    docsDir: 'docs',
    // lastUpdated: 'Last Updated',
    smoothScroll: true,
    //GitHub仓库，请正确填写
    // repo: 'https://github.com/huang-1234',
    // 自定义仓库链接文字。
    // repoLabel: 'GitHub',


    // 配置顶部导航栏和侧边导航
    nav,
    sidebar,
  }
}
module.exports = config;
