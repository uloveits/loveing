import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

export default class KtLoadMore extends Taro.Component {

  render() {
    const {text,bottomText} = this.props;
    { /*无数据提示*/ }
    const empty = (
      <View className='empty'>
        <Text className='sm muted'>{ text }</Text>
      </View>
    );
    const bottom = (
      <View className='bottom'>
        <Text className='sm muted'>---{ bottomText }---</Text>
      </View>
    );
    return (
      <View>
        {text && empty}
        {bottomText && bottom}
      </View>
    )
  }
}

