import request from '@/utils/request'

export default {
    

    //注册
    submitRegister(params) {
        
        return request ({
            url:`/educenter/member/register`,
            method :'post',
            data : params
        })
    },

    //发送短信
    getMobile(mobile) {
        return request({
            url : `/edumsm/msm/send/${mobile}`,
            method:'get'
        })
    }
}