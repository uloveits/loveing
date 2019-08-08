import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import { inject, observer } from "@tarojs/mobx"
import './index.scss';
import {routeToRecharge} from "../../../utils/route";


@inject('auth')
@observer
class KtWalletbar extends Taro.Component {


  routeToRecharge = () => {
    routeToRecharge();
  };

  render() {

    const {comp} = this.props;

    return (
      <View className='wallet bgWhite'>
        <View className='pd20 '>
          <View className='at-row'>
            <View className='at-col-8'>
              <Text className='iconfont icon-my-wallet middle major' />
              <Text className='lg pl20'>账户余额：</Text>
              <Text className='lg major'>{comp}</Text>
            </View>
            <View className='at-col-4 text-right' onClick={this.routeToRecharge.bind(this)}>
              <Text className='sm muted'>充值</Text>
              <AtIcon value='chevron-right' size='22' color='#A3A3A3' />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default KtWalletbar


