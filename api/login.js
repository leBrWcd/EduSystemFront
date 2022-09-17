import request from '@/utils/request'

export default {


    submitLogin(userForm) {
        return request({
            url:'/educenter/member/login',
            method:'post',
            data : userForm
        })
    },

    //根据token获取用户信息
    getUserInfo() {
        return request({
            url : '/educenter/member/getUserInfo',
            method : 'get'
        })
    },

    //微信扫码
    wxScan() {
        return request({
            url : '/api/ucenter/wx/login',
            method : 'get'
        })
    }
    
    



}