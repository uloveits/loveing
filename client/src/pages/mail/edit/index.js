import Taro from '@tarojs/taro'
import { View, Text,Image,ScrollView } from '@tarojs/components'
import { AtTextarea,AtInput,AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import CommonFnc from "../../../utils/commonFnc";
import KtSeparator from "../../../comps/layout/separator";
import {PAGE} from "../../../app.constant";
import mailApi from "../../../service/api/mail";
import commonApi from "../../../service/api/common";



@inject('auth')
@observer
export default class MailEditPage extends Taro.Component {

  config = {
    navigationBarTitleText: '写信',
  }

  constructor() {
    super(arguments);

    this.state = {
      height:`height:${CommonFnc.getScreenSize().height - 40}px`,
      param:{
        color:'primary'
      },
      isNext:false,
      isStamp:false

    }
  }

  componentWillMount () {
    this.initData();

    //
  }

  componentDidMount () {

  }

  componentDidShow () {

  }

  initData = () => {
    const { auth } = this.props;
    let param = this.state.param;
    console.log(auth);
    param.head = `亲爱的${auth.bindUser.nickName}`;
    param.end = auth.user.nickName;
  }

  //输入框的change事件
  onInputChange = (obj,prop,value) => {
    let _obj = this.state[obj];
    _obj[prop] = value;
    this.setState({
      [obj]:_obj
    })
  };

  //文本框的change事件
  onTextAreaChange = (obj,prop,e) => {
    let _obj = this.state[obj];
    _obj[prop] =  e.target.value;
    this.setState({
      [obj]:_obj
    })
  };

  //下一步
  toNext = () => {
    this.setState({
      isNext:true
    },()=> {
      Taro.setNavigationBarTitle({
        title:'封装'
      })
    })
  };

  //选择邮票
  selectStamp = (item) => {
    let param = this.state.param;
    param.stamp = item;
    this.setState({
      param:param
    })
  }
  //选择颜色
  selectColor = (item)=> {
    let param = this.state.param;
    param.color = item;
    this.setState({
      param:param
    })
  }

  //寄出
  send = async() => {
    const { auth } = this.props;
    let content = this.state.param;
    content.createId = auth.user._id;
    content.bindId = auth.user.bindId;
    content.isRead = 0;
    content.createTime = CommonFnc.dateFormat("yyyy-MM-dd hh:mm:ss",new Date());

    let param = {
      method:'add',
      collection:'mail',
      content:content
    };

    let res = await commonApi.add(param);
    console.log(res);
    if(res.errMsg === 'collection.add:ok') {
      Taro.navigateBack({
        delta:1
      })
    }
  };


  render () {
    const { height,isNext,param } = this.state;
    const Line = (<KtSeparator comp={{height:'1px'}} />);
    // 邮编
    const zipCode = ['5','2','0','1','3','1','4']
    return (
      <View>
        {
          !isNext &&
          <View className='pd20 rel' style={height}>
            <View className='bgWhite card ht100 shadow-lg'>
              {/*开头*/}
              <View className='plr20 pt20'>
                <View className='at-row'>
                  <View className='at-col-8'>
                    <AtInput
                      name='value'
                      type='text'
                      placeholder='说点什么吧'
                      value={this.state.param.head}
                      onChange={this.onInputChange.bind(this, 'param', 'head')}
                    />
                  </View>
                  <View className='at-col-4 flex-right'>
                    <View className='wx wx-next weak' onClick={this.toNext.bind(this)} style='font-size:25Px' />
                  </View>
                </View>
              </View>
              <View className='plr20'>
                {Line}
              </View>
              {/*内容*/}
              <View className='pd20'>
                <AtTextarea
                  value={this.state.param.content}
                  count={false}
                  maxLength={1000}
                  onChange={this.onTextAreaChange.bind(this, 'param', 'content')}
                  autoFocus
                  height={800}
                  placeholder='你想对TA说...'
                />
              </View>
              {/*结尾*/}
              <View className='plr20'>
                <View className='at-row'>
                  <View className='at-col-8'>
                    {/*<View className='wx wx-next' onClick={this.toNext.bind(this)} style='font-size:30Px' />*/}
                  </View>
                  <View className='at-col-4'>
                    <AtInput
                      name='value'
                      type='text'
                      placeholder='说点什么吧'
                      value={this.state.param.end}
                      onChange={this.onInputChange.bind(this, 'param', 'head')}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        }
        {
          isNext &&
          <View className='pd20'>
            {/*信封*/}
            <View className={`pd20 bg-gradual-${param.color} card`} style='height:150px;'>

              <View className='at-row' style='height:60px'>
                {
                  zipCode.map((item, idx) => (
                    <View className='at-col-1' key={idx}>
                      <View className='zipCode bgWhite card text-center'><Text
                        className='lg font-weight black'>{item}</Text></View>
                    </View>
                  ))
                }
                <View className='at-col-3 at-col__offset-2 flex-right rel'>
                  {
                    param.stamp &&
                    <View className='stampImg'>
                      <Image className='wd100' mode='widthFix' lazyLoad src={param.stamp} />
                    </View>
                  }
                  {
                    !param.stamp && <View className='stamp bgWhite card text-center' ><Text className='sm muted'>贴邮票处</Text></View>
                  }

                </View>
              </View>

              <View>
                <View className='pl30'>
                  <Text className='xxl font-weight black'>{this.state.param.head}</Text>
                  <Text className='xxl font-weight black pl10 '>(收)</Text>
                </View>
              </View>
              <View className='mt70'>
                <View className='text-right'>
                  <Text className='sm font-weight black'>{this.state.param.end}</Text>
                  <Text className='sm font-weight black pl10 '>(寄)</Text>
                </View>
              </View>
            </View>
            {/*选择邮票*/}
            <View className='ptb20'>
              <View>
                <Text className='lg font-weight'>选择邮票</Text>
              </View>
              <ScrollView scrollX>
                <View className='at-row'>
                  {
                    PAGE.STAMP.map((item, idx) => (
                      <View className='at-col-4' key={idx}>
                        <View className='pd10' onClick={this.selectStamp.bind(this, item)}>
                          <Image className='wd100' mode='widthFix' lazyLoad src={item} />
                        </View>
                      </View>
                    ))
                  }
                </View>
              </ScrollView>
            </View>
            {/*选择封面颜色*/}
            <View className='ptb20'>
              <View>
                <Text className='lg font-weight'>选择封面颜色</Text>
              </View>
              <View className='ptb20'>
                <View className='at-row at-row--wrap'>
                  {
                    PAGE.COLOR.map((item, idx) => (
                      <View className='at-col-1' key={idx}>
                        <View onClick={this.selectColor.bind(this,item)} className={`zipCode bg-gradual-${item} card`}/>
                      </View>
                    ))
                  }
                </View>
              </View>
            </View>

            {/*按钮*/}
            <View>
              <AtButton type='primary' onClick={this.send.bind(this)} >寄出</AtButton>
            </View>
          </View>
        }
      </View>
    )
  }
}
