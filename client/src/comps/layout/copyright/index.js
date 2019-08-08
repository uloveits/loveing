import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import './index.scss';

export default class KtCopyright extends Taro.Component {


  render() {
    const {comp} = this.props;
    return (
      <View className={`footer ${comp.bottom ? 'footer_fixed-bottom' : ''}`} onClick='tap'>
        <View className='mt10'>
          <View className='footer__link'>网新科技提供技术支持</View>
        </View>
        <View className='mt10'>Copyright © 2019 ibw.csp {comp.version}</View>
      </View>
    )
  }
}

