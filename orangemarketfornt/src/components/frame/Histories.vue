<template>
  <div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-card v-for="(item, index) in histories"
                :key="index"
                :desc="item.lastBrowserDate"
                :thumb="item.thumb"
                :title="item.title"
                @click="$router.push(`/ProductDetail?cid=${item.cid}`)"
      />
    </van-list>
  </div>
</template>

<script>
class History {
  constructor(title, lastBrowserDate, thumb, cid) {
    this.title = title;
    this.lastBrowserDate = lastBrowserDate;
    this.thumb = thumb;
    this.cid = cid;
  }
}

export default {
  name: "Histories",
  created() {
  },
  data() {
    return {
      /* 表示是否Loading */
      loading: null,
      /* 表示是否已经到底 */
      finished: false,
      /* 现在最新的是第几页 */
      nowPage: 0,
      /* 一页大小 */
      pageSize: 10,
      /* 存储Histories */
      histories: []
    }
  },
  methods: {
    async onLoad() {
      const { $ } = await import("@/util/ajax");
      const formData = new FormData();
      formData.append("pages", this.nowPage);
      formData.append("pageSize", this.pageSize);
      const result = await $.get('/histories');
      const page = result.data.information;
      Array.prototype.push.apply(this.histories, page.records.map(
          record => new History(
              record.commodityName,
              `${record.lastBrowserDate[0]}年${record.lastBrowserDate[1]}月${record.lastBrowserDate[2]}日`,
              record['mainIcon'],
              record.cid
          )
      ));
      this.nowPage++;
      this.finished = this.nowPage >= page.total / page.size;
    }
  }
}
</script>

<style scoped>

</style>