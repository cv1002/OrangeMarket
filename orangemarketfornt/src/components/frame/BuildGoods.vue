<template>
  <VanForm @submit="onSubmit">
    <VanField
        v-model="goodsName"
        :rules="[{ required: true, message: '请填写商品名' }]"
        label="商品名"
        name="goodsName"
        placeholder="商品名"
    />
    <VanField
        v-model="fieldValue"
        is-link
        label="分类"
        name="label"
        placeholder="请选择您的商品分类"
        readonly
        @click="show = true"
    />
    <VanPopup v-model="show" position="bottom" round>
      <VanCascader
          v-model="cascaderValue"
          :options="options"
          title="请选择商品分类"
          @close="show = false"
          @finish="onFinish"
      />
    </VanPopup>
    <VanField label="商品图片上传" name="uploader">
      <template #input>
        <VanUploader v-model="uploader" :after-read="afterReadGoods"
                     :before-delete="upLoaderDelete"
                     :before-read="beforeRead"
                     :max-count="5"
                     multiple
                     name="Uploader"/>
      </template>
    </VanField>
    <VanField label="商品主图上传" name="uploaderSubDefault">
      <template #input>
        <VanUploader v-model="uploaderSubDefault" :after-read="afterReadGoods"
                     :before-delete="upLoaderDelete"
                     :before-read="beforeRead"
                     :max-count="1"
                     multiple
                     name="uploaderSubDefault"/>
      </template>
    </VanField>
    <VanField label="商品详情" name="uploaderDetail">
      <template #input>
        <VanUploader v-model="uploaderDetail" :after-read="afterReadGoods"
                     :before-delete="upLoaderDelete"
                     :before-read="beforeRead"
                     :max-count="10"
                     multiple
                     name="UploaderDetail"/>
      </template>
    </VanField>

    <div v-for="(item,i) in typeList" :key="i">
      <VanCell is-link @click="showPopup(i)">{{ item.subName }}</VanCell>
      <VanPopup v-model="showSub[i]" :style="{height : '70%'}" closeable height="700px" position="bottom" round>
        <div class="popBlock">
          您的品类
        </div>
        <VanForm @submit="upDateSub(i)">
          <VanField
              v-model="typeList[i].subName"
              :rules="[{ required: true, message: '请填写子种类名' }]"
              label="子种类名"
              name="subTypeName"
              placeholder="子种类名"
          />
          <VanField
              v-model="typeList[i].subPrice"
              :rules="[{ required: true, message: '请填写子种类单价' }]"
              label="子种类单价"
              name="subTypePrice"
              placeholder="子种类单价"
          />
          <VanField
              v-model="typeList[i].subStock"
              :rules="[{ required: true, message: '请填写子种类库存' }]"
              label="子种类库存"
              name="subTypeStock"
              placeholder="子种类库存"
          />
          <VanField label="种类图标上传" name="uploaderSub">
            <template #input>
              <VanUploader v-model="typeList[i].subPic" :before-read="beforeRead"
                           :max-count="1"
                           multiple/>
            </template>
          </VanField>
          <div style="margin: 16px;">
            <VanButton block native-type="submit" round type="info">确认</VanButton>
            <ARow :style="{'height' : '10px'}"></ARow>
            <VanButton block round type="danger" @click="deleteSub(i)">删除</VanButton>
          </div>
        </VanForm>
      </VanPopup>
    </div>


    <VanCell is-link @click="showPopupAdd">新建子类</VanCell>
    <VanPopup v-model="showAdd" :style="{height : '70%'}" closeable position="bottom" round>
      <div class="popBlock">
        新的子种类
      </div>
      <VanForm @submit="addSub">
        <VanField
            v-model="subTypeName"
            :rules="[{ required: true, message: '请填写子种类名' }]"
            label="子种类名"
            name="subTypeName"
            placeholder="子种类名"
        />
        <VanField
            v-model="subTypePrice"
            :rules="[{ required: true, message: '请填写子种类单价' }]"
            label="子种类单价"
            name="subTypePrice"
            placeholder="子种类单价"
        />
        <VanField
            v-model="subTypeStock"
            :rules="[{ required: true, message: '请填写子种类库存' }]"
            label="子种类库存"
            name="subTypeStock"
            placeholder="子种类库存"
        />
        <VanField label="种类图标上传" name="uploaderSub">
          <template #input>
            <VanUploader v-model="uploaderSub" :before-read="beforeRead" :max-count="1"
                         multiple/>
          </template>
        </VanField>
        <div style="margin: 16px;">
          <VanButton block native-type="submit" round type="info">确认</VanButton>
        </div>
      </VanForm>
    </VanPopup>
    <div style="margin: 16px;">
      <VanButton block native-type="submit" round type="info">提交</VanButton>
    </div>
  </VanForm>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: "BuildGoods",
  async created() {
    const { $ } = await import('@/util/ajax');
    const result = await $.get('/commodity/labels')
    for (let i = 0; i < result.data.information.length; i++) {
      this.options.push({
        text: result.data.information[i].itemName,
        value: result.data.information[i].recordId,
      })
    }
  },
  data() {
    return {
      //标记位，update为更新模式，add为新增模式
      type: String,
      //获取商品id
      cid: Number,
      label: [],
      //存商品图片
      uploader: [],
      uploaderName: [],
      //存该种类下的商品图标(临时的)
      uploaderSub: [],
      uploaderSubName: null,
      //存默认的商品图标
      uploaderSubDefault: [],
      uploaderSubDefaultName: null,
      //商品详情
      uploaderDetail: [],
      uploaderDetailName: [],

      goodsName: null,
      show: false,
      fieldValue: '',
      cascaderValue: '',
      showSub: [false],
      showAdd: false,
      subTypeName: null,
      subTypePrice: null,
      subTypeStock: null,
      options: [],
      typeList: [],
      postList: [],
    };
  },
  methods: {
    async onSubmit() {
      let searchSub = true;
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].subPic.length === 0) {
          searchSub = false;
          break;
        }
      }
      if (this.uploaderSubDefault.length === 0) {
        Toast("缺少主图片");
      } else if (this.typeList.length === 0) {
        Toast("至少设置一个种类");
      } else if (searchSub === false) {
        Toast("每个子种类都要有图片");
      } else {
        const config = {
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        };
        const { $ } = await import('@/util/ajax');
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].text === this.fieldValue) {
            this.label.push(this.options[i].value)
          }
        }

        for (let i = 0; i < this.typeList.length; i++) {
          this.postList.push(
              {
                "cid": 0,
                "price": this.typeList[i].subPrice,
                "stock": this.typeList[i].subStock,
                "subCommodityStatus": true,
                "subIcon": this.typeList[i].subPicName,
                "subId": 0,
                "subName": this.typeList[i].subName,
              }
          )
        }
        const test = {
          "commodityDetails": this.uploaderDetailName,
          "commodityName": this.goodsName,
          "labelId": this.label,
          "mainIcon": this.uploaderSubDefaultName,
          "mainIcons": this.uploaderName,
          "subCommodity": this.postList
        }
        const result = await $.post('/commodity', test, config);
        if (result.data.success) {
          Toast("创建成功");
          await this.$router.push(
              {
                name: '商铺管理',
              }
          )
        } else {
          Toast("创建失败");
        }
      }
    },
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join('/');
    },
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    showPopup(i) {
      this.showSub[i] = true;
      this.showAdd = true;
      this.showAdd = false;
    },
    showPopupAdd() {
      this.showAdd = true;
    },
    async addSub(values) {
      if (this.uploaderSub.length === 0) {
        Toast("至少上传一个图片")
      } else {
        const config = {
          headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() }
        };
        const { $ } = await import('@/util/ajax');
        const formData = new FormData();
        formData.append('file', this.uploaderSub[0].file);
        const result = await $.post('/upload', formData, config);
        const sub = {
          subName: values.subTypeName,
          subPrice: parseInt(values.subTypePrice),
          subStock: parseInt(values.subTypeStock),
          subPic: this.uploaderSub,
          subPicName: result.data.information,
        }
        this.showSub.push(false);
        this.typeList.push(sub);
        this.showAdd = false;
        this.uploaderSub = [];
        this.subTypeStock = null;
        this.subTypePrice = null;
        this.subTypeName = null;
      }
    },
    async upDateSub(i) {
      const config = {
        headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() }
      };
      const { $ } = await import('@/util/ajax');
      const formData = new FormData();
      formData.append('file', this.typeList[i].subPic[0].file);
      const result = await $.post('/upload', formData, config);
      this.typeList[i].subPicName = result.data.information;
      Toast("修改成功");
      this.showSub[i] = false;
      this.showAdd = true;
      this.showAdd = false;
    },
    async afterReadGoods(file, detail) {
      const config = {
        headers: { "Content-Type": "multipart/form-data;boundary=" + new Date().getTime() }
      };
      const { $ } = await import('@/util/ajax');
      const formData = new FormData();
      formData.append('file', file.file);
      const result = await $.post('/upload', formData, config);
      if (detail.name === "Uploader") {
        this.uploaderName.push(result.data.information);
      } else if (detail.name === "UploaderDetail") {
        this.uploaderDetailName.push(result.data.information)
      } else if (detail.name === "uploaderSubDefault") {
        this.uploaderSubDefaultName = result.data.information
      }
    },
    upLoaderDelete(detail) {
      if (detail.name === "Uploader") {
        this.uploaderName.splice(detail.index, 1);
      } else if (detail.name === "UploaderDetail") {
        this.uploaderDetailName.splice(detail.index, 1);
      } else if (detail.name === "uploaderSubDefault") {
        this.uploaderSubDefaultName = null;
      }
      return Promise;
    },
    deleteSub(i) {
      this.typeList.splice(i, 1);
      Toast("删除成功");
      this.showSub[i] = false;
      this.showAdd = true;
      this.showAdd = false;
    }
  },
}
</script>

<style scoped>
.popBlock {
  padding-top: 20px;
  padding-left: 20px;
  font-weight: bold;
}

</style>