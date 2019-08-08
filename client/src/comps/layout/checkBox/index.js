import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';



class KtCheckBox extends Taro.Component {

  defaultProps = {
    isSelect: false
  };


  constructor() {
    super(...arguments);
    this.state = {
      isCheck:this.props.isSelect
    };
  }
  //接收props的变化
  componentWillReceiveProps(_props) {
    this.setState({
      isCheck:_props.isSelect
    })
  }
  //checkBox点击事件
  checkClick = () => {
    this.setState({
      isCheck:!this.state.isCheck
    },()=>{
      this.props.onCallback(this.state.isCheck);
    })
  };

  render() {
    const { isCheck } = this.state;

    return (
      <View className='index'>
        <View className={isCheck ? 'at-checkbox-selected': ''}>
          <View class='at-checkbox__icon-cnt' onClick={this.checkClick.bind(this)}>
            <Text class='at-icon  at-icon-check '></Text>
          </View>
        </View>
      </View>
    )
  }
}
export default KtCheckBox

