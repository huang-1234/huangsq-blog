// 配置
const config = {
  base: '/',
  dest: 'dist',
  title: 'huangshuiqing',
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
    nav: [
      {
        text: '前端',
        ariaLabel: 'webDesign',
        items: [
          { text: 'CSS', link: '/CSS/' },
          { text: 'JS', link: '/JS/' },
          { text:'React',link:'/React/'}
        ]
      },
      {
        text: 'Algorithm',
        ariaLabel: 'webDesign',
        items: [
          {text:'Algorithm',link:'/Algorithm/'}
        ]
      },
      {
        text: 'Project',
        ariaLabel: 'webDesign',
        items: [
          {text:'Project',link:'/Project/'}
        ]
      }
    ],
    sidebar: {
      '/CSS/': getCSS(),
      '/JS/': getJS(),
      '/React/': getReact(),
      '/Algorithm/': getAlgorithm(),
      '/Project/':getInnovative()
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
          'es/promise',
          'es/Object',
          'es/modules',
          'es/jsType',
          'es/String',
          'es/Array',
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
        'Browser/jsEventLoop',
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
        'box',
        'layout',
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
      title: 'React',
      children: [
        'React/reactPhilosophy'
      ]
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
 function getInnovative() {
  return [
    {
      title: 'Second-handBooks',
      children: [
        'Innovative/Second-handBooks'
      ]
    }
  ]
}


module.exports = config;