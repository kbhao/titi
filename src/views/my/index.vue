<template>
  <div class="my-container">
      <van-cell-group v-if="user" class="my-info">
  <van-cell  :border="false" class="base-info" center>
      <van-image  class="avatar" slot="icon" 
       round
       fit="cover"
       :src="currentUser.photo"
       ></van-image>
      <div class="name" slot="title">{{ currentUser.name }}</div>
      <van-button class="update-btn" size="small" round>编辑资料</van-button>

  </van-cell>
  <van-grid class="data-info" :border="false">
  <van-grid-item class="data-info-item">
      <div class="span">{{ currentUser.art_count }}</div>
      <div class="title">头条</div>
  </van-grid-item>
  <van-grid-item class="data-info-item">
      <div class="span">{{ currentUser.follow_count }}</div>
      <div class="title">关注</div>
  </van-grid-item>
  <van-grid-item class="data-info-item">
      <div class="span">{{ currentUser.fans_count }}</div>
      <div class="title">粉丝</div>
  </van-grid-item>
  <van-grid-item class="data-info-item">
      <div class="span">{{ currentUser.like_count }}</div>
      <div class="title">获赞</div>
  </van-grid-item>
</van-grid></van-cell-group>
<div v-else class="wd">
    <div @click="$router.push('/login')">
        <img class="tp" src="./1.png" alt="">
    </div>
    <div class="wz">登录注册</div>
</div>
<van-grid class="nav-grid mb6" :border="false" :column-num="2">
  <van-grid-item class="nav-grid-item" text="收藏" icon="star-o" />
  
  <van-grid-item class="nav-grid-item"  text="历史" icon="browsing-history-o" />
    
  
</van-grid>
<van-cell title="消息通知" is-link url="/" />
<van-cell class="mb6" title="全新功能" is-link to="/" />
<van-cell v-if="user" class="logout" title="退出登录" @click="onLogout" to="/" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
    data(){
        return {
            currentUser:{}
        }
    },
    created(){
        this.loadCurrentUser()
    },
    methods:{
        async loadCurrentUser(){
            const { data } = await getCurrentUser()
            this.currentUser = data.data
        },
    onLogout(){
        this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗'
        }).then(() => {
       this.$store.commit('setUser', null)
       this.$router.push('/my')
        })
        .catch(() =>{

        })
    }
    },
computed:{
    ...mapState(['user'])
}
}
</script>

<style scoped lang="less">
.my-container{
    .my-info{
        background:url("./banner.png") no-repeat;
        background-size:cover;
        .base-info{
            box-sizing:border-box;
            height:115px;
            background-color:unset;
            padding-bottom:11px;
            padding:38px 11px;
            padding-top:38px;
            .avatar{
                box-sizing:border-box;
                width:66px;
                height:66px;
                border:1px solid #fff;
                margin-right:11px;
            }
            .name{
                font-size:15px;
                color:#fff;
            }
            
        }
        .data-info{
        .data-info-item{
            height:65px;
            color:#fff;
            text-align:center;
            .span{
                font-size:18px;
            }
            .title{
                font-size:11px;
            }
        }
        }
      /deep/  .van-grid-item__content{
            background-color:unset;
        }
    }
   /deep/ .nav-grid{
        .nav-grid-item{
        height:70px;
        .van-icon-star-o::before{
            color:#eb5253;
        }
        .van-icon-browsing-history-o::before{
            color:#ff9d1d;
        }
        .van-grid-item__text{
            font-size:14px;
            color:#333333;
        }
      
    }}
 .logout{
     text-align: center;
     color:#d86262;
 }
  .mb6{
     margin-bottom:4px;
 }
 .wd{
     display:flex;
     justify-content: center;
     flex-direction: column;
     align-items: center;
     height:180px;
     background-size:cover;
     background:url('./banner.png') no-repeat;
 .tp{
     height:66px;
     width:66px;
 }
 .wz{
     margin-top:14px;
     font-size:14px;
     color:#fff;
 }
 }
}

</style>