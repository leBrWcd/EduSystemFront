<template>
  <div id="main">
    <div>
      <div>
        <input style="width:800px;height:35px" type="text" v-model="form.title" placeholder="请输入文章标题" required>
        <el-button type="primary" @click="submitForm()">发布文章</el-button>
      </div>

      <br>
      <br>

      <mavon-editor
        v-model="form.value"
        ref="md"
        @imgAdd="imgAdd"
        @change="change"
        style="min-height: 800px;width: 100%"
      />
    </div>

    <el-dialog
      style="width:80%;margin: 0 auto"
      title="文章提交"
      :visible.sync="dialogFormVisible"
    >

      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="文章封面" >
          <signle-upload :urlpolicy="this.urlPol" v-model="ruleForm.url" v-on:urlImg="urlImg"></signle-upload>
        </el-form-item>
        <el-form-item label="选择权限" prop="level">
          <el-select v-model="ruleForm.level" placeholder="请选择文章权限">
            <el-option label="私密" :value=0></el-option>
            <el-option label="公开" :value=1></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文章类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">原创</el-radio>
            <el-radio :label="2">转载</el-radio>
            <el-radio :label="3">翻译</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章描述" prop="desc">
          <el-input type="textarea"
                    v-model="ruleForm.desc"
                    aria-placeholder="请输入文章描述10-150个字符~"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div  style="margin: 0 auto" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit"
                   v-loading.fullscreen.lock="fullscreenLoading"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'     //引入mavon-editor组件
import 'mavon-editor/dist/css/index.css'

export default {
  components :{
    mavonEditor,
  },
  data() {
    return {
      urlPol:"oss",
      userid: null,
      loginToken: null,
      dialogFormVisible: false,
      fullscreenLoading: false,
      form: {
        value:'', // 输入的markdown
        html:'',    // 及时转的html
        title: '',
      },
      ruleForm: {
        blogImg: '',
        level:'',
        desc: '',
        type:'',
      },
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
      },
      rules: {
        desc: [
          { required: true, message: '请输入文章描述', trigger: 'blur' },
          { min: 1, max: 150, message: '长度在 10 到 150 个字符', trigger: 'blur' }
        ],
        level:[
          { required: true, message: '请选择文章权限', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ],
      }
    }
  },
   methods: {
    urlImg(val){
      this.ruleForm.blogImg=val;
    },
    toOss(pos,$file){
      let formData = new FormData();
      Object.keys(this.dataObj).forEach(key => {
        formData.append(key, this.dataObj[key]);
      });
      formData.append('file',$file)
      this.axios({
        url: this.dataObj.host,
        method: 'post',
        data: formData
      }).then((res) => {
        let imgpath = this.dataObj.host + '/' + this.dataObj.key;
        //把这个给到我们的编辑器
        this.$refs.md.$img2Url(pos,imgpath)
      })
    },
    imgAdd(pos, $file){
      /**
       * 上传图片到OSS服务里面
       * */
      let filename = $file.name
      let _self = this;
      // 获取认证码
      this.axios
        .get('/third-part/oss/blogWriteImgPolicy')
        .then(response => {
          response = response.data;
          _self.dataObj.policy = response.data.policy;
          _self.dataObj.signature = response.data.signature;
          _self.dataObj.ossaccessKeyId = response.data.accessid;
          _self.dataObj.key = response.data.dir +getUUID()+"_"+filename;
          _self.dataObj.dir = response.data.dir;
          _self.dataObj.host = response.data.host;
          //推送到OSS
          this.toOss(pos,$file);
        }).catch(function (error) {
        alert(error)
        console.log("出错了...",err)
      })
    },
    // 所有操作都会被解析重新渲染
    change(value, render){
      this.form.html = render;
    },
    // 提交
    submit(){
      this.fullscreenLoading = true;
      //将Markdown文档提交到服务器
      let flag = true;
      if(!this.form.value){
        flag = false;
      }else {
        if(this.form.value.length<100){
          flag = false;
          alert("博文的编辑不能少于100个字符呦~")
        }
      }
      if(!this.ruleForm.desc){
        flag = false
      }else {
        if(this.ruleForm.desc.length<10){
          flag = false;
          alert("博文的描述不能低于10个字符呦~")
        }else if (this.ruleForm.desc.length>150){
          flag = false;
          alert("博文的描述不能高于于150个字符呦~")
        }
      }
      if(!this.form.title){
        flag = false;
      }else {
        if(this.form.title.length<4){
          flag = false;
          alert("标题不能低于4个字符！");
        }else if(this.form.title.length>100){
          flag = false
          alert("标题不能高于100个字符！");
        }
      }
      if(flag){
        //此时对用户回答进行提交
        this.axios({
          url: "/blog/blog/up/blogUp",
          method: 'post',
          headers: {
            "userid": this.userid,
            "loginType": "PcType",
            "loginToken": this.loginToken,
          },
          data:{
            "userid": this.userid,
            "blogTitle": this.form.title,
            "info": this.ruleForm.desc,
            "context": this.form.value,
            "level": this.ruleForm.level,
            "blogtype": this.ruleForm.type
          }
        }).then((res)=>{
          res = res.data;
          if(res.code===0){
            alert(res.msg)
          }else {
            this.$message.error(res.msg);
          }
          this.fullscreenLoading = false;
          this.editFlag = false;
        });
      }else {
        this.fullscreenLoading = false;
        alert("您还未编写对应内容！")
      }

    },
    submitForm() {
      let flag = true;
      if(!this.form.value){
        flag = false;
        alert("博文内容为空！")
      }else {
        if(this.form.value.length<100){
          flag = false;
          alert("博文的编辑不能少于100个字符呦~")
        }
      }
      if(!this.form.title){
        flag = false;
        alert("博文标题为空！")
      }else {
        if(this.form.title.length<4){
          flag = false;
          alert("标题不能低于4个字符！");
        }else if(this.form.title.length>100){
          flag = false
          alert("标题不能高于100个字符！");
        }
      }
      if(flag){
        this.dialogFormVisible = true;
      }else {
        this.dialogFormVisible = false;
      }
    },
  },
}
</script>

<style>
</style>