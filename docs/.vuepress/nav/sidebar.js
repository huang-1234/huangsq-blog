const sidebar = {
  // 前端基础&&浏览器&&框架
  '/JS/': getJS(),
  '/HTML/': getHTML(),
  '/Styles/': getStyles(),
  '/TS/': getTS(),
  // 浏览器
  '/BrowserCore/': getBrowserCore(),
  '/BrowserModel/': getBrowserModel(),
  // Web
  '/WebAPI/': getWebAPI(),
  // '/WebStandard/': getWebStandard(),
  // 前端三大框架和js库
  '/JQuery/': getJQuery(),
  '/Angular/': getAngular(),
  '/React/': getReact(),
  '/Vue/': getVue(),
  //以Node为代表的后端
  '/BE/': getNode(),
  '/Cplus/': getCplus(),
  '/Go/': getGo(),


  //算法&&数学&&机器学习&&人工智能
  '/AlgorithmAI/': getAlgorithm(),
  // '/AlgorithmAI/Math/': getMath(),
  // '/AlgorithmAI/MachineLearning/':getMachineLearning(),
  // 项目方面
  '/Project/': getProject(),
  '/Echart/': getEchart(),
  '/Tools/': getTools(),
  '/OtherOlogy/': getOtherOlogy(),
  // 工作和面试经历
  '/Interface/': getInterface(),
  // 计算机基础
  '/csBase/': getCSBase(),
}
module.exports = {
  sidebar: sidebar,
}
//一些函数
//返回JS的笔记标题
function getJS() {
  return [
    {
      title: 'ES',
      children: [
        // es基础
        'es/aJSType',
        'es/aOperations',
        'es/aScope',
        'es/bContext',
        'es/bThis',
        // es对象
        'es/cObject',
        'es/cClassExtend',
        'es/cString',
        'es/cArray',

        //es内置对象
        'es/dRegExp',
        'es/dDate',
        'es/dMath',

        //es新增数据结构
        'es/es6Struct',

        //JSON

        //
        'es/gModules',
        'es/gFunction',

        // 原型链相关
        'es/icall&apply&bind',
        'es/iprototype',
        'es/instanceof&typeof',
        'es/iNewByme',

        // 手写相关
        'es/xClone',
        'es/xPromiseA+',
        'es/xasyncAwait',



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
        'BOM/BOM',
        'BOM/window',
        'BOM/history',
        'BOM/location',
        'BOM/attribute',
      ]
    },
    {
      title: 'package',
      children: [
        'package/npmAndYarn',
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
    },
    {
      title: 'BrowserEnv',
      children: [
        'BrowserEnv/setTimeoutThis'
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
        'H5/H5semantization',
      ]
    }
  ]
}
// CSS学习的笔记
function getStyles() {
  return [
    {
      title: 'StylesBase',
      children: [
        'cssBase/cssFirst',
        'cssBase/hidden',
        'cssBase/media',
        'cssBase/litterEx',
        'cssBase/AboutBFC',

      ]
    },
    {
      title: 'cssLayout',
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
        'Sass/sass_first_ruanyf',
        'Sass/install_node_sass',
        'Sass/zSassLess',
      ]
    },
    {
      title: 'cssAnimation',
      children: [
        // CSS特效
        'cssCartoon/rotate',
      ]
    }
  ]
}

