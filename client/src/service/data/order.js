/**
 * 订单类型
 */
const TYPE = {
  MALL: 10,
  TAKEAWAY: 20,
  FORHERE: 30,
  PACK: 33,
  OFFLINE: 40
};
/**
 * 支付方式
 */
const PAYMENT = {
  OFFLINE: '0',
  ONLINE: '1'
};
/**
 * 订单状态
 */
const STATUS = {
  ALL: 0,//全部状态
  WAIT: 3,  // 待付款
  PAID: 5,      // 已支付，待发货
  REFUNDED: 7,  // 退款完成
  CLOSED: 8,    // 已取消
  REFUNDING: 9, // 退款中
  DELIVERED: 13,  // 已发货
  COMMENTING: 14,  // 待评论
  FINISH: 15   // 订单完成
};

/**
 * 配送方式
 */
const DELIVERY = {
  SELF: 'SELF',
  CITY: 'CITY',
  EXPRESS: 'EXPRESS'
};

/**  数据字典 **/

/**
 * 订单类型
 */
const ORDER_TYPE_DICT = {
  [TYPE.MALL]: '商城',
  [TYPE.TAKEAWAY]: '外卖',
  [TYPE.FORHERE]: '堂食',
  [TYPE.PACK]: '打包'
};
/**
 * 支付方式
 */
const ORDER_PAYMENT_DICT = {
  [PAYMENT.OFFLINE]: '线下支付',
  [PAYMENT.ONLINE]: '在线支付'
};
/**
 * 配送方式
 */
const ORDER_DELIVERY_DICT = {
  [DELIVERY.SELF]: '上门自提',
  [DELIVERY.CITY]: '同城配送',
  [DELIVERY.EXPRESS]: '快递配送'
};
/**
 * 默认的订单状态描述
 */
const COMMON_STATUS_DICT = {
  [STATUS.ALL]: ['全部', ''],
  [STATUS.WAIT]: ['等待买家付款', '请于24小时内付款，超时订单自动关闭'],
  [STATUS.PAID]: ['等待卖家发货', '您已完成付款，等待卖家发货，超时未发货将自动退款'],
  [STATUS.DELIVERED]: ['卖家已发货', '卖家已发货，请您耐心等待'],
  [STATUS.COMMENTING]: ['等待买家评价', '卖家已收到您的货款，请对本次交易进行评价'],
  [STATUS.REFUNDING]: ['申请退款中', '您已发起退款申请，等待卖家处理'],
  [STATUS.FINISH]: ['交易成功', '交易已完成，卖家已收到您的货款'],
  [STATUS.CLOSED]: ['交易关闭', '本交易已取消，欢迎您下次光临'],
  [STATUS.REFUNDED]: ['已退款', '钱款已原路退回，请查收']
};

/**
 * 按钮的字典
 */
const ACTION = {
  CLOSE: {
    primary: false,
    name: '关闭订单',
    func: 'close'
  },
  RECEIVE: {
    primary: true,
    name: '确认收货',
    func: 'receive'
  },
  COMMENT: {
    primary: true,
    name: '评价订单',
    func: 'comment'
  },
  PAY: {
    primary: true,
    name: '立即支付',
    func: 'pay'
  },
  REFUND: {
    // inner: true,
    primary: false,
    name: '申请退款',
    func: 'refund'
  },
  REFUND_DETAIL: {
    // inner: true,
    primary: false,
    name: '退款详情',
    func: 'refundDetail'
  },
  UNREFUND: {
    // inner: true,
    primary: true,
    name: '撤销退款',
    func: 'unrefund'
  },
  AGAIN: {
    primary: false,
    name: '再来一单',
    func: 'again'
  }
};

/**  内部方法 **/

const commonStatus = (status, index) => {
  const statusDict = COMMON_STATUS_DICT[status];
  if (statusDict == null) {
    return;
  }
  return statusDict[index];
};

/**  映射方法 **/

/**
 *  映射订单类型
 */
const orderType = value => ORDER_TYPE_DICT[value];

/**
 *  映射支付类型
 */
const paymentType = value => ORDER_PAYMENT_DICT[value];

/**
 *  映射配送类型
 */
const deliveryType = value => ORDER_DELIVERY_DICT[value];

/**
 *  映射订单状态
 */
const statusName = (status) => commonStatus(status, 0);

/**
 *  映射状态描述
 */
const statusDesc = (status) => commonStatus(status, 1);

/**
 * 映射状态动作
 */
const statusActions = (payment, status) => {
  // const key = `${TYPE.MALL}-${payment}-${status}`;
  // const actions = STATUS_ACTIONS[key];
  // return actions != null ? actions : [];

  // ALL: 0,
  //   WAIT: 3,  // 待付款
  //   PAID: 5,      // 已支付，待发货
  //   REFUNDED: 7,  // 退款完成
  //   CLOSED: 8,    // 已取消
  //   REFUNDING: 9, // 退款中
  //   DELIVERED: 13,  // 已发货
  //   COMMENTING: 14,  // 待评论
  //   FINISH: 15   // 订单完成
  //
  if (status == STATUS.WAIT) return [ACTION.CLOSE, ACTION.PAY];
  //if (status == STATUS.PAID) return [ACTION.REFUND];
  if (status == STATUS.REFUNDING) return [ACTION.UNREFUND];
  if (status == STATUS.DELIVERED) return [ACTION.REFUND,ACTION.RECEIVE];
  if (status == STATUS.COMMENTING) return [ACTION.COMMENT];
};

const back2FrontState = (state) => {
  if (state == STATUS.WAIT) return 0;
  if (state == STATUS.PAID) return 1;
  if (state == STATUS.DELIVERED) return 2;
  if (state == STATUS.COMMENTING) return 3;
  if (state == STATUS.REFUNDING) return 4;
  if (state == STATUS.REFUNDED) return 5;
  if (state == STATUS.FINISH) return 6;
  if (state == STATUS.CLOSED) return 7;
  return 0;
};

const front2BackState = (state) => {
  if (state == 1) return STATUS.WAIT;
  if (state == 2) return STATUS.PAID;
  if (state == 3) return STATUS.DELIVERED;
  if (state == 4) return STATUS.COMMENTING;
  if (state == 5) return STATUS.REFUNDING;
  if (state == 6) return STATUS.REFUNDED;
  if (state == 7) return STATUS.FINISH;
  if (state == 8) return STATUS.CLOSED;
};

/**  工具方法 **/

/**
 * 是否为商城订单
 */
const isMallOrder = type => type == TYPE.MALL;
/**
 * 是否为餐饮订单
 */
const isFoodOrder = type => type == TYPE.FORHERE || type == TYPE.PACK || type == TYPE.TAKEAWAY;
/**
 * 是否是需要配送的订单
 */
const isDeliveryOrder = type => type == TYPE.TAKEAWAY || type == TYPE.MALL;
/**
 * 是否为堂食订单
 */
const isInShopOrder = type => type == TYPE.FORHERE || type == TYPE.PACK;

/**
 * 导出的方法
 */
const orderUtils = {
  statusActions, orderType, paymentType, deliveryType, statusName, statusDesc, isMallOrder, isFoodOrder, isInShopOrder, isDeliveryOrder, back2FrontState, front2BackState
};

export {
  ACTION,
  TYPE,
  PAYMENT,
  DELIVERY,
  STATUS,
  orderUtils
}
