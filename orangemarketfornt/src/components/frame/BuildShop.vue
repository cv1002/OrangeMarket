<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="shopname"
        :rules="[{ required: true, message: '请填写店名' }]"
        label="店名"
        name="shopName"
        placeholder="店名"
    />
    <van-field
        v-model="shopIntroduction"
        :rules="[{ required: true, message: '请填写店铺简介' }]"
        label="店铺简介"
        name="shopDescription"
        placeholder="店铺简介"
    />
    <van-field
        :value="value"
        clickable
        label="地区选择"
        name="area"
        placeholder="点击选择省市区"
        readonly
        @click="showArea = true"
    />
    <van-popup v-model="showArea" position="bottom">
      <van-area
          :area-list="myArea"
          @cancel="showArea = false"
          @confirm="onConfirm"
      />
    </van-popup>
    <van-field
        v-model="shopAddress"
        :rules="[{ required: true, message: '请填写店铺地址' }]"
        label="店铺地址"
        name="shopAddress"
        placeholder="店铺地址"
    />
    <VanField label="商店图标上传" name="uploaderSub">
      <template #input>
        <VanUploader v-model="shopIcon"
                     :after-read="afterRead"
                     :before-delete="deleteImage"
                     :before-read="beforeRead"
                     :max-count="1"
                     multiple/>
      </template>
    </VanField>

    <div style="margin: 16px;">
      <van-button block native-type="submit" round type="info">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import area from "@/util/area";
import { Toast } from "vant";

export default {
  created() {
    this.myArea = area;
  },
  name: "BuildShop",
  data() {
    return {
      myArea: {},
      value: '',
      showArea: false,
      shopname: '',
      shopIntroduction: '',
      shopAddress: null,
      shopIcon: [],
      shopIconPost: "",
      shop: {
        shopAddress: String,
        shopDescription: String,
        shopIcon: String,
        shopName: String,
      }
    };
  },
  methods: {
    async onSubmit(values) {
      if (this.shopIconPost === "") {
        Toast("商店总得有图片吧。。。")
      } else {
        this.shop.shopName = values.shopName;
        this.shop.shopDescription = values.shopDescription;
        this.shop.shopAddress = values.area;
        this.shop.shopIcon = this.shopIconPost;
        const { $ } = await import('@/util/ajax');
        const result = await $.post("/shop", this.shop)
        if (!result.data.success) {
          Toast("你已经有一个商店了")
        } else {
          Toast("商店创建成功");
          await this.$router.push({
            name: '个人信息'
          });
        }
      }
    },
    onConfirm(values) {
      this.value = values
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');
      this.showArea = false;
    },
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    async afterRead(file) {
      const config = {
        headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() }
      };
      const { $ } = await import('@/util/ajax');
      const formData = new FormData();
      formData.append('file', file.file);
      const result = await $.post('/upload', formData, config);
      this.shopIconPost = result.data.information;
    },
    deleteImage() {
      this.shopIconPost = "";
      return Promise;
    }
  },
}
</script>

<style scoped>

</style>