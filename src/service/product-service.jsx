/*
 * @Author: wyatt 
 * @Date: 2018-07-10 23:30:22 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-17 00:10:10
 */


import MUtil from 'util/mm.jsx'
const _mm = new MUtil();

export default class Product{
    // 获取商品列表数据
    getProductList(listParam){
        let url = '',
            data = {}
        if (listParam.listType === 'list') {
            url = '/manage/product/list.do'
            data.pageNum = listParam.pageNum
        }else if (listParam.listType === 'search'){
            url = '/manage/product/search.do'
            data.pageNum = listParam.pageNum
            data[listParam.searchType] = listParam.keyword
        }
        return _mm.request({
            type: 'post',
            url : url,
            data: data
        })
    }
    // 改变商品的销售状态
    setProductStatus(productInfo){
        return _mm.request({
            type: 'post',
            url : '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }
    // 
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        }
        // 验证商品名为空
        if(typeof product.name !== 'string' || product.name.length === 0){
            return {
                status : false,
                msg : '商品名称不能为空'
            }
        }
        // 商品描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
            return {
                status : false,
                msg : '商品描述不能为空'
            }
        }
        // 品类Id不能为空
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status : false,
                msg : '请选择正确的分类'
            }
        }
        // 价格不能为空
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status : false,
                msg : '请输入正确的价格'
            }
        }
        // 库存不能为空
        if(typeof product.stock !== 'number' || !(product.stock > 0)){
            return {
                status : false,
                msg : '请输入正确的库存'
            }
        }
        return result;
    }
    // 获取商品详情
    getProduct(productId){
        return _mm.request({
            type: 'post',
            url : '/manage/product/detail.do',
            data: {
                productId: productId
            }
        })
    }
    // 新增商品
    saveProduct(product){
        return _mm.request({
            type: 'post',
            url : '/manage/product/save.do',
            data: product
        })
    }

    // 品类相关
    // 根据父品类id获取品类列表 
    getCatrgoryList(parentCategoryId){
        return _mm.request({
            type: 'post',
            url : '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }
    // 更新品类名字
    updateCategoryName(category){
        return _mm.request({
            type: 'post',
            url : '/manage/category/set_category_name.do',
            data: category
        })
    }
    // 新增品类
    saveCategory(category){
        return _mm.request({
            type: 'post',
            url : '/manage/category/add_category.do',
            data: category
        })
    }
}
