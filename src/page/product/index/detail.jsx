/*
 * @Author: wyatt 
 * @Date: 2018-07-16 15:26:12 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-16 16:37:48
 */


import React from 'react'
import PageTitle from 'component/page-title/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx';
import './save.scss'
const _mm = new MUtil();
const _product = new Product();

export default class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1, //状态为1在售
        }
    }
    componentDidMount(){
        this.loadProduct()
    }
    // 加载商品详情
    loadProduct(){
        // 有id的时候 表示编辑功能 要回填表单
        if (this.state.id) {
            _product.getProduct(this.state.id).then((res)=>{
                let images = res.subImages.split(',')
                res.subImages ? res.subImages = images.map((imgUri)=>{
                    return{
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                }) : res.subImages = []
                res.defaultDetail = res.detail
            this.setState(res)
            }, (errMsg)=>{
                _mm.errorTips(errMsg)
            })
        }
    }
    // 处理图片数组
    getSubImagesString(){
        return this.state.subImages.map((image)=>image.uri).join(',')
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="商品详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p readOnly className="form-control">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p readOnly className="form-control" >{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector 
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" 
                                    readOnly
                                    className="form-control" 
                                    value={this.state.price}/>
                                <span className="input-group-addon" >元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" 
                                    readOnly
                                    className="form-control" 
                                    name="stock"
                                    value={this.state.stock}/>
                                <span className="input-group-addon" >件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length 
                                ? this.state.subImages.map(
                                    (image, index)=>(
                                        <div className="img-con" key={index}>
                                            <img className="img" src={image.url} />
                                        </div>
                                        )) 
                                : <div>暂无图片</div>
                            }
                        </div>
                    </div><div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                    </div>
                </div>
            </div>
        )
    }
}
