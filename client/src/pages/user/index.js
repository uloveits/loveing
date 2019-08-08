import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import KtUserCard from "../../comps/user/card";
import KtToolBar from "../../comps/user/tool";





class User extends Taro.Component {
  config = {
    navigationBarTitleText: '我的'
  };

  constructor() {
    super(...arguments);
    this.state = {};
  }


  render () {
    const tool = [
      {
        name:'联系客服',
        icon:'customer',
        action:'customer'
      },
      {
        name:'关于应用',
        icon:'replace',
        action:'replace'
      },



    ];
    return (
      <View className='user'>
        <KtUserCard />
        <KtToolBar comp={tool} />

      </View>
    )
  }
}
export default User

