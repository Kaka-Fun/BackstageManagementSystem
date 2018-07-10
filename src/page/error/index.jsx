/*
 * @Author: wyatt 
 * @Date: 2018-07-10 10:32:28 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-10 10:35:53
 */

 /*
 * @Author: wyatt 
 * @Date: 2018-07-05 09:36:01 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-10 10:31:57
 */

import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom'

export default class Error extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="出错了！"/>
                <div className="row">
                    <div className="col-md-12">
                        <span>找不到该路径</span>
                        <Link to="/" >点我返回首页</Link>
                    </div>
                </div>
            </div>
        )
    }
}