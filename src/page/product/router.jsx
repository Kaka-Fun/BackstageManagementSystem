/*
 * @Author: wyatt 
 * @Date: 2018-07-10 23:11:45 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-16 15:54:26
 */


import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';
export default class ProductRouter extends React.Component{
	render(){
		return (
			<Switch>
                <Route path="/product/index" component={ProductList}/>
				<Route path="/product/save/:pid?" component={ProductSave}/>
				<Route path="/product/detail/:pid" component={ProductDetail}/>
                <Redirect exact from="/product" to="/product/index"/>
            </Switch>
		)
	}
}