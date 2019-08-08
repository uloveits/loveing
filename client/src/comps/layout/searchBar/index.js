import Taro from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { AtSearchBar,AtInput } from 'taro-ui'
import './index.scss';

class KtSearchBar extends Taro.Component {

  componentDidMount() {
    console.log(this.props.comp);
    this.setState({
      searchValue:this.props.comp && this.props.comp.searchContent
    })
  }

  onChange (stateName, value) {
    this.setState({
      [stateName]: value
    })
  }

  onActionClick () {
    this.props.onCallback(this.state.searchValue);
  }

  render() {
    const { comp } = this.props;
    if(!comp)return;
    const { searchValue } = this.state;

    return (
      <View className='searchBar'>
        {
          comp.type !== 'self'
            ? <AtSearchBar
              value={searchValue}
              placeholder={comp.placeholder}
              onChange={this.onChange.bind(this, 'searchValue')}
              onActionClick={this.onActionClick.bind(this)}
            />
            : <View className='pd20'>
                <View className='border'>
                  <View className='at-row'>
                  <View className='at-col-9'>
                    <View className='plr20 pt10 pb10'>
                      <AtInput
                        name='name'
                        type='text'
                        placeholder={comp.placeholder}
                        value={searchValue}
                        onChange={this.onChange.bind(this,'searchValue')}
                      />
                    </View>

                  </View>
                  <View className='at-col-3 bgPrimary text-center border-left' onClick={this.onActionClick.bind(this)}>
                    <Text className='lg white'>搜索</Text>
                  </View>
                </View>
              </View>
            </View>
        }

      </View>
    )
  }
}
export default KtSearchBar

