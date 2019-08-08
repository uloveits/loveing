import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';


class KtDividerVertical extends Taro.Component {

  render() {
    const { color,height } = this.props;
    return (
      <View className='index' style={height && `height:${height}px`}>
        <View className='vertical' style={color && 'background:'+ color} />
      </View>
    )
  }
}
export default KtDividerVertical
