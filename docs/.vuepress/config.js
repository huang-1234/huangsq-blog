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
            text: 'Browser',
            items: [
              {text:'BrModel(MP)',link:'/BrowserModel/'},
              {text:'RenderPr(MT)',link:'/Browser/'}
            ]
          },
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
        text: '算法&&AI',
        ariaLabel: 'webDesign',
        items: [
          { text: '算法', link: '/AlgorithmAI/' }
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
        text: '工作',
        ariaLabel: 'webDesign',
        items: [
          {text: '面经',link:'/Interface/'}
        ]
      }
    ],
    sidebar: {
      // 前端基础&&浏览器&&框架
      '/CSS/': getCSS(),
      '/JS/': getJS(),
      '/BrowserModel/': getBrowserModel(),
      '/Browser/':getBrowser(),
      '/React/': getReact(),
      // '/ReactExtends/':getReactExtends(),
      '/Vue/': getVueBase(),
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
 function getCSS() {
  return [
    {
      title: 'CSS基础',
      children: [
        // CSS基础
        'aBox',
        'cStyleCompute',
        'dLayout',
        'Flex',
        'Grid',
        // CSS特效
        'cssCartoon/rotate',
        'zCSSsyntax',
      ]
    },
    {
      title: 'Sass',
      children: [
        // sass的使用入门
        'Sass/install-node-sass',
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
      text: 'React扩展',
      children: [
        
      ]
    }
  ]
}
// Vue基础和扩展
function getVueBase() {
  return [
    {

    }
  ]
}
//算法&&AI&&机器学习&&数学
function getAlgorithm() {
  return [
    {
      title: 'Algorithm',
      children: [
        'DP/DP'
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
        'Innovative/Second-handBooks'
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