function getTS() {
  return [
    {
      title: 'tsBase',
      children: [
        'tsBase/basic',
        'tsBase/tuple',
        'tsBase/tsconfig',
      ]
    },
    {
      title: 'type',
      children: [
        'type/enum',
        'type/IntersectionUnion',
      ]
    },
    {
      title: 'tsComponents',
      children: [
        'tsCom/ts_react_components',
      ]
    },
    {
      title: 'advanced',
      children: [
        'advanced/decorator'
      ]
    },
    {
      title: 'error',
      children: [
        'error/tsconfig',
        'error/tsconfig',
      ]
    }
  ]
}
// BrowserCore主讲：浏览器内核渲染原理，事件机制，安全机制，性能优化，与服务器交互，搜索引擎
function getBrowserCore() {
  return [
    {
      title: 'RenderPrinciple',
      children: [
        'Render/bRenderEngine',
        'Render/Principle',
      ]
    },
    {
      title: 'Event机制',
      children: [
        'Event/ajsEventLoopINmd',
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
        'Security/jsonp',
        'Security/meituanCSRF',
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
      title: 'understandArch',
      children: [
        'BrowserArch/BrowserArchFirst',
        'BrowserArch/BrowserMultiProcessMultiThread',
      ]
    },
    {
      title: 'netComputer',
      children: [
        'netWork/TCPdiffUDP',
        'netWork/uniCode'
      ]
    }
  ]
}
function getWebAPI() {
  return [
    {
      title: 'WebAPI',
      children: [
        'Node/Node',
        'Worker/postMessage',
      ]
    }
  ]
}
// function getWebStandard() {
//   return [
//     {
//       title: 'getWebStandard',
//       children: [

//       ]
//     }
//   ]
// }

function getJQuery() {
  return [
    {
      titie: 'JQueryBase',
      children: [

      ]
    }
  ]
}
function getAngular() {
  return [
    {
      title: 'AngularBase',
      children: [

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
      title: 'react-api',
      children: [
        'reactApi/react.Component',
        'reactApi/aboutHooks',
        'reactApi/useHooks',
        'reactApi/tool',
      ]
    },
    {
      title: 'reactExtends',
      children: [
        'ReactExtends/Fiber/Fiber',
        'ReactExtends/Fiber/Architecture',
        'ReactExtends/Fiber/RenderStage',
        'ReactExtends/Fiber/CommitStage',
      ]
    },
  ]
}
// Vue基础和扩展
function getVue() {
  return [
    {
      title: 'VueBase',
      children: [
        // 'vueBase/aTemplate',
        // 'vueBase/bComputed',
        // 'vueBase/cStylesClass',
        // 'vueBase/dIfRender',
        'vueBase/dVueLife',
        // 'vueBase/eListRender',
        // 'vueBase/fEventProcess',
        // 'vueBase/gFormInputBind',
        // 'vueBase/hComponent',
        // 'vueBase/iSlot',
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
        'NodeBase/node-first',
        'NodeBase/GlobalObject',
        'NodeBase/Buffer',
      ]
    },
    {
      title: 'NodeExtend',
      children: [
        '/'
      ]
    }
  ]
}
//C++
function getCplus() {
  return [
    {
      title: 'cLanguage',
      children: [
        'cLanguage/c_stdlib',
        'cLanguage/c_func',
        'cLanguage/c_tranchar',
      ]
    },
    {
      title: 'CplusBase',
      children: [
        'CplusBase/CplusVSCodeConfig',
        'CplusBase/aRelearnCplus',
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
// Go语言
function getGo() {
  return [
    {
      title: 'GoBase',
      children: [
        'goBase/1basic',
        'goBase/2var',
        'goBase/3vassel',
        'goBase/4func',
      ]
    }
  ]
}

//====================================================================
//算法&&AI&&机器学习&&数学
function getAlgorithm() {
  return [
    {
      title: 'Algorithm',
      children: [
        'leetcode/findLongth',
        'leetcode/double_pointer',
      ]
    },
    {
      title: 'MathBase',
      children: [
        'Math/aCalculus', // 微积分
        'Math/bLinearAlgebra', // 线性代数
        'Math/cProbabilityTheory', // 概率论
      ]
    },
    {
      title: 'MachineLearning',
      children: [
      ]
    },
    {
      title: 'Python',
      children: [
        'Python/lib/eveny_lib',
        'Python/lib/numpy/numpy_methods',
        'Python/lib/numpy/numpyMachine',

        'Python/py_package/pip',
        'Python/py_package/conda.config',
      ]
    },
    {
      title: 'AI',
      children: [

      ]
    }
  ]
}


//各种项目方面，以及目前前端写项目需要用到的集成框架和工具
function getProject() {
  return [
    {
      title: 'underTaking',
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
        'Git/gitCmCmd',
        'Git/commands_scene',
        'Git/error',

        'Git/GitHub',
      ]
    },
    {
      title: 'learn git',
      children: [
        'Git/learn/base',
        'Git/learn/branch',
        'Git/learn/merge',
        'Git/learn/push',
        'Git/learn/mutilBranchProject',
        'Git/learn/log',
        'Git/learn/summarize',
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
      title: 'Echart',
      children: [
        'aDataV'
      ]
    }
  ]
}
//other-ology
function getOtherOlogy() {
  return [
    {
      title: 'eng-words',
      children: [
        'english/yangliang',
        'english/shiwan-word-etymology',
        // 'english/',
        // 'english/',
      ]
    },
    {
      title: 'economics',
      children: [
        'economics/wealth-nations',
      ]
    },
    {
      title: 'literature&history',
      children: [
        'literature&history/lunyu',
        'literature&history/TangPoemSongja',
      ]
    },
  ]
}

// 工作导航栏部分
function getInterface() {
  return [
    {
      title: 'KnowInFace',
      children: [
        'InfaExperience/Browser/BrowserWebkitHowToRender',
        'InfaExperience/Browser/JSMacrotasksAndGUIThreads',

        'InfaExperience/CSS/Important',

        'InfaExperience/AchieveAPI/AchSet',
      ]
    },
    {
      title: 'otherInterface',
      children: [
        // 'Others/Baidu',
        // 'Others/ByteDance'
      ]
    },
    {
      title: 'feOfKnowArch',
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
// 计算机基础
function getCSBase() {
  return [
    {
      title: 'os',
      children: [
        'os/memoryManagement/VirtualMemory',
        'os/memoryManagement/memoryLeak',
        'os/process/IPC',
      ]
    },
    {
      title: 'network',
      children: [
        'network/introduction',
        'network/tcpudp',
      ]
    },
    {
      title: 'csCompose',
      children: [
        'computeCompose/someQuestion',
        'computeCompose/8086AssemblyInstrutionCheatsheet',
        'computeCompose/io&interrupt',
        'computeCompose/commomDigitInterface',
      ]
    },
    {
      title: 'linux',
      children: [
        'linux/createFlieOrDir',
        'linux/sync',
      ]
    },
    {
      title: 'complier',
      children: [
        'complier/phrasesAndHandles',
        'complier/semanticAnalysis',
        'complier/syntaxAlex',
        'complier/LR',
      ]
    },
    {
      title: 'logic',
      children: [
        'logic/xor&and&or',
      ]
    },
  ]
}