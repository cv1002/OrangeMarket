<template>
  <div>
    <div>
      <ARow style="margin-top: 10px">
        <ACol push="1" style="height:5vw ; font-size: 4vw ; font-weight:bold">
          更多评论
        </ACol>
      </ARow>
      <ARow style="height:10px"></ARow>
    </div>
    <div v-if="this.scl.length === 0">
      <ARow style="text-align: center ">
        还没有人评论，要来做沙发吗~~~~
      </ARow>
      <ARow :style="{'height':'10px'}"></ARow>
    </div>
    <div v-else>
      <ARow v-for="(item,index) in scl" :key="index" :style="{'margin-top':'10px'}">
        <ARow :style="{'height':'10px'}"></ARow>
        <ARow>
          <ACol push="1" span="3">
            <a-avatar :src="item.userSelfie"/>
          </ACol>
          <ACol :style="{'height':'5vw','font-weight':'bold'}" push="1" span="21">
            {{ item.userName }}
          </ACol>
          <ACol>
            {{ item.subCommentTime[0] }}/{{ item.subCommentTime[1] }}/{{ item.subCommentTime[2] }}
            {{ item.subCommentTime[3] }}:{{ item.subCommentTime[4] }}:{{ item.subCommentTime[5] }}
          </ACol>
        </ARow>
        <ARow>
          <ACol :style="{'font-size':'4vw','height':'5vw'}" push="1">
            {{ item.subCommentDetails }}
          </ACol>
        </ARow>
        <ARow style="background: white; height: 10px;"/>
        <ARow style="border: 1px solid #ebedf0;"/>
      </ARow>
    </div>
    <div class=footerDiv>
      <ARow class="footer" justify="space-between" type="flex">
        <ACol>
          <VanCellGroup>
            <VanField
                v-model="message"
                :autosize="{}"
                label="评论"
                placeholder="也来说两句吧"
                rows="1"
                type="textarea"
            />
          </VanCellGroup>
        </ACol>
        <ACol>
          <van-button color="orange" type="primary" @click="addComments">评论</van-button>
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
    scl: Array,
    fid: Number,

  },
  mounted() {
  },
  data() {
    return {
      message: ""
    }
  },
  methods: {
    async addComments() {
      if (this.message === "") {
        Toast("请输入评论")
      } else {
        const { $ } = await import('@/util/ajax');
        const subCommentAdd = {
          "commentId": this.fid,
          "subCommentDetails": this.message,
          "uid": this.$store.state.user.uid,
        }
        const result = await $.post("/user/comment/comments", subCommentAdd);
        if (result.data.information === true) {
          Toast("评论成功");
          this.message = "";
          this.$emit('reload');
        } else {
          Toast("评论失败")
        }
      }
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
