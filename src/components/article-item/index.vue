<template>
  <div class="article-item">
      <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
   
        
     
      <div slot="label">
  <div class="cover-wrap" v-if="article.cover.type === 3">
              <div class="cover-wrap-item"
               v-for="(img, index) in article.cover.images"
                   :key="index">
                  <van-image 
                  width="116"
                   height="73" 
                   fit="cover"
                  
                    :src="img" />
              </div>
              
          </div>

          <div class="label-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_conut }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
          </div>
          
      </div>
      <van-image v-if="article.cover.type === 1" width="116" height="73" fit="cover" :src="article.cover.images[0]" />
  </div>
</template>

<script>
export default {
    name:'ArticleItem', 
 components:{},
 props:{
     article:{
         type:Object,
         required:true
     }
 }
}
</script>

<style scoped lang="less">
.article-item{
    .title {
     font-size:16px;
     color:#3a3a3a;
    }
  /deep/  .van-cell__value{
        flex:unset;
        width:116px;
        height:73px;
        margin-left:12px;
    }
    .cover-wrap{
        padding:15px 0;
        display:flex;
        .cover-wrap-item{
            flex:1;
            height:73px;
            &:not(:last-child) {
            padding-right:4px;
            }
            .cover-item{
                width:100%;
                height:73px;
            }
        }
    }
    .label-wrap{
        font-size:11px;
        color:#b4b4b4;
    }
    .label-wrap span{
        margin-right:12px;
    }
}
</style>