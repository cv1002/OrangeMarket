<template>
  <div>
    <div v-if="showNo">
      <ARow style="margin-top:10px; margin-bottom:10px">
        <ARow style="margin-top: 10px; text-align: center; font-weight: bold">
          还没有评论哦
        </ARow>
      </ARow>
    </div>
    <div v-if="!showNo">
      <ARow :style="{'margin-top':'10px','margin-bottom':'10px'}">
        <ARow>
          <van-cell :style="{'border-radius' : '25px'}" is-link @click="toCommit">
            <div class="CommentsDetail">
              点击查看详细评论
            </div>
          </van-cell>

        </ARow>
        <ARow v-for="(item,i) in comments" :key="i" :style="{'margin-left':'10px'}">
          <ARow>
            <ARow>
              <ACol span="3">
                <a-avatar :src="item.userSelfie"/>
              </ACol>
              <ACol :style="{'height':'8.3vw','font-size': '3vw'}" span="4">
                {{ item.userName }}
              </ACol>
            </ARow>
            <ARow :style="{'font-size':'4vw'}">
              {{ item.commentDetails }}
            </ARow>
            <ARow :style="{height : '5px'}"></ARow>
          </ARow>
        </ARow>
      </ARow>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    comments: Array
  },
  name: "CommentsBlock",
  data() {
    return {
      show: false,
      showNo: true
    };
  },
  methods: {
    toCommit() {
      this.$router.push({ path: '/CommentsDetail' })
    }
  },
  mounted() {
    if (this.comments.length !== 0) {
      this.showNo = false
    }
  }
}
</script>

<style scoped>
.CommentsDetail {
  color: red;
  font-size: 3vw;
  height: 4vw;
}

</style>
