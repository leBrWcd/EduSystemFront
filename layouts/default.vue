<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="尚课吧 ">
            <img src="~/assets/img/logo1.png" width="100%" alt="尚课吧 " />
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a>问答</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter" title>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                />
                <span id="userName">{{ loginInfo.nickname }}</span>
              </a>
              <a
                href="javascript:void(0);"
                title="退出"
                @click="logout()"
                class="ml5"
                >退出</a
              >
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <!-- 搜索表单 -->
          <aside class="h-r-search">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="输入你想学的课程"
                  v-model="courseName"
                  value
                  v-on:keyup.13="searchCourse(courseName)"
                />
                <button
                  type="button"
                 
                  @click="searchCourse(courseName)"
                  class="s-btn"
                >
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>

    <!-- /公共头引入 -->
    <nuxt />

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank"
                >LeBrwcd</a
              >
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：010-111111(广东) 0755-123456(深圳)</span>
                <span>Email：info@LeBrwcd.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2022课程版权均归尚课吧所有 粤ICP备8888888号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon-hover.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon-hover.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>

<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import "~/assets/css/base.css";
import "~/assets/css/activity_tab.css";
import "~/assets/css/bottom_rec.css";
import "~/assets/css/nice_select.css";
import "~/assets/css/order.css";
import "~/assets/css/swiper-3.3.1.min.css";
import "~/assets/css/pages-weixinpay.css";

import cookie from "js-cookie";
import userApi from "@/api/login";
import courseApi from "@/api/course";

export default {
  data() {
    return {
      token: "",
      loginInfo: {
        id: "",
        openid: "",
        mobile: "",
        password: "",
        nickname: "",
        sex: "",
        age: "",
        avatar: "",
      },
      courseName: "",
    };
  },
  created() {
    //获取url中的token
    this.token = this.$route.query.token;

    //如果url中有token，表示采用微信登录
    if (this.token) {
      this.wxLogin();
    }

    //展示用户信息
    this.showUserInfo();
  },
  methods: {
    searchCourse(courseName) {
      console.log(
        "default:",
        this.$route.query.data,
        "param:",
        this.$route.query.param
      );
      courseApi.searchCourseByName(courseName).then((response) => {
        this.$router.push({
          path: "/course",
          query: {
            data: response.data.data,
            param: courseName,
          },
        });
        this.courseName = ''
        
      });
    },

    wxLogin() {
      if (this.token == "") return;

      //把token存入cookie中
      cookie.set("guli_token", this.token, { domain: "localhost" });

      //登录成功根据token获取用户信息
      userApi.getUserInfo().then((response) => {
        this.loginInfo = response.data.data.userInfo;
        //将用户信息存入cookie
        cookie.set("guli_ucenter", this.loginInfo, { domain: "localhost" });
      });
    },

    //左上角显示登录后的用户信息
    showUserInfo() {
      //从cookie中获取用户信息,从cookie中获取到的是字符串，而页面显示需要json
      // var userStr = "{'name' : 'wcd','age':'20'}"
      //采用JSON.parse将字符串转化为json  {'name' : wcd ,'age' : 20}
      var userStr = cookie.get("guli_ucenter");
      console.log(userStr);
      if (userStr) {
        //JSON.parse("字符串json")
        this.loginInfo = JSON.parse(userStr);
      }
      //this.loginInfo = JSON.parse(userStr)

      //console.log(JSON.parse(userStr.toString())
    },

    //退出账号
    logout() {
      cookie.set("guli_ucenter", "", { domain: "localhost" });
      cookie.set("guli_token", "", { domain: "localhost" });

      window.location.href = "/";
    },
  },
};
</script>