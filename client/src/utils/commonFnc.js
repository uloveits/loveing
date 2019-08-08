import Taro from '@tarojs/taro'
import '@tarojs/async-await'
import LunarCalendar from "./lunar";

const PAGE_LEVEL_LIMIT = 10;

export default class CommonFnc {

  static goView(url, params={}, redirect=false) {
    return this.gotoPage(url, params, redirect?{method:'redirectTo'}:{})
  }
  //去跳转
  static gotoPage(url, params={}, options={}) {
    const pages = Taro.getCurrentPages();
    let method = options.method || 'navigateTo';
    if (url && typeof url === 'string') {
      if (method === 'navigateTo' && pages.length >= PAGE_LEVEL_LIMIT - 3) {
        method = 'redirectTo'
      }

      if (method === 'navigateToByForce') {
        method = 'navigateTo'
      }

      if (method === 'navigateTo' && pages.length === PAGE_LEVEL_LIMIT) {
        method = 'redirectTo'
      }

      let extend = '';
      for (let key in params) {
        extend += '&'+key+'='+params[key];
      }
      if (extend.length) {
        url += '?'+extend.substr(1, extend.length-1)
      }

      Taro[method]({url})
    }
  }

  //取得屏幕的尺寸
  static getScreenSize() {
    let res = Taro.getSystemInfoSync();
    let _Size = {
      width:res.windowWidth,
      height:res.windowHeight
    }
    return _Size;
  }
  //字符串转数组
  static stringToArr(str) {
    if(str) {
      let arr = [];
      arr = str.split('，');
      if(arr.length === 1) {
        arr = str.split(',');
      }
      let _arr = [];
      for(let i= 0; i< arr.length; i++) {
        let _value = arr[i];
        _arr.push(_value);
      }
      return  _arr;
    }else {
      return '';
    }
  }
  //数组转字符串
  static arrToString(arr) {
    let _str = '';
    for(let i= 0; i< arr.length;i++) {
      if(i == arr.length - 1){
        _str += arr[i]
      }else {
        _str += arr[i] + ','
      }
    }
    return _str;
  }
  /*将价格从元转成分*/
  static yuanToCent(yuan) {
    return yuan * 100;
  }
  /*将价格从分转成元*/
  static centToYuan(cent) {
    return parseInt(cent)/100;
  }

  /**
   * 调用时不用把参数补全; getValue(array, key) 一样可以调用
   * @param array 数组
   * @param key 指定的数值
   * @returns {string|string|string}
   */
  static getConstantValue(array, key, strKey, strValue) {
    let result = '';
    let _strKey = 'id';
    let _strValue = 'value';
    if(strKey) {
      _strKey = strKey;
    }
    if(strValue) {
      _strValue = strValue;
    }
    if (array) {
      for (let item of array) {
        if (key == item[_strKey]) {
          result = item[_strValue];
        }
      }
    }
    return result;
  }

  static compIs(c, ...types) {
    if (c && c.is) {
      let i = parseInt(c.is)
      if (types && types.length) {
        for (let j = 0; j < types.length; j++) {
          if (!(types[j]&i)) {
            return false
          }
        }
        return true
      }
    }
  }

  static compType(c, type) {
    if (c) {
      return parseInt(c.type) === type
    }
  }
  /**
   * @param {String|Number} value 要验证的字符串或数值
   * @param {*} validList 用来验证的列表
   */
  static oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value.url === validList[i].url) {
        return true
      }
    }
    return false
  }

  static dateFormat(fmt,date) {
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  };

  /*找到数组中某个值的下标*/
  static findArrIndex(value,arr) {
    console.log(value);
    console.log(arr);
    for(let i = 0;i < arr.length;i++) {
      if(arr[i].id === value) {
        return i;
      }
    }
  }
  /*计算两日期的间隔天数*/
  static getDateDiff(startDate,endDate) {
    let startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
    let endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
    let dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    return  dates;
  }

  /**
   * 计算生日天数
   */
  static getBirthDayDiff(remDate,isLunar) {
    const curDate = this.dateFormat("yyyy-MM-dd",new Date());

    let _remDate = remDate.split('-');

    let _remMonth = _remDate[1];
    let _remDay = _remDate[2];

    let _curDate = curDate.split('-');
    let _curYear = _curDate[0];
    let _curMonth  = _curDate[1];
    let _curDay = _curDate[2];

    //如果是农历
    let remDate_Solar;
    if(isLunar){
      console.log('农历');
      let remDate_now = _curYear + '-' + _remMonth + '-' + _remDay;
      //把今年的农历转换成今年的阳历
      remDate_Solar = LunarCalendar.lunarToSolar(remDate_now);
      let _remDate_Solar = remDate_Solar.split('-');
      //检查今年的日期有没有过
      let isPassed = this.checkDatePassed(_remDate_Solar[1],_remDate_Solar[2],_curMonth,_curDay);
      if(isPassed) {
        // 把明年的农历转换成明年的阳历
        let nextYear = parseInt(_curYear) + 1;
        let remDate_next = nextYear + '-' + _remMonth + '-' + _remDay;
        let remDate_Solar_next = LunarCalendar.lunarToSolar(remDate_next);
        //比较明年和纪念相差的天数
        let days = this.getDateDiff(curDate,remDate_Solar_next);

        return days;
      }else {
        //比较今年和纪念相差的天数
        let days = this.getDateDiff(curDate,remDate_Solar);
        return days;
      }
    }else {
      console.log('阳历');
      //检查今年的日期有没有过
      let isPassed = this.checkDatePassed(_remMonth,_remDay,_curMonth,_curDay);
      if(isPassed) {
        //年份加一
        let nextYear = parseInt(_curYear) + 1;
        let remDate_next = nextYear + '-' + _remMonth + '-' + _remDay;

        //比较明年和纪念相差的天数
        let days = this.getDateDiff(curDate,remDate_next);
        return days;
      }else {
        //比较今年和纪念相差的天数
        let remDate_now = _curYear + '-' + _remMonth + '-' + _remDay;
        let days = this.getDateDiff(curDate,remDate_now);
        return days;
      }
    }


  }

  static checkDatePassed(_remMonth,_remDay,_curMonth,_curDay){
    console.log(_remMonth + '=='+_remDay + '=='+_curMonth + '=='+_curDay + '==');
    if(parseInt(_remMonth) < parseInt(_curMonth)){
      return true;
    }else if(parseInt(_remMonth) === parseInt(_curMonth) && parseInt(_remDay) < parseInt(_curDay)){
      return true;
    }else {
      return false;
    }
  }

  static getTimestamp() {
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp
  }
}
