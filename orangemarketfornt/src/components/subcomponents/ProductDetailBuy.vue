<template>
  <ARow :style="{'height':'15%'}" class="buy">
    <ARow>
      <ACol>
        <div>
          <div></div>
          <VanCell :style="{'border-radius' : '25px','font-size':'3vw'}" is-link @click="showPopup">
            {{ selectTip }}
          </VanCell>
          <van-sku
              v-model="show"
              :goods="goods"
              :goods-id="1"
              :hide-stock="sku.hide_stock"
              :quota="0"
              :quota-used="0"
              :sku="sku"
              @sku-selected="onSelectButton($event)"
              @buy-clicked="onBuyClicked"/>
        </div>
      </ACol>
    </ARow>
  </ARow>
</template>

<script>
export default {
  name: "ProductDetailBuy",
  props: {
    typeList: Array,
    otherMessage: {
      shopName: String,
      commodityName: String,
      shopId: Number,
    }
  },
  async mounted() {
    this.sku.price = this.typeList[0].price;
    for (let i = 0; i < this.typeList.length; i++) {
      this.sku.tree[0].v.push(
          {
            "id": String(i),
            "name": this.typeList[i].subName,
            "imgUrl": this.typeList[i].subIcon,
            "previewImgUrl": this.typeList[i].subIcon,
          }
      );
      this.sku.list.push(
          {
            "id": this.typeList[i].subId,
            "s1": String(i),
            "price": this.typeList[i].price * 100,
            "stock_num": this.typeList[i].stock
          }
      );
      this.sku.stock_num += this.typeList[i].stock;
      if (this.typeList[i].price < this.sku.price) {
        this.sku.price = this.typeList[i].price;
      }
    }
    this.goods.picture = this.typeList[0].subIcon;
  },
  data() {
    return {
      selectTip: "请选择：",
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "请选择", // skuKeyName：规格类目名称
            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [],
            largeImageMode: false, //  是否展示大图模式
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: null, // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        none_sku: false, // 写死，必须选一种规格
        hide_stock: false // 显示库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: null

      },
      getInfo: {
        // 种类名
        typeName: null,
        // 种类详细信息，格式见json文件
        typeDetail: [],
        //每种组合的价格、库存、id、规格值
        typeList: [],
        //默认价格，没选种类时写在价格栏上
        defaultPrice: null,
        // 总库存
        totalStock: null,
        // 商品缩略图
        goodsPictureSmall: null


      },
      order: {
        shopName: String,
        subIcon: String,
        commodityName: String,
        subName: String,
        price: Number,
        countCommodity: Number,
        subId: Number,
        cid: Number,
        shopId: Number,
        stock: Number,
      },
    };
  },
  methods: {
    onSelectButton(value) {
      if (this.selectTip === '已选择：' + value.skuValue.name) {
        this.selectTip = '请选择：'
      } else {
        this.selectTip = '已选择：' + value.skuValue.name
      }
    },
    showPopup() {
      this.show = true;
    },
    onBuyClicked(skuData) {
      let tag = 0;
      this.order.shopName = this.otherMessage.shopName;
      this.order.subId = skuData.selectedSkuComb.id;
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].subId === this.order.subId) {
          tag = i;
        }
      }
      this.order.subIcon = this.typeList[tag].subIcon;
      this.order.commodityName = this.otherMessage.commodityName;
      this.order.subName = this.typeList[tag].subName;
      this.order.price = this.typeList[tag].price;
      this.order.countCommodity = skuData.selectedNum;
      this.order.cid = this.typeList[tag].cid;
      this.order.shopId = this.otherMessage.shopId;
      this.order.stock = this.typeList[tag].stock;
      this.$store.state.order = this.order;
      this.$router.push(
          {
            name: '下单',
          }
      )
    }
  },
}
</script>

<style scoped>

</style>