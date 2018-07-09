/*
 * @Author: wyatt 
 * @Date: 2018-06-29 10:38:21 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-05 14:28:13
 */


import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom'

import Layout from 'component/Layout/index.jsx'
import Home from 'page/home/index.jsx'

class App extends React.Component{
	render(){
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route  path="/product" component={Home}/>
						<Route  path="/product-category" component={Home}/>
						<Route  path="/order" component={Home}/>
						<Route  path="/user" component={Home}/>
					</Switch>
				</Layout>
			</Router>
		)
	}
}

ReactDOM.render(
	<App/>,
    document.getElementById('app')
);
