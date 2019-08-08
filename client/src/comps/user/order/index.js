import Taro from '@tarojs/taro';
import { View,Text } from '@tarojs/components'
import { AtDivider,AtIcon,AtBadge } from 'taro-ui'
import './index.scss';
import {routeToOrderList} from "../../../utils/route";



class KtOrderBar extends Taro.Component {


  routeToOrderList =(idx) => {
    console.log(idx)
    routeToOrderList({idx:idx})
  }
  render() {
    const { comp } = this.props;

    return (
      <View className='order bgWhite'>
        {/*我的订单*/}
        <View className='at-row'>
          <View className='at-col-6'>
            <View className='pd20'>
              <Text className='iconfont icon-my-order major middle' />
              <Text className='xl pl10 font-weight'>{comp.title.name}</Text>
            </View>
          </View>
          <View className='at-col-6'>
            <View className='pd20 text-right' onClick={this.routeToOrderList.bind(this,0)}>
              <Text className='sm muted '>{comp.title.action}</Text>
              <AtIcon value='chevron-right' size='20' color='#A3A3A3' />
            </View>
          </View>
        </View>
        {/*分隔符*/}
        <View className='plr20'>
          <AtDivider height='6' lineColor='#EDEDED' />
        </View>
        {/*订单内容*/}
        <View>
          <View className='at-row at-row--wrap'>
            {
              comp.content.map((item,idx)=>(
                <View className='at-col-3' key={idx}>
                  <View className='pd20 text-center' onClick={this.routeToOrderList.bind(this,idx+1)}>
                    <AtBadge value={item.badge} maxValue={999}>
                      <View className={`iconfont icon-${item.icon} badge-img primary`} />
                    </AtBadge>
                    <View>
                      <Text className='sm'>{item.name}</Text>
                    </View>
                  </View>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}
export default KtOrderBar

