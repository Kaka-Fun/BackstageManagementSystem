/*
 * @Author: wyatt 
 * @Date: 2018-07-16 23:30:56 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-17 00:25:13
 */


import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom'
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
const _product = new Product();


export default class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount(){
        this.loadGategoryIdList()
    }
    
    // 加载品类列表 显示父品类列表
    loadGategoryIdList(){
        _product.getCatrgoryList().then((res)=>{
            this.setState({
                categoryList: res
            })
        }, (errMsg)=>{
            _mm.errorTips(errMsg)
        })
    }
    // 表单的值发生变化
    onValueChange(e){
        let name = e.target.name,
            value= e.target.value
        this.setState({
            [name]:value
        })
        
    }
    // 提交增加的品类
    onSubmit(e){
        let categoryName = this.state.categoryName.trim()
        // 商品名称不为空
        if(categoryName){
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName
            }).then((res)=>{
                _mm.successTips(res)
                this.props.history.push('/product-category/index')
            }, (errMsg)=>{
                _mm.errorTips(errMsg)
            })
        }else{
            // 商品名称为空
            _mm.errorTips('请填写商品名称')
        }
    }
    //加载品类列表
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="品类列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId" 
                                        className="form-control"
                                        onChange={(e)=>this.onValueChange(e)}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index)=>{
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"  
                                        placeholder="请输入品类名称"
                                        name="categoryName"
                                        value={this.state.name}
                                        onChange={(e)=>this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" 
                                        className="btn btn-primary"
                                        onClick={(e)=>this.onSubmit(e)}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}