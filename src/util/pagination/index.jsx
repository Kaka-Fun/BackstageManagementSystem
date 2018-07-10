/*
 * @Author: wyatt 
 * @Date: 2018-07-10 15:59:49 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-10 16:08:45
 */

import React from 'react';
import RcPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

export default class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props}  hideOnSinglePage showQuickJumper/>
                </div>
            </div>
        )
    }
}