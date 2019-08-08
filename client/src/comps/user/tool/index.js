import Taro from '@tarojs/taro';
import { View, Text,Button } from '@tarojs/components';
import { AtIcon, AtDivider } from 'taro-ui'

import './index.scss';

import { routeToCollect} from "../../../utils/route";


class KtToolBar extends Taro.Component {

  constructor() {
    super(...arguments);
    this.state = {

    };
  }
  //工具点击事件
  action = (action) =>{
    console.log('工具点击事件');
    console.log(action);
    const fnc = this[action].bind(this);
    fnc();
  };

  //我的收藏
  collect = () => {
    routeToCollect();
  };

  customer = () => {
    console.log('联系客服中~')
  };

  render() {
    const {comp} = this.props;
    if(!comp) return;

    return (
      <View className='toolBar bgWhite'>
        {/*工具的具体内容*/}
        {
          comp.map((item,idx)=>(
            <View key={idx}>
              <View className='pd20 ' onClick={this.action.bind(this,item.action)} >
                {
                  item.action !== 'customer' &&
                  <View className='at-row'>
                    <View className='at-col-8'>
                      <Text className={`iconfont icon-${item.icon} middle major`} />
                      <Text className='lg pl20'>{item.name}</Text>
                    </View>
                    <View className='at-col-4 text-right'>
                      <AtIcon value='chevron-right' size='22' color='#7E6452' />
                    </View>
                  </View>
                }
                {
                  item.action === 'customer' &&
                    <Button className='noCssBtn text-left black' style='line-height: inherit' openType='contact' >
                      <View className='at-row'>
                        <View className='at-col-8'>
                          <Text className={`iconfont icon-${item.icon} middle major`} />
                          <Text className='lg pl20'>{item.name}</Text>
                        </View>
                        <View className='at-col-4 text-right'>
                          <AtIcon value='chevron-right' size='22' color='#7E6452' />
                        </View>
                      </View>
                    </Button>
                }
              </View>
              <View className='plr20'>
                {/*分隔符*/}
                <AtDivider height='6' lineColor='#EDEDED' />
              </View>
            </View>
          ))
        }
      </View>
    )
  }
}
export default KtToolBar

