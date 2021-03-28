<template>
  <div>
    <van-cell v-for="(item,index) in subList" :key="index" is-link @click="showPopup(index)">
      {{ item.subName }} 库存：{{ item.stock }}
    </van-cell>
    <van-popup v-model="show" position="bottom">
      <van-field v-model="stock" label="填写你的库存" type="digit">
        <template #button>
          <van-button size="small" type="primary" @click="postStock">确认提交</van-button>
        </template>
      </van-field>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  props: {
    subList: Array
  },
  name: "inputStock",
  data() {
    return {
      stock: 0,
      show: false,
      subId: Number,
      index: Number,

    }
  },
  methods: {
    showPopup(i) {
      this.show = true;
      this.subId = this.subList[i].subId;
      this.index = i;
    },
    async postStock() {
      const { $ } = await import("@/util/ajax");
      const formData = new FormData;
      formData.append("stock", this.stock)
      formData.append("subId", this.subId)
      const result = await $.put("/commodity/updateStock", formData)
      if (result.data.success) {
        Toast("修改库存成功");
        this.subList[this.index].stock = this.stock;
        this.show = false;
      } else {
        Toast("修改失败")
      }
    }
  },
}
</script>

<style scoped>

</style>