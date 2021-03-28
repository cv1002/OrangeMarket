<template>
  <VanTabs v-model="active" offset-top="46px" sticky>
    <VanTab title="全部订单">
      <VanList
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <ARow v-for="(item,i) in list" :key="i">
          <OrderCard :order="item" :place="'ShopManage'"
                     :value="item.countCommodity"
                     @postgood="postGoods(i)"></OrderCard>
        </ARow>
      </VanList>
    </VanTab>
    <VanTab title="待发货订单">
      <VanList
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <ARow v-for="(item,i) in list" :key="i">
          <OrderCard v-if="item.itemName ==='待发货'" :order="item"
                     :place="'ShopManage'"
                     :value="item.countCommodity"
                     @postgood="postGoods(i)"></OrderCard>
        </ARow>
      </VanList>
    </VanTab>
    <VanTab title="上架商品管理">
      <VanList
          v-model="goodloading"
          :finished="goodfinished"
          finished-text="没有更多了"
          @load="onLoadGood"
      >
        <ARow v-for="(item, index) in goodList" :key="index">
          <VanCard v-if="item.commodityStatus"
                   :thumb="item.mainIcon"
                   :title="item.commodityName"
                   style="font-size: 15px; background: white; border: 1px solid #ebedf0;"
          >
            <template #tags>
              <van-tag plain type="danger">好评数：{{ item.praiseCommentCount }}</van-tag>
              <van-tag plain type="primary">评论数：{{ item.commentCount }}</van-tag>
            </template>
            <template #footer>
              <VanButton @click="putOffShelf(index)">下架</VanButton>
              <VanButton @click="getSub(index)">修改库存</VanButton>
            </template>
          </VanCard>
        </ARow>
        <VanButton icon="plus" round style="position: fixed; bottom: 20px; margin-left: 80%" type="primary"
                   @click="toBuild"/>
      </VanList>
    </VanTab>
    <VanTab title="下架商品">
      <VanList
          v-model="goodloading"
          :finished="goodfinished"
          finished-text="没有更多了"
          @load="onLoadGood"
      >
        <ARow v-for="(item, index) in goodList" :key="index">
          <VanCard v-if="!item.commodityStatus"
                   :thumb="item.mainIcon"
                   :title="item.commodityName"
                   style="font-size: 15px; background: white; border: 1px solid #ebedf0;"
          >
            <template #tags>
              <van-tag plain type="danger">好评数：{{ item.praiseCommentCount }}</van-tag>
              <van-tag plain type="primary">评论数：{{ item.commentCount }}</van-tag>
            </template>
            <template #footer>
              <VanButton @click="putOnShelf(index)">上架</VanButton>
            </template>
          </VanCard>
        </ARow>
        <VanButton icon="plus" round style="position: fixed; bottom: 20px; margin-left: 80%" type="primary"
                   @click="toBuild"/>
      </VanList>
    </VanTab>
    <VanPopup v-model="show" closeable position="bottom" style="height:70%">
      <div style="margin: 10px;padding:10px;font-weight: bold">
        修改库存
      </div>
      <inputStock :subList="this.subCommodity"/>
    </VanPopup>
  </VanTabs>

</template>

<script>
import OrderCard from "@/components/subcomponents/OrderCard";
import inputStock from "@/components/subcomponents/inputStock";
import { Toast } from "vant";

export default {
  components: { OrderCard, inputStock },
  name: "ShopManage",
  methods: {
    async onLoad() {
      const { $ } = await import("@/util/ajax");
      this.page++;
      const result = await $.get(`/shopOrder?page=${this.page}&pageSize=${10}`);
      this.loading = false;
      if (this.page * 10 >= result.data.information.total) {
        this.finished = true;
      }
      if (result.data.information.records.length !== 0) {
        for (let i = 0; i < result.data.information.records.length; i++) {
          this.list.push(result.data.information.records[i]);
        }
      }
    },
    async onLoadGood() {
      const { $ } = await import("@/util/ajax");
      this.goodpage++;
      const result = await $.get(`/shop?page=${this.goodpage}&pageSize=${10}`);
      this.goodloading = false;
      if (this.page * 10 >= result.data.information.total) {
        this.goodfinished = true;
      }
      if (result.data.information.records.length !== 0) {
        for (let i = 0; i < result.data.information.records.length; i++) {
          this.goodList.push(result.data.information.records[i]);
        }
      }
    },
    async postGoods(i) {
      const { $ } = await import("@/util/ajax");
      const formData = new FormData;
      formData.append("orderId", this.list[i].orderId);
      formData.append("recordId", 3);
      const result = await $.put("/orderStateflow", formData);
      if (result.data.success) {
        Toast("发货成功！")
        await this.reload();
      } else {
        Toast("确认收货失败")
      }
    },
    async putOffShelf(i) {
      const { $ } = await import("@/util/ajax");
      const formData = new FormData;
      formData.append("cid", this.goodList[i].cid);
      formData.append("commodityStatus", false);
      const result = await $.put("/commodity/updateStatus", formData);
      if (result.data.success) {
        Toast("下架成功");
        this.reload();
      } else {
        Toast("下架失败");
      }

    },
    async putOnShelf(i) {
      const { $ } = await import("@/util/ajax");
      const formData = new FormData;
      formData.append("cid", this.goodList[i].cid);
      formData.append("commodityStatus", true);
      const result = await $.put("/commodity/updateStatus", formData);
      if (result.data.success) {
        Toast("上架成功");
        this.reload();
      } else {
        Toast("上架失败");
      }

    },
    toBuild() {
      this.$router.push({
        name: '新建商品',
      })
    },
    reload() {
      this.list = [];
      this.goodList = [];
      this.loading = false;
      this.finished = false;
      this.page = 0;
      this.goodpage = 0;
      this.onLoad();
      this.onLoadGood();
    },
    async getSub(i) {
      const { $ } = await import("@/util/ajax");
      const result = await $.get(`/commodity?commodityId=${this.goodList[i].cid}`);
      this.subCommodity = result.data.information.subCommodity;
      this.show = true;
    }
  },
  data() {
    return {
      show: false,
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 0,
      goodList: [],
      goodpage: 0,
      goodloading: false,
      goodfinished: false,
      subCommodity: [],

    }
  }
}
</script>

<style scoped>

</style>