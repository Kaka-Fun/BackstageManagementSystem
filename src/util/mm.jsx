/*
 * @Author: wyatt 
 * @Date: 2018-07-09 14:30:14 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-11 12:39:18
 */

export default class MUtil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type : param.type || 'get',
                url : param.url || '',
                dataType : param.dataType || 'json',
                data : param.data || null,
                success: (res)=>{
                    if(0 === res.status){
                        // 数据请求成功
                        typeof resolve === 'function' && resolve(res.data, res.msg)
                    }else if(10 === res.status){
                        // 没有登录状态，强制登录
                        this.doLogin()
                    }else{
                        typeof reject === 'function' && reject(res.msg || res.data)
                    }
                },
                error: (err)=>{
                    typeof reject === 'function' && reject(err.statusText)
                }
            })            
        })
    }
    //跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    // 获取URL参数
    getUrlParam(name){
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg)
        return result ? decodeURIComponent(result[2]) : null

    }
    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！')
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~')
    }
    // 本地存储
    setStorage(name, data){
        let dataType = typeof data
        // json对象
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
        } else if (['number', 'string', 'boolean'].indexOf(dataType)>0){
            // 基本类型
            window.localStorage.setItem(name, data)
        } else {
            // 其他不支持类型
            alert('该类型不能用于本地存储')
        }
    }
    // 取出本地存储
    getStorage(name){
        let data = window.localStorage.getItem(name)
        if(data){
            return JSON.parse(data)
        }else{
            return ''
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name)
    }
}