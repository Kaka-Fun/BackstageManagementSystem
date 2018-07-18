/*
 * @Author: wyatt 
 * @Date: 2018-07-17 20:53:57 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-17 21:10:18
 */


import React from 'react'

export default class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber: ''
        }
    }
    // 数据变化的时候
    onValueChange(e){
        let name = e.target.name,
            value =e.target.value.trim();
            this.setState({
                [name] : value
            })
    }
    //点击搜索按钮的时候
    onSearch(){
        this.props.onSearch(this.state.orderNumber)
    }
    //输入关键词 点击回车 自动提价
    onSearchKeywordKeyUp(e){
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }
    render(){
        return(
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control">
                                <option value="productId">按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" 
                                className="form-control"  
                                placeholder="订单号"
                                onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
                                name="orderNumber"
                                onChange={(e)=>this.onValueChange(e)}/>
                        </div>
                        <button  className="btn btn-primary" onClick={(e)=>this.onSearch()}>搜索</button>
                    </div>  
                </div>
            </div>
            
        )
    }
}