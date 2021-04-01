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
          { text: 'JS', link: '/JS/' },
          { text: 'Styles', link: '/Styles/' },
          {
            text: 'Browser',
            items: [
              {text:'BrModel(MP)',link:'/BrowserModel/'},
              {text:'RenderPr(MT)',link:'/Browser/'}
            ]
          },
          {
            text: 'React',
            items: [
              { text: 'ReactBase', link: '/React/' },
            ]
          },
          {
            text: 'Vue',
            items: [
              {text:'VueBase',link:'/Vue/'}
            ]
          }
        ],
      },
      {
        text: 'AI',
        ariaLabel: 'webDesign',
        items: [
          { text: 'AI', link: '/AlgorithmAI/' }
        ]
      },
      {
        text: '项目',
        ariaLabel: 'webDesign',
        items: [
          { text: '项目', link: '/Project/' },
          {
            text: '项目工具',
            items: [
              {text:'Git工具',link:'/Tools/'}
            ]
          }
        ]
      },
      {
        text: 'Works',
        ariaLabel: 'webDesign',
        items: [
          {text: '面经',link:'/Interface/'}
        ]
      }
    ],
    sidebar: {
      // 前端基础&&浏览器&&框架
      '/Styles/': getStyles(),
      '/JS/': getJS(),
      '/BrowserModel/': getBrowserModel(),
      '/Browser/':getBrowser(),
      '/React/': getReact(),
      // '/ReactExtends/':getReactExtends(),
      '/Vue/': getVue(),
      //算法&&数学&&机器学习&&人工智能
      '/AlgorithmAI/': getAlgorithm(),
      // '/AlgorithmAI/Math/': getMath(),
      // '/AlgorithmAI/MachineLearning/':getMachineLearning(),
      // 项目方面
      '/Project/': getProject(),
      '/Echart/':getEchart(),
      '/Tools/': getTools(),
      // 工作和面试经历
      '/Interface/':getInterface(),
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
        // es基础
        'es/aJSType',
        'es/bVarLetConst',
        'es/cString',
        'es/dArray',
        'es/eObject',
        'es/fRegExp',
        'es/gModules',
        'es/ProtoTypeAndproto',

        'es/zNewByme',

        'es/LongPromise',
      ]
    },
    {
      title: 'DOM',
      children: [
        'DOM/operateDOM',
        'DOM/YouYuXi'
      ]
    },
    {
      title: 'BOM',
      children: [
        
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

// CSS学习的笔记
 function getStyles() {
  return [
    {
      title: '样式基础',
      children: [
        // CSS基础
        'CSS/aBox',
        'CSS/cStyleCompute',
        'CSS/dLayout',
        'CSS/Position',
        'CSS/Flex',
        'CSS/Grid',
      
        'CSS/zCSSsyntax',
      ]
    },
    {
      title: 'Less',
      children: [
        'Less/lessFirst',
      ]
    },
    {
      title: 'Sass',
      children: [
        // sass的使用入门
        'Sass/sassFirst',
        'Sass/install-node-sass',
        'Sass/zSassLess',
      ]
    },
    {
      title: 'CSS动画特效',
      children: [
        // CSS特效
        'cssCartoon/rotate',
      ]
    }
  ]
}
// 浏览器模型和渲染方面的问题
function getBrowserModel() {
  return [
    {
      title: '浏览器架构',
      children: [
        'BrowserArch/BrowserArchFirst',
        'BrowserArch/BrowserMultiProcessMultiThread'
        
      ]
    }
  ]
}
function getBrowser() {
  return [
    {
      title:'浏览器原理',
      children: [
        'ajsEventLoop',
        'bRenderEngine'
      ]
    },
    {
      title: 'HTTP',
      children: [
        'HTTP/aHTTPLife',
        'HTTP/bHTTPTCP',
        'HTTP/cHTTPBase',
        'HTTP/HTTP1',
        'HTTP/HTTP2',
        'HTTP/HTTPS',

        'HTTP/httpStorage',

        'HTTP/zLearnHTTP'
      ]
    }
  ]
}
//React基础和扩展
 function getReact() {
  return [
    {
      title: 'ReactBase',
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
      text: 'React扩展',
      children: [
        
      ]
    }
  ]
}
// Vue基础和扩展
function getVue() {
  return [
    {
      title: 'VueBase',
      children: [
        
      ]
    },
    {
      title: 'youyuxi',
      children: [
        'YouYuXi/Vite2.0',
        'YouYuXi/VueAndReact'

      ]
    }
  ]
}
//算法&&AI&&机器学习&&数学
function getAlgorithm() {
  return [
    {
      title: 'Algorithm',
      children: [
        'likou/findLongth'
      ]
    },
    {
      title: '数学基础',
      children: [
        'Math/aCalculus', // 微积分
        'Math/bLinearAlgebra', // 线性代数
        'Math/cProbabilityTheory', // 概率论
      ]
    },
    {
      title: '机器学习',
      children: [
        
      ]
    },
    {
      title: 'Python',
      children: [
        'Python/numpy/Numpy_methods',
        'Python/numpy/numpyMachine'
      ]
    },
    {
      title: 'AI',
      children:[
        
      ]
    }
  ]
}
function getMath() {
  return [
    {
      text: '微积分',
      children: [
        'aCalculus', // 微积分
        'bLinearAlgebra', // 线性代数
        'cProbabilityTheory', // 概率论
      ]
    }
  ]
}
function getMachineLearning() {
  return [
    {
      text: '机器学习',
      children: [
        
      ]
    }
  ]
}
//各种项目方面，以及目前前端写项目需要用到的集成框架和工具
 function getProject() {
  return [
    {
      title: '创新创业项目',
      children: [
        // 'Innovative/Second-handBooks',
        // 'Innovative/xinqiu'
      ]
    },
    {
      title: 'Echart',
      children: [
        'Echart/aDataV'
      ]
    },
    {
      title: 'Umi',
      children: [
        'Umi/UmiFirst'
      ]
    }
  ]
}
// getTools
function getTools() {
  return [
    {
      title: '前端项目工具',
      children: [
        'Git/git',
        'Git/gitCmCmd',
        'Git/error'
      ]
    },
    {
      title: 'Webpack',
      children: [
        'Webpack/WebpackFirst'
      ]
    }
  ]
}
// getEchart
function getEchart() {
  return [
    {
      title: '百度数据可视化Echart',
      children: [
        'aDataV'
      ]
    }
  ]
}

// 工作导航栏部分
function getInterface() {
  return [
    {
      title: '面试基础重点',
      children: [
        'InfaExperience/Browser/BrowserWebkitHowToRender',
        'InfaExperience/Browser/JSMacrotasksAndGUIThreads',

        'InfaExperience/CSS/Important',
      ]
    },
    {
      title: '别人面试的经历',
      children: [
        'Others/Baidu',
        'Others/ByteDance'
      ]
    },
    {
      title: '前端知识架构',
      children: [
        'FrontEknowledgeArch/learnFront'
      ]
    },
    {
      title: 'me',
      children: [
        
      ]
    }
  ]
}

module.exports = config;