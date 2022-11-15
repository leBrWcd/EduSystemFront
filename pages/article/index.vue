<template>
  <div style="width: 100%">
     <!-- 条件查询表单组件 -->
    <br>
    <el-form :inline="true" align="center" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="Query.title"  placeholder="文章标题" />
      </el-form-item>
      <el-form-item>
         <el-date-picker
        v-model="Query.createTime"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" 
        >查询</el-button
      >
      <el-button type="default" @click="reset()">清空</el-button>
      <el-button type="success" @click="toPublish()"><i class="el-icon-edit"> 发布文章</i></el-button>
    </el-form>
    <!-- <el-empty
     description="暂时木有找到文章~"
      v-if="isEmpty"
    ></el-empty> -->

    <div v-if="isEmpty" style="width: 100%;margin-left: 5%;" class="main">
      <el-card shadow="hover" v-for="(message,index) in Messages" :key="index">

        <div style="height:100px">
          <div  style="width:14%;height: 100%;border-radius: 100px;display:inline-block;">
            <el-image
              style="width:250px;height: 115px;"
              src="https://lebrwcd-edu1010.oss-cn-guangzhou.aliyuncs.com/blog/spring.jpg"
              class="image;fit"
            />
          </div>
          <div style="display:inline-block;margin-left: 5%;width: 60%">
            <p class="message" style="font-weight:bold;font-size: 18px">
              <router-link class="alink" :to="{ path: '/blogshow',query:{'blogid':message.blogid} }">
                Spring入门
                <!-- {{message.blogTitle}} -->
              </router-link>
            </p>
            <p style="font-weight: lighter" class="message">
              Spring是Java开发的一个经典框架，寓意给程序员带来春天...     
              <!-- {{message.info}} -->
            </p>
            <p class="message">
              作者：
              <i class="el-icon-user"></i>
              LeBrWcd
              &nbsp;&nbsp;
              阅读：
              <i class="el-icon-view"></i>
              100
              <!-- {{message.viewNumber}} -->
              &nbsp;&nbsp;
              收藏：
              <i class="el-icon-star-off"></i>
              <!-- {{message.collectNumber}} -->
              200
              &nbsp;&nbsp;
            </p>
          </div>
          <div  style="width:18%;height: 100%;
          display:inline-block;
          "
          >
            <p style="text-align: center;font-size: 14px"><!--{{message.createTime}}-->2022-09-25</p>
          <br><br>
          </div>

        </div>
        <br>
        <div style="height:100px">
          <div  style="width:14%;height: 100%;border-radius: 100px;display:inline-block;">
            <el-image
              style="width:250px;height: 115px;"
              src="https://lebrwcd-edu1010.oss-cn-guangzhou.aliyuncs.com/blog/coco.jpg"
              class="image;fit"
            />
          </div>
          <div style="display:inline-block;margin-left: 5%;width: 60%">
            <p class="message" style="font-weight:bold;font-size: 18px">
              <router-link class="alink" :to="{ path: '/blogshow',query:{'blogid':message.blogid} }">
                Java面向对象思想
                <!-- {{message.blogTitle}} -->
              </router-link>
            </p>
            <p style="font-weight: lighter" class="message">
              Java面向对象三大特性：封装、继承、多态...
              <!-- {{message.info}} -->
            </p>
            <p class="message">
              作者：
              <i class="el-icon-user"></i>
              百度战神
              &nbsp;&nbsp;
              阅读：
              <i class="el-icon-view"></i>
              621
              <!-- {{message.viewNumber}} -->
              &nbsp;&nbsp;
              收藏：
              <i class="el-icon-star-off"></i>
              <!-- {{message.collectNumber}} -->
              310
        
            </p>
          </div>
          <div  style="width:18%;height: 100%;
          display:inline-block;
          "
          >
            <p style="text-align: center;font-size: 14px"><!--{{message.createTime}}-->2022-11-12</p>
          <br><br>
          </div>
        </div>
        <br>
         <div style="height:100px">
          <div  style="width:14%;height: 100%;border-radius: 100px;display:inline-block;">
            <el-image
              style="width:250px;height: 115px;"
              src="https://lebrwcd-edu1010.oss-cn-guangzhou.aliyuncs.com/blog/liunian.jpg"
              class="image;fit"
            />
          </div>
          <div style="display:inline-block;margin-left: 5%;width: 60%">
            <p class="message" style="font-weight:bold;font-size: 18px">
              <router-link class="alink" :to="{ path: '/blogshow',query:{'blogid':message.blogid} }">
                我为什么选择编程
                <!-- {{message.blogTitle}} -->
              </router-link>
            </p>
            <p style="font-weight: lighter" class="message">
              我喜欢从0到1的过程，我热爱探索新事物    
              <!-- {{message.info}} -->
            </p>
            <p class="message">
              作者：
              <i class="el-icon-user"></i>
              LeBrWcd
              &nbsp;&nbsp;
              阅读：
              <i class="el-icon-view"></i>
              367
              <!-- {{message.viewNumber}} -->
              &nbsp;&nbsp;
              收藏：
              <i class="el-icon-star-off"></i>
              <!-- {{message.collectNumber}} -->
              185
              &nbsp;&nbsp;
            </p>
          </div>
          <div  style="width:18%;height: 100%;
          display:inline-block;
          "
          >
            <p style="text-align: center;font-size: 14px"><!--{{message.createTime}}-->2022-09-25</p>
          <br><br>
          </div>
        </div>
         <div style="height:100px">
          <div  style="width:14%;height: 100%;border-radius: 100px;display:inline-block;">
            <el-image
              style="width:250px;height: 120px;"
              src="https://lebrwcd-edu1010.oss-cn-guangzhou.aliyuncs.com/blog/springboot.jpg"
              class="image;fit"
            />
          </div>
          <div style="display:inline-block;margin-left: 5%;width: 60%">
            <p class="message" style="font-weight:bold;font-size: 18px">
              <router-link class="alink" :to="{ path: '/blogshow',query:{'blogid':message.blogid} }">
                SpringBoot
                <!-- {{message.blogTitle}} -->
              </router-link>
            </p>
            <p style="font-weight: lighter" class="message">
              SpringBoot是Java项目开发的快速脚手架
              <!-- {{message.info}} -->
            </p>
            <p class="message">
              作者：
              <i class="el-icon-user"></i>
              小小Java
              &nbsp;&nbsp;
              阅读：
              <i class="el-icon-view"></i>
              234
              <!-- {{message.viewNumber}} -->
              &nbsp;&nbsp;
              收藏：
              <i class="el-icon-star-off"></i>
              <!-- {{message.collectNumber}} -->
              124
              &nbsp;&nbsp;
            </p>
          </div>
          <div  style="width:18%;height: 100%;
          display:inline-block;
          "
          >
            <p style="text-align: center;font-size: 14px"><!--{{message.createTime}}-->2022-10-22</p>
          <br><br>
          </div>

        </div>
      </el-card>
    </div>
    <br>
    <div align="center">
    <el-pagination 
        background
        layout="prev, pager, next"
        :total="50">
    </el-pagination>
    </div>
    <div class="footer" style="margin: 0 auto;width: 100%;">
    </div>
  </div>
  
