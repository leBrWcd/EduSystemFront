import request from '@/utils/request'

export default {

    //后端获得讲师列表的接口
    getTeacherList(pageSize,limit) {

        return request({
            url : `/eduservice/teacherfront/page/${pageSize}/${limit}`,
            method : 'get'
        })


    },

    //讲师详情
    getTeacherDetail(id) {
        return request ({
            url : `/eduservice/teacherfront/detail/${id}`,
            method : 'get'
        })
    }

}