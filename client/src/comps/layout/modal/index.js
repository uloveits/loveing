import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtModal } from "taro-ui"
import './index.scss';


class KtModal extends Taro.Component {

  //取消点击事件
  onCancel = () => {
    this.props.onCancelClick();
  };
  //确认点击事件
  onConfirm = () => {
    this.props.onConfirmClick();
  };
  render() {
    const { opt } = this.props;
    if(!opt) return;

    return (
      <AtModal
        isOpened={opt.isShow}
        title={opt.title || '提示'}
        cancelText={opt.cancelText || '取消'}
        confirmText={opt.confirmText || '确定'}
        onCancel={this.onCancel.bind(this)}
        onConfirm={this.onConfirm.bind(this)}
        content={opt.content}
      />
    )
  }
}
export default KtModal

