<template>
  
  <!-- <div class="login-container"
       v-bind:style="{backgroundImage:'url(' + bg + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'}">> -->
  <div class="main">
    <el-button type="primary" class="btn1 " icon="el-icon-arrow-left" @click="goHome()">返回首页</el-button>
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item class="input-prepend restyle" prop="mobile" :rules="this.rules.phone">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>
        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:8160/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
  import loginApi from '@/api/login'
  export default {
    layout: 'sign',
    data () {
      return {
        bg : require('@/assets/img/house.jpg'),
        user:{
          mobile:'',
          password:''
        },
        //登录成功的用户数据
        loginInfo:{

          id: '',
          age: '',
          avatar: '',
          mobile: '',
          nickname: '',
          sex: ''
        },
         rules: {
          phone: [{
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }, {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }]
        }
      }
    },
    created() {

    },
    methods: {

      goHome() {
        location.href = '/'
      },


      TowxScan() {
        loginApi.wxScan()
      },

     
     //第一步：调用接口进行登录，返回token字符串
      submitLogin() {

        // 校验手机号
        loginApi.submitLogin(this.user).then(response => {
           if(response.data.code == 20000) {
                //提示注册成功
                this.$message({
                  type: 'success',
                  message: "登录成功"
                })
              
              } else {
                alert(response.data.message)
                //提示登录失败
                this.$message({
                  type: 'error',
                  message: response.data.message
                })
              }
          console.log("====",response)



           
            //第二步：将token放到cookie
            //cookie.set(name,value,domain作用范围)  domain:表示cookie在什么样的请求才会传递
            //只要带localhost:的url都会传递该cookie
            cookie.set('guli_token',response.data.data.token,{domain : 'localhost'})

            //第三步：request.js中创建http request拦截器

            //第四步：调用接口，根据token获取用户信息，为了首页面显示
            loginApi.getUserInfo().then(response => {
              //获取返回的用户信息，存入cookie中

              this.loginInfo = response.data.data.userInfo
               
                cookie.set('guli_ucenter',JSON.stringify(this.loginInfo),{domain :'localhost'})
              
                if(cookie) {
                     //登录成功，跳转到首页
                      window.location.href = '/'
                }
            })
          
        })
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;

    }
    .btn1 {
      position: relative;
      right: 130px;
      bottom: 40px;
      background-color: #187cb7;
    }
</style>