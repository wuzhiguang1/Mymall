import { request } from './request'

export function getDetailData(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}
export function getRecommend() {
  return request({
    url: 'recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.lowNowPrice = itemInfo.lowNowPrice
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.lowPrice = itemInfo.lowNowPrice
  }
}
export class Shops {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }

}
export class GoodsParam {
  constructor(info, rule) {
    // 注意: images 可能没有值，（某些商品有值，某些没有值）
    this.image = info.image ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}