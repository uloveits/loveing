import Taro from '@tarojs/taro';
import { Swiper, SwiperItem, Image } from '@tarojs/components';
import './index.scss';
import Routes from "../../../utils/route";



class KtSwipeBar extends Taro.Component {


  action = (action,url) => {
    console.log('轮播图点击');
    if(action.type === 'route') {
      if(action.id){
        Routes.toInfoDetail({id:action.id});
      }
      return;
    }
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  };

  render() {
    const { comp } = this.props;
    if(!comp)return;
    return (
      <Swiper
        className={`swipeBar ${comp.cls}`}
        circular
        indicatorDots
        indicatorColor='#999'
        indicatorActiveColor='#bf708f'
        autoplay
      >
        {
          comp.data.map((item, index) => (
            <SwiperItem key={index}>
              <Image className={`swipe-img ${comp.type}`} src={item.url} onClick={this.action.bind(this,item.action,item.url)} />
            </SwiperItem>
          ))
        }
      </Swiper>
    )
  }
}
export default KtSwipeBar

