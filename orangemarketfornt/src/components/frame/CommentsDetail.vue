<template>
  <ARow>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index">
        <ARow>
          <ARow>
            <ACol span="3">
              <a-avatar :src="item.userSelfie"/>
            </ACol>
            <ACol :style="{'height':'5vw','font-weight':'bold'}" span="21">
              {{ item.userName }}
            </ACol>
            <ACol>
              {{ item.commentTime[0] }}/{{ item.commentTime[1] }}/{{ item.commentTime[2] }}
              {{ item.commentTime[3] }}:{{ item.commentTime[4] }}:{{ item.commentTime[5] }}
            </ACol>
          </ARow>
          <ARow v-if="item.praise === true" :style="{
            'font-weight':'bold',
            'color': 'blue'
          }">
            绝赞好评
          </ARow>
          <ARow v-if="item.praise === false" :style="{
            'font-weight':'bold',
            'color': 'red'
          }">
            属实不行
          </ARow>
          <ARow :style="{'font-size':'4vw','height':'5vw'}">
            {{ item.commentDetails }}
          </ARow>
          <ARow>
            <ACol push="21" span="3">
              <van-icon :badge="item.subCommentCount" name="chat-o" @click="showPopup(index)"/>
            </ACol>
          </ARow>
          <ARow :style="{height : '5px'}"></ARow>
        </ARow>
      </van-cell>
      <van-popup v-model="show" :style="{'height':'70%'}" closeable position="bottom">
        <SubComments :fid="this.fid" :scl="subcomments" @reload="reload"></SubComments>
      </van-popup>
    </van-list>
  </ARow>
</template>

<script>
import SubComments from "@/components/subcomponents/SubComments";

export default {
  name: "CommentsDetail",
  components: { SubComments },
  data() {
    return {
      //弹窗是否弹出
      show: false,
      allLoaded: false,
      //评论列表
      list: [],
      subCommentList: [],
      subShowList: [],
      //是否在加载
      loading: false,
      //是否全部加载完毕
      finished: false,
      pages: 0,
      subcomments: [],
      fid: 0,
    }
  },
  methods: {
    async onLoad() {
      const { $ } = await import('@/util/ajax');
      this.pages++;
      const result = await $.get(`/commodity/comment?cid=${1}&page=${this.pages}&pageSize=${10}`);
      for (let i = 0; i < result.data.information.records.length; i++) {
        this.list.push(result.data.information.records[i]);
        let subResult = await $.get(
            `/commodity/comment/subComments?commentId=${result.data.information.records[i].commentId}`)
        this.subCommentList.push(subResult.data.information);
        this.subShowList.push(subResult.data.information.length)
      }
      this.loading = false;
      this.finished = true;
    },
    reload() {
      this.list = [];
      this.subCommentList = [];
      this.show = false;
      this.allLoaded = false;
      this.subShowList = [];
      this.loading = false;
      this.finished = false;
      this.pages = 0;
      this.subcomments = [];
      this.fid = 0;
    },
    showPopup(index) {
      this.show = true;
      this.subcomments = this.subCommentList[index];
      this.fid = this.list[index].cid;
    },
  },
}
</script>

<style scoped>

</style>