/*
 * @Author: wyatt 
 * @Date: 2018-07-17 20:58:39 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-17 22:06:10
 */

import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class Order{
    // 获取订单列表数据
    getOrderList(listParam){
        let url = '',
            data = {}
        if (listParam.listType === 'list') {
            url = '/manage/order/list.do'
            data.pageNum = listParam.pageNum
        }else if (listParam.listType === 'search'){
            url = '/manage/order/search.do'
            data.pageNum = listParam.pageNum
            data.orderNo = listParam.orderNo
        }
        return _mm.request({
            type: 'post',
            url : url,
            data: data
        })
    }
    // 获取订单详情
    getOrderDetail(orderNumber){
        return _mm.request({
            type: 'post',
            url : '/manage/order/detail.do',
            data: {
                orderNo: orderNumber
            }
        })
    }
}
