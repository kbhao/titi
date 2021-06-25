<template>
  <div>
    
<van-nav-bar class="top"
  title="登录"
  left-arrow
  @click-left="$router.back()"
/>
<van-form 
 :validate-first="true"
 :show-error="false"
 :show-error-message="false"
 ref="login-form"
 @failed="shibai"
 @submit="delu"
>
  <van-field v-model="user.mobile" :rules="formRules.mobile" icon-prefix="iconfont icon"  left-icon="iconfont icon-shouji" name="mobile"  placeholder="请输入手机号" />
  
  <van-field v-model="user.code" icon-prefix="iconfont icon" left-icon="wode" :rules="formRules.code" name="code" placeholder="请输入验证码" >
  <template #button>
    <van-count-down :time="1000 * 5"
    v-if="isCountDownShow"
    format="ss s" 
    @finish="isCountDownShow = false"/>
    <van-button v-else size="small" type="primary" :loading="isSend" round @click.prevent="onsendsms">发送验证码</van-button>
   
  </template>
  </van-field>
  <div class="cc">
<van-button type="info" block class="dl" >登录按钮</van-button>
</div>
</van-form>

  </div>
</template>

<script>
import { login, sendsms } from '@/api/user.js'

export default {
data(){
  return {
    user: {
      mobile:'',
      code:''
    },
    formRules: {
      mobile: [
        { required: true, message: '请输入手机号' },
        { pattern: /^1[3|5|7|8|9]\d{9}$/, message:'手机号格式错误' }
      ],
      code: [
        { required: true, message: '请输入验证码' },
        { pattern:/^\d{6}$/, message:'验证码格式错误' }]
    },
    isCountDownShow:false,
    isSend: false
  }
},
methods:{
 async delu(){
  this.$toast.loading({
  message: '加载中...',
  forbidClick: true,
  duration:0
})
   try {
   const { data } = await login(this.user)
   
   this.$toast.success('登陆成功')
   this.$store.commit('setUser', data.data)
   this.$router.back()
   } catch (err){
   console.log('登录失败', err)
   this.$toast.fail('登录失败')
   }
  },
  shibai(error){
    if (error.errors[0]){
    this.$toast({ 
        message: error.errors[0].message,
      position:'top' 
      }
      )
    }
  },
 async onsendsms(){
   // 点击验证码触发验证用户消息
 try { 
    await this.$refs['login-form'].validate('mobile')
    this.isSend = true
    await sendsms(this.user.mobile)
   this.isCountDownShow = true 
   } catch (err) {
   let message = ''
   if (err && err.response && err.response.status === 429){
     message = '发送太频繁，请稍后重试'
   } else if (err.name === 'mobile'){
     message = err.message
   } else {
     message = '发送失败，未知错误'
   }
  this.$toast({ 
        message,
      position:'top' 
      }
      )
 }
this.isSend = false
 }
 
  
}
}
</script>

<style lang="less">
.cc{
  padding:26px 16px;
  .dl{
    background-color:#6db4fb;
  }
}


  
</style>