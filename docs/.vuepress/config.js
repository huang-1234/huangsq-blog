// 配置
const config = {
  base: '/',
  dest: 'dist',
  title: 'hsq',
  description: '前端人',
  head:[
		['link',{rel:'icon',href:'/favicon.ico'}]
	],
  themeConfig: {
    // 当前 locale 的 algolia docsearch 选项
    editLinks: false,
    docsDir: 'docs',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    //GitHub仓库，请正确填写
    repo: 'https://github.com/huang-1234',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    nav: [
      {
        text: '前端',
        ariaLabel: 'webDesign',
        items: [
          { text: 'CSS', link: '/CSS/' },
          { text: 'JS', link: '/JS/' },
          {
            text: 'React',
            items: [
              { text: 'React基础', link: '/React/' },
            ]
          },
          {
            text: 'Vue',
            items: [
              {text:'Vue基础',link:'/Vue/'}
            ]
          }
        ],
      },
      {
        text: 'Algorithm',
        ariaLabel: 'webDesign',
        items: [
          {text:'Algorithm',link:'/Algorithm/'}
        ]
      },
      {
        text: '项目相关',
        ariaLabel: 'webDesign',
        items: [
          { text: '项目', link: '/Project/' },
          {
            text: '项目工具',
            items: [
              {text:'Git工具',link:'/Tools/'}
            ],
          }
        ]
      }
    ],
    sidebar: {
      '/CSS/': getCSS(),
      '/JS/': getJS(),
      '/React/': getReact(),
      // '/ReactExtends/':getReactExtends(),
      '/Vue/':getVueBase(),
      '/Algorithm/': getAlgorithm(),
      '/Project/': getProject(),
      '/Tools/':getTools(),
    }
  }
}

//一些函数
//返回JS的笔记标题
 function getJS() {
  return [
    {
      title: 'JS',
      children: [
        'es/aJSType',
        'es/bVarLetConst',
        'es/cString',
        'es/dArray',
        'es/eObject',
        'es/fRegExp',
        'es/gModules',
        'es/LongPromise'
      ]
    },
    {
      title: 'BOM',
      children: [
        
      ]
    },
    {
      title: '浏览器',
      children: [
        'Browser/ajsEventLoop',
        'Browser/bRenderEngine'
      ]
    },
    {
      title: 'Node',
      children: [
        'Node/npm/npmAndYarn',
      ]
    }

  ]
}

 function getCSS() {
  return [
    {
      title: 'CSS基础',
      children: [
        'CSSsyntax',
        'aBox',
        'dLayout',
        'cssCartoon/rotate',
      ]
    },
    {
      title: 'Sass',
      children: [
        'Sass/install-node-sass',
      ]
    }
  ]
}
//getReact
 function getReact() {
  return [
    {
      title: 'React基础',
      children: [
        'ReactBase/aReactNewLearner',
        'ReactBase/bJSX',
        'ReactBase/cStateHooks',
        'ReactBase/dRouter',
        'ReactBase/zReactPhilosophy',
      ]
    },
    {
      title: 'React进阶',
      children: [
        '/'
      ]
    }
  ]
}
function getReactExtends() {
  return [
    {
      
    }
  ]
}
// getVue
function getVueBase() {
  return [
    {

    }
  ]
}
//getAlgorithm
 function getAlgorithm() {
  return [
    {
      title: 'Algorithm',
      children: [
        'DP/DP'
      ]
    }
  ]
}
//getInnovative
 function getProject() {
  return [
    {
      title: '创新创业项目',
      children: [
        'Innovative/Second-handBooks'
      ]
    }
  ]
}
// getTools
function getTools() {
  return [
    {
      title: '前端项目工具',
      chiledren: [
        'Git/git',
        'Git/gitCmCmd',
        'Git/error'
      ]
    }
  ]
}

module.exports = config;