import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

class KtSeparator extends Taro.Component {

  render() {
    const { comp } = this.props;

    const defaultProps = {
      height: '10px',
      backgroundColor: '#ECECEC'
    }
    function use(target, prop, val) {
      if (target && target[prop]) {
        return target[prop]
      }
      return val
    }

    const height = use(comp, 'height', defaultProps.height)
    const color = use(comp, 'backgroundColor', defaultProps.backgroundColor)

    return (
      <View className='index' style={`height: ${height}; background-color: ${color}`} />
    )
  }
}
export default KtSeparator