</template>

<script>
export default {
  name: "lastArticle",
  data(){
    return{
      isEmpty: true,
      total: 0,
      page: 1,
      limit: 10,
      Query :　{
        title: "",
        createTime : ""
      }, //查询条件封装对象,
      Messages:[
        {
          userid: null,
          info: null,
          blogid: null,
          contentid: null,
          blogTitle: null,
          userNickname: null,
          userImg: null,
          createTime: null,
          viewNumber: null,
          likeNumber: null,
          collectNumber: null,
          status: null,
          level: null,
          forkNumber: null,
          blogimg: null
        },
      ]
    }
  },
  methods:{
    toPublish(){
        // 跳转到发布文章页面
        alert('dd')
        this.$router.push({path:'/article/publish'})  //动态路由页面
    },
    reset() {
        this.Query.title = ""
        this.Query.createTime = null
    }
    // getDataList(){
    //   //这里客户端自己进行一个缓存
    //   let pageSession = sessionStorage.getItem("lastHomeBlogListPageSession");
    //   let total  = sessionStorage.getItem("lastHomeBlogListTotal");
    //   if(pageSession && total){
    //     this.Messages = JSON.parse(pageSession);
    //     this.total = parseInt(total);
    //     this.isEmpty = (this.total === 0);
    //   }else {
    //     this.axios({
    //       url: "/blog/blog/home/last",
    //       method: 'get',
    //     }).then((res) => {
    //       res = res.data;
    //       if (res.code === 0) {
    //         //这个就是我们的默认展示图片
    //         let image_base_user = "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
    //         let image_base_blog = "https://whiteholecloud-dev.oss-cn-shanghai.aliyuncs.com/2022-09-25/8cee84b4-1d03-483f-8376-14d419d84ca5_03.jpg"
    //         //同样的拿到数据后需要临时保存
    //         let page = res.page;
    //         this.total = page.totalCount;
    //         this.Messages = page.list
    //         this.isEmpty = (this.total === 0);
    //         for (let i=0;i<this.Messages.length;i++)
    //         {
    //           if(!this.Messages[i].userImg){this.Messages[i].userImg=image_base_user;}
    //           if(!this.Messages[i].blogimg){this.Messages[i].blogimg=image_base_blog}
    //         }
    //         //存储临时缓存
    //         sessionStorage.setItem("lastHomeBlogListPageSession", JSON.stringify(this.Messages));
    //         sessionStorage.setItem("lastHomeBlogListTotal",page.totalCount);
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     });
    //   }
    // }
  },
  created() {
    //this.getDataList();
  },
}
</script>

<style scoped>
.message{
  width: 25em;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.alink{
  text-decoration: none;
  color: #333333;
}

</style>
