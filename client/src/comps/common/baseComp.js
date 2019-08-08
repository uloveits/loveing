import Taro from '@tarojs/taro';

export default class BaseComponent extends Taro.Component {

  constructor(props) {
    super(props);
  }

  routeByAction = (action) => {

  }

  //取得屏幕的尺寸
   getScreenSize = () => {
    let res = Taro.getSystemInfoSync();
    return {
      width:res.windowWidth,
      height:res.windowHeight
    }
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  newState = (props) => {
    this.setState((prevState) => {
      for (let key in props) {
        if (props.hasOwnProperty(key)) {
          prevState[key] = props[key];
        }
      }
      return prevState;
    })
  };

  delState = (key) => {
    this.setState((prevState) => {
      delete prevState[key];
      return prevState;
    })
  }

  $apply = () => {
    this.setState({})
  }

  $copy = (src) => {
    return Object.assign({}, src)
  }
}
