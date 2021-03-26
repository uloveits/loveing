import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtLoadMore} from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import KtSeparator from "../../comps/layout/separator";
import CommonFnc from "../../utils/commonFnc";
import {PAGE} from "../../app.constant";
import Routes from "../../utils/route";
import commonApi from "../../service/api/common";
import KtLoadMore from "../../comps/layout/load/more";




@inject('auth')
@observer
export default class MailPage extends Component {

  config = {
    navigationBarTitleText: '爱情邮箱',
    enablePullDownRefresh:true,
    backgroundTextStyle:'dark',
  }

  constructor() {
    super(arguments);
    this.state = {
      isShowPlus:false,
      param:{
        time:CommonFnc.dateFormat("yyyy-MM-dd",new Date())
      },
      mail:[],
      loading:false
    }
  }


  componentWillMount () { }

  componentDidShow() {
    this.getMail(true)
  }

  onReachBottom() {
    this.setState({
      loading:true
    },()=>{
      this.getMail(false)
    })
  }

  //下来刷新
  onPullDownRefresh() {
    this.getMail(true);
    Taro.stopPullDownRefresh();
  }

  //获得信件列表
  getMail = async (isFirst)=> {
    const { auth } = this.props;
    if(isFirst){
      this.setState({
        loading:true,
      })
      this.start = 0;
    }
    let param = {
      method:'get',
      collection:'mail',
      id:auth.user._id,
      bindId:auth.user.bindId,
      start:this.start,
      limit:PAGE.LIMIT
    };

    let res = await commonApi.list(param);
    console.log(res);

    this.start = this.start + PAGE.LIMIT;

    let _mail = this.state.mail;

    _mail = _mail.concat(res);

    if(isFirst) {
      this.setState({
        mail:res,
        loading:false,
      })
    }else {
      this.setState({
        mail:_mail,
        loading:false,
      })
    }

  }


  //新增
  isPlus = () => {
    Routes.toMailEdit()
  }

  // 信件详情
  goDetail = (item)=> {
    Routes.toMailDetail({id:item._id})
  }


  render () {
    const { mail,loading } = this.state;
    const Line = (<KtSeparator comp={{height:'1px'}} />);

    return (
      <View>

        {
          mail.map((item,idx)=>(
            <View className='pd20' key={idx}>
              <View className={`pd20 bg-gradual-${item.color} card`} onClick={this.goDetail.bind(this,item)}>

                <View className='at-row'>
                  <View className='at-col-9'>
                    <View className='at-row'>
                      {
                        PAGE.ZIP_CODE.map((zip, idx) => (
                          <View className='at-col-1' key={idx}>
                            <View className='zipCode bgWhite text-center'>
                              <Text className='lg font-weight black'>{zip}</Text>
                            </View>
                          </View>
                        ))
                      }
                    </View>

                    <View className='mt20'>
                      <Text className='lg font-weight black'>{item.head}</Text>
                      <Text className='lg font-weight black pl10 '>(收)</Text>
                    </View>
                    <View>
                      <Text className='sm black'>{item.createTime}</Text>
                    </View>
                  </View>


                  <View className='at-col-3 flex-right rel'>
                    <View className='stampImg'>
                      <Image className='wd100' mode='widthFix' lazyLoad  src={item.stamp}/>
                    </View>
                  </View>
                </View>
              </View>
            </View>

          ))
        }

        {
          mail.length === 0 &&
            <View className='pd20'>
              <View className='bgWhite pd20 card'>
                {
                  loading ? <AtLoadMore status='loading' /> :  <KtLoadMore text='暂时没有来信~' />
                }
              </View>
            </View>
        }

        {
          mail.length > 0 &&
          <View>
            {
              loading && <AtLoadMore status='loading' />
            }
          </View>
        }


        {/*浮动添加按钮*/}
        <View className='floatFab'>
          <View className='bg-gradual-green fb-icon'  onClick={this.isPlus.bind(this)}>
            <Text className='at-icon at-icon-add'></Text>
          </View>
        </View>

      </View>
    )
  }
}
