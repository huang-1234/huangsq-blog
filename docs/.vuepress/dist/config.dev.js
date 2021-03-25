"use strict";

// 配置
var config = {
  base: '/',
  dest: 'dist',
  title: 'hsq',
  description: '前端人',
  head: [['link', {
    rel: 'icon',
    href: '/favicon.ico'
  }]],
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
    nav: [{
      text: '前端',
      ariaLabel: 'webDesign',
      items: [{
        text: 'CSS',
        link: '/CSS/'
      }, {
        text: 'JS',
        link: '/JS/'
      }, {
        text: '浏览器相关',
        items: [{
          text: '浏览器',
          link: '/Browser/'
        }]
      }, {
        text: 'React',
        items: [{
          text: 'React基础',
          link: '/React/'
        }]
      }, {
        text: 'Vue',
        items: [{
          text: 'Vue基础',
          link: '/Vue/'
        }]
      }]
    }, {
      text: 'Algorithm',
      ariaLabel: 'webDesign',
      items: [{
        text: 'Algorithm',
        link: '/Algorithm/'
      }]
    }, {
      text: '项目',
      ariaLabel: 'webDesign',
      items: [{
        text: '项目',
        link: '/Project/'
      }, {
        text: '项目工具',
        items: [{
          text: 'Git工具',
          link: '/Tools/'
        }]
      }]
    }, {
      text: '工作',
      ariaLabel: 'webDesign',
      items: [{
        text: '面经',
        link: '/Interface/'
      }]
    }],
    sidebar: {
      '/CSS/': getCSS(),
      '/JS/': getJS(),
      '/Browser/': getBrowser(),
      '/React/': getReact(),
      // '/ReactExtends/':getReactExtends(),
      '/Vue/': getVueBase(),
      '/Algorithm/': getAlgorithm(),
      '/Project/': getProject(),
      '/Echart/': getEchart(),
      '/Tools/': getTools(),
      '/Interface/': getInterface()
    }
  }
}; //一些函数
//返回JS的笔记标题

function getJS() {
  return [{
    title: 'JS',
    children: ['es/aJSType', 'es/bVarLetConst', 'es/cString', 'es/dArray', 'es/eObject', 'es/fRegExp', 'es/gModules', 'es/LongPromise']
  }, {
    title: 'BOM',
    children: []
  }, {
    title: 'Node',
    children: ['Node/npm/npmAndYarn']
  }];
} // CSS学习的笔记


function getCSS() {
  return [{
    title: 'CSS基础',
    children: ['CSSsyntax', 'aBox', 'dLayout', 'cssCartoon/rotate']
  }, {
    title: 'Sass',
    children: ['Sass/install-node-sass']
  }];
} // 浏览器原理和渲染方面的问题


function getBrowser() {
  return [{
    title: '浏览器原理',
    children: ['ajsEventLoop', 'bRenderEngine']
  }, {
    title: 'HTTP',
    children: ['HTTP/aHTTPLife', 'HTTP/bHTTPTCP', 'HTTP/HTTP1', 'HTTP/HTTP2', 'HTTP/HTTPS', 'HTTP/whatHTTP', 'HTTP/httpStorage']
  }];
} //React基础和扩展


function getReact() {
  return [{
    title: 'React基础',
    children: ['ReactBase/aReactNewLearner', 'ReactBase/bJSX', 'ReactBase/cStateHooks', 'ReactBase/dRouter', 'ReactBase/zReactPhilosophy']
  }, {
    title: 'React进阶',
    children: ['/']
  }];
}

function getReactExtends() {
  return [{}];
} // Vue基础和扩展


function getVueBase() {
  return [{}];
} //算法方面


function getAlgorithm() {
  return [{
    title: 'Algorithm',
    children: ['DP/DP']
  }];
} //各种项目方面，以及目前前端写项目需要用到的集成框架和工具


function getProject() {
  return [{
    title: '创新创业项目',
    children: ['Innovative/Second-handBooks']
  }, {
    title: 'Echart',
    children: ['Echart/aDataV']
  }, {
    title: 'Umi',
    children: ['Umi/UmiFirst']
  }];
} // getTools


function getTools() {
  return [{
    title: '前端项目工具',
    children: ['Git/git', 'Git/gitCmCmd', 'Git/error']
  }];
} // getEchart


function getEchart() {
  return [{
    title: '百度数据可视化Echart',
    children: ['aDataV']
  }];
} // 工作导航栏部分


function getInterface() {
  return [{
    title: '面试基础重点',
    children: ['InfaExperience/Browser/BrowserWebkitHowToRender', 'InfaExperience/CSS/Important']
  }, {
    title: '别人面试的经历',
    children: ['Others/Baidu', 'Others/ByteDance']
  }, {
    title: 'me',
    children: []
  }];
}

module.exports = config;