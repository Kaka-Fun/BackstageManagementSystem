/*
 * @Author: wyatt 
 * @Date: 2018-07-12 14:40:44 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-16 15:51:49
 */

import React from 'react'
import './category-selector.scss'
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil();
const _product = new Product();


export default class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstCategoryList : [],
            firstCategoryId : 0,
            secondCategoryList : [],
            secondCategoryId : 0,
        }
    }
    componentDidMount(){
        this.loadFirstCategory()
    }
    // 编辑和详情查询
    componentWillReceiveProps(nextProps){
        let cateGoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
        if (!cateGoryIdChange && !parentCategoryIdChange) {
            return
        }

        // 只有一级品类
        if (nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        } else {
            // 有两级品类
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, ()=>{
                parentCategoryIdChange && this.loadSecondCategory()
            })
        }
    }
    // 加载一级分类
    loadFirstCategory(){
        _product.getCatrgoryList().then((res) => {
            this.setState({
                firstCategoryList: res
            })
        }, (errMsg)=>{
            _mm.errorTips(errMsg)
        })
    }
    // 加载二级分类
    loadSecondCategory(){
        _product.getCatrgoryList(this.state.firstCategoryId).then((res) => {
            this.setState({
                secondCategoryList: res
            })
        }, (errMsg)=>{
            _mm.errorTips(errMsg)
        })
    }
    // 选择一级分类
    onFirstCategoryChange(e){
        if (this.props.readOnly) {
            return   
        }
        let newValue = e.target.value || 0
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, ()=>{
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }
    // 选择二级分类
    onSecondCategoryChange(e){
        if (this.props.readOnly) {
            return   
        }
        let newValue = e.target.value || 0
        this.setState({
            secondCategoryId: newValue
        }, ()=>{
            this.onPropsCategoryChange()
        })
    }
    // 传给父组件选中的结果
    onPropsCategoryChange(){
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function'
        // 如果二级品类存在
        if (this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId)
        } else {
            // 如果一级品类存在
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
        }
    }
    render(){
        return(
            <div className="col-md-10">
                <select className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    readOnly={this.props.readOnly}
                    onChange={(e)=>this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index)=>(
                            <option value={category.id} key={index}>{category.name}</option>
                        ))
                    }
                </select>
                {
                    this.state.secondCategoryList.length ?
                        <select className="form-control cate-select"
                            value={this.state.secondCategoryId}
                            readOnly={this.props.readOnly}
                            onChange={(e)=>this.onSecondCategoryChange(e)}>
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((category, index)=>(
                                    <option value={category.id} key={index}>{category.name}</option>
                                ))
                            }
                        </select> : null
                }
                
            </div>
        )
    }
}

