import Taro from '@tarojs/taro';

import {compIs, gotoPage} from "../../utils/commonFnc"
import {ACTIONS, LAYOUT} from "../../app.constant"
import baseApi from "../../service/api/base"
import auth from '../../store/auth'
import Pagination from "./pagination"

export default class DataComponent extends Pagination {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.updateComp(() => { super.componentDidMount() })
  }

  componentDidShow() {
    this.updateComp()
  }

  // 子类必须重载
  getSonComp = () => {}

  updateComp = (nextFunc) => {

    const comp = this.getSonComp()
    if (comp) {
      const user = auth.user
      if (compIs(comp, LAYOUT.PARAM.IS.API)) {

        return this.apiForComp(comp, nextFunc)

      } else if (compIs(comp, LAYOUT.PARAM.IS.API_AUTH)) {
        if (user) {
          return this.apiForComp(comp, nextFunc)
        }
      } else if (compIs(comp, LAYOUT.PARAM.IS.CLASS_NAME)) {

        return this.classForComp(comp, nextFunc)

      } else if (compIs(comp, LAYOUT.PARAM.IS.PARAM_KEY)) {

        return this.paramForCom(comp, nextFunc)

      }
      return this.setState({comp}, () => { nextFunc&&nextFunc() })
    } else {
      console.log("子类未重载getSonComp")
    }
  }

  apiForComp = (comp) => {

    // 数据需要从后台拉取
    return baseApi.get(comp.source).then(ret => {
      console.log(ret)

      let len = Math.max(comp.items.length, ret.data.length)
      for (let i = 0; i < len; i++) {
        comp.items[i].value = ret.data[i]
      }

      return this.setState({comp})
    })
  }

  classForComp = (comp) => {
    let len = comp.items.length
    for (let i = 0; i < len; i++) {
      comp.items[i].value = comp.items[i].ossKey
    }
    return this.setState({comp})
  }

  paramForCom = (comp, nextFunc) =>  {
    let len = comp.items.length
    for (let i = 0; i < len; i++) {
      comp.items[i].value = JSON.parse(comp.items[i].ossKey)
    }
    this.setState({comp}, () => { nextFunc&&nextFunc() })
  }

  nextView = (item, comp) => {
    if (comp && compIs(comp, LAYOUT.PARAM.IS.API_AUTH)) {
      if (!auth.check({block: true})) return
    }
    if (item.action >= ACTIONS.PAGE_NAVIGATE && item.action <= ACTIONS.PAGE_BACK) {

      let options = { }

      if (item.action === ACTIONS.PAGE_NAVIGATE) {
        options.method = 'navigateTo'
      } else if (item.action === ACTIONS.PAGE_REDIRECT) {
        options.method = 'redirectTo'
      } else if (item.action === ACTIONS.PAGE_SWITCH) {

      } else {

      }
      gotoPage(item.target, {}, options)
    }
  }
}
