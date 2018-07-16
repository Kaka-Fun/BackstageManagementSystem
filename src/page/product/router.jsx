/*
 * @Author: wyatt 
 * @Date: 2018-07-10 23:11:45 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-16 23:44:06
 */


import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';
import CategoryList from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product//category/add.jsx';
export default class ProductRouter extends React.Component{
	render(){
		return (
			<Switch>
                <Route path="/product/index" component={ProductList}/>
				<Route path="/product/save/:pid?" component={ProductSave}/>
				<Route path="/product/detail/:pid" component={ProductDetail}/>
				<Route path="/product-category/index/:categoryId?" component={CategoryList}/>
				<Route path="/product-category/add" component={CategoryAdd}/>
                <Redirect exact from="/product" to="/product/index"/>
				<Redirect exact from="/product-category" to="/product-category/index"/>
            </Switch>
		)
	}
}