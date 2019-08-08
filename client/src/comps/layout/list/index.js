import Taro from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { AtIcon, AtDivider } from 'taro-ui'

import './index.scss';

import DataComponent from "../../common/dataComp"

class KtList extends DataComponent {

  getSonComp = () => {
    return this.props.comp
  }

  render() {
    const { comp } = this.state;
    if(!comp) return;

    const list = comp.items
    if (!list || list.length === 0) return

    return (
      <View className='toolBar'>
        {/*我的工具*/}
        {
          comp.title&&
            <Block>
              <View className='at-row'>
                <View className='at-col-6'>
                  <View className='pd20'>
                    <Text className='lg font-weight '>{comp.title}</Text>
                  </View>
                </View>
              </View>
              {/*分隔符*/}
              <AtDivider height='6' lineColor='#EDEDED' />
            </Block>
        }
        {/*工具的具体内容*/}
        {
          list.map((item,idx)=>(
            <View key={idx}>
              <View className='pd20' onClick={this.nextView.bind(this, item)} >
                <View className='at-row'>
                  <View className='at-col-8'>
                    <AtIcon value={item.value} size='20' color='#c18346' />
                    <Text className='lg pl20'>{item.title}</Text>
                  </View>
                  <View className='at-col-4 text-right'>
                    <AtIcon className='chevron' value='chevron-right' size='22' color='#7E6452' />
                  </View>
                </View>
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
export default KtList

