/*
 * @Author: wyatt 
 * @Date: 2018-07-05 09:36:01 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-09 14:22:17
 */

import React from 'react';
import './index.css'
import PageTitle from 'component/page-title/index.jsx';

export default class Home extends React.Component{
    
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="首页"/>
                <div className="row">
                    <div className="col-md-12">
                        body
                    </div>
                </div>
            </div>
        )
    }
}