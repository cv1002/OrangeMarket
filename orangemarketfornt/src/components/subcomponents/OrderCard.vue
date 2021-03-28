<template>
  <div class="card">
    <van-cell v-if="place === 'SetOrder'"
              :style="{'font-weight':'bold','font-size': '120%','border-radius':'25px'}">
      <van-icon name="shop-o"/>
      {{ order.shopName }}
    </van-cell>
    <div v-else-if="place === 'ShopManage'"
         style="margin: 10px;padding-top: 10px; padding-left:10px; font-weight: bold;font-size: large">
      订单号：{{ order.orderId }}
    </div>
    <van-cell v-else
              :style="{'font-weight':'bold','font-size': '120%','border-radius':'25px'}">
      <van-icon name="shop-o"/>
      {{ order.shopName }}
    </van-cell>
    <ARow v-if="place==='OrderManage'||place === 'ShopManage'" span="12"
          style="color: red;font-weight: bold;margin-left: 20px">
      订单{{ order.itemName }}
    </ARow>
    <ARow justify="end" type="flex">
      <ACol span="10">
        <div>
          <img :src="order.subIcon" class="goodsPicture">
        </div>
      </ACol>
      <ACol span="1"></ACol>
      <ACol span="12">
        <div :style="{'font-weight':'bold','font-size':'3vw','color': 'black'}">
          <span>
            {{ order.commodityName }}
          </span>
          <br>
          <span :style="{'font-size':'2vw','color': 'grey'}">
            {{ order.subName }}
          </span>
        </div>
      </ACol>
      <ACol :style="{'font-size':'2vw','color': 'grey'}">
        ￥
        {{ order.price }}
        *{{ value }}
      </ACol>
    </ARow>
    <ARow justify="end" type="flex">
      <ACol :style="{'font-weight':'bold','font-size':'3vw','color': 'grey'}">
        总价：￥
        {{ Math.round(order.price * value * 100) / 100 }}
      </ACol>
    </ARow>
    <ARow v-if="place === 'OrderManage'" justify="end" type="flex">
      <ACol>
        <van-button :style="{height : '35px','margin-right':'5px','width':'25vw'}"
                    color="orange" round
                    type="info"
                    @click="toOrderDetail">查看详情
        </van-button>
      </ACol>
    </ARow>
    <ARow v-if="place === 'ShopManage'&& order.itemName ==='待发货'" justify="end" type="flex">
      <ACol>
        <van-button :style="{height : '35px','margin-right':'5px','width':'25vw'}"
                    color="orange" round
                    type="info"
                    @click="postGoods">我已发货
        </van-button>
      </ACol>
    </ARow>
  </div>

</template>

<script>
export default {
  //type: 商品状态 id：商品id place：标记这个商品卡片放在哪
  props: {
    "place": String,
    "order": null,
    "value": Number
  },
  name: "Card",
  data() {
    return {
      //按键类型
      buttonType: null,
      goodAmount: 0
    }
  },
  methods: {
    toOrderDetail() {
      this.$store.state.orderId = this.order.orderId;
      this.$router.push({ path: '/OrderDetail' });
    },
    postGoods() {
      this.$emit('postgood');
    }
  },

}
</script>

<style scoped>
.card {
  background-color: white;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  border-radius: 25px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;

}
.goodsPicture {
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
}

</style>