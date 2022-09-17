import request from '@/utils/request'

export default {

    getPageList(page,limit,courseId) {
        return request({
            url : `/eduservice/comment/${courseId}/${page}/${limit}`,
            method :'get',
        })
    },

    addComment(comment) {
        return request({
            url : '/eduservice/comment/save',
            method : 'post',
            data : comment
        })
    }


}