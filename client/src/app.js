import Taro from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'
import store from './store'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Taro.Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/index/auth/index',

      'pages/share/index',

      'pages/remember/index',

      'pages/photo/index',

      'pages/travel/index',

      'pages/mail/index',
      'pages/mail/edit/index',
      'pages/mail/detail/index',

      'pages/todo/index',
      'pages/todo/detail/index',

      'pages/dialog/index',

      'pages/user/index',

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ececec',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
      },
    tabBar: {
      color: '#CD919E',
      selectedColor: '#F44444',
      borderStyle: 'white',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'public/imgs/tab/tab1.png',
          selectedIconPath: 'public/imgs/tab/tab1-active.png',
          text: '恋爱ing'
        },
        {
          pagePath: 'pages/dialog/index',
          iconPath: 'public/imgs/tab/tab2.png',
          selectedIconPath: 'public/imgs/tab/tab2-active.png',
          text: '对话'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'public/imgs/tab/tab3.png',
          selectedIconPath: 'public/imgs/tab/tab3-active.png',
          text: '我们'
        }
      ]
    },
    cloud: true
  }

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
