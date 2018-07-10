/*
 * @Author: wyatt 
 * @Date: 2018-07-10 15:28:54 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-10 16:59:41
 */


import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import User from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
const _user = new User();


export default class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pageNum: 1,
            list: [],
            firstLoading: true,
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then((res)=>{
            this.setState(res, ()=>{
                this.setState({
                    firstLoading: false
                })
            })
        }, (errMsg)=>{
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg)
        })
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum: pageNum
        }, ()=>{
            this.loadUserList()
        })
    }
    render(){
        let listBody = (
            this.state.list.map((user, index) => {
                return(
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(user.createTime).toLocaleString()}</td>
                    </tr>
                )
            })
        )
        let listError = (
            <tr>
                <td className="text-center" colSpan="5">
                    {this.state.firstLoading ? '数据加载中... ' : '没有找到相应结果'}
                </td>
            </tr>
        )
        let tableBody = this.state.list.length > 0 ? listBody : listError
        return(
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                        <Pagination 
                            current={this.state.pageNum} 
                            total={this.state.total}  
                            onChange={(pageNum)=>this.onPageNumChange(pageNum)}
                            />
                    </div>
                </div>
            </div>
        )
    }
}