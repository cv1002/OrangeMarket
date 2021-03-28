<template>
  <ARow :style="{'height' : '80vw'}">
    <ARow justify="center" type="flex">
      <ACol span="24">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in goodsInfo.commodityPictures" :key="index">
            <img v-lazy="image.pictureUrl" class="productPicture"/>
          </van-swipe-item>
        </van-swipe>
      </ACol>
    </ARow>
    <ARow :style="{'height' : '10px'}"></ARow>
    <ARow class="buy">
      <ARow>
        <ARow></ARow>
        <ACol span="15">
          <div class="priceBlock">
            ￥ {{ priceLow }}
          </div>
        </ACol>
        <ACol class="grades" span="9">
          好评率：{{ praiseRate }}%
        </ACol>
      </ARow>
      <ARow>
      </ARow>
      <ARow justify="center" type="flex">
        <ACol span="22">
          <div class="introduce">
            {{ goodsInfo.commodityName }}
          </div>
        </ACol>
      </ARow>
      <ARow :style="{'height' : '3vw'}"></ARow>
    </ARow>
    <ARow :style="{'height' : '10px'}"></ARow>
    <ProductDetailBuy v-if="flag" ref="ProductDetailBuy" :otherMessage="otherMessage"
                      :typeList="goodsInfo.subCommodity"></ProductDetailBuy>
    <ARow :style="{'height' : '10px'}"></ARow>
    <ARow class="buy">
      <CommentsBlock v-if="flag" :comments="goodsInfo.hotComments"></CommentsBlock>
    </ARow>
    <ARow :style="{'height' : '10px'}"></ARow>
    <ARow class="buy">
      <ShopBlock v-if="flag"
                 :shopDescription="goodsInfo.shopDescription"
                 :shopId="goodsInfo.shopId"
                 :shopName="goodsInfo.shopName"></ShopBlock>
    </ARow>
    <ARow>
      <div :style="{'width':'100%','text-align':'center'}">
        -----商品详情-----
      </div>
      <div v-for="(image,index) in goodsInfo.commodityDetails" :key="index">
        <img :src="image.detailsUrl" class="detailPicture">
      </div>
    </ARow>
    <ARow :style="{height : '50px'}"></ARow>
  </ARow>
</template>

<script>
import ProductDetailBuy from "@/components/subcomponents/ProductDetailBuy";
import CommentsBlock from "@/components/subcomponents/CommentsBlock";
import ShopBlock from "@/components/subcomponents/ShopBlock";

export default {
  name: "ProductDetailMessage",
  components: { ShopBlock, CommentsBlock, ProductDetailBuy },
  props: {
    goodsInfo: {
      commentCount: Number,
      commodityDetails: Array,
      commodityName: String,
      commodityPictures: Array,
      hotComments: Array,
      isCollected: Boolean,
      praiseCommentCount: Number,
      shopDescription: String,
      shopName: String,
      subCommodity: Array,
      shopId: Number,
    },
  },
  async mounted() {
    this.priceLow = this.goodsInfo.subCommodity[0].price;
    for (let i = 1; i < this.goodsInfo.subCommodity.length; i++) {
      if (this.goodsInfo.subCommodity[i].price < this.priceLow) {
        this.priceLow = this.goodsInfo;
      }
    }
    if (this.goodsInfo.commentCount !== 0) {
      this.praiseRate = (this.goodsInfo.praiseCommentCount / this.goodsInfo.commentCount) * 100;
    }
    this.otherMessage.shopName = this.goodsInfo.shopName;
    this.otherMessage.commodityName = this.goodsInfo.commodityName;
    this.otherMessage.shopId = this.goodsInfo.shopId;
    this.flag = true;

  },
  data() {
    return {
      info: {
        // 商品名
        name: null,
        // 商品最低价格
        price_low: null,
        // 商品最高价格
        price_high: null,
        // 商品图片
        picture: [],
        //好评率
        PraiseRate: null,
        // 商品详情图片
        goodsDetailPicture: [],
        //传给子组件生成订单的其他信息
      },
      otherMessage: {
        shopName: String,
        commodityName: String,
        shopId: Number,
      },
      priceLow: 0,
      praiseRate: 0,
      flag: false
    };
  },
  methods: {
    showBuyBlock() {
      this.$refs.ProductDetailBuy.showPopup();
    }
  }
}
</script>

<style scoped>
.buy {
  background-color: white;
  border-radius: 25px;
  width: 95%;
  margin: auto;
}
.moneyBlock {
  color: red;
  margin-top: 3vw;
  font-size: 2vw;

}
.priceBlock {
  color: red;
  display: table-cell;
  vertical-align: bottom;
  font-size: 6vw;
  margin-top: 10px;
  margin-left: 10px;
}
.introduce {
  font-weight: bold;
  font-size: 6vw;
  color: black;
}
.grades {
  font-size: 4vw;
  color: grey;
  text-align: center;
  display: inline-flex;
  margin-top: 20px;
}
.productPicture {
  height: 60vw;
  width: 100vw;
}
.detailPicture {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;

}
</style>
<!--<a-radio-button v-for="(item,key) in info.tags" :key="key" :value="info.tags[key]" class="choice">-->
<!--{{item}}-->
<!--</a-radio-button>-->
<!--                @buy-clicked="onBuyClicked"-->
<!--               @add-cart="onAddCartClicked"-->