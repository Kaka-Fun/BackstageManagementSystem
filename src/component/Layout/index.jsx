/*
 * @Author: wyatt 
 * @Date: 2018-07-05 14:22:05 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-12 14:11:22
 */

import React from 'react'
import './theme.css'
import './index.scss'
import NavTop from 'component/nav-top/index.jsx'
import NavSide from 'component/nav-side/index.jsx'


export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="wrapper">
                <NavTop/>
                <NavSide/>
                {this.props.children}
            </div>
        )
    }
}