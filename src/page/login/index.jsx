/*
 * @Author: wyatt 
 * @Date: 2018-07-09 15:36:09 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-09 22:45:13
 */

import React from 'react'
import './index.scss'
import User from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
const _user = new User();



export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username : '',
            password : '',
            redirect : _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登录 - MMALL ADMIN'
    }
    // 用户数据改变
    onInputChange(e){
        let inputValue = e.target.value,
            inputName = e.target.name
        this.setState({
            [inputName] : inputValue
        })
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit()
        }
    }

    // 提交用户表单数据
    onSubmit(){
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo)
        // 验证通过
        if(checkResult.status){
            _user.login(loginInfo).then(((res)=>{
                _mm.setStorage('userInfo', res)
                this.props.history.push(this.state.redirect)
            }), (errMsg)=>{
                _mm.errorTips(errMsg)
            })
        }else{
            // 验证失败
            _mm.errorTips(checkResult.msg)
        }
        
    }
    render(){
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 -  MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input  type="text" 
                                        name="username"
                                        className="form-control" 
                                        placeholder="请输入账号"
                                        onKeyUp={e=>this.onInputKeyUp(e)}
                                        onChange={e=>this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input  type="password" 
                                        name="password"
                                        className="form-control"  
                                        placeholder="请输入密码"
                                        onKeyUp={e=>this.onInputKeyUp(e)}
                                        onChange={e=>this.onInputChange(e)}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block "
                                onClick={()=>this.onSubmit()}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}