import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

import animate from '../../../../public/imgs/svg/audio.svg'

class KtLoading extends Taro.Component {

  render() {
    return (
      <View className='index'>
        <View className='mt350'>
          <View className='text-center'>
            <Image className='loading-icon' src={animate} />
          </View>
          <View className='text-center'>
            <Text className='muted mt20'>加载中</Text>
          </View>
        </View>
      </View>
    )
  }
}
export default KtLoading

