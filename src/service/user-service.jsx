/*
 * @Author: wyatt 
 * @Date: 2018-07-09 20:50:38 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-10 16:57:47
 */
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class User{
    // 用户登录
    login(loginInfo){
        return _mm.request({
            type: 'post',
            url : '/manage/user/login.do',
            data: loginInfo
        })
    }
    // 检查用户登录接口的数据是否合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password)
        // 验证用户名为空
        if(typeof username !== 'string' || username.length === 0){
            return {
                status : false,
                msg : '用户名不能为空'
            }
        }
        // 验证密码为空
        if(typeof password !== 'string' || password.length === 0){
            return {
                status : false,
                msg : '密码不能为空'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }
    // 退出登录
    logout(){
        return _mm.request({
            type: 'post',
            url : '/user/logout.do'
        })
    }
    // 获取用户列表数据
    getUserList(pageNum){
        return _mm.request({
            type: 'post',
            url : '/manage/user/list1.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}