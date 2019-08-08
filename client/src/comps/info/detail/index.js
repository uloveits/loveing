import Taro from '@tarojs/taro';
import { View, Text,RichText } from '@tarojs/components';

import './index.scss'


class KtInfoDetail extends Taro.Component {

  render() {
    let { comp } = this.props;

    return (
      <View class='detail pd20'>
        <View className='bgWhite shadow-lg card'>
          <View className='text-center pd10'>
            <Text className='xl'>{comp.name}</Text>
          </View>
          <View className='text-center'>
            <Text className='sm weak'>{comp.createTime}</Text>
          </View>
          <View className='pd20'>
            <RichText nodes={comp.content} />
          </View>
        </View>
      </View>
    )
  }
}
export default KtInfoDetail
