<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- 数据列表  开始 -->
          <article class="i-teacher-list" v-if="data.total > 0">
            <ul class="of">
              <li v-for="record in data.records" :key="record.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+record.id" :title="record.name" target="_blank">
                      <img :src="record.avatar" :alt="record.name" height="142">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+record.id" :title="record.name" target="_blank" class="fsize18 c-666">{{record.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{record.career}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{record.intro}}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 数据列表 结束 -->
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
             <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首页</a>

            <a
              v-if="data.hasPrevious"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>

            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>

            <a
              v-if="data.hasNext"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>

            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="尾页"
              @click.prevent="gotoPage(data.pages)">尾页</a>

            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
//导入api
import teacherApi from '@/api/teacher'
export default {


  //换一种方式，以前用 data,created,methods三板斧

  //异步请求数据,只调用一次
  asyncData( {params,error} )  {//this.$route.params.id == params.id

    return teacherApi.getTeacherList(1,8).then(response => {
      console.log(response.data.data)

      return { data: response.data.data}
      //等价于：data() { 
      //           return {
      //              data : ''
      //           }  }              this.data = response.data.data

    })
  },

  methods : {

    gotoPage(page) {
      teacherApi.getTeacherList(page,8).then(response => {
        this.data = response.data.data
      })
    }
  }



};
</script>