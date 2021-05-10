// 顶部导航栏配置
const nav = [
  {
    text: 'FE',
    ariaLabel: 'webDesign',
    items: [
      { text: 'JS', link: '/JS/' },
      { text: 'HTML', link: '/HTML/' },
      { text: 'Styles', link: '/Styles/' },
      {
        text: 'Browser',
        items: [
          { text: 'BrCore(MP)', link: '/BrowserCore/' },
          { text: 'BrModel(MT)', link: '/BrowserModel/' }
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
          { text: 'VueBase', link: '/Vue/' }
        ]
      }
    ],
  },
  {
    text: 'BE',
    ariaLabel: 'webDesign',
    items: [
      {
        text: 'Nodejs',
        items: [
          { text: 'NodeBase', link: '/Node/' }
        ]
      },
      {
        text: 'cPlus',
        items: [
          { text: 'cPlus', link: '/Cplus/' }
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
    text: 'Proj',
    ariaLabel: 'webDesign',
    items: [
      { text: 'Project', link: '/Project/' },
      {
        text: 'toolsForProject',
        items: [
          { text: 'Git&webpack', link: '/Tools/' }
        ]
      },
      {
        text: 'other-ology',
        items: [
          { text: 'English', link:'/OtherOlogy/'}
        ]
      }

    ]
  },
  {
    text: 'W',
    ariaLabel: 'webDesign',
    items: [
      { text: 'interfaceEx', link: '/Interface/' }
    ]
  }
];

// 
module.exports = {
  nav: nav
};