/*
 * @Author: wyatt 
 * @Date: 2018-07-09 14:18:45 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-09 14:23:59
 */


import React from 'react';

export default class PageTitle extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        document.title = this.props.title + " - HAPPY MMALL"
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}