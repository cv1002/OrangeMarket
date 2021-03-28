<template>
  <ARow>
    <ARow>
      <ProductDetailMessage v-if="flag === true" ref="ProductDetailMessage" :goodsInfo="this.goodsInfo"/>
    </ARow>
    <ProductFooter v-if="flag === true"
                   :isCollected="goodsInfo.isCollected"
                   :sid="goodsInfo.shopId"
                   @clickbuy="showBuy"
                   @collect="doFavorite"></ProductFooter>
  </ARow>
</template>

<script>
import ProductDetailMessage from "@/components/subcomponents/ProductDetailMessage";
import ProductFooter from "@/components/subcomponents/ProductFooter";

export default {
  name: "ProductDetail",
  components: { ProductFooter, ProductDetailMessage },
  data() {
    return {
      goodsInfo: null,
      flag: false,
      cid: Number,
    }
  },
  async created() {
    this.cid = this.$route.query.cid
    const { $ } = await import('@/util/ajax');
    const result = await $.get(`/commodity?commodityId=${this.cid}`);
    const formData = new FormData;
    formData.append("cid", `${this.cid}`);
    await $.post("/histories", formData);
    this.goodsInfo = result.data.information;
    this.flag = true;
  },
  methods: {
    showBuy() {
      this.$refs.ProductDetailMessage.showBuyBlock();
    },
    async doFavorite() {
      const { $ } = await import("@/util/ajax");
      let result;
      if (!this.goodsInfo.isCollected) {
        const param = new FormData();
        param.append("cid", this.$route.query.cid);
        result = await $.post("/favoritesCommodity", param);
      } else {
        result = await $.delete("/favoritesCommodity", {
          params: {
            cid: this.$route.query.cid
          }
        });
      }
      if (result.data.success === true) {
        this.goodsInfo.isCollected = !this.goodsInfo.isCollected;
      }
    }
  }
}
</script>

<style scoped>

</style>