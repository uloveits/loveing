import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import {inject, observer} from "@tarojs/mobx/index";
import broken from '../../../public/imgs/broken.png'

import './index.scss';

@inject('auth','home')
@observer
class KtNavigateBar extends Taro.Component {

  goView = (item,idx) => {
    const { home } = this.props;
    home.setTabBarParam(idx);
    Taro.switchTab({
      url: '/' + item.route
    })
  };

  render() {
    const { comp } = this.props;
    if(!comp)return;
    return (
      <View className='navigateBar bgWhite pd10'>
        <View className='at-row at-row__align--center'>
          {
            comp.data.map((item, idx) => {
              return (
                <View className='at-col-3 text-center' key={idx} >
                  <View className='pd20' onClick={this.goView.bind(this,item,idx)}>
                    <View className='nav'>
                      <View>
                        <Image className='img-icon' mode='widthFix' src={item.url || broken} />
                      </View>
                      <View>
                        <Text className='lg'>{item.title}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
export default KtNavigateBar

