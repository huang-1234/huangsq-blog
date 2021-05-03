// 配置
const config = {
  base: '/',
  dest: 'dist',
  title: 'hsq',
  description: '往前端架构、向全栈开发',
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
    // repo: 'https://github.com/huang-1234',
    // 自定义仓库链接文字。
    // repoLabel: 'GitHub',
    nav: [
      {
        text: '前端',
        ariaLabel: 'webDesign',
        items: [
          { text: 'JS', link: '/JS/' },
          { text: 'HTML', link: '/HTML/' },
          { text: 'Styles', link: '/Styles/' },
          {
            text: 'Browser',
            items: [
              {text:'BrModel(MP)',link:'/BrowserCore/'},
              {text:'RenderPr(MT)',link:'/BrowserModel/'}
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
        text: '后端',
        ariaLabel: 'webDesign',
        items: [
          {
            text: 'Nodejs',
            items: [
              {text:'NodeBase',link:'/Node/'}
            ]
          },
          {
            text:'cPlus',
            items:[
              {text:'C++',link:'/Cplus/'}
            ]
          }
        ]
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
              {text:'Git&webpack',link:'/Tools/'}
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
      '/JS/': getJS(),
      '/HTML/': getHTML(),
      '/Styles/': getStyles(),
      '/BrowserCore/': getBrowserCore(),
      '/BrowserModel/': getBrowserModel(),
      '/React/': getReact(),
      // '/ReactExtends/':getReactExtends(),
      '/Vue/': getVue(),
      //Node
      '/Node/':getNode(),
      // c++
      '/Cplus/':getCplus(),
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
        'es/aVarLetConst',
        'es/bContext',
        'es/bThis',
        'es/dString',
        'es/dArray',
        'es/dSet',
        'es/cObject',
        'es/cClassExtend',
        'es/eRegExp',
        'es/eDate',
        'es/gModules',
        'es/gFunction',

        'es/icall&apply&bind',
        'es/iPrototype__proto__',
        'es/instanceof&typeof',
        
        'es/jClone',

        'es/kPromiseA+',

        

        'es/zNewByme',

        // 'es/LongPromise',
      ]
    },
    {
      title: 'DOM',
      children: [
        // DOM的四大对象,明天搞完他
        'DOM/Document',
        'DOM/Element',
        'DOM/Attribute',
        'DOM/Event',
        // 总结
        'DOM/zCommonAPI',
        'DOM/operateDOM',
        'DOM/YouYuXi',
      ]
    },
    {
      title: 'BOM',
      children: [
        
      ]
    },
    {
      title: 'npmYarn',
      children: [
        'npmYarn/npmAndYarn',
      ]
    },
    {
      title: 'V8',
      children: [
        'V8/V8memory'
      ]
    },
    {
      title: 'selfFunc',
      children: [
        // 'selfFunction/jsObjectBaseOnPrototype'
      ]
    }
  ]
}
function getHTML() {
  return [
    {
      title: 'HTMLBase',
      children: [
        'HTMLbase/form/input',
        'HTMLbase/form/button'
      ]
    },
    {
      title: 'H5',
      children: [
        'H5/H5introduction',
        'H5/H5new',
        'H5/ReactiveMobile',
        'H5/drag',
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
        'cssBase/cssFirst',
        'cssBase/hidden',
        'cssBase/media',
        'cssBase/litterEx',
        'cssBase/AboutBFC',

      ]
    },
    {
      title: 'CSS布局',
      children: [
        // CSS基础
        'cssLayout/aBox',
        'cssLayout/cStyleCompute',
        'cssLayout/dLayout',
        'cssLayout/Position',
        'cssLayout/Flex',
        'cssLayout/Grid',

        'cssLayout/zCSSsyntax',
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
// BrowserCore主讲：浏览器内核渲染原理，事件机制，安全机制，性能优化，与服务器交互，搜索引擎
function getBrowserCore() {
  return [
    {
      title:'Render原理',
      children: [
        'Render/bRenderEngine',
        'Render/Principle',
      ]
    },
    {
      title: 'Event机制',
      children: [
        'Event/ajsEventLoop',
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

        'HTTP/zLearnHTTP',
      ]
    },
    {
      title: 'BGetData',
      children: [
        'getData/XHR',
        'getData/Fetch',
      ]
    },
    {
      title: 'Secure机制',
      children: [
        'Security/Achieve-Cross-domain',
        'Security/bCSRF',
      ]
    },
    {
      title: 'Browser存储',
      children: [
        'Storage/CookieToWebStorage',
      ]
    },
    {
      title: '性能和优化',
      children: [
        'PerformOptimization/DebounceThrottle',
        'PerformOptimization/SEOfirst',
      ]
    },
  ]
}
// 了解浏览器架构模型和计算机网络底层原理和浏览器工作原理
function getBrowserModel() {
  return [
    {
      title: '了解架构',
      children: [
        'BrowserArch/BrowserArchFirst',
        'BrowserArch/BrowserMultiProcessMultiThread',
      ]
    },
    {
      title: '计网',
      children: [
        'netWork/TCPdiffUDP'
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
        // 'ReactBase/aReactNewLearner',
        // 'ReactBase/bJSX',
        'ReactBase/cHooks',
        'ReactBase/dRouter',
        'ReactBase/eLifeFun',
        // 'ReactBase/yReact-ReduxPersonal',
        
      ]
    },
    {
      title: 'ReactExtends',
      children: [
        'ReactExtends/Fiber/Fiber',
        'ReactExtends/Fiber/Architecture',
        'ReactExtends/Fiber/RenderStage',
        'ReactExtends/Fiber/CommitStage',
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
        'vueBase/aTemplate',
        'vueBase/bComputed',
        'vueBase/cStylesClass',
        'vueBase/dIfRender',
        'vueBase/dVueLife',
        'vueBase/eListRender',
        'vueBase/fEventProcess',
        'vueBase/gFormInputBind',
        'vueBase/hComponent',
        'vueBase/iSlot',
      ]
    },
    {
      title: 'vueExtend',
      children: [
        'vueExtend/Object.DefineProperty'
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
//Node
function getNode() {
  return [
    {
      title: 'NodeBase',
      children: [
        'NodeBase/aFunction',
        'NodeBase/aModules',
        'NodeBase/EventEmitter',
        'NodeBase/File',
        'NodeBase/GlobalObject',
        'NodeBase/utils',
      ]
    },
    {
      title:'NodeExtend',
      children:[
        '/'
      ]
    }
  ]
}
//C++
function getCplus(){
  return [
    {
      title:'CplusBase',
      children:[
        'CplusBase/CplusVSCodeConfig',
        'CplusBase/aRelearnCplus',
        'CplusBase/aDataType',
        'CplusBase/aArray',
        'CplusBase/aPointerReference',
        'CplusBase/bcincout',
        // C++的类
        'CplusBase/bString',
        'CplusBase/bClass',
        'CplusBase/bMath',
        'CplusBase/bDateTime',
        'CplusBase/CplusWeb',
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
        // 'Test/test1/test1'
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
      title: 'Git',
      children: [
        'Git/gitCommand',
        'Git/git',
        'Git/gitCmCmd',
        'Git/error'
      ]
    },
    {
      title: 'Webpack',
      children: [
        'Webpack/WebpackFirst',
        'Webpack/learnWebpack',
        'Webpack/webpack-loader/url-loader'
      ]
    }
  ]
}
// getEchart
function getEchart() {
  return [
    {
      title: '百度Echart',
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

        'InfaExperience/AchieveAPI/AchSet',
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