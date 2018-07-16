/*
 * @Author: wyatt 
 * @Date: 2018-07-10 23:39:01 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-11 14:04:33
 */


import React from 'react';

export default class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps(){
        // 列表只有第一次挂载的时候，isFirstLoading为true，其他时候为false
        this.setState({
            isFirstLoading: false
        })
    }
    render(){
        // 表头信息
        let tableHeader = this.props.tableHeads.map((tableHead, index) => {
            if (typeof tableHead === 'object') {
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
            } else if(typeof tableHead === 'string'){
                return <th key={index}>{tableHead}</th>
            }
        })
        // 列表的内容
        let listBody = this.props.children
        //列表信息
        let listInfo = (
            <tr>
                <td className="text-center" colSpan={tableHeader.length}>
                    {this.state.isFirstLoading ? '数据加载中... ' : '没有找到相应结果'}
                </td>
            </tr>
        )
        let tableBody = listBody.length > 0 ? listBody : listInfo
        return(
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered table-hover table-condensed">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}