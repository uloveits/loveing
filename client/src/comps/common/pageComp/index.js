import Taro from '@tarojs/taro';
import {View} from "@tarojs/components"

import conf from "../../../service/api/conf"
import {compType} from "../../../utils/commonFnc"
import {COMPONENTS} from "../../../app.constant"

import KtUserCard from "../../user/card"
import KtLineBar from "../../layout/lineBar"
import KtList from "../../layout/list"
import KtSeparator from "../../layout/separator"
import KtCopyright from "../../layout/copyright"
import KtLoading from "../../layout/load/ing"
import KtSearchBar from "../../layout/searchBar"
import KtSwipeBar from "../../layout/swipeBar"
import KtImageBox from "../../layout/imageBox"
import KtGoodsBox from "../../goods/box"
import KtOrderTab from "../../order/tab"
import KtGoodsTab from "../../goods/tab"
import KtCartWidget from "../../cart/widget"
import KtCouponTab from "../../coupon/tab";

export default class PageComp extends Taro.Component {

  constructor() {
    super(...arguments);
    this.state = {
      components:[]
    };
  }

  componentWillReceiveProps() {
    this.init()
  }

  componentWillMount() {
    this.init()
  }

  init() {
    if (!this.initialized && typeof this.props.layout !== "undefined") {
      const id = this.props.layout||0;
      this.initialized = true;
      // 获取个人组件信息
      conf.layout(id).then(page => {
        this.setState(page)
      });
    }
  }

  render () {
    const { components } = this.state;
    const { params } = this.props;

    return (
      <View>
        {
          components.length !== 0
            ?(
              components.map((comp, idx) => (
                <View key={idx}>
                  {compType(comp, COMPONENTS.USER_CARD)&&<KtUserCard comp={comp} />}
                  {compType(comp, COMPONENTS.LINE_BAR)&&<KtLineBar comp={comp} />}
                  {compType(comp, COMPONENTS.MENU_LIST)&&<KtList comp={comp} />}
                  {compType(comp, COMPONENTS.SEPARATOR)&&<KtSeparator comp={comp} />}
                  {compType(comp, COMPONENTS.COPYRIGHT)&&<KtCopyright comp={comp} />}
                  {compType(comp, COMPONENTS.SEARCH_BAR)&&<KtSearchBar comp={comp} />}
                  {compType(comp, COMPONENTS.SWIPER_BAR)&&<KtSwipeBar comp={comp} />}
                  {compType(comp, COMPONENTS.IMAGE_BOX)&&<KtImageBox comp={comp} />}
                  {compType(comp, COMPONENTS.GOODS_BOX)&&<KtGoodsBox comp={comp} />}
                  {compType(comp, COMPONENTS.ORDER_TAB)&&<KtOrderTab comp={comp} params={params} />}
                  {compType(comp, COMPONENTS.GOODS_TAB)&&<KtGoodsTab comp={comp} />}
                  {compType(comp, COMPONENTS.COUPON_TAB)&&<KtCouponTab comp={comp} />}

                  {compType(comp, COMPONENTS.CART_WIDGET)&&<KtCartWidget comp={comp} />}
                </View>
              )))
            :(
              <KtLoading />
            )
        }
      </View>
    )
  }
}
