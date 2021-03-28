<template>
  <div>
    <VanTabs v-model="active">
      <VanTab title="商品">
        <VanList v-model="commodities.loading"
                 :finished="commodities.finished"
                 finished-text="没有更多了"
                 @load="onLoadCommodity"
        >
          <VanCard v-for="(item, index) in commodities.items"
                   :key="index"
                   :thumb="item.mainIcon"
                   :title="item.commodityName"
                   @click="$router.push(`/ProductDetail?cid=${item.cid}`)"
          />
        </VanList>
      </VanTab>
      <VanTab title="店铺">
        <VanList v-model="shop.loading"
                 :finished="shop.finished"
                 finished-text="没有更多了"
                 @load="onLoadShop"
        >
          <VanCard v-for="(item, index) in shop.items"
                   :key="index"
                   :thumb="item.shopIcon"
                   :title="item.shopName"
                   @click="$router.push(`/Shop?sid=${item.sid}`)"
          >
            <template #tags>
              <van-tag plain type="danger">好评数：{{ item.praiseCount }}</van-tag>
              <van-tag plain type="primary">评论数：{{ item.commentCount }}</van-tag>
            </template>
          </VanCard>
        </VanList>
      </VanTab>
    </VanTabs>
  </div>
</template>

<script>
export default {
  name: "Favorite",
  created() {
  },
  data() {
    return {
      /* 当前活跃页面 */
      active: null,
      /* 收藏的商店的数据 */
      shop: {
        /* 表示是否Loading */
        loading: null,
        /* 表示是否已经到底 */
        finished: false,
        /* 现在最新的是第几页 */
        nowPage: 0,
        /* 一页大小 */
        pageSize: 10,
        /* 存储items */
        items: []
      },
      /* 收藏的商品的数据 */
      commodities: {
        /* 表示是否Loading */
        loading: null,
        /* 表示是否已经到底 */
        finished: false,
        /* 现在最新的是第几页 */
        nowPage: 0,
        /* 一页大小 */
        pageSize: 10,
        /* 存储items */
        items: []
      },
    }
  },
  methods: {
    async onLoadCommodity() {
      const { $ } = await import("@/util/ajax");
      const formData = new FormData();
      formData.append("pages", this.nowPage);
      formData.append("pageSize", this.pageSize);
      const result = await $.get('/favoritesCommodity');
      const page = result.data.information;
      Array.prototype.push.apply(this.commodities.items, page.records);
      this.commodities.nowPage++;
      this.commodities.finished = this.commodities.nowPage >= page.total / page.size;
    },
    async onLoadShop() {
      const { $ } = await import("@/util/ajax");
      const formData = new FormData();
      formData.append("pages", this.nowPage);
      formData.append("pageSize", this.pageSize);
      const result = await $.get('/favoritesShop');
      const page = result.data.information;
      Array.prototype.push.apply(this.shop.items, page.records);
      this.shop.nowPage++;
      this.shop.finished = this.shop.nowPage >= page.total / page.size;
    }
  }
}
</script>

<style scoped>

</style>