/*
 * @Author: wyatt 
 * @Date: 2018-07-10 15:28:54 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-11 14:02:59
 */


import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
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
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then((res)=>{
            this.setState(res)
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
        return(
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>
                    {
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
                    }
                </TableList>
                <Pagination 
                    current={this.state.pageNum} 
                    total={this.state.total}  
                    onChange={(pageNum)=>this.onPageNumChange(pageNum)}
                    />
            </div>
        )
    }
}