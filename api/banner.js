import request from '@/utils/request'
export default {

    getBanner() {
        return request({
            url : '/educms/bannerfront/getBanner',
            method : 'get'
        })
    }

}