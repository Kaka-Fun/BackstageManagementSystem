/*
 * @Author: wyatt 
 * @Date: 2018-07-10 10:13:51 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-10 10:15:56
 */


import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class Statistic{
    // 请求主页数据
    getHomeCount(){
        return _mm.request({
            url : '/manage/statistic/base_count.do',
        })
    }
}