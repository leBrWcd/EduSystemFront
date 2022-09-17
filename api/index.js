import request from '@/utils/request'
export default {

   getTeacherAndCourse() {

        return request({
            url : '/eduservice/indexfront/index',
            method : 'get'
        })

   }

}