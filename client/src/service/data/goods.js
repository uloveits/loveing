import broken from '../../public/imgs/broken.png'

/*********************** 数据处理方法 ***********************/
export default class goodsData {

  /**
   * 处理商品信息
   */
  static _processGoodsData (item) {
    // 结构赋值
    const {name, sellPrice, originalPrice} = item;

    // 长名字处理
    if (name.length > 12) {
      item.simple_name = name.substring(0, 12) + '...';
    }
    // 长名字处理
    if (name.length > 30) {
      item.name = name.substring(0, 30) + '...';
    }

    // 销售价处理
    if (!originalPrice) {
      item.originalPrice = sellPrice;
    }

    // 处理图片
    _processGoodsPreview(item);
    _processSkuLabel(item);
    _processStockRange(item);
    _processGoodsPriceRange(item);
    _processGoodsPriceLabel(item);
    _processGoodsQuantity(item);
  }

  /**
   * 处理商品详情
   */
  static _processGoodsDetail (detail) {
    // 解析预览图
    _processGoodsPreview(detail)

    // 解析SKU规格
    _processSkuLabel(detail);

    // 处理价格范围区间
    _processGoodsPriceRange(detail)

    // 处理价格标签
    _processGoodsPriceLabel(detail)

    // 处理运费
    _processGoodsPostFeeText(detail)

    return detail;
  }

  /**
   * 处理折扣价格
   */
  static _processGoodsDiscount(goods, discount) {
    const isDiscount = discount != null ? discount.categories.some(cid => cid === goods.innerCid) : false;
    if (!isDiscount) {
      return;
    }
    const rate = discount.rate / 100;
    const isSku = goods.goodsSkuInfo;
    if (isSku) {
      // 多规格数据处理
      const skuList = goods.goodsSkuInfo.goodsSkuDetails;
      skuList.forEach(item => {
        const detail = item.goodsSkuDetailBase;
        const price = detail.price;
        // 最低的价格作为原价
        if (item.originalPrice == null || price < item.originalPrice) {
          item.originalPrice = price;
        }
        // 设置原价和当前价格
        detail.originalPrice = price;
        detail.price = (price * rate).toFixed(2);
      });
    } else {
      // 单规格数据处理
      goods.originalPrice = goods.sellPrice;
      goods.sellPrice = (goods.sellPrice * rate).toFixed(2);
    }
    // 折扣文本展现
    goods.discountRate = discount.rate / 10 + '折';
    goods.discountText = `会员折扣`;
    goods.discount = true;
  }



  static _createGoodsCategories (data) {
    const list = [];
    if (data != null) {
      list.push(...data.map(item => {
        return {
          id: item.id,
          title: item.name
        };
      }));
    }
    const selected = list.length? list[0] : null;
    return {
      list,
      selected,
      scroll: false
    };
  }




  /**
   * 数据处理
   */
  static _processFavGoods(data) {
    if (data.goods == null) {
      return;
    }
    return {
      id: data.goodsId,
      name: data.goods.name,
      price: (data.goods.minPrice / 100).toFixed(2),
      imageUrl: _processGoodsPreview(data.goods)
    };
  }
}

/**
 * 处理运费信息
 */
function _processGoodsPostFeeText (detail) {
  const fee = detail.postFee;
  let feeText = '';
  if (!fee || fee === 0) {
    feeText = '配送：免运费';
  } else {
    feeText = `同城配送：￥${fee} (支持自提)`;
  }
  detail.feeText = feeText;
}

/**
 * 处理价格商品区间
 */
function _processGoodsPriceRange (detail) {
  if (!detail.labels) {
    return;
  }
  const labels = detail.labels;
  let maxPrice = 0;
  let minPrice = 0;
  for (let i in labels) {
    const array = labels[i].array;
    let max = 0;
    let min = Number.MAX_VALUE;
    for (let j = 0; j < array.length; j++) {
      max = Math.max(array[j].price, max);
      min = Math.min(array[j].price, min);
    }
    maxPrice += max;
    minPrice += min;
  }
  detail.maxPrice = maxPrice;
  detail.minPrice = minPrice;
}

/**
 * 处理库存展现标签 / 需要先调用区间处理
 */
function _processStockRange () {
}

/**
 * 处理价格展现标签 / 需要先调用区间处理
 */
function _processGoodsPriceLabel (goods) {
  let priceLabel = goods.minPrice;
  priceLabel /= 100;
  goods.priceLabel = isNaN(goods.priceLabel) ? priceLabel : priceLabel.toFixed(2);
  if (goods.maxPrice && goods.maxPrice > goods.minPrice) {
    goods.priceArea = `${goods.minPrice / 100}~${goods.maxPrice / 100}`;
  } else {
    goods.priceArea = goods.priceLabel;
  }
}

/**
 * 处理SKU标签
 */
function _processSkuLabel (goods) {
  const skuInfo = goods.skus;
  if (!skuInfo) {
    return;
  }
  const skuLabels = [];
  for (let i = 0; i < skuInfo.length; i++) {
    const key = skuInfo[i].name;
    const obj = skuLabels.find(item => item.key === key);
    if (obj) {
      obj.array.push(skuInfo[i]);
    } else {
      skuLabels.push({key: key, array: [skuInfo[i]]});
    }
  }
  goods.labels = skuLabels;
}


/**
 * 处理数量（已购买）
 */
function _processGoodsQuantity (item) {
  item.num = 0;
}


/**
 * 处理预览图
 */
function _processGoodsPreview (item) {
  const images = item.images;
  // 图片处理
  if (images == null || images.length < 1) {
    item.imageUrl = broken
  } else if (images[0].url == null) {
    item.imageUrl = broken
  } else {
    item.imageUrl = images[0].url
  }
  return item.imageUrl;
}
