<template>
  <div id="app">
    <br />
    <br />
    <div align="center">
      <div style="display: inline">
        <el-input
          placeholder="输入你想要问的问题,记得回车哦..."
          clearable
          autofocus
          style="width: 500px; margin: 0px; padding: 0px"
          prefix-icon="el-icon-search"
          v-model="keywords"
        >
        </el-input>
        <el-button type="primary" style="margin-left: 5px" icon="el-icon-search"
          >搜索
        </el-button>
      </div>
    </div>
    
    <div>
    <b style="font-size:20px;margin-left:190px;" >热门问题</b>
    <br>
    </div>
    <div >
      <el-timeline style="margin-left: 190px; width:1150px">
        <el-timeline-item  timestamp="阅读量 (1023)" placement="top" type="success">
          <el-card>
            <h4 >Q : Java多线程模型中，start方法和run方法的主要作用是什么?</h4>
            <p> <i class="el-icon-user">: LeBrWcd</i></p>
            <a class="el-icon-chat-dot-square" style=" cursor: pointer">回答: (45)</a>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="阅读量 (525)" placement="top" type="info">
          <el-card>
            <h4>Q : session 和 cookie 有什么区别？</h4>
            <p> <i class="el-icon-user">: 小小Java</i></p>
            <a class="el-icon-chat-dot-square" style=" cursor: pointer">回答(31)</a>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="阅读量 (325)" placement="top" type="warning ">
          <el-card>
            <h4>Q : 认证 (Authentication) 和授权 (Authorization)的区别是什么?</h4>
            <p> <i class="el-icon-user">: 百度战神</i></p>
            <a  class="el-icon-chat-dot-square" style=" cursor: pointer">回答(21)</a>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="阅读量 (141)" placement="top" type="danger ">
          <el-card>
            <h4>Q : String str="i"与 String str=new String("i")一样吗?</h4>
            <p> <i class="el-icon-user">: LeBrWcd</i></p>
            <a class="el-icon-chat-dot-square" style=" cursor: pointer">回答(5)</a>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

  </div>
</template>

<script>
export default {
  name: "productdetailspage",
  data() {
    return {
      activeName: "second",
      myData: [{ name: "暂时没有结果" }],
      keywords: "",
      activeNames: ["1"],
      // sentences:[{title:"一致性 Consistency",sent:"与现实生活一：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；与现实生活一：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；与现实生活一：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；",name:"1"},
      //     {title:"反馈 Feedback",sent:"控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；",name:"2"},
      //     {title:"效率 Efficiency",sent:"简化流程：设计简洁直观的操作流程；",name:"3"},
      //     {title:"可控 Controllability",sent:"用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；",name:"4"},
      // ],
      sentences: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      // alert(val);
    },
  },
};
</script>
<style>
</style>