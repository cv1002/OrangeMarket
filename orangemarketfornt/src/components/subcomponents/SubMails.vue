<template>
  <div>
    <ARow style="margin-top: 10px">
      <ARow>
        <ACol push="1" span="23" style="height:5vw; font-size: 4vw; font-weight: bold;">
          {{ messages.oppName }}
        </ACol>
      </ARow>
      <ARow :style="{'height':'10px'}"></ARow>
      <VanCell v-for="(item, index) in messages.messages" :key="index">
        <ARow>
          <ACol span="3">
            <a-avatar :src="item['senderId'] === $store.state.user.uid ? messages.oppSelfie : messages.mySelfie"/>
          </ACol>
          <ACol span="21" style="height: 5vw; font-size: 4vw; font-weight: bold">
            {{ item["senderId"] === $store.state.user.uid ? messages.oppName : "我" }}
          </ACol>
          <ACol>
            {{ item["chatDate"][0] }}/{{ item["chatDate"][1] }}/{{ item["chatDate"][2] }}
            {{ item["chatDate"][3] }}:{{ item["chatDate"][4] }}:{{ item["chatDate"][5] }}
          </ACol>
        </ARow>
        <ARow>
          <ACol push="1" style="font-size: 4vw; height:5vw">
            {{ item["chatDetails"] }}
          </ACol>
        </ARow>
      </VanCell>
    </ARow>
    <div class=footerDiv>
      <ARow class="footer" justify="space-between" type="flex">
        <ACol>
          <VanCellGroup>
            <van-field
                v-model="message"
                :autosize="{}"
                label="评论"
                placeholder="写上你要回复的话"
                rows="1"
                type="textarea"
            />
          </VanCellGroup>
        </ACol>
        <ACol>
          <van-button color="orange" type="primary" @click="handleChatPush">发送</van-button>
        </ACol>
      </ARow>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: "SubComments",
  props: {
    messages: {
      /* 聊天对象ID */
      oppId: String,
      /* 聊天对象名 */
      oppName: String,
      /* 聊天对象的头像 */
      oppSelfie: String,
      /* 聊天对象的身份 */
      oppType: String,
      /* 自己的头像 */
      mySelfie: String,
      /* 自己的身份 */
      myType: String,
      /* 聊天数据 */
      messages: Array,
    }
  },
  data() {
    return {
      message: null
    }
  },
  methods: {
    async handleChatPush() {
      const { $ } = await import("@/util/ajax");
      /* AJAX请求 */
      const params = new FormData();
      params.append("myType", this.messages.myType);
      params.append("oppId", this.messages.oppId);
      params.append("oppType", this.messages.oppType);
      params.append("chatContent", this.message);
      const result = await $.post('/user/sendChat', params);
      /* 回显 */
      if (result.data.success === true) {
        Toast.success("发送成功");
      } else {
        Toast.fail("发送失败");
      }
      /* 通知父组件更新数据 */
      this.$emit("update");
      this.message = "";
    }
  }
}
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
.footerDiv {
  width: 100vw;
  height: 44px;
}
</style>