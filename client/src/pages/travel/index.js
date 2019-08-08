import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'

import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('auth')
@observer
export default class TravelPage extends Component {

  config = {
    navigationBarTitleText: '旅游足迹',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  }

  constructor() {
    super(arguments);

    this.state = {


    }
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentDidShow () {

  }

  //下拉刷新
  onPullDownRefresh() {

    Taro.stopPullDownRefresh();
  }




  render () {
    const { option } = this.state;

    return (
      <View>
        <KtEchart option={option} />
      </View>
    )
  }
}
