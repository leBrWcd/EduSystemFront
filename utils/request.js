import axios from 'axios'
import cookie from 'js-cookie'
import Vue from 'vue'

//创建axios实例
const service = axios.create({
    baseURL:'http://localhost:8222',
    timeout:20000
})

//http request拦截器，判断cookie中是否有token字符串，如果有，则将token存入请求头中
service.interceptors.request.use(

    config => {
        
        if(cookie.get('guli_token')) {
            config.headers['token'] = cookie.get('guli_token');
        }

        return config
    },
    err => {
        return Promise.reject(err);
    }
)

//http response拦截器
service.interceptors.response.use(
    response => {
        if(response.data.code == 28004) {
            console.log("response.data.resultCode是28004")
            window.location.href='/login'
        }else{
            if(response.data.code!==20000) {
                //25000,订单支付中，不做任何提示
                if(response.data.code !== 25000) 
                Vue.prototype.$message({
                        message : response.data.message || 'error',
                        type : 'error',
                    })
            }else{
                return response;
            }
        }
       
    }
)




export default service