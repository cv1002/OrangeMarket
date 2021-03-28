<template>
  <ARow>
    <ARow :style="{height : '5vw','margin-left':'10px','margin-top':'2px', color : 'grey',fontSize : '3vw'}">
      <ACol :style="{'font-size':'3vw','margin-top':'2vw'}" span="4">
        店铺名
      </ACol>
      <ACol :style="{'font-size': '5vw','font-weight':'bold'}" span="12">
        {{ shopName }}
      </ACol>
    </ARow>
    <ARow :style="{height : '5vw','margin-left':'10px','margin-top':'2px', color : 'grey',fontSize : '3vw'}">
      <ACol :style="{'font-size':'3vw','margin-top':'1vw'}" span="4">
        简介
      </ACol>
      <ACol :style="{'font-size': '4vw'}" span="18">
        {{ shopDescription }}
      </ACol>
    </ARow>
    <van-cell :style="{'border-radius' : '25px'}" is-link @click="toShop">
      <div class="CommentsDetail">
        点击进入商店
      </div>
    </van-cell>
  </ARow>

</template>

<script>
export default {
  props: {
    shopName: String,
    shopDescription: String,
    shopId: Number,
  },
  name: "ShopBlock",
  methods: {
    toShop() {
      this.$router.push({
        path: "/shop",//这个path就是你在router/index.js里边配置的路径
        query: {
          sid: this.shopId,
        }
      })
    }
  }
}
</script>

<style scoped>

</style>