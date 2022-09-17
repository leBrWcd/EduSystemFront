import request from '@/utils/request'

export default{


    //生成订单
    createOrder(courseId) {
        return request({
            url : `/eduorder/order/Generic/${courseId}`,
            method :'post'
        })
    },


    //根据订单id查询订单信息
    getOrder(orderId) {
        return request({
            url : `/eduorder/order/getOrderById/${orderId}`,
            method :'get'
        })
    },

    //生成二维码的方法
    createNative(orderNo) {

        return request({
            url :`/eduorder/paylog/createNative/${orderNo}`,
            method :'get'
        })
    },


    //查询支付状态的方法
    queryOrderStatus(orderNo) {
        return request({
            url : `/eduorder/paylog/queryStatus/${orderNo}`,
            method : 'get'
        })
    }

}
