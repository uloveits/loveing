import Taro from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import './index.scss';

import { ACTIONS } from "../../../app.constant"

class KtImageBox extends Taro.Component {

  routeByAction = () => {
    //
  }

  render() {
    const { comp } = this.props;
    console.log('###ImageBox###');
    console.log(comp);
    return (
      <View className='image-box' style={`background-color:${comp.backgroundColor}; padding:${comp.padding} 0;`}>
        <View className='at-row at-row--wrap'>
          {
            comp.items.map((item, idx) => {
              return (
                item.action===ACTIONS.SHARE?(
                  <Button key={idx} plain className='column-around noCssBtn' open-type='share'>
                    <Image style={`width:${comp.width};height:${comp.height}`} mode='aspectFill' src={item.url} onClick={this.routeByAction.bind(this, item)} />
                    {comp.titleVisible&&<Text className='image-title'>{item.title}</Text>}
                  </Button>
                  ):(
                  <View key={idx} className={comp.items.length > 1 ? 'at-col-3':'at-col-12'}>
                    <View className='text-center'>
                      <Image style={`width:${comp.width};height:${comp.height}`} mode='aspectFill' src={item.url} onClick={this.routeByAction.bind(this, item)} />
                    </View>
                    <View className='text-center'>
                      {comp.titleVisible&&<Text className='image-title'>{item.title}</Text>}
                    </View>
                  </View>
                )
              )
            })
          }
        </View>
      </View>
    )
  }
}
export default KtImageBox

