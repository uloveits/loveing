import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import { AtButton,AtInput,AtLoadMore } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import CommonFnc from "../../utils/commonFnc";
import KtSeparator from "../../comps/layout/separator";
import KtLoadMore from "../../comps/layout/load/more";
import {PAGE} from "../../app.constant";
import commonApi from "../../service/api/common";



@inject('auth')
@observer
export default class DialogPage extends Component {

  config = {
    navigationBarTitleText: '留言',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  }

  constructor() {
    super(arguments);
    //分页参数
    this.start = 0;

    this.state = {
      height:`height:${CommonFnc.getScreenSize().height - 20}px`,
      param:{},
      dialog:[],
      loading:false

    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getDialog(true);
  }

  componentDidShow () {
    const {auth} = this.props;
    if(!auth.check({block: true}))return;
  }

  //下拉刷新
  onPullDownRefresh() {
    this.getDialog(true);
    Taro.stopPullDownRefresh();
  }

  //获得对话信息
  getDialog = async (isFirst)=> {
    const { auth } = this.props;
    if(isFirst){
      this.start = 0;
    }
    let param = {
      method:'get',
      collection:'dialog',
      id:auth.user._id,
      bindId:auth.user.bindId,
      start:this.start,
      limit:PAGE.LIMIT
    };

    let res = await commonApi.list(param);
    console.log(res);
    this.start = this.start + PAGE.LIMIT;

    let _nextDialog = res.reverse();
    let _dialog = this.state.dialog;

    _dialog = _nextDialog.concat(_dialog);
    if(isFirst) {
      this.setState({
        dialog:_nextDialog,
      })
    }else {
      this.setState({
        dialog:_dialog,
        loading:false,
      })
    }

  }

  //输入框的change事件
  onInputChange = (obj,prop,value) => {
    let _obj = this.state[obj];
    _obj[prop] = value;
    this.setState({
      [obj]:_obj
    })
  };

  //发送
  doSend = async ()=> {
    const { auth } = this.props;

    let content = this.state.param;
    if(!content.content || content.content === ''){
      return
    }
    content.createTime = CommonFnc.dateFormat("yyyy-MM-dd hh:mm:ss",new Date());
    content.createId = auth.user._id;
    content.bindId = auth.bindUser._id;
    console.log(content);
    let param = {
      method:'add',
      collection:'dialog',
      content:content
    }

    let res = await commonApi.add(param);
    console.log(res);
    if(res.errMsg === 'collection.add:ok'){
      this.setState({
        param:{}
      })
      this.getDialog(true);
    }
  }

  //到顶部了
  onScrollToUpper = ()=>{
    console.log('到顶部了');
    this.setState({
      loading:true
    },()=>{
      this.getDialog(false)
    })

  };

  render () {
    const { height,dialog,loading } = this.state;
    const { auth } = this.props;
    return (
      <View>
        <View className='pd20 rel' style={height}>
          <View className=' card ht100 shadow-lg rel' >
            <Image className='wd100 ht100 common-bg card' src={PAGE.BG.TODO} />
            {
              dialog.length > 0 &&
              <ScrollView style={height} scrollY scrollIntoView='toBottom' onScrollToUpper={this.onScrollToUpper.bind(this)}>
                <View>
                  {
                    loading &&  <AtLoadMore status='loading' />
                  }
                </View>
                {
                  dialog.map((item,idx)=>(
                    <View key={idx}>
                      {
                        item.createId === auth.user._id &&
                        <View className='plr20 pt10 pb10'>
                          <View className='at-row at-row__align--center'>
                            <View className='at-col-8 at-col__offset-2'>
                              <View className='pr20 text-right'>
                                <Text className='xxs muted'>{item.createTime}</Text>
                              </View>
                              <View className='pr20 rel'>
                                <View className='wx wx-tri-right blue right_dialog' />
                                <View className='pd20 bg-gradual-blue card'>
                                  <Text className='sm'>{item.content}</Text>
                                </View>
                              </View>
                            </View>
                            <View className='at-col-2'>
                              <View>
                                <Image className='avatar-normal-square' src={auth.user.avatarUrl} />
                              </View>
                            </View>
                          </View>
                        </View>
                      }
                      {
                        item.createId === auth.bindUser._id &&
                        <View className='plr20 pt10 pb10'>
                          <View className='at-row at-row__align--center'>
                            <View className='at-col-2'>
                              <View>
                                <Image className='avatar-normal-square' src={auth.bindUser.avatarUrl} />
                              </View>
                            </View>
                            <View className='at-col-8'>
                              <View className='pl20'>
                                <Text className='xxs muted'>{item.createTime}</Text>
                              </View>
                              <View className='pl20 rel'>
                                <View className='wx wx-tri-left green left_dialog ' />
                                <View className='pd20 bg-gradual-green card'>
                                  <Text className='sm'>{item.content}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      }
                    </View>
                  ))
                }
                {
                  dialog.length ===0 &&
                  <KtLoadMore text='空空如也哦~' />
                }
                {
                  dialog.length > 0 &&  <View id='toBottom'></View>
                }
                <View className='card'>
                  <KtSeparator  comp={{height:'50px',backgroundColor:'transparent'}} />
                </View>
              </ScrollView>
            }
          </View>


          {/*底部输入框*/}
          <View className='fixed-bottom card'>
            <View className='pd20'>
              <View className='at-row at-row__align--center'>
                <View className='at-col-8'>
                  <View className='plr20 bgWhite card'>
                    <AtInput
                      name='value'
                      type='text'
                      placeholder='说点什么吧'
                      value={this.state.param.content}
                      onChange={this.onInputChange.bind(this,'param','content')}
                    />
                  </View>
                </View>
                <View className='at-col-2 text-center'>
                  <View>
                    <AtButton size='small' onClick={this.getDialog.bind(this,true)} >刷新</AtButton>
                  </View>

                </View>
                <View className='at-col-2 text-center'>
                  <View>
                    <AtButton type='primary' size='small' onClick={this.doSend.bind(this)} >发送</AtButton>
                  </View>
                </View>

              </View>
            </View>
          </View>
        </View>

      </View>
    )
  }
}
