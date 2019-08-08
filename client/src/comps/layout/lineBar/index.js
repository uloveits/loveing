import Taro from '@tarojs/taro'
import { View, Text, Image, Block } from '@tarojs/components';
import { AtBadge, AtDivider, AtIcon } from 'taro-ui'

import './index.scss';
import { compIs} from "../../../utils/commonFnc"
import { LAYOUT } from "../../../app.constant"

import DataComponent from "../../common/dataComp"


class KtLineBar extends DataComponent {

  getSonComp = () => {
    return this.props.comp
  }


  render() {
    const { comp } = this.state
    if (!comp) return

    const list = comp.items
    if (!list || list.length === 0) return

    const column = comp.count?comp.count:4


    function calcLen(col, total) {
      if (col === 5) return 20
      return total>column?3:12/total
    }
    const len = calcLen(column, list.length)

    return (
      <View>
        {
          compIs(comp, LAYOUT.PARAM.IS.VISIBLE)&&(
            <Block>
              {/*我的订单*/}
              <View className='at-row'>
                <View className='at-col-6'>
                  <View className='pd20'>
                    <Text className='lg font-weight '>{comp.title}</Text>
                  </View>
                </View>
                <View className='at-col-6'>
                  <View className='pd20 text-right' onClick={this.nextView.bind(this, comp, comp)}>
                    <Text className='sm muted '>{comp.content}</Text>
                    <AtIcon value='chevron-right' size='20' color='#F00' />
                  </View>
                </View>
              </View>
              {/*分隔符*/}
              <AtDivider height='6' lineColor='#EDEDED' />
            </Block>
          )
        }
        <View className='ptb20'>
          <View className={`at-row ${list.length>column?'at-row--wrap':''}`}>
            {
              list.map((item, index) => (
                <View
                  key={index}
                  className={`at-col at-col-${len} ${(compIs(comp, LAYOUT.PARAM.IS.DIVIDE)&&index%(12/len))?'side-line':''}`}
                  onClick={this.nextView.bind(this, item, comp)}
                >
                  <View className='text-center'>
                    {
                      item.url?(
                        <View className='plr20 pt20'>
                          <AtBadge value={item.value?item.value:null} maxValue={999}>
                            <Image className='image' mode='widthFix' src={item.url} />
                          </AtBadge>
                        </View>
                      ):(
                        <View>
                          <Text className='lg major'>{item.value?item.value:0}</Text>
                        </View>
                      )
                    }
                    <View>
                      <Text className='lg'>{item.title}</Text>
                    </View>
                  </View>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}
export default KtLineBar
