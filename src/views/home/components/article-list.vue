<template>
  <div class="article-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  :success-text="ts" :success-duration="1500">
 

  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <article-item v-for="(article, index) in articles" :key="index" :article="article" />
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getnew } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
    name:'ArticleList',
    components:{
    ArticleItem
    },
    props:{
        channel: {
        type:Object,
        required: true
        }
    },
    data() {
        return {
            isLoading:false,
             articles:[],
      loading: false,
      finished: false,
      timestamp:null,
      ts:''
        }
    },
     methods: {
   async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
     const { data } = await getnew({
         channel_id: this.channel.id,
         timestamp: this.timestamp || Date.now(),
         with_top:1
     })
     const { results } = data.data
     this.articles.push(...data.data.results)
     this.loading = false
     if (results.length) {
       this.timestamp = data.data.pre_timestamp
     } else {
      this.finished = true
     }
    },
   async onRefresh(){
        const { data } = await getnew({
         channel_id: this.channel.id,
         timestamp: this.timestamp || Date.now(),
         with_top:1
     })
     const { results } = data.data
     this.articles.unshift(...results)
       this.isLoading = false
       this.ts = ` 更新了${results.length}条数据`
   }
  }


}
</script>

<style scoped lang="less">
.article-list{
    position:fixed;
    left:0;
    right:0;
    bottom:50px;
    top:90px;
    overflow-y: auto;
}
</style>