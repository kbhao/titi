<template>
  <div class="home-container">
      <van-nav-bar class="app-nav-bar">
       <van-button slot="title" 
       class="search-btn"
        icon="search"
         type="info"
          round size="small">搜索</van-button>

      </van-nav-bar>
      <van-tabs class="channel-tabs" v-model="active">
  <van-tab class="tab-item" :title="channel.name" v-for="channel in channels" :key="channel.id">
      <article-list :channel="channel" />
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
data(){
    return {
        active:0,
        channels: []
    }
},
components:{
 ArticleList
},
created(){
   this.load()
},
methods:{
    async load(){
    const { data } = await getUserChannels()
    this.channels = data.data.channels
    }
}

}
</script>

<style lang="less" scoped>
.home-container {
    /deep/ .van-nav-bar__title{
        max-width:none;
    }
    .search-btn{
        width: 277px;
        height:32px;
        background:#5babfb;
        .van-icon{
            font-size:16px;
        }
        .van-button_text{
            font-size:14px;
        }
    }
}
</style>