import request from '@/utils/request'

export default {

    //后端获得课程列表的接口
    getCourseList(pageSize,limit,searchObj) {

        return request({
            url : `/eduservice/coursefront/courseList/${pageSize}/${limit}`,
            method : 'post',
            data : searchObj
        })


    },

    //查询所有分类的方法
    getAllSubject() {
        return request({
            url : '/eduservice/subject/subjectList',
            method : 'get'
        })
    },

    //课程详情的方法
    getDetailInfo(courseId) {
        return request({
            url :`/eduservice/coursefront/base/${courseId}`,
            method : 'get'
        })
    },

    // 收藏课程
    collect(courseId) {
        return request({
            url : `/eduservice/coursefront/collect/${courseId}`,
            method : 'post'
        })
    },

    // 搜索课程
    searchCourseByName(courseName) {
        return request({
            url : `/eduservice/coursefront/getCourseByName?courseName=${courseName}`,
            method : 'get',
            data : courseName
        })
    }

    
   
}