/*
 * @Author: wyatt 
 * @Date: 2018-07-05 09:36:01 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-10 10:31:57
 */

import React from 'react';
import './index.scss'
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom'
import Statistic from 'service/statistic-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
const _statistic = new Statistic();

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCount : '-',
            productCount : '-',
            orderCount : '-'
        }
    }
    componentDidMount(){
        // 在渲染完调用请求数据接口
        this.loadCount()
    }
    // 请求主页数据
    loadCount(){
        _statistic.getHomeCount().then(((res)=>{
            this.setState(res)
        }), (errMsg)=>{
            _mm.errTips(errMsg)
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="首页"/>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown"> 
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/product" className="color-box green"> 
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue"> 
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}